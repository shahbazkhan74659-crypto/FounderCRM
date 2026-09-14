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

**1b. Migration Tooling — Done (2026-09-14)**
- Chosen: `node-pg-migrate` + the `pg` driver (see `DECISIONS.md`). `server/migrations/` holds migration files (none yet — no schema exists) and `npm run migrate:up`/`migrate:down`/`migrate:create` (in `server/package.json`) run against `DATABASE_URL`.
- No tables are created yet; this just sets up the mechanism that later schema work (Phase 5's `users`/`sessions`) will use.

Note: this phase does not require the open auth-approach decision (see `DECISIONS.md`) to be resolved — it's local infrastructure setup, not application schema or code.

### Completion Criteria
- A local PostgreSQL server is running and reachable for development. — **Done.**
- The `FounderCRM` local database exists. — **Done** (created as `foundercrm`).
- A migration tool has been chosen and documented (see `DECISIONS.md`). — **Done.**

**Phase 1 overall status: Completed (2026-09-14).**

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

**3a. Frontend Scaffold — Done (2026-09-14)**
- Initialized `frontend/` (Vite, React 19, TypeScript, `npm create vite@latest -- --template react-ts`) at `C:\FounderCRM\frontend`, matching the planned layout from `ARCHITECTURE.md`.
- Replaced the template's demo content (spinning logos, counter button, docs/social links) in `src/App.tsx` with a minimal placeholder page, and removed the now-unused demo assets/CSS (`src/App.css`, `src/assets/`, `public/icons.svg`) that came with it. No islands-pattern component structure yet — that's Phase 4's base-layout work.
- Verified locally: `npm run dev` (Vite dev server on port 5173, placeholder content confirmed via HTTP), `npm run build` (produces `frontend/dist` with hashed `assets/*.js`/`assets/*.css`), and `npm run lint` (`oxlint`, the template's default linter) all pass clean. Confirmed the Phase 2 backend (`server/`, port 3000) still runs independently and unaffected.

Explicitly **out of scope** for this phase (not done, by design): copying the build output into `server/public`, any wiring to the Phase 2 backend or its API, and any real screens/components — those are later phases/tasks.

### Completion Criteria
- A Vite + React + TypeScript project exists in the repo, matching the planned layout. — **Done.**
- The frontend dev server runs locally and `npm run build` produces static output. — **Done.**

**Phase 3 overall status: Completed (2026-09-14).**

### Out-of-order exception (2026-09-14): DB↔backend↔frontend wiring, dev-mode single port

Before starting Phase 4, the owner explicitly asked to connect the database, backend, and frontend, and to serve them on a single port in development — done as a deliberate exception to the locked phase order, not a reinterpretation of it. See `DECISIONS.md` for the two decisions this involved (migration tool; connectivity + dev-mode single-port approach) and `TASKS.md` for what was actually built. This does not renumber, rescope, or pull forward any other content from Phase 4/5/24 — Phase 4 (below) is still next, Phase 5 still owns the real `users`/`sessions` schema, and production single-port serving is still Phase 24 territory.

## Phase 4 — Frontend Base Structure

### Objective
Build a shared base layout for the frontend that every CRM page will render inside of — the React equivalent of a Django `base.html`: one common structural shell (top bar, sidebar nav placeholder, content area), not a copy-pasted layout per page.

### Scope

**4a. Base Layout Shell — Done (2026-09-14)**
- Built `AppShell` (`frontend/src/layout/AppShell.tsx`), composed of independent `TopBar` and `Sidebar` components (islands-style, per the owner's chosen component pattern — see `ARCHITECTURE.md`) around a content area.
- Nav items are placeholders (Dashboard, Founders, Competitors, Analytics, Admin — matching the feature set in `PROJECT.md`), rendered as `<a href="#">` links — not wired to real navigation.
- No real page content — `App.tsx` mounts `AppShell` directly around a single generic placeholder line. An earlier version of this task built two separate placeholder page components (`DashboardPage`/`FoundersPage`) plus a dev-only preview toggle to demonstrate shell reuse at runtime; the owner asked (2026-09-14, same day) to remove both in favor of just the bare structure, so that demonstration no longer exists in the running app — reusability is now structural only (`AppShell`/`TopBar`/`Sidebar` are separate, composable components; nothing mounts them twice yet).
- **Scope change (owner's explicit instruction, 2026-09-14):** the original exclusion on adopting the design prototype's visual design was lifted — the shell's colors, fonts (Manrope/IBM Plex Sans), and spacing now match `prototype/Main.dc.html` (see `DECISIONS.md`). A client-side router and real navigation remain out of scope, unchanged.

### Completion Criteria
- One base layout component exists and is demonstrably shared (not duplicated) by more than one placeholder page. — **Revised (2026-09-14):** the owner removed the two-placeholder-page demonstration the same day it was built, in favor of a bare single-mount structure — see the note above. The component is structurally reusable (composable, not hardcoded to one call site) but isn't currently instantiated more than once; a future phase mounting real pages through `AppShell` will be the actual proof.

**Phase 4 overall status: Completed (2026-09-14).**

## Phase 5 — Auth Backend (Login only)

### Objective
Build the login backend using the now-locked auth approach — custom DB-backed sessions (see `DECISIONS.md`) — so a user can authenticate. Login only: no signup/registration, no logout endpoint, no route-protection/session-validation middleware, and no frontend login page.

### Scope

**5a. Schema — Done (2026-09-14)**
- `users` table (`server/migrations/1789376319433_create-users-and-sessions.js`): `id`, `username` (unique), `password_hash`, `role` (`admin` | `staff`, DB-level `CHECK`), `created_at`.
- `sessions` table: `token_hash` (primary key — see deviation below), `user_id` (FK → `users`, `ON DELETE CASCADE`), `created_at`, `expires_at` — pattern researched directly from `RajuApp`'s actual current implementation (see `DECISIONS.md`).
- Seeded one initial Admin account via `server/scripts/seed-admin.mjs` (`npm run seed:admin -- <username> <password>`), since only an Admin can create Staff accounts and none exist yet.

**5b. Login Endpoint — Done (2026-09-14)**
- `POST /api/auth/login` (`server/app/api/auth/login/route.ts`) verifies username + password (`bcryptjs`, cost 10) against `users.password_hash`, creates a session (`server/lib/auth.ts`), and sets it as an `httpOnly` cookie (`foundercrm_session`, 30-day expiry) on the response. Unknown username and wrong password both return one generic `401`.

Explicitly **out of scope** for this phase (not done, by design): registration/signup endpoints (any user creation beyond the seeded Admin), logout, session validation/route-protection middleware for other endpoints, per-staff grants (`AnalyticsPermissions`, interview assignment — see `ARCHITECTURE.md`), and any frontend login UI (that's `frontend/` work, a separate task).

### Completion Criteria
- `users` and `sessions` tables exist in the local Postgres database (Phase 1). — **Done.**
- One seeded Admin account exists. — **Done.**
- The login endpoint successfully authenticates that account and creates a session. — **Done** (verified: correct credentials → `200` + `Set-Cookie` + a matching `sessions` row; wrong password / unknown username → identical `401`; missing fields → `400`).

**Phase 5 overall status: Completed (2026-09-14).**

## Phase 6 — Auth Frontend (Login page only)

### Objective
Build the login page UI, standalone — outside the Phase 4 base layout shell (a login screen doesn't have the app's top bar/sidebar), and not wired to the Phase 5 login endpoint yet.

### Scope

**6a. Login Page — Done (2026-09-14)**
- Built `LoginPage` (`frontend/src/auth/LoginPage.tsx` + `auth.css`): username and password fields, a submit button, and client-side interaction (typing updates the fields via controlled inputs; submitting runs inline required-field validation, showing an error message under any empty field) — submitting does **not** call the Phase 5 `POST /api/auth/login` endpoint yet, verified via the browser Network tab (no `/api/*` requests fire on submit).
- Rendered independently of the Phase 4 base layout: `App.tsx` now mounts `LoginPage` directly in place of `AppShell` (a plain swap, no router, no toggle — `AppShell`/`TopBar`/`Sidebar` are untouched, just unmounted for now). No top bar/sidebar around the login card.
- Visual design follows the same token system as Phase 4 (OKLCH tokens, Manrope/IBM Plex Sans) rather than a prototype trace — no login-specific prototype exists in `prototype/`. Added `--danger`/`--danger-text` tokens to `index.css` (values ported from `prototype/Main.dc.html`) for the inline validation-error styling.
- Follow-up visual/UX refinements, all owner-directed after the initial build (2026-09-14): shadow + accent-colored "backlighting" glow on the card; a responsive mobile layout (`@media (max-width: 480px)`, fluid card width capped at 360px on desktop / 240px on mobile, progressively reduced padding/gaps/font sizes); best-effort browser-autocomplete suppression on both inputs (`autoComplete="off"` plus a readonly-until-focus pattern, since Chrome deliberately ignores `autocomplete="off"` on login/password fields — no fully reliable client-side way to suppress this exists); darkened field borders (`--text-faint` instead of `--border`).
- **Scope exception (owner's explicit instruction, 2026-09-14):** added a "Forgot password?" button below the password field, inert (`type="button"`, no handler) — matching how this codebase already renders not-yet-functional chrome elsewhere (e.g. `Sidebar`'s `<a href="#">` nav items, `TopBar`'s static role toggle). This is visual-only scope creep against this phase's original exclusion below; the real forgot-password flow (backend + working frontend) is still Phase 23's job, untouched.

Explicitly **out of scope** for this phase (not done, by design): calling the real login endpoint, session/token handling on the frontend, redirecting into the app on success, and a **working** "forgot password" flow or registration UI (no self-service signup exists per `PROJECT.md`) — see the scope-exception note above for the one inert UI element added ahead of Phase 23.

### Completion Criteria
- A standalone login page exists with working form fields and inline validation, visually independent of the base layout shell. — **Done** (verified: `npm run build`/`npm run lint` clean; manually confirmed in-browser — typing updates fields, empty submit shows both inline errors, fixing one field clears only that field's error, no `/api/*` network requests fire on submit).

**Phase 6 overall status: Completed (2026-09-14).**

## Phase 7 — Wiring Login Page to Login Backend

### Objective
Connect the Phase 6 login page to the Phase 5 login endpoint and finish the login flow end to end, including getting the user into the app on success.

### Scope

**7a. API Wiring — Done (2026-09-14)**
- `LoginPage` (`frontend/src/auth/LoginPage.tsx`) now performs a real `fetch('/api/auth/login', ...)` on submit (after local required-field validation passes), same-origin, `credentials: "same-origin"`.
- On failure, the backend's JSON error (`"Username and password are required"` or `"Invalid username or password"`) is shown verbatim in a new `.login-form-error` banner (using a newly-ported `--danger-soft` token from the prototype); a thrown network error shows a generic "Unable to reach the server" message. The submit button disables and shows "Signing in…" while the request is in flight.
- On success, no manual token/cookie storage was needed — the backend already sets the session as an `httpOnly` cookie directly on the response (a deliberate Phase 5 decision, see `DECISIONS.md`), and the browser stores it automatically for the same-origin `fetch`.

**7b. Post-Login Redirect — Done (2026-09-14)**
- `App.tsx` now holds `isAuthenticated` state (plain `useState`, no router — none is installed) and conditionally renders `LoginPage` (passing an `onLoginSuccess` callback) or `AppShell` wrapping the same placeholder paragraph `App.tsx` used before Phase 6 (`"Content area — no real page content yet."`). A successful login flips the state and the page transitions into the full `AppShell` (top bar + sidebar).

Explicitly **out of scope** for this phase (not done, by design): session validation/route-protection middleware guarding other backend routes (from `PHASES.md`'s Phase 5 exclusions — still not built — see `7c`/`7d` below for the two narrow pieces since pulled forward), and rendering any real page content inside the base layout beyond what Phase 4 already scoped. Also out of scope, unchanged: the "Forgot password?" button added to the login page as a Phase 6 scope exception (2026-09-14) — confirmed still inert; it only becomes functional when Phase 23 (Onboarding & Password Reset) is built.

**7c. Session Persistence Across Refresh — Done (2026-09-14, owner-directed follow-up, scope exception)**
- The known limitation below (refresh logged the user out) was flagged first, then the owner explicitly asked to fix it now rather than wait for Phase 21 — distinguishing it from Phase 21's actual job (role-based access for Admin/Staff), which this does not touch.
- Backend: `GET /api/auth/me` (`server/app/api/auth/me/route.ts`) reads the `foundercrm_session` cookie via `next/headers`'s async `cookies()` API (confirmed via this Next.js version's own docs, per `server/AGENTS.md`'s warning that this version has breaking API changes from training data), hashes it the same way `createSession` does, and looks it up against `sessions` (joined to `users`) via a new `getSessionUser` helper in `server/lib/auth.ts` — returns `200 { username, role }` if valid, `401 { error: "Not authenticated" }` otherwise.
- Frontend: `App.tsx` now calls this endpoint once on mount (a small `'checking' | 'authenticated' | 'unauthenticated'` state, showing a brief blank `--bg`-colored placeholder while it resolves) instead of always defaulting to logged-out. A valid session now lands the user directly in `AppShell` on load/refresh; no session shows the login page as before.
- This is **not** Phase 21's session-validation middleware — it's a single narrow endpoint consumed only by the frontend's own initial load check. It doesn't protect any other route and doesn't enforce roles. See Phase 21's `21a` entry for the explicit boundary.

**Known limitation — now resolved (2026-09-14):** the note below described the original gap (no session-check endpoint, so a refresh always logged the user out) — see `7c` above for the fix. Kept here for history rather than deleted, per this project's "no silent destruction" documentation rule.

**7d. Logout — Done (2026-09-14, owner-directed follow-up, scope exception)**
- Owner explicitly asked for a logout flow, with the button placed in the top bar to the right of the Admin/Staff role toggle.
- Backend: `POST /api/auth/logout` (`server/app/api/auth/logout/route.ts`) reads the session cookie, deletes the matching row from `sessions` via a new `deleteSession` helper (`server/lib/auth.ts`, same SHA-256 token-hash lookup pattern as `createSession`/`getSessionUser`), and clears the cookie on the response (`response.cookies.delete(SESSION_COOKIE_NAME)`) — confirmed valid against this Next.js version's own type definitions, per `server/AGENTS.md`'s warning. Idempotent: does nothing harmful if no cookie/session exists.
- Frontend: `TopBar` (`frontend/src/layout/TopBar.tsx`) now takes an `onLogout` prop and renders a "Log out" button inside a new `.topbar-right` wrapper alongside the existing (still-inert) role toggle; `AppShell` threads the prop through; `App.tsx` implements the actual handler (`POST /api/auth/logout`, then always clears local auth state regardless of the network result) and passes it down.
- Verified end to end: logging out returns to the login page immediately, and a subsequent refresh stays logged out (confirmed the `sessions` row was actually deleted server-side, not just cleared client-side) — `GET /api/auth/me` correctly 401s afterward. `npm run build`/`npm run lint` clean on both `frontend/` and `server/`.
- Like `7c`, this is a narrow, specific piece — not Phase 21's broader role-based-access work, which remains untouched.

### Completion Criteria
- Submitting valid credentials on the login page authenticates against the real backend and lands the user inside the base layout shell. — **Done** (verified end to end with a disposable test admin seeded via `npm run seed:admin -- testadmin somepassword123`: successful login transitions from `LoginPage` to the full `AppShell` with top bar/sidebar/placeholder visible).
- Submitting invalid credentials shows an error on the login page without redirecting. — **Done** (verified: wrong username/password shows "Invalid username or password" in the new error banner, no redirect, button returns to "Sign in").

**Phase 7 overall status: Completed (2026-09-14).**

## Phase 8 — Competitor Page (Full Backend)

### Objective
Build the full backend for the Competitor module — the API layer behind `PROJECT.md`'s Competitor Analysis feature and `ARCHITECTURE.md`'s `Competitors` / `CompetitorPricingHistory` / `CompetitorEditRequests` entities.

### Scope

Minimal scope for now: the full Competitor backend, working end to end — covering the full Competitor Analysis feature set from `PROJECT.md` (competitor records, pricing-change-over-time tracking, comparison against the company's own future/planned pricing, and the Staff-request → Admin-approve/reject edit workflow from `DECISIONS.md`) backed by real endpoints and schema, not a partial slice. Backend only — no frontend page in this phase.

**Detailed scope, defined by the owner at the start of this phase (2026-09-14)** — referencing the design prototype (`prototype/Main.dc.html`, which contains a real Competitor-detail artboard, unlike earlier phases), plus two follow-up clarifications:

**8a. Schema — Done (2026-09-14)**
- `server/migrations/1789462800000_create-competitors.js` — 5 new tables: `competitors` (`name`, `positioning`), `competitor_pricing_history` (`competitor_id` FK, `date`, `price`, `plan`), `company_pricing_plans` (`plan`, `price`, `effective_date` — a separate real multi-row table for "our" planned pricing, owner's explicit choice over the prototype's single hardcoded value), `competitor_edit_requests` (`competitor_id`/`staff_id` FKs, `field` check `'pricing'|'positioning'`, `proposed_value`, `reason`, `status` check `'pending'|'approved'|'rejected'`, `resolved_by`/`resolved_at`), `notifications` (`user_id` FK, `message`, `edit_request_id` FK, `is_read`) — new scope, not previously modeled anywhere, added per the owner's explicit ask for a notification mechanism.
- Fixed a real bug found along the way: `pg`'s default `DATE` column parsing shifted dates by a day when serialized to JSON (local-timezone round-trip). Fixed globally in `server/lib/db.ts` via `types.setTypeParser` for the `date` OID (1082) to return the raw `"YYYY-MM-DD"` string instead of a JS `Date`.

**8b. Shared auth helper — Done (2026-09-14)**
- `server/lib/api-auth.ts` — `requireUser()`/`requireAdmin()`, the first shared abstraction over the inline session-check pattern `me`/`logout` used individually (justified once ~15+ new routes needed the identical check). Every route requires *some* authenticated user; direct-edit endpoints and approve/reject additionally require `role === 'admin'` (reuses the existing `role` column — not new scope, and not Phase 21's session-validation middleware, which still doesn't exist for the rest of the app).

**8c. Routes — Done (2026-09-14)**, 11 files / 19 methods under `server/app/api/`:
- `competitors` (list/create), `competitors/[id]` (detail w/ pricing history + comparison + edit requests, edit, delete), `competitors/[id]/pricing-history` (+ `[entryId]`) for direct pricing edits, `company-pricing-plans` (+ `[id]`), `competitors/[id]/edit-requests` (per-competitor list + Staff submit), `edit-requests` (top-level Admin cross-competitor queue, `?status=` filter), `edit-requests/[id]/approve` / `.../reject`, `notifications`.
- **Deliberate deviation from the prototype (owner's explicit instruction):** the prototype auto-applies an approved request's change; this implementation does not. `server/lib/edit-requests.ts`'s `resolveEditRequest` (shared by approve/reject, run inside one `pool.connect()` transaction with a `FOR UPDATE` row lock) only flips the request's own `status`/`resolved_by`/`resolved_at` and creates a notification — it never touches `competitors`/`competitor_pricing_history`. Admin must separately call the direct-edit endpoints to make the actual change. A second call on an already-resolved request returns `409`.
- Competitor detail's `comparison` object picks the nearest-future (or latest-past, if none upcoming) `company_pricing_plans` row and computes a diff/caption against the competitor's latest pricing-history entry, mirroring the prototype's chart-caption phrasing; `null` if no company pricing plan rows exist yet.

Explicitly **out of scope**, confirmed by the owner: no frontend (Phase 9), no mark-as-read on notifications (not asked for), no session-validation middleware or staff-visibility filtering (Phase 21, untouched — Staff accounts also can't be created yet, Phase 20, so the Staff-submits path is only testable as the seeded Admin for now, a real limitation of verifying this phase, not a defect).

**Verified end to end via curl** (documented in `TASKS.md`): full competitor → pricing history → comparison → edit request → approve/reject → notification flow, the key non-mutation check (competitor data byte-for-byte unchanged after approval), the `409` double-resolve guard, cross-competitor ownership scoping on pricing-history entries (404), and `401` on unauthenticated requests. `npm run build`/`npm run lint` clean.

**Phase 8 overall status: Completed (2026-09-14).**

## Phase 9 — Competitor Page Frontend (Static only)

### Objective
Build the Competitor page frontend — list and detail views — inside the Phase 4 base layout shell, using placeholder/sample data. Interactive locally, not wired to the Phase 8 backend yet.

### Scope

**9a. Competitor Pages — Done (2026-09-14)**
- New `frontend/src/competitors/` feature directory: `CompetitorsPage` (owns selection + local `editRequests` state — the first list↔detail local-state navigation pattern in this codebase, since no router exists), `CompetitorList` (cards with a delta indicator computed from the two most recent pricing-history entries), `CompetitorDetail` (back button, heading, description, chart, chronological pricing history, edit-requests panel), `PricingChart` (SVG chart geometry ported from the prototype — dashed "our price" reference line + solid competitor-history polyline), `EditRequestsPanel` (branches on view role), `comparison.ts` (a client-side port of Phase 8's `buildComparison`, byte-for-byte matching caption phrasing so it can be deleted once Phase 10 wires the real field), `sample-data.ts`, `types.ts` — the last mirroring Phase 8's actual JSON field names so Phase 10's wiring is close to a drop-in swap.
- Rendered inside the Phase 4 `AppShell`: `App.tsx` now mounts `CompetitorsPage` in place of the old placeholder paragraph, finally using the `activeNavItem` prop that's existed unused since Phase 4 (Sidebar's "Competitors" item now highlights correctly).
- Forms/buttons work via local state exactly as scoped: submitting an edit request (Staff view) appends a `pending` entry to on-screen state; Approve/Reject (Admin view) updates only that request's own status — deliberately mirroring Phase 8's real non-auto-applying behavior (commented in code so it isn't "fixed" to match the prototype's auto-apply behavior later). Verified via the browser Network tab that nothing calls `/api/*` for any of this.
- **Scope addition (owner's explicit instruction, 2026-09-14):** the previously-inert Admin/Staff toggle in `TopBar` is now wired to a `viewRole` state threaded `App.tsx → AppShell → TopBar` (same pattern as `onLogout`) and actually switches `EditRequestsPanel`'s rendered branch — this is local demo-only state, not tied to the real logged-in user's role (Phase 21 unaffected).
- Also ported `--success`/`--success-soft`/`--success-text` and `--warning-soft`/`--warning-text` tokens from the prototype into `index.css` (only what's used — matching the per-token porting discipline from Phase 6/7), for delta coloring and status pills.

Explicitly **out of scope** for this phase: any real API calls to the Phase 8 backend, real data persistence, and role-based gating tied to the real logged-in user (Phase 7's auth flow) — sample role-based behavior for demonstration is fine (see the Admin/Staff toggle above), matching real auth is not.

### Completion Criteria
- Competitor list and detail pages exist inside the base layout, fully interactive against local/sample data, with no backend calls. — **Done** (verified end to end in-browser: list → detail navigation, chart + comparison caption + history rows render correctly, Staff can submit a request that appears as pending, Admin can approve/reject with only that request's status changing, back button returns to the list, `npm run build`/`npm run lint` clean, zero `/api/*` requests fire).

**Phase 9 overall status: Completed (2026-09-14).**

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
- **Partial scope exception (owner's explicit instruction, 2026-09-14, during Phase 7):** a narrow `GET /api/auth/me` endpoint (`server/app/api/auth/me/route.ts`, using a new `getSessionUser` helper in `server/lib/auth.ts`) was built ahead of this phase, purely so the frontend can check "is my session still valid?" on page load and stay logged in across a refresh — see Phase 7's entry below for the full detail. This is **not** the middleware/route-protection/role-check work this bullet describes: `/api/auth/me` doesn't guard any other route, doesn't enforce roles, and no other backend endpoint validates sessions yet. That real work — protecting the rest of the API surface and enforcing Admin/Staff role checks — remains this phase's job, untouched.

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
