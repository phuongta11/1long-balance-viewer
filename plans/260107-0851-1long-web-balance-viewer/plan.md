---
title: "1Long Web Balance Viewer"
description: "React + Vite + TypeScript web app for viewing 1Long account balances"
status: completed
priority: P1
effort: 6h
issue: null
branch: null
tags: [frontend, auth, api, react, vite]
created: 2026-01-07
---

# 1Long Web Balance Viewer

## Overview

Read-only web app authenticating users with existing 1Long mobile app accounts, displaying Total Balance + Total Interest.

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **UI**: shadcn/ui + Tailwind CSS v4 (oklch yellow/amber theme)
- **API**: Axios + TanStack Query
- **Routing**: React Router v7
- **State**: React Context (auth) + TanStack Query (server state)
- **Storage**: localStorage (tokens)

## Phases

| # | Phase | Status | Effort | Link |
|---|-------|--------|--------|------|
| 1 | Project Setup | Completed | 1h | [phase-01](./phase-01-project-setup.md) |
| 2 | Auth Implementation | Completed | 2h | [phase-02](./phase-02-auth-implementation.md) |
| 3 | Balance Dashboard | Completed | 2h | [phase-03](./phase-03-balance-dashboard.md) |
| 4 | Polish & Testing | Completed | 1h | [phase-04](./phase-04-polish-testing.md) |

## Key Dependencies

- React 18.x
- Vite 6.x
- @tanstack/react-query 5.x
- axios 1.x
- react-router-dom 7.x
- tailwindcss 4.x
- shadcn/ui components

## API Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/authentication/login` | No | Login |
| POST | `/authentication/refresh` | No | Refresh token |
| GET | `/saving/account` | Yes | Get accounts |
| GET | `/saving/transaction?transaction_type=interest_accrual&per_page=1&page=1` | Yes | Get total interest |
