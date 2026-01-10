# Suggested Issues / Roadmap

1. Add server-side input validation and tests
   - Implement validation middleware for `POST /api/tasks` and `PUT /api/tasks/:id`
   - Add unit tests for task CRUD

2. Add PostgreSQL integration and migrations
   - Create `Server/db/tasks.js` repository layer
   - Add migrations and CI matrix for DB-backed tests

3. Create production-ready Terraform modules
   - VPC, ECS cluster (Fargate), ALB, RDS (Postgres), ECR
   - Outputs for service endpoints and secrets

4. Implement GitHub Actions CD to build/push images to ECR and run Terraform apply

5. Add basic monitoring and alerts
   - CloudWatch log groups, metrics, and example alarm

6. Add Docker Compose for local multi-service runs
