# Development Phases

**Roadmap complete as of 2026-09-13.** The project owner has locked the full roadmap, Phase 0 through Phase 24: Phase 0 (Planning), Phase 1 (Local Database Setup), Phase 2 (Backend Server Setup), Phase 3 (Frontend Server Setup), Phase 4 (Frontend Base Structure), Phase 5 (Auth Backend — Login only), Phase 6 (Auth Frontend — Login page only), Phase 7 (Wiring Login Page to Login Backend), Phase 8 (Competitor Page — Full Backend), Phase 9 (Competitor Page Frontend — Static only), Phase 10 (Wiring Competitor Frontend to Backend), Phase 11 (Founder Page + Interview Subpage Backend), Phase 12 (Founder Frontend — Both Pages), Phase 13 (API Wiring of Founder Frontend and Backend), Phase 14 (Analytics & Insight Backend), Phase 15 (Analytics & Insight Frontend — Static only), Phase 16 (Wiring Analytics & Insight Frontend and Backend), Phase 17 (Dashboard Frontend — Static only), Phase 18 (Dashboard Full Backend), Phase 19 (Wiring Dashboard Frontend and Backend), Phase 20 (Admin Panel — Staff Creation + Interview Assignment), Phase 21 (Role Based Access — Full Backend & Frontend), Phase 22 (Report Export — PDF/CSV, Backend & Frontend), Phase 23 (Onboarding & Password Reset — Backend & Frontend), and Phase 24 (Production Setup).

This file stays open for new phases in the future, but per the owner's explicit instruction (2026-09-13) and `CLAUDE.md` rule 3, **`PHASES.md` may only be changed with the owner's explicit allowance** — Claude must not add, remove, renumber, or rescope any phase (including adding a "Phase 25") on its own initiative, inference, or because it seems like a logical next step. Wait for the owner to explicitly say so, the way every phase above was individually locked.

## Phase 0 — Pre-Development (Planning)

### Objective
Gather the core feature set, roles/permissions model, and key product decisions before choosing a production stack or writing any code.

### Scope

**0a. Requirements Gathering**
A planning conversation with the owner (2026-09-13) covered:
- Admin vs. Staff roles and permissions (who can create staff, create founders, see which interviews, view analytics).
- The competitor-data edit workflow (Staff request → Admin approve/reject).
- The Interview module's fields (notes, important responses to defined questions, date/time/count).
- Analytics priorities (Budget Range, Feature Requests) and that report export (PDF/CSV) is deferred.
- Competitor pricing history and comparison-to-future-pricing requirements.
- That file storage and the database engine (MySQL vs. PostgreSQL) are both deferred until after local development.

See `PROJECT.md` for the resulting feature set and `DECISIONS.md` for the reasoning behind each choice.

**Status: Completed.** Requirements were gathered and documented, the production stack (and auth approach) was locked, and the full Phase 1–24 roadmap was locked with the owner — all 2026-09-13 (see `DECISIONS.md` and this file's roadmap header).

### Completion Criteria
- Feature set defined and documented (done — see `PROJECT.md`).
- Production stack chosen (done 2026-09-13 — see `DECISIONS.md`).
- A Phase 1+ roadmap locked with the owner (done 2026-09-13 — see this file's roadmap header).

**Phase 0 overall status: Completed (2026-09-13).**

## Phase 1 — Local Database Setup (PostgreSQL)

### Objective
Get a local PostgreSQL instance running and an empty `FounderCRM` database created and reachable, with a migration tool chosen — no application schema/tables yet. Schema design against the `ARCHITECTURE.md` "Planned Data Model" sketch is deliberately **out of scope** for this phase; it belongs to a later phase.

### Scope

**1a. Local PostgreSQL Instance — Done (2026-09-13)**
- PostgreSQL 18 confirmed installed and running locally (Windows service `postgresql-x64-18`).
- Created the local database, named `foundercrm`, via `psql` as the `postgres` superuser.
- Connection convention confirmed for later phases: a standard `postgres://` connection string (host `localhost`, port `5432`, database `foundercrm`), to be supplied via a `DATABASE_URL`-style env var once a repo/app exists (Phase 2+) — matching `RajuApp`'s convention. Whether the app connects as the `postgres` superuser or a dedicated least-privilege role (as `RajuApp` does) is not decided yet — deferred to whichever phase adds real schema/app code.

**1b. Migration Tooling — Not started (explicitly held back per owner instruction, 2026-09-13)**
- Choose a migration tool/approach for Postgres (e.g., `node-pg-migrate`, Prisma Migrate, Drizzle Kit, or raw SQL migration scripts, as RajuApp does) — not yet decided.
- No tables are created in this phase; this just sets up the mechanism that later schema work will use.

Note: this phase does not require the open auth-approach decision (see `DECISIONS.md`) to be resolved — it's local infrastructure setup, not application schema or code.

### Completion Criteria
- A local PostgreSQL server is running and reachable for development. — **Done.**
- The `FounderCRM` local database exists. — **Done** (created as `foundercrm`).
- A migration tool has been chosen and documented (see `DECISIONS.md`). — **Not done** (1b not started).

**Phase 1 overall status: 1a done (2026-09-13); 1b (migration tooling) not started — owner asked to do 1a only.**

## Phase 2 — Backend Server Setup

### Objective
Scaffold the Next.js API-only backend server per the locked stack (`DECISIONS.md`) and the planned repo layout (`ARCHITECTURE.md`) — project structure only, no database connection, no real API routes, and no auth.

### Scope

**2a. Repo & Backend Scaffold — Done (2026-09-13)**
- Initialized `server/` (Next.js 16, TypeScript, App Router, `create-next-app`, npm) at `C:\FounderCRM\server`, matching the planned layout from `ARCHITECTURE.md`. No nested git repo — it lives inside the existing `C:\FounderCRM` repo.
- Configured as API-routes-only: removed the default `app/page.tsx`, `layout.tsx`, `globals.css`, `favicon.ico`, and default `public/` assets. Verified via `npm run build` that no root layout is required with zero pages present, and confirmed `GET /` returns 404 (no page rendering).
- Added `GET /api/health` (`app/api/health/route.ts`) returning `{"status":"ok"}` — verified locally against a running `npm run dev` server (200 response). `npm run build` and `npm run lint` both pass clean.

Explicitly **out of scope** for this phase (not done, by design): connecting to the Phase 1 Postgres database, defining any real API routes/business logic, the `frontend/` Vite+React scaffold, and auth — those are later phases/tasks.

### Completion Criteria
- A Next.js API-only backend project exists in the repo, matching the planned layout. — **Done.**
- The server starts locally and the health-check route responds. — **Done.**

**Phase 2 overall status: Completed (2026-09-13).**

## Phase 3 — Frontend Server Setup

### Objective
Scaffold the Vite + React + TypeScript frontend per the locked stack (`DECISIONS.md`) and the planned repo layout (`ARCHITECTURE.md`) — project structure only, no wiring into the Phase 2 backend and no real UI/features.

### Scope

**3a. Frontend Scaffold**
- Initialize the `frontend/` project (Vite + React + TypeScript, islands-style component pattern per the owner's stack choice).
- A minimal placeholder page, enough to confirm the dev server runs.
- Confirm `npm run build` produces static assets (`frontend/dist`).

Explicitly **out of scope** for this phase: copying the build output into `server/public`, any wiring to the Phase 2 backend or its API, and any real screens/components — those are later phases/tasks.

### Completion Criteria
- A Vite + React + TypeScript project exists in the repo, matching the planned layout.
- The frontend dev server runs locally and `npm run build` produces static output.

**Phase 3 overall status: Scope locked, not yet started.**

## Phase 4 — Frontend Base Structure

### Objective
Build a shared base layout for the frontend that every CRM page will render inside of — the React equivalent of a Django `base.html`: one common structural shell (top bar, sidebar nav placeholder, content area), not a copy-pasted layout per page.

### Scope

**4a. Base Layout Shell**
- A single base layout component (e.g. a top-level `Layout`/`AppShell` component) defining the structure every page shares: top bar and sidebar nav placeholder (islands-style, per the owner's chosen component pattern — see `ARCHITECTURE.md`) around a content area.
- Nav items are placeholders (Dashboard, Founders, Competitors, Analytics, Admin — matching the feature set in `PROJECT.md`), not wired to real navigation.
- No real page content behind them yet.

Explicitly **out of scope** for this phase: choosing/wiring a client-side router, real navigation between pages, and adopting the visual design (fonts/colors) from the FounderCRM design prototype — those are separate future decisions/tasks. The design prototype (`prototype/`) is a reference for the shape of this shell, not something to copy in as production code.

### Completion Criteria
- One base layout component exists and is demonstrably shared (not duplicated) by more than one placeholder page.

**Phase 4 overall status: Scope locked, not yet started.**

## Phase 5 — Auth Backend (Login only)

### Objective
Build the login backend using the now-locked auth approach — custom DB-backed sessions (see `DECISIONS.md`) — so a user can authenticate. Login only: no signup/registration, no logout endpoint, no route-protection/session-validation middleware, and no frontend login page.

### Scope

**5a. Schema**
- `users` table: `id`, `username`, `password_hash`, `role` (`admin` | `staff`), `created_at`.
- `sessions` table: opaque session token, `user_id`, `created_at`, `expires_at` — matching `RajuApp`'s pattern.
- Seed one initial Admin account, since only an Admin can create Staff accounts and none exist yet.

**5b. Login Endpoint**
- One backend API route (e.g. `POST /api/auth/login`) that verifies username + password against `users.password_hash` and creates a session on success.

Explicitly **out of scope** for this phase: registration/signup endpoints (any user creation beyond the seeded Admin), logout, session validation/route-protection middleware for other endpoints, per-staff grants (`AnalyticsPermissions`, interview assignment — see `ARCHITECTURE.md`), and any frontend login UI (that's `frontend/` work, a separate task).

### Completion Criteria
- `users` and `sessions` tables exist in the local Postgres database (Phase 1).
- One seeded Admin account exists.
- The login endpoint successfully authenticates that account and creates a session.

**Phase 5 overall status: Scope locked, not yet started.**

## Phase 6 — Auth Frontend (Login page only)

### Objective
Build the login page UI, standalone — outside the Phase 4 base layout shell (a login screen doesn't have the app's top bar/sidebar), and not wired to the Phase 5 login endpoint yet.

### Scope

**6a. Login Page**
- A dedicated login page/route: username and password fields, a submit button, and basic client-side interaction (typing updates the fields, inline validation messages for e.g. empty fields) — but submitting does **not** call the Phase 5 `POST /api/auth/login` endpoint yet.
- Rendered independently of the Phase 4 base layout (no top bar/sidebar around it).

Explicitly **out of scope** for this phase: calling the real login endpoint, session/token handling on the frontend, redirecting into the app on success, and any "forgot password" or registration UI (no self-service signup exists per `PROJECT.md`).

### Completion Criteria
- A standalone login page exists with working form fields and inline validation, visually independent of the base layout shell.

**Phase 6 overall status: Scope locked, not yet started.**

## Phase 7 — Wiring Login Page to Login Backend

### Objective
Connect the Phase 6 login page to the Phase 5 login endpoint and finish the login flow end to end, including getting the user into the app on success.

### Scope

**7a. API Wiring**
- Submitting the Phase 6 login form calls the real `POST /api/auth/login` endpoint (Phase 5).
- On failure (bad credentials), show an error message on the login page.
- On success, store the session (e.g. a cookie/token) on the frontend.

**7b. Post-Login Redirect**
- On successful login, redirect from the standalone login page into the Phase 4 base layout shell.

Explicitly **out of scope** for this phase: session validation/route-protection middleware guarding other backend routes (from `PHASES.md`'s Phase 5 exclusions — still not built), logout, and rendering any real page content inside the base layout beyond what Phase 4 already scoped.

### Completion Criteria
- Submitting valid credentials on the login page authenticates against the real backend and lands the user inside the base layout shell.
- Submitting invalid credentials shows an error on the login page without redirecting.

**Phase 7 overall status: Scope locked, not yet started.**

## Phase 8 — Competitor Page (Full Backend)

### Objective
Build the full backend for the Competitor module — the API layer behind `PROJECT.md`'s Competitor Analysis feature and `ARCHITECTURE.md`'s `Competitors` / `CompetitorPricingHistory` / `CompetitorEditRequests` entities.

### Scope

Minimal scope for now: the full Competitor backend, working end to end — covering the full Competitor Analysis feature set from `PROJECT.md` (competitor records, pricing-change-over-time tracking, comparison against the company's own future/planned pricing, and the Staff-request → Admin-approve/reject edit workflow from `DECISIONS.md`) backed by real endpoints and schema, not a partial slice. Backend only — no frontend page in this phase.

Detailed endpoints, schema fields, and backend logic are **deliberately left open by the owner** — "I will define Scope and Backend logics when we start this Phase" (2026-09-13). Get those specifics from the owner when this phase starts and update this section (and `TASKS.md`) before writing any code.

**Phase 8 overall status: Minimal scope locked; detailed backend logic to be defined at start.**

## Phase 9 — Competitor Page Frontend (Static only)

### Objective
Build the Competitor page frontend — list and detail views — inside the Phase 4 base layout shell, using placeholder/sample data. Interactive locally, not wired to the Phase 8 backend yet.

### Scope

**9a. Competitor Pages**
- A Competitor list view and a Competitor detail view (pricing history, comparison against the company's future pricing, and the edit-request workflow UI per `PROJECT.md`/`DECISIONS.md`), rendered inside the Phase 4 base layout.
- Built with placeholder/sample data (the FounderCRM design prototype in `prototype/` is a visual reference, not production code to copy in as-is).
- Forms, tabs, and buttons work locally (local component state) — e.g. submitting an edit request updates the on-screen list — but nothing calls the real Phase 8 backend.

Explicitly **out of scope** for this phase: any real API calls to the Phase 8 backend, real data persistence, and role-based gating tied to the real logged-in user (Phase 7's auth flow) — sample role-based behavior for demonstration is fine, matching real auth is not.

### Completion Criteria
- Competitor list and detail pages exist inside the base layout, fully interactive against local/sample data, with no backend calls.

**Phase 9 overall status: Scope locked, not yet started.**

## Phase 10 — Wiring Competitor Frontend to Backend

### Objective
Connect the Phase 9 Competitor frontend to the Phase 8 Competitor backend, replacing sample/local data with real API calls.

### Scope

**10a. API Wiring**
- Competitor list, detail, pricing history, and the edit-request workflow (submit/approve/reject) call the real Phase 8 backend endpoints instead of local/sample data.
- Loading and error states for these calls.

Explicitly **out of scope** for this phase: tying role-based UI (who sees Request vs. Approve/Reject) to the real logged-in user's actual role from Phase 7 — that stays sample/demo-driven as it was in Phase 9, to be wired up in a later phase.

### Completion Criteria
- The Competitor pages read and write real data through the Phase 8 backend, with no local/sample data remaining in the data path.

**Phase 10 overall status: Scope locked, not yet started.**

## Phase 11 — Founder Page + Interview Subpage Backend

### Objective
Build the backend for both the Founders page and its Founder-detail subpage (opened by clicking a founder card, showing that founder's interviews) — the API layer behind `PROJECT.md`'s Founder records and Interview Module, and `ARCHITECTURE.md`'s `Founders` / `Interviews` / `InterviewQuestions` / `InterviewResponses` entities. Both pages' backend together, in this phase.

### Scope

**11a. Founders**
- Create a founder record (any authenticated user, per `DECISIONS.md`).
- List founders.
- Get a single founder's detail.

**11b. Interviews (subpage)**
- Log an interview for a founder: notes (plain text, not a transcript), responses to defined questions, date/time.
- List interviews for a given founder, and the running interview count.

Explicitly **out of scope** for this phase: Admin assigning an interview to a specific Staff member, and filtering the interview list so Staff only see interviews assigned to them (the full permission model from `DECISIONS.md`) — deferred to a later phase, matching how Phase 10 deferred real role gating for Competitors. Managing the `InterviewQuestions` bank itself (who defines questions, question CRUD) is also not scoped here.

### Completion Criteria
- A founder can be created, listed, and fetched by id.
- An interview can be logged against a founder (notes + defined-question responses + date/time) and the founder's interviews/count can be listed back.

**Phase 11 overall status: Scope locked, not yet started.**

## Phase 12 — Founder Frontend (Both Pages)

### Objective
Build the Founder frontend — both the Founders list page and the Founder-detail/interview subpage — inside the Phase 4 base layout, using placeholder/sample data. Mirrors Phase 9's approach for Competitors: interactive locally, not wired to the Phase 11 backend yet.

### Scope

**12a. Founders List Page**
- A Founders list view (cards or rows), with a way to create a new founder, rendered inside the base layout.

**12b. Founder Detail / Interview Subpage**
- Clicking a founder opens its detail subpage: founder info, interview count, list of logged interviews, and a way to log a new interview (notes + defined-question responses + date/time).
- Built with placeholder/sample data (the FounderCRM design prototype in `prototype/` is a visual reference, not production code to copy in as-is).
- Forms and interactions work locally (local component state), but nothing calls the real Phase 11 backend.

Explicitly **out of scope** for this phase: any real API calls to the Phase 11 backend, real data persistence, and role-based gating tied to the real logged-in user — sample role-based behavior for demonstration is fine, matching real auth is not.

### Completion Criteria
- The Founders list and Founder detail/interview subpage exist inside the base layout, fully interactive against local/sample data, with no backend calls.

**Phase 12 overall status: Scope locked, not yet started.**

## Phase 13 — API Wiring of Founder Frontend and Backend

### Objective
Connect the Phase 12 Founder frontend to the Phase 11 Founder backend, replacing sample/local data with real API calls. Mirrors Phase 10's role for Competitors.

### Scope

**13a. API Wiring**
- Founder creation, founder list, founder detail, interview logging, and interview list/count call the real Phase 11 backend endpoints instead of local/sample data.
- Loading and error states for these calls.

Explicitly **out of scope** for this phase: Admin-assigns-interview-to-staff and staff-visibility filtering (not built in Phase 11, so nothing to wire here), and tying any role-based UI to the real logged-in user's role — deferred to a later phase, matching how Phase 10 deferred the equivalent for Competitors.

### Completion Criteria
- The Founder pages read and write real data through the Phase 11 backend, with no local/sample data remaining in the data path.

**Phase 13 overall status: Scope locked, not yet started.**

## Phase 14 — Analytics & Insight Backend

### Objective
Build the backend for auto-generated analytics/insights, prioritizing Budget Range and Feature Requests per `PROJECT.md`'s and `DECISIONS.md`'s explicit ranking.

### Scope

**14a. Insight Endpoints**
- Endpoint(s) that compute Budget Range and Feature Requests from logged interview data (from Phase 11's `Interviews`/`InterviewResponses`).

Explicitly **out of scope** for this phase: the `AnalyticsPermissions` piece from `ARCHITECTURE.md` — Admin granting/revoking a specific Staff member's access to analytics — deferred to a later phase, matching how Phase 11 deferred the equivalent staff-permission piece for interviews. Report export (PDF/CSV) remains a non-goal per `PROJECT.md` and is not part of this phase either.

### Completion Criteria
- Budget Range and Feature Requests can be computed and retrieved from real interview data via the backend.

**Phase 14 overall status: Scope locked, not yet started.**

## Phase 15 — Analytics & Insight Frontend (Static only)

### Objective
Build the Analytics & Insights page frontend inside the Phase 4 base layout, using placeholder/sample data. Mirrors Phase 9/12's approach: interactive locally, not wired to the Phase 14 backend yet.

### Scope

**15a. Analytics Page**
- A page showing Budget Range and Feature Requests (per `PROJECT.md`'s priority metrics), rendered inside the base layout, built with placeholder/sample data (the FounderCRM design prototype in `prototype/` is a visual reference, not production code to copy in as-is).
- A locked/no-access state for the case where a Staff member hasn't been granted analytics access — driven by sample/demo state, not the real `AnalyticsPermissions` grant (which doesn't exist yet — see Phase 14).

Explicitly **out of scope** for this phase: any real API calls to the Phase 14 backend, real data persistence, and tying the locked/no-access state to a real Admin-granted permission.

### Completion Criteria
- The Analytics page exists inside the base layout, showing Budget Range and Feature Requests plus a locked state, fully interactive against local/sample data, with no backend calls.

**Phase 15 overall status: Scope locked, not yet started.**

## Phase 16 — Wiring Analytics & Insight Frontend and Backend

### Objective
Connect the Phase 15 Analytics frontend to the Phase 14 Analytics backend, replacing sample/local data with real computed insights. Mirrors Phase 10/13's role for Competitors/Founders.

### Scope

**16a. API Wiring**
- Budget Range and Feature Requests display real computed values from the Phase 14 backend instead of local/sample data.
- Loading and error states for these calls.

Explicitly **out of scope** for this phase: the real `AnalyticsPermissions` grant/revoke flow and tying the locked/no-access state to a real Admin-granted permission (not built in Phase 14, so nothing to wire here) — deferred to a later phase, matching how Phase 10/13 deferred the equivalent real-role-gating pieces.

### Completion Criteria
- The Analytics page reads real computed Budget Range and Feature Requests data through the Phase 14 backend, with no local/sample data remaining in that data path.

**Phase 16 overall status: Scope locked, not yet started.**

## Phase 17 — Dashboard Frontend (Static only)

### Objective
Build the Dashboard page frontend inside the Phase 4 base layout, using placeholder/sample data. Kept static-only for consistency with Phases 9/12/15, even though the Competitor (Phase 8), Founder (Phase 11), and Analytics (Phase 14) backends it would summarize already exist by this point — wiring is deliberately a separate later phase.

### Scope

**17a. Dashboard Page**
- Summary stat cards (e.g. founders tracked, interviews logged, pending competitor requests, analytics access) and lists (recent interviews, pending competitor requests), rendered inside the base layout, built with placeholder/sample data (the FounderCRM design prototype in `prototype/` is a visual reference, not production code to copy in as-is).
- Role-aware sample behavior (Admin vs. Staff views differ) is fine to demonstrate, same as earlier static frontend phases — driven by sample/demo state, not real auth.

Explicitly **out of scope** for this phase: any real API calls to the Competitor, Founder, or Analytics backends, and tying role-aware behavior to the real logged-in user.

### Completion Criteria
- The Dashboard page exists inside the base layout, fully interactive against local/sample data, with no backend calls.

**Phase 17 overall status: Scope locked, not yet started.**

## Phase 18 — Dashboard Full Backend

### Objective
Build a dedicated dashboard aggregation endpoint that computes/combines everything the Phase 17 Dashboard needs in one call, rather than the frontend making several separate calls to the Phase 8/11/14 endpoints.

### Scope

**18a. Aggregation Endpoint**
- One backend endpoint returning: summary stat counts (founders tracked, interviews logged, pending competitor requests, analytics-access summary), a recent-interviews list, and a pending-competitor-requests list — drawing on the Competitor (Phase 8), Founder/Interview (Phase 11), and Analytics (Phase 14) data.

Explicitly **out of scope** for this phase: wiring the Phase 17 frontend to this endpoint (a separate later phase), and real role-based scoping of the results to the logged-in user (still deferred, consistent with every other backend phase so far).

### Completion Criteria
- The dashboard aggregation endpoint returns real computed data covering everything Phase 17's static UI displays.

**Phase 18 overall status: Scope locked, not yet started.**

## Phase 19 — Wiring Dashboard Frontend and Backend

### Objective
Connect the Phase 17 Dashboard frontend to the Phase 18 dashboard aggregation endpoint, replacing sample/local data with real data. Mirrors Phase 10/13/16's role for Competitors/Founders/Analytics.

### Scope

**19a. API Wiring**
- The Dashboard's stat cards, recent-interviews list, and pending-competitor-requests list call the real Phase 18 aggregation endpoint instead of local/sample data.
- Loading and error states for this call.

Explicitly **out of scope** for this phase: tying any role-aware behavior to the real logged-in user's actual role — deferred, consistent with every other wiring phase so far.

### Completion Criteria
- The Dashboard page reads real data through the Phase 18 endpoint, with no local/sample data remaining in the data path.

**Phase 19 overall status: Scope locked, not yet started.**

## Phase 20 — Admin Panel (Staff Creation + Interview Assignment)

### Objective
Build the Admin Panel, frontend and backend together, covering only Staff account creation and Admin-assigns-interview-to-staff — the two permission-control pieces the owner chose to resolve now, out of everything deferred from earlier phases (2026-09-13).

### Scope

**20a. Staff Account Creation**
- Backend: an endpoint for Admin to create a new Staff account (per `DECISIONS.md`, only Admin can create Staff accounts).
- Frontend: an Admin-only UI to create a Staff account, inside the base layout.

**20b. Interview Assignment**
- Backend: an endpoint for Admin to assign a specific interview (from Phase 11's `Interviews`) to a specific Staff member.
- Frontend: an Admin-only UI to assign/reassign an interview to a Staff member.

Explicitly **out of scope** for this phase (still deferred, per the owner's explicit choice on 2026-09-13): the `AnalyticsPermissions` grant/revoke flow (Admin granting/revoking a Staff member's analytics access — still open from Phase 14), competitor edit-request approve/reject (status from Phase 8), and filtering the interview list so Staff only see interviews assigned to them (still open from Phase 11 — assignment now exists, but the visibility filter that uses it does not).

### Completion Criteria
- Admin can create a Staff account through the Admin Panel and it persists via the real backend.
- Admin can assign an interview to a Staff member through the Admin Panel and it persists via the real backend.

**Phase 20 overall status: Scope locked, not yet started.**

## Phase 21 — Role Based Access (Full Backend & Frontend)

### Objective
Resolve every role/permission piece deferred across earlier phases at once, both backend and frontend, so the app's Admin/Staff permission model (`DECISIONS.md`) is actually enforced end to end rather than demonstrated with sample/demo state.

### Scope

**21a. Session Validation / Route Protection (Backend)**
- Middleware that validates the session (from Phase 5's `sessions` table) on protected routes and enforces role checks — deferred since Phase 5/7's explicit exclusions.

**21b. Staff-Visibility Filter on Interviews (Backend)**
- The Founder/Interview list endpoints (Phase 11) filter interviews so a Staff member only sees ones assigned to them (via Phase 20's assignment data) — deferred since Phase 11.

**21c. AnalyticsPermissions Grant/Revoke (Backend + Frontend)**
- Backend: an endpoint for Admin to grant/revoke a specific Staff member's analytics access (the `AnalyticsPermissions` entity from `ARCHITECTURE.md`).
- Frontend: an Admin Panel UI for this grant/revoke, and the Analytics page's locked/no-access state now reflects the real grant instead of sample state — deferred since Phase 14/20.

**21d. Real Role-Tied UI (Frontend)**
- Every page whose role-based UI was built against sample/demo state (Competitor — Phase 10, Founder — Phase 13, Analytics — Phase 16, Dashboard — Phase 19) now uses the real logged-in user's real role and identity instead.

### Completion Criteria
- Protected backend routes reject unauthenticated/unauthorized requests.
- A Staff account only sees interviews assigned to it.
- Admin can grant/revoke a Staff member's analytics access, and that Staff member's Analytics page reflects it in real time.
- Every page's role-based behavior (Competitor, Founder, Analytics, Dashboard) is driven by the real logged-in user, not sample state.

**Phase 21 overall status: Scope locked, not yet started.**

## Phase 22 — Report Export (PDF/CSV, Backend & Frontend)

### Objective
Build report export, resolving the placeholder/backlog item from `PROJECT.md`'s Non-Goals (originally deferred 2026-09-13 — see `DECISIONS.md`). Broader than the original Analytics-only placeholder: covers Analytics, Founders/Interviews, and Competitor data.

### Scope

**22a. Backend**
- Export endpoints producing PDF and CSV for: Analytics & Insights (Budget Range, Feature Requests), the Founders/Interviews list, and Competitor pricing history/positioning.

**22b. Frontend**
- Export buttons/UI on the Analytics, Founders, and Competitors pages, replacing the "Report export — coming later" placeholder that appeared in the design prototype and earlier static frontend phases.

Explicitly **out of scope** for this phase: export of anything not covered above (e.g. raw interview transcripts — which don't exist, per `DECISIONS.md`'s no-transcripts decision).

### Completion Criteria
- A user can export Analytics, Founders/Interviews, and Competitor data as both PDF and CSV from their respective pages.

**Phase 22 overall status: Scope locked, not yet started.**

## Phase 23 — Onboarding & Password Reset (Backend & Frontend)

### Objective
Give a newly-created Staff account (Phase 20) a way to actually get into the system for the first time (invite-link based onboarding), and give any account a way to recover from a forgotten password.

### Scope

**23a. Invite-Link Onboarding**
- Backend: when Admin creates a Staff account, generate an invite token (with an expiry) instead of a password; an endpoint to validate that token and let the new Staff member set their own password for the first time.
- Frontend: an "Accept Invite" page (outside the base layout, like the login page) where the new Staff member sets their password via the invite link.

**23b. Password Reset**
- Backend: a "forgot password" request endpoint that generates a reset token (with an expiry), and an endpoint to validate that token and set a new password.
- Frontend: a "Forgot password" entry point from the login page, a request form, and a reset form.

**Open dependency — no email service decided:** this project has no email-sending integration chosen anywhere in `ARCHITECTURE.md`/`DECISIONS.md`. For this phase, invite links and password-reset links are **generated and shown to the Admin/user to share or use manually** (e.g. displayed on screen, not emailed automatically). Automatic email delivery is a future need, not built here.

### Completion Criteria
- A newly-created Staff account can be onboarded via its invite link and reach the app with a self-chosen password.
- Any account can request a password reset, use the reset link, and log in with the new password.

**Phase 23 overall status: Scope locked, not yet started.**

## Phase 24 — Production Setup

### Objective
Get the app actually deployed and reachable in production, using the now-fully-locked hosting decisions (see `DECISIONS.md`): Render (Free tier) for the app, Neon for production Postgres, UptimeRobot to prevent free-tier idling.

### Scope

**24a. Production Database**
- Provision a Neon Postgres database and apply the schema built up across earlier phases (Phase 1, 5, 11, 20, 21, 23) to it.

**24b. Render Deployment**
- Deploy the single repo/single build (Vite frontend + Next.js backend, per `ARCHITECTURE.md`) to a Render Free tier web service, configured with the Neon connection string and any other required environment variables/secrets.

**24c. Uptime Monitoring**
- Set up UptimeRobot to ping the deployed app, preventing Render Free tier idling.

### Completion Criteria
- The app is deployed on Render, connected to a production Neon database with the current schema applied.
- UptimeRobot is actively monitoring/pinging the deployed app.

**Phase 24 overall status: Scope locked, not yet started.**
