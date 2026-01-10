# Infrastructure (Terraform) — scaffold

This folder contains a minimal Terraform scaffold for TaskFlow. It is intentionally small and intended as a starting point for provisioning in AWS (VPC, ECS, RDS, ECR).

Usage (local development / scaffold):

1. Install Terraform.
2. Configure AWS credentials (or set up OIDC in GitHub Actions).
3. Update `variables.tf` with sensible defaults or use `-var` flags.
4. `terraform init` then `terraform plan`.

This scaffold does not apply real resources by default — it's a starting template for exercises.
