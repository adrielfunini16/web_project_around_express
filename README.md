# Around the U.S. — Express Backend

Backend server for the **Around the U.S.** application, built with **Node.js** and **Express** as part of the TripleTen Full-Stack Web Development program.

This project focuses on the server-side foundation of the application: organizing API routes, handling HTTP requests and responses, reading and processing JSON data, returning appropriate HTTP status codes, and implementing error handling for unavailable resources and server-side failures.

## Project Overview

The server exposes endpoints for two main resources: **users** and **cards**. The application uses modular Express routers to separate responsibilities and keep the server structure organized and maintainable.

At this stage of the project, data is stored in local JSON files and accessed asynchronously through Node.js file-system APIs. This provides the backend foundation that can later be extended with persistent database storage.

## Features

- Node.js server built with Express
- Modular routing with `express.Router()`
- REST-style endpoints for users and cards
- Dynamic route parameters for retrieving a user by ID
- Asynchronous JSON file reading with Node.js `fs`
- File path handling with Node.js `path`
- JSON parsing and response handling
- HTTP status codes for successful and unsuccessful requests
- `404 Not Found` handling for unknown users and unsupported routes
- `500 Internal Server Error` handling for file-reading failures
- Configurable server port through the `PORT` environment variable
- Development workflow with Nodemon
- ESLint configuration based on Airbnb's JavaScript style guide
- API behavior and error responses tested during development with Postman

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/users` | Returns all users |
| `GET` | `/users/:id` | Returns a specific user by ID |
| `GET` | `/cards` | Returns all cards |
| Any | unsupported route | Returns a `404` response |

### Example error response

```json
{
  "message": "ID do usuário não encontrado"
}
```

## Technologies

- **JavaScript (Node.js)**
- **Express.js**
- **Node.js File System (`fs`)**
- **Node.js Path (`path`)**
- **JSON**
- **HTTP / REST concepts**
- **Postman** for API testing and debugging
- **Nodemon** for development
- **ESLint + Airbnb Base** for code quality
- **Git & GitHub** for version control

## Project Structure

```text
web_project_around_express/
├── data/
│   ├── cards.json
│   └── users.json
├── routes/
│   ├── cards.js
│   └── users.js
├── app.js
├── package.json
├── package-lock.json
├── .editorconfig
├── .eslintrc
├── .gitignore
└── README.md
```

The routing logic is separated into dedicated modules under `routes/`, while `app.js` is responsible for initializing Express, mounting the routers, handling unsupported routes, and starting the server.

## Running the Project Locally

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/adrielfunini16/web_project_around_express.git
cd web_project_around_express
npm install
```

Start the server:

```bash
npm start
```

The server uses port `3000` by default and can also receive a custom `PORT` environment variable.

For development with automatic server restart:

```bash
npm run dev
```

## What I Practiced

This project strengthened my understanding of backend development and the request-response lifecycle in Node.js and Express. In particular, I practiced:

- Structuring backend code with modular routers
- Mapping HTTP requests to resource-specific handlers
- Working with route parameters through `req.params`
- Reading server-side data asynchronously
- Parsing and returning JSON data
- Choosing HTTP status codes for different outcomes
- Handling missing resources and server errors
- Testing endpoints and debugging API behavior with Postman
- Managing dependencies and development scripts with npm
- Using environment variables for server configuration

## Current Scope

This repository represents the **Express backend stage** of the Around the U.S. project. It currently uses JSON files as its data source and implements read operations for users and cards. Database persistence, authentication, and additional CRUD operations are outside the current scope of this version.

This distinction is intentional: the README documents what is actually implemented in the repository rather than presenting future functionality as completed work.

## Author

**Adriel Funini dos Santos**

Full-Stack Web Development student focused on JavaScript, React, Node.js, Express, REST APIs, and modern web development.

- GitHub: [Adriel Funini](https://github.com/adrielfunini16)
- LinkedIn: [Adriel Funini](https://www.linkedin.com/in/adriel-funini/)
