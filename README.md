# Referral System API

This project implements a referral system API that allows users to register, log in, track earnings, and handle referral relationships. It includes functionality for calculating profits based on purchases made by referred users, and real-time notifications using Socket.IO.

## Features

- **User Authentication:**
  - Register a new user
  - Login with JWT authentication
  - Auth middleware to protect routes

- **Referral System:**
  - Parent-child user relationships
  - Earnings tracked from referrals (Level 1 and Level 2)
  - Referral earnings breakdown and report

- **Earnings Management:**
  - Purchase transactions that generate referral earnings
  - Profit calculation based on purchase amount

- **Real-time Notifications:**
  - Users are notified when they earn from a referral via Socket.IO

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Socket.IO for real-time notifications
- bcryptjs for password hashing
- body-parser and cors for middleware
- dotenv for environment variables

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (either local or MongoDB Atlas)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/referral-system-api.git
   cd referral-system-api
"# Referral-System" 
