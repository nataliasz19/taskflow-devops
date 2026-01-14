# TaskFlow

TaskFlow is a lightweight task-tracking application intended for teaching CI/CD, Infrastructure as Code, and DevOps practices. Taskflow is aimed at small teams (for example, an Operations Team) and users can create, update, track and archive tasks with fields such as priority, status, dates, and assignee. The goal is to provide a clean, minimal interface that supports internal team workflows while serving as a platform for demonstrating DevOps automation. 

---

## Quickstart (Local Development)

### Backend
```bash
cd Server
node server.js
```

### Frontend
```bash
cd client
npm start
```

The frontend proxies API requests to `http://localhost:5000` when run locally.

---

## Example Tasks

- Prepare monthly operations report (Medium priority, Alex Morgan)  
- Update internal documentation (Low priority, Sam Lee)  

You can add your own tasks via the UI.

---

## CI/CD Pipeline

### Continuous Integration (CI)

The CI workflow (`.github/workflows/ci.yml`) runs automatically on push or pull request.  
It performs:

- Dependency installation  
- Linting  
- Independent builds for the frontend and backend  
- Validation of code changes  

This demonstrates Continuous Integration, fast feedback, and modular build stages.

### Infrastructure as Code (IaC)

The `infra/` directory contains Terraform configuration used to provision cloud infrastructure.  
In the current setup, Terraform creates an Amazon S3 bucket used to host the built React frontend.

### Deployment

The frontend is deployed by uploading the React build output to the S3 bucket created by Terraform.  
This mirrors common industry patterns for hosting static single‑page applications.

Backend deployment is scaffolded for future extension.

---

## Repository Layout

```
client/               # React frontend (SPA)
Server/               # Node.js + Express backend API
infra/                # Terraform configuration (S3 hosting)
.github/workflows/    # CI workflow
```

---

## Demo / How to Use

1. Start backend:
   ```bash
   cd Server && node server.js
   ```

2. Start frontend:
   ```bash
   cd client && npm start
   ```

3. View the application at:
   ```
   http://localhost:3000
   ```

4. Make a small code change and push to GitHub to observe the CI workflow run.

5. Provision infrastructure with Terraform:
   ```bash
   cd infra
   terraform init
   terraform apply
   ```

6. Upload the React build to the S3 bucket to deploy the frontend.

---

## Next Steps for Maintainers

- Add unit and integration tests for backend routes and frontend components  
- Expand Terraform modules for backend deployment  
- Add monitoring, logging, and automated tests  
- Integrate advanced deployment strategies (such as blue‑green or canary releases)  
- Configure GitHub Actions secrets for automated deployment  

---




