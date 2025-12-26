# Backend Architecture & Security Strategy Analysis

## Executive Summary

This document provides a comprehensive architectural analysis for TruckSigns.com, evaluating whether a backend is necessary and recommending the appropriate security posture for a public-facing design tool on Azure.

**Bottom Line Up Front:** The current frontend-only architecture has critical security flaws that make it unsuitable for production with real user accounts. However, a full backend is not strictly necessary. A **hybrid approach** using Azure serverless functions for authentication and email, combined with client-side design storage, provides the optimal balance of security, simplicity, and cost.

### Confirmed Requirements

- **Authentication**: Password-based (email + password with server-side hashing)
- **Design Storage**: Browser-only (localStorage) - no cloud sync required
- **Budget**: Minimize cost ($0-10/month target)

---

## 1. Current State Assessment

### What Exists Today

| Component | Implementation | Location |
|-----------|----------------|----------|
| User Authentication | localStorage with plain-text passwords | `src/utils/storage.js` |
| User Data | Email, password, name, phone, company | `trucksigns_users` localStorage key |
| Design Storage | Fabric.js JSON + PNG preview | `trucksigns_designs` localStorage key |
| Email Sending | EmailJS (client-side) | `src/utils/emailService.js` |
| Session Management | localStorage token (no expiry) | `trucksigns_current_user` key |

### Critical Security Issues (Current State)

1. **Plain-text password storage** (`storage.js:35`) - Passwords compared directly without hashing
2. **Client-side authentication** - Any user can inspect/modify localStorage to impersonate others
3. **No access control enforcement** - Design ownership is email-based but trivially bypassable
4. **Exposed EmailJS credentials** - Public key visible in client bundle
5. **No rate limiting** - Unlimited login attempts, email sends
6. **XSS vulnerability** - localStorage accessible to any script on the page

---

## 2. Threat Model and Risk Assessment

### Data at Risk

| Data Type | Sensitivity | Current Exposure | Breach Impact |
|-----------|-------------|------------------|---------------|
| Email addresses | Low-Medium | High (localStorage, client-visible) | Spam, phishing lists |
| Passwords | High | Critical (plain text in localStorage) | Credential stuffing, account takeover |
| Phone numbers | Medium | High (localStorage) | Spam calls, social engineering |
| Company names | Low | Medium | Competitive intelligence |
| Design artifacts | Low-Medium | Medium (localStorage) | IP theft, design copying |

### Threat Vectors

#### Without Backend (Current)

| Threat | Likelihood | Impact | Risk |
|--------|------------|--------|------|
| Password theft via XSS | High | High | **Critical** |
| Account impersonation | High | Medium | **High** |
| Email spam via EmailJS abuse | Medium | Medium | **Medium** |
| Design theft by other users | Low | Low | Low |
| localStorage data loss | Medium | Medium | Medium |

#### With Backend API

| Threat | Likelihood | Impact | Risk |
|--------|------------|--------|------|
| API credential theft | Low | High | Medium |
| SQL injection (if applicable) | Low | High | Medium |
| Authentication bypass | Low | High | Medium |
| Rate limit evasion | Low | Low | Low |
| DDoS | Low | Medium | Low |

### Risk Assessment Conclusion

The current architecture has **unacceptable risk** for production use with real user accounts. The plain-text password storage alone is a liability concern. A backend is not required to mitigate all risks, but **some server-side component is necessary** for:

1. Password hashing and authentication
2. Email sending (to hide API keys)
3. Rate limiting

---

## 3. Data Classification and Minimization

### Classification

| Data | Classification | Retention Requirement | Storage Recommendation |
|------|----------------|----------------------|------------------------|
| Email | Business Essential | Duration of account | Server-side (hashed for auth) |
| Password | Sensitive Credential | Duration of account | Server-side (bcrypt hashed) |
| Name/Phone/Company | Business Optional | Duration of account | Server-side or client-side |
| Design JSON | User Content | User-controlled | Client-side (localStorage) acceptable |
| Design Preview PNG | User Content | User-controlled | Client-side acceptable |

### Minimization Recommendations

1. **Passwords**: MUST be hashed server-side. Never store or transmit in plain text.
2. **Email**: Required for authentication. Consider magic-link auth to eliminate passwords entirely.
3. **Phone/Company**: Optional for business purposes. Could be collected only at inquiry time, not at signup.
4. **Designs**: Can remain client-side. Consider optional cloud backup as a feature.

### What Should Never Be Stored Server-Side

- Raw design canvas data (large, user-owned, no server-side need)
- Preview images (potentially large, user-owned)
- Browser session tokens in server database (use stateless JWTs or secure cookies)

---

## 4. Frontend-Only Viability Assessment

### Can Email Be Handled Client-Side Only?

**Partially, with caveats.**

| Approach | Security | Abuse Prevention | Recommendation |
|----------|----------|------------------|----------------|
| EmailJS (current) | Poor - API key exposed | None - unlimited sends | **Not recommended for production** |
| Formspree/similar | Better - key hidden | Basic rate limits | Acceptable for low volume |
| Azure Function proxy | Good - key server-side | Full control | **Recommended** |

**Verdict**: Client-side email via EmailJS is acceptable for demos but not production. A minimal serverless function solves this.

### Can Authentication Be Handled Client-Side Only?

**No.** There is no secure way to handle password-based authentication purely client-side. Options:

| Approach | Viability | Notes |
|----------|-----------|-------|
| localStorage passwords | **Unacceptable** | Current approach - critical flaw |
| OAuth only (Google/Microsoft) | Viable | Eliminates password handling entirely |
| Magic link auth | Viable | Requires server to send links |
| Passwordless (WebAuthn) | Viable | Requires server for challenge/response |

**Verdict**: Some server component is required unless using pure third-party OAuth.

### Can Design Persistence Be Handled Client-Side Only?

**Yes, with limitations.**

| Concern | Assessment |
|---------|------------|
| Data durability | Low - browser clears localStorage, user switches devices |
| Cross-device access | None - designs locked to one browser |
| Storage limits | ~5-10MB per origin - sufficient for many designs |
| Security | Acceptable - designs are user-owned content |

**Verdict**: Client-side design storage is acceptable. Optional server-side backup is a feature enhancement, not a security requirement.

### Hidden Failure Modes

1. **localStorage quota exhaustion** - Large designs with embedded images could hit limits
2. **Incognito mode** - localStorage cleared on browser close
3. **Browser migration** - No way to transfer designs
4. **Shared computers** - Designs visible to all users of the browser

### Frontend-Only Conclusion

**Frontend-only is not acceptable for the current feature set** because:

1. User accounts require secure authentication
2. Email sending requires hidden API credentials
3. Rate limiting requires server-side enforcement

**Frontend-only would be acceptable if**:

1. No user accounts (anonymous usage only)
2. No email functionality, OR using a form service with built-in abuse prevention
3. Designs treated as ephemeral (no persistence expectation)

---

## 5. Backend Justification Criteria

A backend (or serverless functions) is **required** when:

| Criterion | Required? | Justification |
|-----------|-----------|---------------|
| Password-based authentication | **Yes** | Current feature requires secure credential handling |
| Email sending with abuse prevention | **Yes** | Current feature requires hidden API keys and rate limiting |
| Server-side validation | Partial | Not strictly required for design data |
| Auditability | No | Not a current requirement |
| Access control enforcement | No | Single-user design access is sufficient |
| Future extensibility (payments, etc.) | Future | Not a current requirement |

### Minimum Viable Server Component

The **minimum required server functionality** is:

1. **Authentication endpoint** - Signup, login, password hashing
2. **Email proxy endpoint** - Forward emails with server-side API keys
3. **Rate limiting** - Prevent abuse of both

This is achievable with **2-3 Azure Functions** rather than a full backend service.

---

## 6. Recommended Architecture

### Option A: Minimal Serverless (Recommended)

```text
┌─────────────────┐         ┌──────────────────────────┐
│  React SPA      │────────▶│  Azure Static Web Apps   │
│  (Vite build)   │         │  + Integrated Functions  │
└─────────────────┘         └──────────────────────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
            ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
            │  /api/auth  │   │ /api/email  │   │ Azure       │
            │  (signup,   │   │ (send via   │   │ CosmosDB    │
            │   login)    │   │  SendGrid)  │   │ (users)     │
            └─────────────┘   └─────────────┘   └─────────────┘
```

**Components:**

- **Azure Static Web Apps** - Hosts React SPA + serverless API functions
- **3 API Functions**:
  - `POST /api/auth/signup` - Create user with bcrypt password
  - `POST /api/auth/login` - Validate credentials, return JWT
  - `POST /api/email/send` - Proxy email with rate limiting
- **Azure Cosmos DB** (serverless tier) - Store users only (~$0.25/100K requests)
- **SendGrid** or **Azure Communication Services** - Email delivery

**What Stays Client-Side:**

- Design storage (localStorage)
- Design editing (Fabric.js)
- Session management (JWT in memory/httpOnly cookie)

**Estimated Monthly Cost:**

- Static Web Apps Free tier: $0
- Functions (included in Static Web Apps): $0
- Cosmos DB serverless: $0-5 (low usage)
- SendGrid free tier: $0 (100 emails/day)
- **Total: $0-5/month**

### Option B: Full Container Backend (Not Recommended for Current Scope)

Would involve:

- Azure Container Apps or App Service
- Full API (Express/Fastify)
- Session management
- Database for users AND designs
- More complex deployment

**Only justified if:**

- Design cloud sync is required
- Payment processing is added
- Admin dashboard is needed
- Multi-user collaboration on designs

---

## 7. Security Best Practices (Specific Recommendations)

### Authentication

| Measure | Implementation | Why |
|---------|----------------|-----|
| Password hashing | bcrypt with cost factor 12 | Industry standard, GPU-resistant |
| JWT tokens | Short-lived (15min), httpOnly refresh tokens | Limits exposure window |
| Rate limiting | 5 login attempts per IP per 15min | Prevents brute force |
| HTTPS only | Azure Static Web Apps enforces | Prevents credential interception |

### Email Sending

| Measure | Implementation | Why |
|---------|----------------|-----|
| Server-side only | API key in Azure Key Vault | Never expose in client bundle |
| Rate limiting | 3 emails per user per hour | Prevents spam abuse |
| Input sanitization | Validate email format server-side | Prevents injection |
| No reply-to spoofing | Always use verified sender | Prevents phishing |

### Data Protection

| Measure | Implementation | Why |
|---------|----------------|-----|
| Cosmos DB encryption | Enabled by default | Data at rest protection |
| TLS 1.2+ | Azure default | Data in transit protection |
| No PII in logs | Azure App Insights sanitization | Privacy compliance |

### Client-Side

| Measure | Implementation | Why |
|---------|----------------|-----|
| CSP headers | Configured in Static Web Apps | XSS mitigation |
| No sensitive data in localStorage | Only JWT in httpOnly cookie | XSS protection |
| Input validation | Client + server validation | Defense in depth |

---

## 8. Decision Matrix

| Criterion | Frontend-Only | Serverless Functions | Full Backend |
|-----------|---------------|---------------------|--------------|
| Security for auth | Unacceptable | Acceptable | Acceptable |
| Email abuse prevention | None | Full control | Full control |
| Operational complexity | Minimal | Low | Higher |
| Cost | $0 | $0-5/mo | $20-50/mo |
| Development effort | None needed | 2-3 functions | Full API |
| Future extensibility | Limited | Moderate | High |
| Design cloud sync | No | Add later | Built-in |

---

## 9. Final Recommendation

### Immediate Action: Implement Minimal Serverless Architecture

1. **Migrate to Azure Static Web Apps** with integrated Functions API
2. **Implement 3 serverless functions**:
   - Authentication (signup/login with bcrypt)
   - Email proxy (SendGrid with rate limiting)
   - Token refresh (optional, for better UX)
3. **Use Azure Cosmos DB serverless** for user storage only
4. **Keep designs in localStorage** for now
5. **Store secrets in Azure Key Vault**

### Signals to Revisit This Decision

Upgrade to full container backend **only if**:

- Users request cross-device design sync
- Payment processing is added
- Admin/analytics dashboard is needed
- User collaboration features are added
- Scale exceeds Azure Functions limits (~100K requests/month before cost increases)

### What NOT to Do

- Do not deploy current code to production with real users
- Do not store passwords in localStorage
- Do not expose EmailJS keys in client bundle for production
- Do not build a full backend "just in case"
- Do not add OAuth complexity unless password management is truly unacceptable

---

## 10. Implementation Files to Modify

When implementing the serverless approach:

| File | Change |
|------|--------|
| `src/utils/storage.js` | Remove user/password storage functions |
| `src/utils/emailService.js` | Replace EmailJS with API call to `/api/email/send` |
| `src/context/AuthContext.jsx` | Replace localStorage auth with API calls |
| `src/components/auth/SignupForm.jsx` | Call `/api/auth/signup` |
| `src/components/auth/LoginForm.jsx` | Call `/api/auth/login` |
| **New:** `api/auth/signup/index.js` | Azure Function for signup |
| **New:** `api/auth/login/index.js` | Azure Function for login |
| **New:** `api/email/send/index.js` | Azure Function for email |
| **New:** `staticwebapp.config.json` | Azure Static Web Apps configuration |

---

## Appendix A: Alternative - Passwordless Authentication

If eliminating password handling entirely is appealing, consider:

1. **Magic Link Auth**: User enters email, receives link, clicks to authenticate
   - Pros: No passwords to store/hash, simpler security model
   - Cons: Email dependency, slower UX

2. **Social OAuth Only**: Google/Microsoft sign-in only
   - Pros: No password handling, trusted providers
   - Cons: Dependency on third parties, user may not have accounts

3. **WebAuthn/Passkeys**: Browser-native authentication
   - Pros: Most secure, no passwords
   - Cons: Browser support varies, implementation complexity

---

*Document prepared for architectural review. Ready for implementation upon approval.*
