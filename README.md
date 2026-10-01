# DeskPilot

DeskPilot is a personal helpdesk dashboard for triaging incoming support tickets, classifying urgency, and drafting suggested customer replies. The app is designed as a polished internal tool demo and is honest about using local heuristics unless an Anthropic API key is supplied.

## What it does

- Inbound ticket inbox with priority tagging
- AI-style categorisation for billing, product, access, or delivery issues
- Suggested customer replies and SLA hints
- Customer-facing portal with ticket history and status timeline
- Clean dashboard for team triage

## Tech stack

- Next.js 15
- React 19
- TypeScript
- Vitest
- Optional Anthropic API integration

## Run locally

```bash
cd projects/deskpilot
pnpm install
cp .env.example .env.local
pnpm dev
```

Then open http://localhost:3000.

## Tests

```bash
pnpm test
pnpm build
```

## What I'd improve next

- Add real authentication and role-based access for agents vs customers
- Replace the local heuristic model with a database-backed AI routing system
- Add SLA timers, comment threads, and audit logs for each ticket
- Persist ticket state in Postgres with Prisma for production use

## Honest note

This is a polished portfolio project. It does not claim production support operations or live AI customer handling without a real key and a production deployment.
