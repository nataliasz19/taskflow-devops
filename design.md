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
  "assignedTo": "Operations Team"
[
  {
    "id": "uuid-1",
    "title": "Prepare monthly operations report",
    "completed": false,
    "priority": "Medium",
    "assignedTo": "Operations Team"
  },
  {
    "id": "uuid-2",
    "title": "Update internal knowledge base",
    "completed": true,
    "priority": "Low",
    "assignedTo": "Bench Team"
  },
  {
    "id": "uuid-3",
    "title": "Review project onboarding checklist",
    "completed": false,
    "priority": "High",
    "assignedTo": "Operations Team"
  }
]

