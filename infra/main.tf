terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Example placeholder resource: S3 bucket (for demo only)
resource "aws_s3_bucket" "taskflow_demo" {
  bucket = "taskflow-demo-${var.project_suffix}"
  acl    = "private"
}
