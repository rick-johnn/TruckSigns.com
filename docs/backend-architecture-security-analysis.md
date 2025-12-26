# Backend Architecture & Security Strategy Analysis

## Executive Summary

TruckSigns.com is a React-based design tool for creating custom truck bed signs. This document defines the production architecture for a **minimal, secure, cost-predictable backend** deployed on Azure.

**Key Architectural Decisions:**

- **Hosting**: React SPA deployed as a container on Azure Container Apps (consumption tier)
- **Backend**: Minimal stateless API handling authentication, authorization, email proxy, and design persistence
- **Database**: Azure SQL Database (serverless) as the single system of record
- **Authentication**: JWT-based, password authentication with bcrypt hashing
- **Design Storage**: Server-side persistence in Azure SQL, enabling multi-device access

**Why This Architecture:**

The requirement for users to access designs from multiple computers eliminates browser-only storage as an option. Azure SQL was chosen over Cosmos DB for cost predictability, operational familiarity, and transactional guarantees. A minimal backend philosophy ensures low operational burden while meeting all functional requirements.

**Estimated Monthly Cost:** $5-15 for small usage, scaling predictably with growth.

---

## 1. Design Data Analysis

### 1.1 Design Data Characteristics

A design in TruckSigns.com consists of:

| Component | Description | Typical Size |
|-----------|-------------|--------------|
| Fabric.js JSON | Canvas state (objects, positions, styles) | 5-50 KB |
| Metadata | Name, size, timestamps, user reference | < 1 KB |
| Preview Image | PNG data URL (base64 encoded) | 50-200 KB |

**Total per design:** 60-250 KB typical, up to 500 KB for complex designs with embedded images.

### 1.2 Usage Pattern Estimates

| Metric | Conservative | Moderate | Growth |
|--------|--------------|----------|--------|
| Users | 10-50 | 100-500 | 1,000-5,000 |
| Designs per user | 3-5 | 5-10 | 5-15 |
| Total designs | 50-250 | 500-5,000 | 5,000-75,000 |
| Storage (designs only) | 15-60 MB | 150 MB - 1.2 GB | 1.5-18 GB |

### 1.3 Access Patterns

- **Read frequency**: Low (user loads design when editing)
- **Write frequency**: Low-moderate (manual save, potential autosave every 30-60 seconds while editing)
- **Update pattern**: Full overwrite (no delta/versioning required initially)
- **Concurrency**: Single user per design (no collaboration)

### 1.4 Data Classification

| Data Type | Classification | Storage Location |
|-----------|----------------|------------------|
| Design JSON (canvasData) | User content, large payload | Azure SQL (NVARCHAR(MAX)) |
| Preview image | Derived artifact, large binary | Azure SQL initially, Blob candidate later |
| Design metadata | Structured, small | Azure SQL (normalized columns) |
| User credentials | Sensitive | Azure SQL (password hashed) |
| User profile | Business data | Azure SQL |

---

## 2. Storage Model Evaluation

### 2.1 Option A: All Data in Azure SQL (Recommended)

**Schema:**

```sql
-- Users table
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Name NVARCHAR(255) NOT NULL,
    Phone NVARCHAR(50),
    CompanyName NVARCHAR(255),
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE()
);

-- Designs table
CREATE TABLE Designs (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(Id) ON DELETE CASCADE,
    Name NVARCHAR(255) NOT NULL,
    SignSize NVARCHAR(50) NOT NULL,
    CanvasData NVARCHAR(MAX) NOT NULL,  -- Fabric.js JSON
    PreviewImage NVARCHAR(MAX),          -- Base64 PNG
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
    INDEX IX_Designs_UserId (UserId)
);
```

**Pros:**

- Single data store, simple operations
- Transactional consistency (user delete cascades to designs)
- No additional Azure services
- Familiar SQL tooling for backup/restore

**Cons:**

- Large NVARCHAR(MAX) columns can impact query performance
- Preview images inflate row size significantly
- Database backup size grows with binary data

**Verdict:** Acceptable for initial deployment. Preview images are the largest concern but manageable at expected scale.

### 2.2 Option B: Hybrid (SQL + Blob Storage)

**Schema:**

```sql
CREATE TABLE Designs (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(Id) ON DELETE CASCADE,
    Name NVARCHAR(255) NOT NULL,
    SignSize NVARCHAR(50) NOT NULL,
    CanvasData NVARCHAR(MAX) NOT NULL,
    PreviewBlobUrl NVARCHAR(500),  -- URL to Blob Storage
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE()
);
```

**Pros:**

- Database stays lean (metadata + JSON only)
- Blob Storage optimized for binary data
- Better cost efficiency at scale (Blob is cheaper per GB)

**Cons:**

- Two services to manage
- Orphaned blob cleanup required on design delete
- Additional complexity for backup/restore
- Slightly higher latency (two round-trips)

**Verdict:** Not justified initially. Revisit if preview images become a measurable cost or performance issue.

### 2.3 Storage Recommendation

**Start with Option A (all-in-SQL).** The hybrid model adds operational complexity without clear benefit at the expected scale. Migration to hybrid is straightforward if needed later.

**Trigger to revisit:** Database size exceeds 5 GB, or preview image loading becomes a measurable performance bottleneck.

---

## 3. Cost Analysis

### 3.1 Azure SQL Database (Serverless)

Azure SQL Serverless charges for:

- **Compute**: Per vCore-second when active (auto-pauses after inactivity)
- **Storage**: Per GB-month

**Pricing (East US 2, General Purpose Serverless, late 2024):**

- Compute: ~$0.000145 per vCore-second
- Storage: ~$0.115 per GB-month
- Minimum: 0.5 vCores, auto-pause after 1 hour idle

| Usage Tier | Active Hours/Month | Storage | Estimated Monthly Cost |
|------------|-------------------|---------|------------------------|
| Small (owner-only) | 10-20 hrs | 1 GB | $3-8 |
| Moderate (50-100 users) | 50-100 hrs | 2-5 GB | $10-25 |
| Growth (500+ users) | 200+ hrs | 10-20 GB | $40-80 |

**Key insight:** Auto-pause is critical for cost control. A site with sporadic usage will cost far less than one with constant activity.

### 3.2 Azure Container Apps (Consumption)

- **Requests**: First 2M requests/month free, then ~$0.40 per million
- **Compute**: ~$0.000024 per vCPU-second, ~$0.000003 per GiB-second
- **Minimum**: Scale to zero when idle

| Usage Tier | Requests/Month | Estimated Monthly Cost |
|------------|----------------|------------------------|
| Small | < 100K | $0-2 |
| Moderate | 100K-500K | $2-5 |
| Growth | 500K-2M | $5-15 |

### 3.3 Total Cost Summary

| Scenario | SQL | Container Apps | Total |
|----------|-----|----------------|-------|
| Owner-only / Demo | $3-8 | $0-2 | **$3-10** |
| Small Production (50 users) | $10-15 | $2-5 | **$12-20** |
| Moderate (200 users) | $20-35 | $5-10 | **$25-45** |
| Growth (1000 users) | $50-80 | $10-20 | **$60-100** |

### 3.4 Cost Guardrails

1. **Set Azure SQL max vCores to 2** (prevents runaway compute costs)
2. **Enable auto-pause** (1 hour idle threshold)
3. **Set storage alerts** at 80% of provisioned tier
4. **Monitor Container Apps scaling** (set max replicas to 3 initially)
5. **Review monthly Azure Cost Management reports**

---

## 4. Recommended Architecture

### 4.1 Architecture Diagram

```text
┌─────────────────────────────────────────────────────────────────┐
│                        Azure Container Apps                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    React SPA Container                   │    │
│  │                   (nginx serving dist/)                  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    API Container (Node.js)               │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────────┐   │    │
│  │  │  Auth   │ │ Designs │ │  Email  │ │    Health    │   │    │
│  │  │  API    │ │   API   │ │  Proxy  │ │    Check     │   │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └──────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │   Azure SQL Database    │
                 │      (Serverless)       │
                 │  ┌─────────┐ ┌────────┐ │
                 │  │  Users  │ │Designs │ │
                 │  └─────────┘ └────────┘ │
                 └─────────────────────────┘
```

### 4.2 Components

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | React SPA in nginx container | User interface |
| API | Node.js (Express/Fastify) | Auth, designs, email |
| Database | Azure SQL Serverless | User and design persistence |
| Email | SendGrid or Azure Communication Services | Inquiry delivery |
| Secrets | Azure Key Vault | Connection strings, JWT secret, email API key |

### 4.3 API Endpoints

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/health` | GET | None | Health check |
| `/api/auth/signup` | POST | None | Create account |
| `/api/auth/login` | POST | None | Authenticate, return JWT |
| `/api/auth/refresh` | POST | JWT | Refresh access token |
| `/api/designs` | GET | JWT | List user's designs |
| `/api/designs` | POST | JWT | Create new design |
| `/api/designs/:id` | GET | JWT | Get single design |
| `/api/designs/:id` | PUT | JWT | Update design |
| `/api/designs/:id` | DELETE | JWT | Delete design |
| `/api/email/inquiry` | POST | JWT | Send inquiry email |

### 4.4 Authentication Flow

1. User signs up with email/password
2. Password hashed with bcrypt (cost factor 12)
3. User record created in SQL
4. Login returns JWT access token (15 min expiry) + refresh token (7 day expiry)
5. Access token stored in memory (not localStorage)
6. Refresh token in httpOnly cookie
7. All `/api/designs/*` endpoints require valid JWT
8. JWT contains userId claim for row-level authorization

### 4.5 Design Persistence Flow

**Save Design:**

1. Client serializes Fabric.js canvas to JSON
2. Client generates PNG preview (data URL)
3. POST/PUT to `/api/designs` with JSON payload
4. API validates JWT, extracts userId
5. API inserts/updates row in Designs table with userId constraint
6. Returns saved design with server-generated timestamps

**Load Design:**

1. GET `/api/designs/:id`
2. API validates JWT, extracts userId
3. API queries `SELECT * FROM Designs WHERE Id = @id AND UserId = @userId`
4. Returns design only if user owns it (row-level security)
5. Client loads canvasData into Fabric.js

---

## 5. Threat Model and Risk Assessment

### 5.1 Data at Risk

| Data | Sensitivity | Breach Impact | Mitigation |
|------|-------------|---------------|------------|
| Passwords | High | Account takeover | bcrypt hashing, never stored plain |
| Email addresses | Medium | Spam, phishing | Encrypted at rest (Azure default) |
| Design data | Medium | IP theft, business loss | Row-level authorization, encrypted at rest |
| JWT secrets | Critical | Full system compromise | Azure Key Vault, rotation policy |

### 5.2 Threat Vectors

| Threat | Likelihood | Impact | Mitigation |
|--------|------------|--------|------------|
| SQL injection | Low | Critical | Parameterized queries, ORM |
| JWT theft (XSS) | Medium | High | httpOnly refresh tokens, short access token expiry |
| Unauthorized design access | Low | Medium | Row-level auth on every query |
| Brute force login | Medium | Medium | Rate limiting (5 attempts/15 min) |
| Data breach (SQL) | Low | High | Azure encryption at rest, TLS in transit |

### 5.3 Security Responsibilities (Server-Side Designs)

With server-side design storage, these responsibilities are mandatory:

| Responsibility | Requirement |
|----------------|-------------|
| Authorization | Every design query must filter by authenticated userId |
| Backup | Azure SQL automated backups (7-day retention minimum) |
| Deletion | User delete cascades to designs (ON DELETE CASCADE) |
| Breach notification | Monitor for unauthorized access patterns |
| Data portability | Provide design export capability |

---

## 6. Security Best Practices

### 6.1 Authentication

| Practice | Implementation |
|----------|----------------|
| Password hashing | bcrypt, cost factor 12 |
| Token expiry | Access: 15 min, Refresh: 7 days |
| Token storage | Access in memory, Refresh in httpOnly cookie |
| Rate limiting | 5 login attempts per IP per 15 minutes |
| Unique email | Database UNIQUE constraint |

### 6.2 Authorization

| Practice | Implementation |
|----------|----------------|
| Row-level security | All design queries include `WHERE UserId = @userId` |
| JWT validation | Verify signature, expiry, issuer on every request |
| No design enumeration | Design IDs are integers but queries always filter by user |

### 6.3 Data Protection

| Practice | Implementation |
|----------|----------------|
| Encryption at rest | Azure SQL TDE (enabled by default) |
| Encryption in transit | TLS 1.2+ enforced |
| Connection security | Azure SQL firewall, private endpoint if budget allows |
| Secrets management | Azure Key Vault for all secrets |

### 6.4 API Security

| Practice | Implementation |
|----------|----------------|
| Input validation | Validate all inputs server-side |
| CORS | Restrict to known origins |
| Rate limiting | Global rate limit on all endpoints |
| Error handling | Never expose stack traces or SQL errors to client |

---

## 7. Performance and UX Considerations

### 7.1 Load/Save Latency

| Operation | Expected Latency | Acceptable? |
|-----------|------------------|-------------|
| Load design (SQL query) | 50-200 ms | Yes |
| Save design (SQL insert/update) | 50-200 ms | Yes |
| List designs (SQL query) | 50-150 ms | Yes |

Azure SQL Serverless has a "cold start" delay of 1-2 seconds if auto-paused. This affects the first request after idle period but is acceptable for this use case.

### 7.2 Autosave Strategy

**Recommendation:** Implement autosave with debouncing.

- Save trigger: 30 seconds after last change, or on explicit save
- Client tracks "dirty" state
- Show "Saving..." indicator during API call
- Show "Saved" confirmation with timestamp

**Why not aggressive autosave:** Design changes are typically in bursts. Saving every keystroke creates unnecessary API calls.

### 7.3 Client-Side Caching

| Strategy | Recommendation |
|----------|----------------|
| Design list | Cache in memory, refresh on mount and after save/delete |
| Current design | Keep in React state, write-through on save |
| Offline support | Not required initially (designs are server-authoritative) |

---

## 8. Operational Considerations

### 8.1 Schema Migration

| Approach | Tool |
|----------|------|
| Initial deployment | SQL scripts in source control |
| Migrations | Knex.js migrations or Prisma Migrate |
| Rollback | Keep backward-compatible migrations |

### 8.2 Backup and Restore

| Aspect | Configuration |
|--------|---------------|
| Automated backups | Azure SQL default (7-35 day retention) |
| Point-in-time restore | Available within retention period |
| Long-term backup | Configure if compliance requires |
| Restore testing | Test quarterly |

### 8.3 Monitoring

| What | How |
|------|-----|
| API errors | Application Insights |
| SQL performance | Azure SQL Query Performance Insight |
| Cost | Azure Cost Management alerts |
| Uptime | Azure Monitor availability tests |

### 8.4 Data Growth Management

| Trigger | Action |
|---------|--------|
| Database > 5 GB | Review preview image strategy |
| Designs per user > 50 | Consider archival/cleanup policy |
| Cost > $50/month | Audit usage patterns, consider provisioned tier |

---

## 9. Decision Matrix

| Criterion | Local-Only | Azure SQL | Cosmos DB |
|-----------|------------|-----------|-----------|
| Multi-device access | No | **Yes** | Yes |
| Cost predictability | N/A | **High** | Medium |
| Operational familiarity | N/A | **High** | Low |
| Transactional guarantees | N/A | **Strong** | Eventual |
| Schema flexibility | N/A | Moderate | High |
| Scale ceiling | N/A | High (TB) | Very High |
| Cold start latency | N/A | 1-2s | None |

**Verdict:** Azure SQL is the right choice for this application's requirements and constraints.

---

## 10. Implementation Plan

### 10.1 Frontend Changes

| File | Change |
|------|--------|
| `src/utils/storage.js` | Remove localStorage functions, add API client |
| `src/context/AuthContext.jsx` | Replace localStorage with API calls |
| `src/context/DesignContext.jsx` | Replace localStorage with API calls |
| `src/utils/api.js` | **New:** API client with JWT handling |

### 10.2 Backend (New)

| File | Purpose |
|------|---------|
| `api/server.js` | Express/Fastify entry point |
| `api/routes/auth.js` | Authentication endpoints |
| `api/routes/designs.js` | Design CRUD endpoints |
| `api/routes/email.js` | Email proxy endpoint |
| `api/middleware/auth.js` | JWT validation middleware |
| `api/db/schema.sql` | Database schema |
| `api/db/connection.js` | SQL connection pool |

### 10.3 Infrastructure

| File | Purpose |
|------|---------|
| `Dockerfile.api` | API container definition |
| `docker-compose.yml` | Local development setup |
| `infra/main.bicep` | Azure infrastructure as code |

---

## 11. Final Recommendation

### 11.1 Immediate Actions

1. **Provision Azure SQL Database (Serverless)** with schema from Section 2.1
2. **Build minimal API** with auth and design endpoints
3. **Update frontend** to use API instead of localStorage
4. **Deploy API container** to Azure Container Apps
5. **Configure Azure Key Vault** for secrets
6. **Set cost alerts** at $25 and $50/month

### 11.2 What NOT to Do

- Do not use localStorage for design persistence (multi-device required)
- Do not store passwords in plain text
- Do not skip row-level authorization on design queries
- Do not provision fixed-tier SQL (use serverless)
- Do not add Blob Storage unless data proves it necessary
- Do not implement design versioning until requested
- Do not add collaboration features without explicit requirement

---

## 12. Future Evolution Triggers

| Trigger | Action |
|---------|--------|
| Multi-device sync conflicts | Add last-modified timestamp, conflict resolution UI |
| Design versioning requested | Add DesignVersions table, keep N versions |
| Large file uploads | Move preview images to Blob Storage |
| Cost > $100/month sustained | Evaluate provisioned SQL tier |
| Real-time collaboration | Evaluate SignalR or alternative |
| Payment processing | Add Stripe integration, order history tables |

---

## Summary

This architecture delivers:

- **Multi-device design access** via server-side persistence
- **Predictable costs** via Azure SQL Serverless and Container Apps consumption
- **Security** via proper authentication, authorization, and encryption
- **Simplicity** via minimal backend with clear responsibilities
- **Evolvability** via clear triggers for future enhancements

The design is intentionally minimal. Every component exists because a requirement demands it. The architecture can grow, but it starts calm.

---

*Document version: 2.0*
*Last updated: December 2024*
*Status: Ready for implementation*
