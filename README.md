# Accommodation (IGH) Booking System

This repository contains the code for the **Accommodation Booking System**, which allows employees to book accommodation and manage meal bookings for a guest house. The system includes both a frontend and a backend. The frontend is built with **Angular**, and the backend is powered by **Spring Boot**.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Backend (Spring Boot)](#backend-spring-boot)
  - [Frontend (Angular)](#frontend-angular)

## Project Overview

The IGH Booking System helps employees book rooms in the guest house based on their grade level, and managers can approve or reject booking requests. The system also allows meal bookings with meal preferences, automatically clearing previous day's meal data after 6 PM.

## Features

- **Employee Login**: Employees can log in using JWT authentication.
- **Room Booking**: Employees can book rooms based on their grade.
- **Manager Approval**: Managers can approve, update, or delete room bookings.
- **Meal Booking**: Employees can book meals (breakfast, lunch, dinner).
- **Auto-Clear Meals**: Meal booking data is reset after 6 PM every day.
- **Admin Panel**: Managers can create, update, and delete room data.
  
## Technologies Used

### Backend (Spring Boot)
- **Spring Boot** for REST API
- **Oracle DB** for data storage
- **JWT Security** for authentication
- **Spring Data JPA** for database interaction

### Frontend (Angular)
- **Angular** v16.2.0 for the UI
- **Auth0 JWT** for secure login
- **FontAwesome** for icons

```bash
git clone https://github.com/sivashankar-selvan/accommodation-system.git
