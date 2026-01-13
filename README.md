# TaskFlow

TaskFlow is a lightweight task-tracking demo application intended for teaching CI/CD, Infrastructure as Code, and DevOps practices. Users can create, update, and track tasks for an internal team (for example, an Operations Team) with fields such as priority, status, dates, and assignee. The app is intentionally minimal so it is easy to use in demos and learning labs.

## Quickstart (local)

Backend:
```bash
cd Server
node server.js
```

Frontend (development):
```bash
cd client
npm start
```

The frontend proxies API requests to `http://localhost:5000` when run locally.

## Example tasks
- Prepare monthly operations report (Medium priority, Alex Morgan)
- Update internal documentation (Low priority, Sam Lee)

You can also add your own tasks via the UI (add title, priority, assignee, and target date).

## CI/CD Pipeline

- **CI** (`.github/workflows/ci.yml`) runs automatically on push or pull request. It installs dependencies, runs linting and tests, builds the frontend and backend artifacts, and stores build artifacts for later stages.
- **CD** (`.github/workflows/cd.yml`) provides a scaffold to package Docker images and apply infrastructure changes via Terraform. When configured, secrets are supplied through GitHub Actions secrets and the workflow can push images to a registry and update cloud infrastructure (e.g., ECS + RDS).

## Repo layout
- `client/` — React SPA
- `Server/` — Node.js Express API
- `infra/` — Terraform scaffold
- `.github/workflows/` — CI/CD workflow scaffolds

See `design.md` and `docs/api.md` for architecture and API details.

## Demo / Next Steps
1. Start backend: `cd Server && node server.js`
2. Start frontend: `cd client && npm start`
3. View example tasks in the browser at `http://localhost:3000`
4. Make a small UI change, commit & push → observe the CI workflow run on GitHub Actions
5. Optional: configure the CD workflow and `infra/` to deploy to AWS ECS/Fargate (requires AWS credentials and registry access)

## Optional: Screenshot
Add a screenshot of the running app (`client/src` UI) or paste a small JSON snippet of example tasks to make the README more illustrative.

## The Next steps for maintainers
- Add unit/integration tests for backend routes and frontend components.
- Configure GitHub Actions secrets for CD (registry credentials, cloud provider credentials).
- Expand `infra/` terraform modules to provision target cloud infrastructure.

