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

## Decision: Analytics — auto-generated, prioritizing Budget Range and Feature Requests; export deferred

- Status: Accepted
- Date: 2026-09-13
- Context: The owner was asked whether reports should auto-generate, what metrics matter most, and whether export (PDF/CSV) was needed now.
- Decision: Yes, auto-generate reports/insights. Budget Range and Feature Requests are the metrics that matter most. PDF/CSV export is a real future need but is deferred — "for now mark it somewhere only," i.e., tracked as a backlog item, not designed or built in the current phase.
- Reasoning: Owner's explicit choice and explicit prioritization.
- Consequences: `PROJECT.md`'s Non-Goals and `ARCHITECTURE.md`'s "Not Yet Decided" both flag export as deferred — do not build an export feature speculatively before the owner asks for it.

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

## Decision: Documentation system — adopt the 6-file Markdown system used in `C:\RajuApp`

- Status: Accepted
- Date: 2026-09-13
- Context: The owner asked to create a new project root in `C:\` with "a docs system in it same as `C:\RajuApp`," after a planning conversation had already gathered the requirements captured above.
- Decision: Created `C:\FounderCRM\Project Docs\` with the same 6-file structure and conventions as `C:\RajuApp\Project Docs\` (`CLAUDE.md`, `PROJECT.md`, `PHASES.md`, `TASKS.md`, `ARCHITECTURE.md`, `DECISIONS.md`), populated with the requirements gathered in the planning conversation rather than left as an empty template.
- Reasoning: Owner's explicit instruction and choice of format (multiple markdown files, one per topic).
- Consequences: Future work on this project should follow the same maintenance rules as `C:\RajuApp` (see this project's own `CLAUDE.md`) — responsibility separation across files, no inventing phases the owner hasn't specified, keep documentation accurate to actual project state.
