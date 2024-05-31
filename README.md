# AI Chatbot Mock Interview Application

## Overview
The Mock Interview Application is designed to help users practice job interviews using an AI chatbot. This project includes a React frontend and a Node.js/Express backend.


## Dependencies

### Frontend (client)
- `react`: JavaScript library for building user interfaces
- `react-dom`: Serves as the entry point to the DOM and server renderers for React
- `react-scripts`: Scripts and configuration used by Create React App
- `http-proxy-middleware`: For setting up a proxy to the backend

### Backend (server)
- `express`: Fast, unopinionated, minimalist web framework for Node.js
- `body-parser`: Node.js body parsing middleware
- `dotenv`: Module that loads environment variables from a `.env` file into `process.env`
- `cors`: Middleware for enabling Cross-Origin Resource Sharing (CORS)
- `concurrently`: Run multiple commands concurrently (e.g., starting both frontend and backend)

## Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).

### Installation
1. **Clone the Repository**
   ```bash
   git clone 
   cd Mission3App

2. **Install Dependencies**
    ```bash
    cd server
    npm install

    cd ../client
    npm install

Install root dependencies:
    cd ..
    npm install
    npm install concurrently --save-dev

3. **Create .env file**

SERVER_PORT=3001


To start the application run npm start and it will run both front end and back end concurrently 