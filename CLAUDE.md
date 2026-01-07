# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

1Long Web Balance Viewer - React web app for viewing 1Long savings account balances. Authenticates with existing 1Long mobile app accounts, displays Total Balance + Total Interest (read-only).

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **UI**: shadcn/ui + Tailwind CSS v4 (oklch yellow/amber theme)
- **API**: Axios + TanStack Query
- **Routing**: React Router v7
- **State**: React Context (auth) + TanStack Query (server state)
- **Storage**: localStorage (JWT tokens)

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build (tsc + vite)
npm run preview  # Preview production build
npm run lint     # ESLint
```

## Architecture

```
src/
├── api/           # Axios client + API functions
│   ├── client.ts  # Axios instance with token refresh interceptor
│   ├── auth.ts    # Login/logout
│   └── saving.ts  # Account/interest APIs
├── components/    # React components
│   ├── ui/        # shadcn/ui components
│   └── ...        # App components
├── context/       # React contexts
│   └── auth-context.tsx  # Auth state provider
├── hooks/         # Custom hooks
│   ├── use-balance.ts    # Balance data + calculation
│   └── use-theme.ts      # Dark mode toggle
├── pages/         # Route pages
│   ├── login.tsx
│   └── dashboard.tsx
├── types/         # TypeScript types
└── utils/         # Utilities
    ├── jwt.ts           # Token expiry check
    ├── token-storage.ts # localStorage wrapper
    └── money.ts         # VND formatting
```

## Key Implementation Details

### Token Refresh Flow
- Request interceptor checks token expiry before each request
- Auto-refreshes via `/authentication/refresh` if expired
- Mutex prevents concurrent refresh calls
- 401 responses redirect to login

### Balance Calculation
```typescript
// Sum savingBalance + holdingBalance + committedAmount
// Only for accounts with status 'funded' OR ('mature' with balance > 0)
```

### API Base URL
Set via `VITE_API_BASE_URL` env var (default: `https://api.1long.com/v1`)

## API Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/authentication/login` | No | Login |
| POST | `/authentication/refresh` | No | Refresh token |
| GET | `/saving/account` | Yes | Get accounts |
| GET | `/saving/transaction` | Yes | Get total interest |
