# Technical Decisions

These decisions were made during the initial planning conversation with the owner (2026-09-13). They are recorded here as established direction for `PROJECT.md`, `PHASES.md`, and `ARCHITECTURE.md`. Where reasoning wasn't explicitly stated by the owner, this is marked rather than guessed.

## Decision: Admin/Staff role split, with Admin as the sole gatekeeper for staff accounts and analytics access

- Status: Accepted
- Date: 2026-09-13
- Context: The tool needs to support more than one person using it, with different levels of trust — some actions (creating staff accounts, approving competitor-data edits, granting analytics access) shouldn't be open to every user.
- Decision: Two roles, Admin and Staff. Only Admin can create new Staff accounts. Any user (Admin or Staff) can create a new founder record. Staff can only see interviews Admin has specifically assigned to them. Staff can only view analytics/insights for founders/interviews Admin has explicitly allowed.
- Reasoning: Owner's explicit choice, given directly when asked about permissions.
- Consequences: The backend needs an authorization layer checking role + per-staff grants (interview assignment, analytics visibility) on every relevant read, not just a flat admin/staff flag. See `ARCHITECTURE.md`'s Planned Data Model.

## Decision: Competitor data edits go through a Staff request → Admin approve/reject workflow, not direct Staff edits

- Status: Accepted
- Date: 2026-09-13
- Context: Competitor data needs to stay accurate and controlled, but Staff may have information (from interviews) that should inform it.
- Decision: Staff cannot edit competitor data directly. They submit a request including their reasoning for the change; Admin reviews the request and either applies the change themself or rejects it.
- Reasoning: Owner's explicit choice — keeps Admin as the final authority on competitor data while still letting Staff surface changes they've learned about.
- Consequences: Needs a `CompetitorEditRequests`-style entity with a status and a stored reason, not just a change log. See `ARCHITECTURE.md`.

## Decision: Interview notes only — no transcripts/recordings

- Status: Accepted
- Date: 2026-09-13
- Context: The owner was asked whether the Interview module needed notes, transcripts, responses to specific questions, or a minimal "met on date X" log.
- Decision: Keep interview notes (plain text). Explicitly reject transcripts. Also track "important responses" to specific questions — but only for questions that were actually added by a staff member or admin (i.e., a defined question bank, not arbitrary free-text Q&A). Track date, time, and a count of interviews held with each founder.
- Reasoning: Owner's explicit choice ("Keep Interview Notes(reject transcripts)").
- Consequences: No audio/video storage requirement is implied by this decision — see the separate file-storage deferral below. `InterviewResponses` should reference a defined `InterviewQuestions` entity, not store ad-hoc question text per response. See `ARCHITECTURE.md`.

## Decision: Analytics — auto-generated, prioritizing Budget Range and Feature Requests; export originally deferred, later scoped as Phase 22

- Status: Accepted (export sub-decision superseded — see below)
- Date: 2026-09-13
- Context: The owner was asked whether reports should auto-generate, what metrics matter most, and whether export (PDF/CSV) was needed now.
- Decision: Yes, auto-generate reports/insights. Budget Range and Feature Requests are the metrics that matter most. PDF/CSV export is a real future need — originally deferred ("for now mark it somewhere only," i.e., tracked as a backlog item), later scoped as Phase 22 (2026-09-13, same day, once the roadmap reached that point), broadened at that time to also cover Founders/Interviews and Competitor data, not just Analytics.
- Reasoning: Owner's explicit choice and explicit prioritization; the export deferral was lifted once the owner reached that point in the roadmap and defined it as Phase 22 rather than a decision reversal driven by new information.
- Consequences: `PROJECT.md` no longer lists export as a Non-Goal. See `PHASES.md`'s Phase 22 for the actual scope now locked.

## Decision: Competitor pricing tracked over time, with a comparison against the company's own future pricing

- Status: Accepted
- Date: 2026-09-13
- Context: The owner confirmed competitor data will be updated regularly and asked specifically for a pricing-history view.
- Decision: Track competitor pricing changes over time (a history, not just a current snapshot), and support comparing that history/current pricing against the company's own future/planned pricing.
- Reasoning: Owner's explicit choice.
- Consequences: Needs a `CompetitorPricingHistory`-style entity (time-stamped) rather than a single mutable `price` field on `Competitors`, and some place to record the company's own planned pricing for comparison — not yet modeled in detail. See `ARCHITECTURE.md`.

## Decision: Storage engine (MySQL vs. PostgreSQL) deferred until after local development

- Status: Accepted (deferred)
- Date: 2026-09-13
- Context: The owner was asked about file storage (cloud vs. linked external files) for recordings/documents, and about the database engine for local persistence.
- Decision: File storage: deferred entirely — "we will think about it once the App is fully developed locally." Database engine: local storage will use either MySQL or PostgreSQL, decided once the app is fully developed locally — not decided now.
- Reasoning: Owner's explicit choice to defer both.
- Consequences: No production stack, framework, or database engine has been locked for this project yet — unlike `C:\RajuApp`'s stack-lock decision, there is no equivalent decision here yet. Do not assume Postgres (or MySQL) in any schema design until the owner actually decides. See `PROJECT.md`'s Constraints and `ARCHITECTURE.md`'s "Not Yet Decided."

## Decision: Production stack locked — Vite + React + TypeScript frontend, Next.js (API-only) + Node.js backend, single repo/single deploy

- Status: Accepted
- Date: 2026-09-13
- Context: Phase 0 required a stack-lock conversation before any code could be written (see `PHASES.md`, `TASKS.md`). The owner confirmed this is a small-scale internal tool (1 Admin, ~10-20 Staff), not a high-traffic product, and specified a preference for a React + TypeScript frontend built with Vite, paired with a Next.js/Node.js backend, as a single project with a single deploy — not two separate codebases/deploys.
- Decision:
  - **TypeScript** — the app's language, frontend and backend both.
  - **Frontend**: React + TypeScript, built with **Vite**, using an islands-style component pattern (the owner's own term, echoing the islands pattern already used in the sibling `Portfolio` project). Built to static assets.
  - **Backend**: **Next.js**, used API-routes-only (no Next.js pages/rendering) — Next.js serves purely as the Node.js backend framework. That same Next.js server also serves the frontend's built static assets, so the whole app runs as one process.
  - **Single repo, single deploy**: one build step compiles the Vite frontend first, then the Next.js server (which serves both `/api/*` and the built frontend files); one Render service, not two.
  - **Vitest** — the test runner, for both frontend and backend code.
- Reasoning: Owner's explicit choice, given directly when asked to clarify how the pieces fit together (a plain single Next.js app, vs. a separate Vite frontend + Next.js-as-backend, were the two options offered; the owner chose the latter).
- Consequences: Supersedes `PROJECT.md`/`ARCHITECTURE.md`'s "no production stack chosen" status and `PHASES.md`'s Phase 0 completion criterion for stack choice. This is a different shape than `RajuApp`'s single-Next.js-project pattern — do not assume RajuApp's frontend conventions carry over here. See `ARCHITECTURE.md` for the resulting repo layout.

## Decision: Database engine locked — PostgreSQL (local)

- Status: Accepted (supersedes the database-engine half of "Storage engine deferred until after local development", below)
- Date: 2026-09-13
- Context: As part of the same stack-lock conversation, the owner was asked whether to keep deferring MySQL vs. PostgreSQL (as originally decided) or lock it now.
- Decision: PostgreSQL, run locally for development. Production/hosted Postgres target not yet specified.
- Reasoning: Owner's explicit choice; no further reasoning was stated beyond the direct pick (this also happens to match `RajuApp`'s prior choice, but that wasn't given as the reason).
- Consequences: The earlier "storage engine deferred" decision is now **partially superseded** — the database-engine half is resolved (Postgres). The **file storage** half (interview recordings/documents) remains deferred, unchanged — see that decision below. `ARCHITECTURE.md`'s data model can now be designed against Postgres specifically.

## Decision: Hosting locked — Render (Free tier) + UptimeRobot; production Postgres — Neon

- Status: Accepted
- Date: 2026-09-13
- Context: Same stack-lock conversation; hosting had not been discussed for this project before. The production Postgres target was left open at the time and resolved later the same day when the owner locked Phase 24 (Production Setup).
- Decision: Deploy to Render (Free tier), with UptimeRobot pinging it to prevent free-tier idling — the same combination as `RajuApp`. Production/hosted Postgres: **Neon** (a separate managed Postgres provider), not Render's own managed Postgres.
- Reasoning: Owner's explicit choice.
- Consequences: `ARCHITECTURE.md`'s "Not Yet Decided" list updated; hosting and the production Postgres target are both no longer open. The app (on Render) and its production database (on Neon) are two separate providers — connection details/secrets between them are part of Phase 24's actual setup work, not decided here.

## Decision: Auth approach — custom DB-backed sessions

- Status: Accepted (supersedes the "Auth approach — left open" decision below)
- Date: 2026-09-13
- Context: FounderCRM needs real multi-account, role-based auth (Admin creates Staff accounts; per-staff analytics/interview-visibility grants) — unlike `RajuApp`'s single-lent-account model. Originally left open; resolved when the owner locked Phase 5 (Auth Backend — Login only).
- Decision: Custom DB-backed sessions, following `RajuApp`'s pattern (`users` table with `username`/`password_hash`, a `sessions` table holding an opaque session token), extended with a `role` column (`admin` | `staff`) on `users` for FounderCRM's permission model. No external auth library (e.g. Auth.js/NextAuth).
- Reasoning: Owner's explicit choice; keeps consistency with `RajuApp`'s existing pattern rather than introducing a new dependency.
- Consequences: `ARCHITECTURE.md`'s "Not Yet Decided" list and this project's `CLAUDE.md` should no longer describe auth as open. Per-staff grants (analytics access, interview assignment) are separate from the `users`/`sessions` schema itself — see `ARCHITECTURE.md`'s Planned Data Model (`AnalyticsPermissions`, interview assignment on `Interviews`). See `PHASES.md`'s Phase 5 for what's actually being built now (login only).

## Decision: Auth approach — left open (superseded)

- Status: Superseded — see "Auth approach — custom DB-backed sessions" above
- Date: 2026-09-13
- Context: FounderCRM needs real multi-account, role-based auth (Admin creates Staff accounts; per-staff analytics/interview-visibility grants) — unlike `RajuApp`'s single-lent-account model. The owner was asked whether to build custom DB-backed sessions (RajuApp's pattern, extended with a role column and per-staff grants) or adopt an auth library (e.g. Auth.js/NextAuth).
- Decision: Not decided — the owner explicitly asked to leave this open for now.
- Reasoning: Owner's explicit choice to defer.
- Consequences: Superseded the same day once the owner locked Phase 5.

## Decision: Documentation system — adopt the 6-file Markdown system used in `C:\RajuApp`

- Status: Accepted
- Date: 2026-09-13
- Context: The owner asked to create a new project root in `C:\` with "a docs system in it same as `C:\RajuApp`," after a planning conversation had already gathered the requirements captured above.
- Decision: Created `C:\FounderCRM\Project Docs\` with the same 6-file structure and conventions as `C:\RajuApp\Project Docs\` (`CLAUDE.md`, `PROJECT.md`, `PHASES.md`, `TASKS.md`, `ARCHITECTURE.md`, `DECISIONS.md`), populated with the requirements gathered in the planning conversation rather than left as an empty template.
- Reasoning: Owner's explicit instruction and choice of format (multiple markdown files, one per topic).
- Consequences: Future work on this project should follow the same maintenance rules as `C:\RajuApp` (see this project's own `CLAUDE.md`) — responsibility separation across files, no inventing phases the owner hasn't specified, keep documentation accurate to actual project state.

## Decision: Postgres migration tool locked — `node-pg-migrate` + `pg`

- Status: Accepted
- Date: 2026-09-14
- Context: Phase 1b (choosing a migration tool) had been explicitly held back since Phase 1. The owner asked to connect the database, backend, and frontend together, which required resolving this first.
- Decision: `node-pg-migrate` for migrations, `pg` as the Node Postgres driver/client — plain SQL-backed migrations, no ORM. `server/migrations/` holds migration files (none yet — no schema exists); `server/lib/db.ts` exports a shared `pg.Pool` for query access.
- Reasoning: Owner's explicit choice, closest to `RajuApp`'s raw-SQL-migration pattern referenced throughout this project's docs.
- Consequences: `PHASES.md`'s Phase 1b is now done (tool chosen; no tables created yet — that's Phase 5's job for `users`/`sessions`). `npm run migrate:up`/`migrate:down`/`migrate:create` (in `server/package.json`) run against the connection string in the repo-root `.env`'s `DATABASE_URL`, loaded via `--envPath ../.env` (requires the `dotenv` package as a dependency — `node-pg-migrate` silently no-ops `--envPath` without it).

## Decision: Backend↔database connectivity wired ahead of Phase 4; dev-mode single port via Next.js proxy to Vite

- Status: Accepted
- Date: 2026-09-14
- Context: The owner asked to connect the database, backend, and frontend, and to serve the backend and frontend on a single port — before starting Phase 4 (Frontend Base Structure), explicitly out of the locked phase order. Confirmed with the owner as an intentional exception, not a reinterpretation of the roadmap: Phase 4 is still next afterward, and this doesn't renumber or rescope any locked phase in `PHASES.md`.
- Decision:
  - **DB connectivity**: `server/lib/db.ts` opens a real `pg.Pool` against the local Postgres instance (Phase 1). `GET /api/health` now also runs `SELECT 1` and reports `db: "connected"` / `db: "error"` — connectivity only, no application schema/tables (still Phase 5's job).
  - **Single port, dev mode only**: `server/next.config.ts` adds a rewrite `fallback` that proxies any request not matched by an API route or Next build asset to `http://localhost:5173/:path*` (the Vite dev server), so visiting `http://localhost:3000` in dev serves both the frontend and `/api/*`. Vite's dev server (`frontend/vite.config.ts`) pins `server.hmr.host`/`server.hmr.port` to `5173` so its HMR websocket connects directly to Vite rather than through the proxy (Next's rewrites don't proxy the websocket upgrade). A root-level `package.json` (`concurrently`) runs both dev servers with one `npm run dev` from the repo root.
  - **Production single-port serving** (copying `frontend/dist` into `server/public`, one `npm start`) is explicitly deferred — not done now, per the owner's instruction. `ARCHITECTURE.md`'s planned repo shape for that step still applies once it's built.
- Reasoning: Owner's explicit choice, given directly when asked how to sequence this against the locked roadmap and whether single-port should cover dev, production, or both right now.
- Consequences: `server/next.config.ts`'s dev-only rewrite and `frontend/vite.config.ts`'s HMR pinning are temporary scaffolding for local development — revisit both when production single-port serving is actually built (see `PHASES.md`'s Phase 24, or wherever the owner schedules it). `env` loading for `DATABASE_URL` must happen inside route-handler-reachable code (e.g. `server/lib/db.ts`, via `@next/env`'s `loadEnvConfig`) rather than in `next.config.ts` — Turbopack dev route handlers don't inherit `process.env` mutations made at config-load time in a separate context.
