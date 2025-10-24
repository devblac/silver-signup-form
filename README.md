# silver-signup-form

Simple signup form with validation, built with React + Go.

## Live Demo

https://silver-signup-form.netlify.app/

## 🎥 Demo

<video src="https://github.com/user-attachments/assets/9efe09cb-fa76-45a0-84e5-e61dfabae899" controls width="640"></video>

[![Watch it on Youtube](https://img.youtube.com/vi/nKW8i2Q09YY/hqdefault.jpg)](https://youtube.com/shorts/nKW8i2Q09YY)

## Features

- Email & password validation using zod
- Password strength indicator
- Real-time validation errors (constrain requirements)
- Dark/light theme toggle
- Keyboard accessible (a11y compliant)
- Connected to Go backend API
- Pure CSS, no UI libraries

## Tech Stack

**Frontend**: React 19, TypeScript, Vite  
**Backend**: Go 1.22,
**Validation**: Zod (frontend), custom regex (backend)
**Deploy**: Netlify (web) + Koyeb (server)

## Getting Started

### Frontend
```bash
cd web
npm install
npm run dev
```

### Backend
```bash
cd server
go run main.go
```

The frontend uses a mock API by default (3s delay). To connect to the real Go server:
1. Start the server on port 8080
2. Create `web/.env.local` with: `VITE_API_BASE_URL=local`
3. Restart the frontend

### Tests
```bash
# Frontend
cd web && npm test

# Backend
cd server && go test ./...
```


## API
- `POST /api/signup` - Mock Account Creation (validates email format & password strength)
- `GET /healthz` - Health check

## Deploy

Frontend deploys automatically to Netlify via `netlify.toml`.  
Backend includes Dockerfile for Koyeb deployment.
