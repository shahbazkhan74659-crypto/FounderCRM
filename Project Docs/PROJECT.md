# Project

## Overview

**FounderCRM** (working name, chosen 2026-09-13 — "for now," per the owner, so treat it as the current working name rather than permanently final) is a role-based internal tool for a startup to track customer-discovery interviews with founders, log competitor intelligence (including pricing history), and surface auto-generated insights (budget ranges, feature requests) from the interview data — gated behind an Admin/Staff permission model.

The project is currently in **Phase 0 (Planning)**. Requirements have been gathered from the owner across a planning conversation (2026-09-13); no production stack has been chosen and no code has been written yet. This documentation system was set up to track that planning work and everything that follows it, mirroring the structure used in the sibling project `C:\RajuApp`.

## Problem

A startup team interviewing founders for customer discovery has no shared, permission-aware place to log those interviews, track competitor pricing/positioning over time, and surface synthesized insights (budget ranges, feature requests) — while restricting who can see which interviews, who can edit competitor data, and who can view analytics.

## Purpose

Give the team (Admin + Staff members) one internal tool to:
- Log interviews held with founders (notes, key responses, date/time, and count of interviews per founder).
- Track competitor data, including a history of pricing changes and a comparison against the company's own future/planned pricing.
- See auto-generated insights derived from interview data, focused on budget range and feature-request patterns.
- Control access by role: who can create founders, who can create staff, who can edit competitor data, who can see which interviews, and who can view analytics.

## Goals

- Admin and Staff user roles with distinct permissions (see "Core Features" below).
- Founder records: any authenticated user (Admin or Staff) can create a new founder to track.
- Interview logging per founder: interview notes (no transcripts), important responses to specific questions (only questions added by staff or admin), and date/time + a running count of interviews held with that founder.
- Competitor data with a request/approval workflow for Staff-proposed edits, a pricing-change-over-time tracker, and a comparison view against the company's own future/planned pricing.
- Auto-generated analytics/insights, with Budget Range and Feature Requests as the top-priority metrics.
- Export of reports (PDF/CSV) is a known future need — marked as a placeholder/backlog item, not built in the current phase (see Non-Goals and `PHASES.md`).

## Non-Goals

- Not yet building report export (PDF/CSV) — explicitly deferred by the owner ("we will think about it later, for now mark it somewhere only").
- Not yet choosing or building file storage for interview recordings/documents — explicitly deferred until the app is fully developed locally.
- Not a public-facing product — internal tool for the startup's own Admin/Staff users only.
- Not yet decided: MySQL vs. PostgreSQL — the owner has said local storage will use one of the two, decided once the app is fully developed locally (see `DECISIONS.md`).

## Target Users

- **Admin**: full control — the only role that can create new Staff accounts, approves/rejects Staff requests to edit competitor data, assigns interviews to Staff, and grants (or withholds) individual Staff members' access to analytics/insights.
- **Staff**: can create founder records, log interviews, mark important responses, and request competitor-data edits (with a reason, for Admin to review) — but can only see interviews specifically assigned to them by Admin, cannot edit competitor data directly, and can only view analytics/insights if explicitly permitted by Admin.

## Core Features

1. **User Roles & Permissions**
   - Only Admin can create new Staff accounts.
   - Any user (Admin or Staff) can create a new founder record.
   - Staff can only see interviews Admin has assigned to them.
   - Staff can only view analytics/insights if Admin has granted them that permission.

2. **Competitor Data Edit Workflow**
   - Staff cannot edit competitor data directly — they submit an edit request with a reason/justification.
   - Admin reviews the request (sees the staff member, the proposed change, and their stated reason) and either applies the change directly or rejects the request.

3. **Interview Module**
   - Interview notes (plain text) — explicitly **not** transcripts/recordings.
   - Important responses to specific questions — only for questions that were added by a staff member or admin (i.e., a defined question, not free-form).
   - Date, time, and a running count of how many interviews have been held with a given founder.

4. **Competitor Analysis**
   - Regularly updated by Admin (directly) or via approved Staff requests.
   - Pricing-change-over-time tracker (historical view of a competitor's pricing).
   - Comparison view against the company's own future/planned pricing.

5. **Analytics & Insights**
   - Auto-generated reports/insights from interview data.
   - Priority metrics: **Budget Range** and **Feature Requests**.
   - Visibility gated per-Staff-member by Admin grant.
   - Export (PDF/CSV): marked as a known future requirement, not implemented in the current phase.

## Current Status

**Phase 0 — Planning.** Requirements gathered directly from the owner (roles/permissions, interview logging fields, competitor workflow, analytics priorities, storage approach) on 2026-09-13. No production stack, database engine, or hosting has been chosen yet. No code has been written. This documentation system (`Project Docs/`) was created to capture the above and track everything that follows — see `PHASES.md` for what's next and `DECISIONS.md` for reasoning already captured.

## Constraints

- Storage engine: MySQL or PostgreSQL, decided later — "once the App is fully developed locally" (owner's words). Until then, treat the choice as open; do not lock a schema-specific feature that assumes one over the other without flagging it.
- No production stack (framework, hosting) has been chosen yet — unlike `C:\RajuApp`, this project has not had a stack-lock conversation.
- Report export (PDF/CSV) and file storage for interview recordings/documents are both explicitly deferred — do not build them speculatively.

## Scope

An internal, role-based CRM/tracking tool for one startup team (Admin + Staff), not a multi-tenant SaaS product.

## Success Criteria

To be defined once the production stack and initial build phases are locked with the owner.
