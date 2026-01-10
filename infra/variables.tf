variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "project_suffix" {
  description = "A short suffix to make resource names unique"
  type        = string
  default     = "dev"
}
