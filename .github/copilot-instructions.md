# Express-0912(ver01) Project Instructions

## Architecture Overview
This is a full-stack application with a React frontend (`client/`) and Express.js backend (`server/`). Both use ES modules (`"type": "module"`) and modern JavaScript features.

### Client-Server Communication
- Frontend runs on Vite dev server with proxy config to backend API
- All API calls use `/api` endpoint - Vite proxies to `http://localhost:5000`
- Production: Express serves built React app from `client/dist`

### Environment-Aware Deployment
The server (`server/server.mjs`) switches behavior based on `NODE_ENV`:
- **Development**: CORS enabled, API-only mode
- **Production**: Serves static React build + API routes

```javascript
if (NODE_ENV === 'development') {
    app.use(cors());
} else {
    const staticPath = path.join(__dirname, '..', 'client', 'dist');
    app.use(express.static(staticPath));
}
```

## Key File Structure
- `server/server.mjs` - Main Express server with ES modules
- `client/src/App.jsx` - React app with API integration examples
- `client/vite.config.js` - Dev proxy configuration for `/api`
- `client/eslint.config.js` - Modern flat ESLint config

## Development Workflow

### Starting the application:
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

### API Pattern
All API routes are prefixed with `/api`. Current endpoints:
- `GET /api` - Returns greeting message
- `POST /api` - Echoes back request body text

### Frontend API Integration
Use relative `/api` paths in fetch calls - Vite handles proxy in dev:
```javascript
const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message })
})
```

## Project-Specific Conventions

### Japanese Comments
Server code includes Japanese comments for internationalization context.

### ESLint Rules
Custom rule allows uppercase constants: `'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]`

### Modern Dependencies
- React 19.1.1 with latest hooks
- Express 5.1.0 with ES modules
- Vite 7.x for build tooling

## Build & Deploy
- Client build: `npm run build` (outputs to `client/dist`)
- Production server expects built React app in `../client/dist`
- Single process serves both static files and API in production
