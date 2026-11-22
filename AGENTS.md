# Global Vibe Coding Protocol

## Always-On Compression & Communication
- **Prose (`caveman`):** Default to `caveman full` at all times. Use telegraphic, high-precision technical fragments. Drop pleasantries, hedging, and filler. Switch to `caveman ultra` for status checks and graph queries.
- **Active Clarification:** `caveman` does not mean silence. Proactively ask 1–2 structured questions or offer suggestions with `(Recommended)` defaults when requirements, trade-offs, or UI options are ambiguous.
- **Code (`ponytail`):** Default to `ponytail full` during implementation. Write minimal, idiomatic code. Zero speculative abstractions, zero premature helper wrappers, zero unrequested comments.

## Context & Exploration Rules
- **Never grep or dump raw directories:** Before reading source files, inspect `graphify-out/GRAPH_REPORT.md` or run `/graphify query` to locate exact target files and line ranges.
- **Phase State Handshake:** Always read `PLAN.md` first when resuming a pipeline after `/clear` to identify the active `PIPELINE` and `CURRENT_PHASE`.

## Isolation Rules
- Never load `ui-ux-pro-max` or `impeccable` during backend/state TDD phases.
- Never modify unrelated code outside the active phase scope.

## Git Protocol
- Always commit via `/caveman-commit`: imperative subject under 50 chars, terse why-over-what body if non-obvious, zero AI attribution footers.

## Monorepo Architecture & Workspace Commands
- **Root Directory:** `D:\Projects\qr-attendance-system-with-laraverl-api`
- **Backend (`backend/`):** Laravel 11 REST API (PHP 8.2+, Sanctum, Pest / PHPUnit)
  - Dev server: `cd backend && php artisan serve`
  - Migrations: `cd backend && php artisan migrate`
  - Tests: `cd backend && php artisan test`
  - Linter / Formatter: `cd backend && ./vendor/bin/pint`
- **Frontend (`frontend/`):** React 18 SPA (Vite, Tailwind CSS 3, ESLint)
  - Dev server: `cd frontend && npm run dev`
  - Build: `cd frontend && npm run build`
  - Lint: `cd frontend && npm run lint`
