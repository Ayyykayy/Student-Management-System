# Student Management System

A full-stack Student Management System developed using Angular and Spring Boot. This application provides a simple and efficient platform to manage student records through a responsive web interface connected with REST APIs.

The system allows users to create, view, update, and delete student information while maintaining data through backend services and database integration.

## Project Overview

The Student Management System is designed to simplify the process of handling student data in an academic environment. It includes a frontend application built with Angular that communicates with a Spring Boot backend using HTTP requests.

Users can manage student details such as name, email, course, academic year, parent's details, and phone number. The application follows a structured architecture with separate frontend and backend layers.

## Features

* Student registration
* View all student records
* Edit existing student information
* Delete student records
* Student count display
* Form validation
* User-friendly dashboard interface
* REST API communication
* Database storage and retrieval

## Tech Stack

### Frontend

* Angular
* TypeScript
* HTML
* CSS
* Angular Reactive Forms
* Angular Routing
* HttpClient

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* REST API

### Database

* PostgreSQL

### Development Tools

* Git
* GitHub
* IntelliJ IDEA
* VS Code / Antigravity IDE
* Postman

## Project Structure

```
Student-Management-System

├── src
│   └── Angular Frontend
│
├── backend
│   ├── src/main/java
│   │   ├── Controller
│   │   ├── Entity
│   │   ├── Repository
│   │   └── Service
│   │
│   └── pom.xml
│
└── README.md
```

## Installation and Setup

Clone the repository:

```bash
git clone <repository-url>
```

Open the project folder:

```bash
cd Student-Management-System
```

## Frontend Setup

Install dependencies:

```bash
npm install
```

Start Angular development server:

```bash
ng serve
```

Frontend URL:

```
http://localhost:4200
```

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Run Spring Boot:

```bash
./mvnw spring-boot:run
```

Backend URL:

```
http://localhost:8080
```

## API Endpoints

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| GET    | /students      | Fetch all students     |
| GET    | /students/{id} | Fetch student by ID    |
| POST   | /students      | Create new student     |
| PUT    | /students/{id} | Update student details |
| DELETE | /students/{id} | Remove student         |

## Application Modules

### Student Dashboard

Displays all available student records with options to edit and delete data.

### Add Student

Allows adding new student information using validated forms.

### Edit Student

Updates existing student details and synchronizes changes with the database.

### Backend API

Handles requests from Angular, processes data, and performs database operations.

