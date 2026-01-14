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

# TaskFlow S3 bucket for frontend deployment
resource "aws_s3_bucket" "taskflow_demo" {
  bucket = "taskflow-demo-${var.project_suffix}"
  acl    = "public-read"

  # Enable static website hosting for React app
  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = {
    Name        = "TaskFlow Demo"
    Environment = "Dev"
  }
}
