 # DevOps Pipeline Application Ideation - Student Worksheet

 ---

 ## Part 1: Individual Ideation

 ### Your Application Concept

 **1. Basic Description**

 What does your application do? (1–2 sentences)

 TaskFlow is a lightweight, team-based task management web application that allows users to create, update, prioritise, assign, and complete operational tasks.
 The application is intentionally minimal and is designed primarily to demonstrate CI/CD pipelines, Infrastructure as Code, and core DevOps practices rather than full product functionality.

 Who would use it?

 Small teams, operations teams, instructors, or demo audiences who require a simple but realistic application to support demonstrations of modern DevOps workflows.

 ---

 **2. Technical Architecture**

 What technology stack are you considering?

 - **Language/Framework:**  
   Frontend: React (Single Page Application)  
   Backend: Node.js with Express (REST API)

 - **Database (if needed):**  
   Development: In-memory store  
   CI: SQLite  
   Production: PostgreSQL (AWS RDS)

 - **Other components:**  
   Docker (containerisation)  
   GitHub Actions (CI/CD)  
   Terraform (Infrastructure as Code)  
   AWS ECS Fargate (container orchestration)  
   AWS CloudWatch (logging and monitoring)

 Application type:
 - [x] Single page
 - [ ] Multi-page
 - [x] API + Frontend
 - [ ] Other: _________

 ---

 **3. Pipeline Opportunities**

 | Pipeline Element | How my application enables this |
 |-----------------|--------------------------------|
 | **Source Control** | Source code is stored in a GitHub repository, enabling version control, collaboration, and rollback via commits and branches. |
 | **Automated Testing** | Unit tests validate task creation, updates, status changes, and deletion, providing early feedback on code changes. |
 | **Build Process** | Docker images are built for frontend and backend to ensure consistent and repeatable builds across environments. |
 | **Infrastructure as Code** | Terraform provisions cloud resources such as networking, ECS services, load balancers, and databases in a reproducible manner. |
 | **Deployment Automation** | GitHub Actions automatically deploy updated container images and infrastructure changes to AWS environments. |
 | **Configuration Management** | Environment variables and secrets are managed per environment, separating configuration from application code. |
 | **Monitoring/Logging** | Application and container logs are streamed to AWS CloudWatch for visibility, troubleshooting, and operational insight. |

 ---

 **4. Complexity Balance**

 Is this simple enough to implement quickly but complex enough to demonstrate learning?

 Yes. The application has a deliberately small feature set (task CRUD operations) while still supporting a complete DevOps lifecycle, including testing, containerisation, infrastructure provisioning, and automated deployment.

 Confidence in implementing this:
 - [ ] Low
 - [ ] Medium
 - [x] High

 Why?

 The application logic is minimal and well-defined, allowing effort to be focused on pipeline design, infrastructure automation, and deployment practices, which are the primary learning objectives of the assessment.

