# Development Phases

The project owner has not yet locked a development roadmap for this project — only Phase 0 (Planning) is defined so far. Per `CLAUDE.md` rule 3, Claude must not invent future phases (numbering, scope, or count) the owner hasn't actually specified. Do not add a "Phase 1" or beyond until the owner defines one, the way they did explicitly for `C:\RajuApp`.

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

**Status: In progress.** Requirements have been gathered and documented (this session). Not yet done: choosing a production stack (framework, hosting) and locking a Phase 1+ roadmap with the owner — the equivalent of `C:\RajuApp`'s "stack lock" conversation hasn't happened yet for this project.

### Completion Criteria
- Feature set defined and documented (done — see `PROJECT.md`).
- Production stack chosen (not yet done).
- A Phase 1+ roadmap locked with the owner (not yet done).

**Phase 0 overall status: In progress.**
