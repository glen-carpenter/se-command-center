# SE Command Center

A full-stack Space Engineers dedicated server dashboard. Connects to a Torch server API and displays live server data — players, inventory, grids, factions, and performance metrics — across a dark-themed React dashboard.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite, Tailwind CSS, Recharts, React Query, React Router |
| Backend | Node.js + Express, node-cron, PostgreSQL |
| Integration | Torch API (Space Engineers dedicated server wrapper) |
| Deploy | Vercel (frontend) · Railway (backend) |

## Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database

### 1. Clone and install

```bash
git clone <repo-url>
cd se-command-center

# Install client deps
cd client && npm install && cd ..

# Install server deps
cd server && npm install && cd ..
```

### 2. Configure environment

```bash
cp .env.example server/.env
# Edit server/.env with your values
```

### 3. Apply database schema

```bash
psql $DATABASE_URL -f server/db/schema.sql
```

### 4. Run locally

```bash
# Terminal 1 — backend (port 3001)
cd server && npm run dev

# Terminal 2 — frontend (port 5173)
cd client && npm run dev
```

Open http://localhost:5173

## Environment Variables

| Variable | Description |
|---|---|
| `TORCH_API_URL` | Base URL of your Torch server API |
| `TORCH_API_KEY` | Torch API key (if required) |
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | Backend port (default: 3001) |
| `SERVER_NAME` | Display name shown in the nav bar |
| `CLIENT_URL` | Frontend URL for CORS (Vercel URL in production) |

## Deployment

### Frontend → Vercel

1. Import the repo in Vercel
2. Set **Root Directory** to `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-railway-backend.railway.app`

### Backend → Railway

1. Create a new Railway project, connect the repo
2. Set **Root Directory** to `server`
3. Add all environment variables from `.env.example`
4. Railway auto-detects `npm start` from `package.json`
5. Provision a PostgreSQL plugin and copy the `DATABASE_URL` it provides
6. Run the schema: `psql $DATABASE_URL -f server/db/schema.sql`
