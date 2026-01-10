# TaskFlow — Design Document

## Elevator pitch
TaskFlow is a lightweight, team-focused task tracker designed to demonstrate CI/CD, Infrastructure as Code, and core DevOps practices. It is a minimal React SPA with a Node.js/Express API suitable for demos and learning labs.

## Target users & problem
- Small teams, instructors, or demo audiences who need a realistic but simple app to show pipeline and infra practices.
- Problem solved: provides a concise, runnable application surface for teaching and validating DevOps workflows.

## High-level architecture
- Frontend: React SPA (containerised)
- Backend: Node.js + Express REST API (containerised)
- Data: in-memory for dev / SQLite for CI; PostgreSQL (RDS) in production
- Deployment: Docker images pushed to ECR and deployed to ECS Fargate behind an ALB
- Infra as code: Terraform to provision networking, ECS, RDS, IAM, and logging
- CI/CD: GitHub Actions for lint/test/build and CD to push images + run Terraform

## Core data model
Each task includes:

```json
{
  "id": "uuid",
  "title": "Deploy backend service",
  "completed": false,
  "priority": "High",
  "assignedTo": "DevOps Team"
}
```

This model keeps the domain simple but supports realistic demo scenarios (assignment, priority, filters).

## Minimal API summary
- `GET /tasks` — list tasks
- `POST /tasks` — create task { title, priority?, assignedTo? }
- `PUT /tasks/:id` — update fields including `completed`, `title`, `priority`, `assignedTo`
- `DELETE /tasks/:id` — remove task

Responses use JSON and standard HTTP status codes. Validation: `title` required on create; `priority` enum (Low/Medium/High) recommended.

## Run locally (developer flow)
1. Start backend:

```bash
cd Server
node server.js
```

2. Start frontend:

```bash
cd client
npm start
```

The React dev server proxies API requests to `http://localhost:5000` (see `client/package.json`).

## CI/CD & Infra notes (scaffold)
- CI: run ESLint, unit tests, and build checks on pushes/PRs.
- CD: build Docker images, push to ECR, run Terraform apply targeting a staging workspace, update ECS service image.
- Secrets: store DB credentials and other secrets in AWS Secrets Manager or Parameter Store; grant least-privilege to GitHub Actions via OIDC.

## Out of scope (intentionally)
- Authentication/authorization
- Notifications and webhooks
- Complex RBAC or multi-tenant support

## Next recommended steps
1. Create `docs/api.md` with full request/response examples and validation rules.
2. Add `Server/Dockerfile` and `client/Dockerfile` for container builds.
3. Add GitHub Actions workflows for CI and CD scaffolding.

---
Generated as the living design doc for the TaskFlow demo application.
