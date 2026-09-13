# Architecture

This describes the **actual current implementation** — which, as of this writing (2026-09-13), is nothing: no code has been written yet. This project is in Phase 0 (Planning) — see `PROJECT.md` and `PHASES.md`. This file exists now, ahead of any code, so the planning conversation's implied data model is captured while it's fresh; the **Planned Data Model** section below is a sketch to inform the eventual production build, not a description of anything implemented. Per `CLAUDE.md` rule 9, nothing in this file should ever be read as "already built" until a later update says so explicitly, backed by real code.

## System Overview

No repository, framework, or database has been created yet. `C:\FounderCRM` currently contains only `Project Docs/` (this documentation system).

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

- Production framework/stack (no equivalent of `C:\RajuApp`'s "stack lock" conversation has happened for this project yet).
- Database engine: MySQL vs. PostgreSQL (owner will decide once the app is fully developed locally — see `DECISIONS.md`).
- File storage approach for interview recordings/documents (explicitly deferred by the owner).
- Hosting/deployment target.
