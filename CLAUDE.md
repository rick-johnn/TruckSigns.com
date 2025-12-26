# CLAUDE.md

This file provides guidance for Claude Code when working on this codebase.

## Project Overview

TruckSigns.com is a React + Vite application for designing and ordering custom truck bed signs. The application uses:
- **React 18** with React Router for navigation
- **Tailwind CSS** with a custom Americana color theme (navy, usa-red, porcelain)
- **Fabric.js v6** for the canvas-based design tool
- **localStorage** for persisting user designs and authentication state

## Key Architecture

### Design Tool (`src/pages/DesignTool.jsx`)
The design tool uses Fabric.js v6 for canvas manipulation. Key implementation details:
- **Ref-based state tracking**: Uses `loadedDesignIdRef`, `canvasLoadedForDesignRef`, and `currentDesignRef` to prevent infinite re-render loops and stale closures
- **Fabric.js v6 async API**: `loadFromJSON()` returns a Promise (not callback-based like older versions)
- **Canvas initialization**: Canvas is initialized only once via `initializedRef` pattern in `Canvas.jsx`
- After loading JSON, objects need `setCoords()` and `dirty = true` to render properly

### Context Providers
- `AuthContext` - User authentication (localStorage-based)
- `DesignContext` - Design state management (current design, saved designs list)

### Color Theme (tailwind.config.js)
```
navy: #1e3a5f (primary dark)
usa-red: #b91c1c (accent)
porcelain: #f5f5f4 (light backgrounds)
```

## Common Patterns

### Preventing useEffect Loops
When dealing with callbacks in useEffect dependencies, use ref patterns:
```jsx
const callbacksRef = useRef({ onCallback });
useEffect(() => {
  callbacksRef.current = { onCallback };
}, [onCallback]);

// Then use callbacksRef.current.onCallback() in initialization effects
```

### Fabric.js v6 Design Loading
```jsx
await canvas.loadFromJSON(designData);
canvas.getObjects().forEach(obj => {
  obj.setCoords();
  obj.dirty = true;
});
canvas.requestRenderAll();
```

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run lint` - ESLint check

## Planned Architecture (Future Work)

The current implementation uses localStorage for authentication and design persistence. This will be replaced with a server-side backend. See `docs/backend-architecture-security-analysis.md` for the full architectural plan.

**Key changes planned:**

- **Hosting**: Azure Container Apps (consumption tier)
- **Database**: Azure SQL Serverless (replaces localStorage)
- **Authentication**: JWT-based with bcrypt password hashing (replaces plain-text localStorage)
- **Design Storage**: Server-side persistence enabling multi-device access

**Files that will change:**

- `src/utils/storage.js` - Replace localStorage with API calls
- `src/context/AuthContext.jsx` - Use JWT authentication
- `src/context/DesignContext.jsx` - Fetch/save designs via API

**New backend files (to be created):**

- `api/` - Node.js API with auth, designs, and email endpoints
- Database schema in `docs/backend-architecture-security-analysis.md` Section 2.1

## Docker

### Production Build

```bash
# Build and start production container (serves on port 3000)
docker compose up -d truck-signs

# View logs
docker compose logs -f truck-signs

# Stop container
docker compose down
```

### Development Mode

```bash
# Start development container with hot reload (serves on port 5173)
docker compose --profile dev up truck-signs-dev
```

### Docker Architecture

- **Dockerfile**: Multi-stage build - Node 20 Alpine for building, Nginx Alpine for serving
- **nginx.conf**: Configured for SPA routing (all routes serve index.html), gzip compression, and static asset caching
- **.dockerignore**: Excludes node_modules, dist, and environment files from build context
