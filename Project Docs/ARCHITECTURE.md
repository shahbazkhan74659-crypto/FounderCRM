# Architecture

This describes the **actual current implementation** — which, as of this writing (2026-09-13), is nothing: no code has been written yet. This project is in Phase 0 (Planning) — see `PROJECT.md` and `PHASES.md`. This file exists now, ahead of any code, so the planning conversation's implied data model is captured while it's fresh; the **Planned Data Model** section below is a sketch to inform the eventual production build, not a description of anything implemented. Per `CLAUDE.md` rule 9, nothing in this file should ever be read as "already built" until a later update says so explicitly, backed by real code.

## System Overview

No repository, framework, or database has been created yet. `C:\FounderCRM` currently contains only `Project Docs/` (this documentation system). The stack below is **locked** (see `DECISIONS.md`, 2026-09-13) but **not yet implemented** — this is the plan for whenever Phase 1 actually starts, not a description of existing code.

## Locked Stack (not yet implemented)

- **Language**: TypeScript, frontend and backend.
- **Frontend**: React + TypeScript, built with **Vite**, using an islands-style component pattern. Compiled to static assets.
- **Backend**: **Next.js**, used API-routes-only (no Next.js pages/rendering) — it's the Node.js backend framework, not the page-rendering layer. The same Next.js server also serves the frontend's built static files.
- **Single repo, single deploy** — one build step compiles the Vite frontend, then the Next.js server; one Render service serves both `/api/*` and the built frontend.
- **Testing**: Vitest, for both frontend and backend code.
- **Database**: PostgreSQL, local for development. Production/hosted Postgres target not yet chosen.
- **Hosting**: Render, with UptimeRobot pinging it to prevent free-tier idling.
- **Auth**: custom DB-backed sessions (see `DECISIONS.md`) — `users` (with a `role` column) + `sessions`, following `RajuApp`'s pattern. FounderCRM needs real multi-account, role-based auth (Admin creates Staff; per-staff grants), unlike `RajuApp`'s single-account model.

Planned (not yet created) repo shape:

```text
repo/
  server/            <- Next.js app (API routes only, no pages)
    app/api/...
  frontend/           <- Vite + React + TS
    src/
    dist/  ---------->  copied into server/public at build time
```

One `npm run build` builds the frontend then the server; one `npm start` runs the Next.js server, which serves both the API and the built frontend.

## Planned Data Model (sketch, not yet implemented)

Inferred directly from the requirements gathered in `DECISIONS.md` and `PROJECT.md` — not yet confirmed against any schema, since none exists. Treat every entity/field below as a first draft for whichever future phase builds the real backend, subject to revision.

- **Users** — `role` (`admin` | `staff`), credentials. Only Admin can create Staff users (no self-service signup implied by the requirements gathered so far).
- **Founders** — created by any authenticated user (Admin or Staff).
- **Interviews** — belongs to a Founder; has a date, a time, notes (text, not a transcript), and is assigned to a specific Staff member by Admin (drives the "Staff can only see interviews assigned to them" rule). A running "interview count" per founder is likely a derived value (count of Interview rows for that founder) rather than a stored counter, but this hasn't been decided.
- **InterviewQuestions** — questions defined by Staff or Admin, that an Interview's "important responses" are recorded against (i.e., responses are answers to a defined question, not arbitrary free text).
- **InterviewResponses** — an answer to a specific InterviewQuestion, for a specific Interview.
- **Competitors** — the tracked competitor record itself (name, positioning, etc.).
- **CompetitorPricingHistory** — time-stamped pricing entries per Competitor, enabling the "pricing changes over time" tracker and a comparison view against the company's own planned/future pricing (which itself needs a place to live — not yet modeled).
- **CompetitorEditRequests** — a Staff-submitted proposed change to a Competitor record, with a reason/justification, a status (pending/approved/rejected), and a reference to the Admin who resolved it.
- **AnalyticsPermissions** — a per-Staff-member grant (from Admin) controlling whether that Staff member can view analytics/insights at all.

## Planned Analytics

Auto-generated insights over Interviews/InterviewResponses, with **Budget Range** and **Feature Requests** as the priority metrics per the owner's explicit ranking (see `DECISIONS.md`). Report export (PDF/CSV) is a known future requirement, deliberately not designed yet — see `PROJECT.md`'s Non-Goals.

## Not Yet Decided

- File storage approach for interview recordings/documents (explicitly deferred by the owner).

Auth approach is now decided — custom DB-backed sessions with a `role` column, see `DECISIONS.md`. `Users` gains: `id`, `username`, `password_hash`, `role` (`admin` | `staff`), `created_at`. A new `Sessions` entity (opaque token, `user_id`, `created_at`, `expires_at`) supports it, matching `RajuApp`'s pattern.

Production hosting is also decided — Render (Free tier) for the app, Neon for production Postgres, UptimeRobot to prevent free-tier idling (see `DECISIONS.md`). See `PHASES.md`'s Phase 24 for the actual setup work.
