# TaskFlow

TaskFlow is a lightweight task-tracking demo application intended for teaching CI/CD, Infrastructure as Code, and DevOps practices. It includes a React frontend and Node.js backend with a simple REST API.

## Quickstart (local)

Backend:
```bash
cd Server
node server.js
```

Frontend:
```bash
cd client
npm start
```

The frontend proxies API requests to `http://localhost:5000`.

## Repo layout
- `client/` — React SPA
- `Server/` — Node.js Express API
- `infra/` — Terraform scaffold
- `.github/workflows/` — CI/CD workflow scaffolds

See `design.md` and `docs/api.md` for architecture and API details.

## Next steps
- Configure CI (`.github/workflows/ci.yml`) and CD (`.github/workflows/cd.yml`).
- Use `infra/` as a starting point for Terraform-based deployments.
