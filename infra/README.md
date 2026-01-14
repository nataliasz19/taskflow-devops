# TaskFlow Infrastructure (Terraform)

This folder contains Terraform configuration for TaskFlow, a lightweight task-tracking application. It defines the infrastructure required to deploy the frontend React application to AWS.

## Overview

- **Infrastructure as Code**: Terraform is used to provision resources declaratively.
- **Frontend Deployment**: The React frontend is deployed as static assets to an S3 bucket.
- **Consistency & Reproducibility**: Using Terraform ensures all environments can be provisioned consistently and audited.
- **CI/CD Integration**: Infrastructure provisioning is part of the automated workflow, demonstrating end-to-end DevOps practices.

## Prerequisites

- Terraform installed locally: [https://www.terraform.io/downloads](https://www.terraform.io/downloads)
- AWS account and configured credentials (`aws configure`) or GitHub Actions OIDC setup.
- React frontend built: run `npm run build` in the frontend folder.

## Usage

1. Navigate to this folder:
   ```bash
   cd infra
