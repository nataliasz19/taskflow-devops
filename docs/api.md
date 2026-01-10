# TaskFlow API Specification

Base path: `/api`

All responses use `application/json` unless noted otherwise.

## Task resource
Model (JSON):

```json
{
  "id": "uuid",
  "title": "Deploy backend service",
  "completed": false,
  "priority": "High",
  "assignedTo": "DevOps Team"
}
```

Fields:
- `id` (string, UUID) — unique identifier
- `title` (string, required) — short task title
- `completed` (boolean) — completion state
- `priority` (string) — one of: `Low`, `Medium`, `High` (default `Medium`)
- `assignedTo` (string) — person or team name (default `Unassigned`)

### GET /api/tasks
Description: List all tasks.

Response 200:

```json
[ { ...task }, { ...task } ]
```

Query parameters (optional filtering implemented client-side; server may later support): `status`, `priority`, `assignedTo`.

### POST /api/tasks
Description: Create a new task.

Request body (application/json):

```json
{
  "title": "String",
  "priority": "High|Medium|Low",
  "assignedTo": "String"
}
```

Response 201 (created): returns created task.

Validation errors: 400 with JSON `{ "error": "message" }` when `title` missing or invalid `priority`.

Example curl:

```
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Example task","priority":"High","assignedTo":"Alice"}'
```

### PUT /api/tasks/:id
Description: Update a task (partial updates supported).

Request body: any of `{ title, completed, priority, assignedTo }`.

Response 200: updated task object.

Errors: 404 if task not found; 400 for invalid `priority`.

Example curl (mark complete):

```
curl -X PUT http://localhost:5000/api/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### DELETE /api/tasks/:id
Description: Delete a task.

Response 204: no content on success.

Errors: 404 if task not found.

## In-memory store (development) and swapping to PostgreSQL

- Current dev server keeps tasks in an in-memory `tasks` array (lost on restart) — simple and reliable for demos and CI unit tests.
- To use PostgreSQL in production:
  - Add `pg` (node-postgres) to `Server/package.json` and create a DB client.
  - Move data access into a repository module (e.g., `Server/db/tasks.js`) that exports `list, create, update, delete` functions.
  - Create migration SQL:

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  priority TEXT NOT NULL,
  assigned_to TEXT
);
```

## Errors
- All error responses use JSON `{ "error": "message" }` and appropriate HTTP status codes (400, 404, 500).

## Notes & next improvements
- Add server-side filtering & pagination: `GET /api/tasks?status=Active&priority=High&assignedTo=Alice`.
- Add input sanitisation and stricter validation (e.g., max title length).
- Add integration tests for each endpoint (use in-memory DB or SQLite for CI).
