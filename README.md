# SIT725 – Assignment 8.2HD  
## Dockerised End-to-End Web Application

---

## Overview

This repository contains a full-stack web application developed for SIT725 Assignment 8.2HD. The project demonstrates an end-to-end Dockerised deployment of a web application, including backend services, database integration, frontend delivery, and external API usage.

The application supports user authentication, database-backed functionality, and an AI-powered recipe recommendation feature. All components run inside Docker containers and are orchestrated using Docker Compose to ensure a reproducible and portable deployment environment.

---

## Learning Outcomes Addressed

This project demonstrates the following learning outcomes:

- Containerisation of a complete web application
- End-to-end deployment using Docker Compose
- Integration of MongoDB as a containerised database service
- Secure handling of configuration and secrets using environment variables
- Verification of database-backed functionality inside Docker
- Modular backend architecture using routes, controllers, and services
- Professional debugging, documentation, and deployment practices

---

## Architecture Overview

The application follows a layered architecture:

- Presentation layer: Static frontend assets served via Express
- Application layer: Node.js and Express backend
- Data layer: MongoDB database

Docker Compose is used to orchestrate the application services and manage networking between containers.

### Services

- server  
  Runs the Node.js and Express application. This service handles HTTP requests, authentication logic, database access, and AI API integration. It also serves the frontend assets.

- mongo  
  Runs MongoDB in a container with persistent storage using Docker volumes.

---

## Backend Design

The backend is structured using separation of concerns:

- Routes define HTTP endpoints
- Controllers manage request and response logic
- Services encapsulate business logic and external API interactions
- Configuration files manage database connections and environment setup

This structure improves maintainability, testability, and scalability.

---

## Database Integration

MongoDB is used as the persistence layer for user authentication and related data. The database runs inside a Docker container and persists data using a named Docker volume. This ensures data is retained across container restarts.

The MongoDB connection string is supplied via environment variables, allowing the same codebase to run across different environments without modification.

---

## AI Feature Integration

The application includes an AI-powered recipe recommendation feature using the Google Gemini API. Users provide a list of ingredients through the dashboard interface. These ingredients are sent to the backend, which communicates with the Gemini API to generate recipe suggestions.

The AI integration is implemented server-side to ensure API keys are never exposed to the client. Responses are normalised into a structured JSON format before being returned to the frontend to ensure consistency and usability.

---

## Environment Configuration

Sensitive configuration values such as API keys are managed using environment variables and are not committed to version control.

For assessment submission, the required `.env` file will be attached separately on OnTrack.

Example `.env` file contents:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

---


## Running the Application with Docker

## Prerequisites

- Docker Desktop installed and running
- Git

## How to Dockerise the Application

This application has been dockerised using Docker and Docker Compose to enable an end-to-end, reproducible deployment that includes both the backend server and the database.

The dockerisation process consists of the following steps.

---

### Step 1: Create a Dockerfile for the Backend

A Dockerfile is used to containerise the Node.js and Express backend.

The Dockerfile is located at:

server/Dockerfile


This Dockerfile:
- Uses an official Node.js base image
- Installs backend dependencies
- Copies the server and client source code into the container
- Exposes port 3000
- Starts the application using `node server.js`

This ensures the backend runs in a controlled and consistent environment.

---

### Step 2: Define Services Using Docker Compose

Docker Compose is used to define and orchestrate multiple services required by the application.

The Compose file is located at:

docker-compose.yml


It defines two services:

- **server**  
  Runs the Node.js and Express application

- **mongo**  
  Runs a MongoDB database container with persistent storage using Docker volumes

Docker Compose also:
- Sets up a shared network between services
- Injects required environment variables
- Maps container ports to the host machine

---

### Step 3: Configure Environment Variables

Sensitive configuration values (such as API keys) are provided using environment variables rather than hard-coded values.

These variables are defined in a `.env` file, which is excluded from version control. For assessment purposes, the `.env` file is provided separately via OnTrack.

Docker Compose automatically loads these variables at runtime and passes them to the application container.

---

### Step 4: Build and Run the Containers

From the directory containing `docker-compose.yml`, the application is built and started using:

```bash
docker compose up --build

This command:

Builds the Node.js application image

Pulls the MongoDB image if not already available

Starts both containers

Connects the services using Docker networking

Step 5: Verify the Deployment

Once Docker Compose is running, the application can be verified by:

Opening the application in a browser at:

http://localhost:3000


Accessing the dashboard at:

http://localhost:3000/dashboard

Successful access confirms that the application is running correctly inside Docker.


## Accessing the Application

Once running, the application can be accessed via:

- http://localhost:3000
- http://localhost:3000/dashboard


Step 6: Stop and Re-run the Application

To stop the running containers:

docker compose down


To rebuild and restart the application after changes:

docker compose up --build

MongoDB data persists across restarts using Docker volumes unless explicitly removed.

## Database-Backed Feature Verification

To demonstrate correct database integration:

1. Register a new user using the application
2. Log in with the registered credentials
3. Confirm successful authentication and access to protected features

This verifies that MongoDB is functioning correctly within Docker and that data persistence is operational.

## Required Student Endpoint

As required by the assignment specification, the following endpoint is implemented:

**Endpoint**
```http
GET /api/student
```

**URL**
```
http://localhost:3000/api/student
```

**Response**
```json
{
  "name": "Han Fey Yap",
  "studentId": "s225153983"
}
```

This endpoint confirms that the backend is running correctly inside Docker.

## Testing

Basic automated backend testing has been implemented to validate core functionality. Tests focus on:

- API route availability
- Input validation
- Response structure correctness

The testing setup can be extended further to include mocking of external services if required.

## Re-running and Managing Containers

To stop the application:

```bash
docker compose down
```

To rebuild and restart after changes:

```bash
docker compose up --build
```

Database data persists across restarts using Docker volumes unless explicitly removed.

## Security Considerations

- Environment variables are excluded from version control
- No sensitive credentials are hard-coded
- API keys are handled server-side
- Docker networking isolates internal services

These practices align with secure deployment and development principles.

## Project Structure

```
SIT725_RecipeRecommender/
├── client/
├── server/
│   ├── server.js
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── config/
│   └── Dockerfile
├── docker-compose.yml
├── README.md
└── .env (not committed, provided via OnTrack)
```

## Assessment Notes

This repository is a fork of the original group project and has been adapted for individual submission. All Dockerisation, configuration, documentation, and required endpoint implementation were completed independently.

Screenshots demonstrating application execution, database-backed functionality, and the required `/api/student` endpoint are included in the submitted PDF. The `.env` file is provided separately via OnTrack.

## Conclusion

This project demonstrates a complete, reproducible Docker-based deployment of a full-stack web application with database integration and external API usage. It satisfies the technical and documentation requirements of **SIT725 Assignment 8.2HD** and reflects industry-aligned development and deployment practices.

