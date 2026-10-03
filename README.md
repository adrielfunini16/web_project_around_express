# Around the U.S. — Express Backend

Backend API for the **Around the U.S.** application, built with **Node.js**, **Express**, **MongoDB**, and **Mongoose** as part of the TripleTen Full-Stack Web Development program.

The project has evolved from reading local JSON files to storing users and cards in MongoDB. It now includes database models, schema validation, controllers, profile updates, card creation and deletion, and like/unlike operations.

## Project Overview

The API manages two resources: **users** and **cards**. Express routers define the endpoints, controllers handle requests and database operations, and Mongoose models define the document structure and validation rules.

The current database connection is configured in `app.js`:

```text
mongodb://localhost:27017/aroundb
```

## Features

- **Database operations:** MongoDB persistence with Mongoose; user creation, listing, lookup, and profile/avatar updates; card creation, listing, and deletion.
- **Modular architecture:** separate Express routers, controllers, and models, with user references stored as ObjectIds.
- **Validation:** required fields, string-length constraints, shared URL validation, and validators enabled on profile/avatar updates.
- **Likes:** add and remove user references with `$addToSet` and `$pull`, avoiding duplicate likes.
- **Request and error handling:** JSON body parsing, appropriate HTTP status codes, missing-document handling, and a fallback `404` route.
- **Development workflow:** configurable server port, Nodemon, ESLint with Airbnb Base, and manual API testing with Postman.

## Data Models

### User

| Field | Type | Validation |
| --- | --- | --- |
| `name` | String | Required; 2–30 characters |
| `about` | String | Required; 2–30 characters |
| `avatar` | String | Required; custom HTTP/HTTPS URL validation |

### Card

| Field | Type | Validation or default |
| --- | --- | --- |
| `name` | String | Required; 2–30 characters |
| `link` | String | Required; custom HTTP/HTTPS URL validation |
| `owner` | ObjectId | Required; references the user model |
| `likes` | Array of ObjectId | References the user model; defaults to an empty array |
| `createdAt` | Date | Defaults to the creation time |

The shared URL validator is defined in `utils/validation.js`. The `owner` and `likes` fields store user references; the current controllers return these IDs without populating the related user documents.

## API Endpoints

Base URL for local development: `http://localhost:3000`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/users` | Returns all users |
| `GET` | `/users/:userId` | Returns a user by ID |
| `POST` | `/users` | Creates a user with `name`, `about`, and `avatar` |
| `PATCH` | `/users/me` | Updates the development user's `name` and `about` |
| `PATCH` | `/users/me/avatar` | Updates the development user's `avatar` |
| `GET` | `/cards` | Returns all cards |
| `POST` | `/cards` | Creates a card with `name` and `link`; sets `owner` from `req.user._id` |
| `DELETE` | `/cards/:cardId` | Deletes a card by ID |
| `PUT` | `/cards/:cardId/likes` | Adds the development user's ID to the likes array without duplicates |
| `DELETE` | `/cards/:cardId/likes` | Removes the development user's ID from the likes array |

### HTTP Responses

- `200 OK`: successful reads, updates, card deletion, and like/unlike operations
- `201 Created`: successful user or card creation
- `400 Bad Request`: validation failures and invalid IDs handled by the relevant controllers
- `404 Not Found`: missing documents handled with `orFail()`, or unsupported routes
- `500 Internal Server Error`: unexpected errors handled by the controllers

The current API returns application error messages in Portuguese. This example preserves the actual response; the message means “User ID not found”:

```json
{
  "message": "ID do usuário não encontrado"
}
```

### Example Card Creation Response

A successful `POST /cards` returns `201 Created` with the saved card document:

```json
{
  "name": "Mountain view",
  "link": "https://example.com/mountain.jpg",
  "owner": "507f1f77bcf86cd799439011",
  "likes": [],
  "_id": "507f191e810c19729de860ea",
  "createdAt": "2026-10-03T19:00:00.000Z",
  "__v": 0
}
```

This is an illustrative response based on the current model and controller, not a captured request. IDs and timestamps will vary. The `owner` value comes from the configured development user, `likes` starts empty, and `__v` is Mongoose's version key.

## Technologies

- **JavaScript**
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Postman**
- **Nodemon**
- **ESLint + Airbnb Base**
- **Git & GitHub**

## Project Structure

- `app.js`: Express setup, MongoDB connection, JSON middleware, development-user middleware, mounted routers, fallback route, and server startup
- `routes/users.js` and `routes/cards.js`: endpoint definitions
- `controllers/users.js` and `controllers/cards.js`: request handlers, database operations, and error responses
- `models/user.js` and `models/card.js`: Mongoose schemas and models
- `utils/validation.js`: shared URL-validation helper
- `package.json` and `package-lock.json`: dependencies and npm scripts
- `.editorconfig`, `.eslintrc`, and `.gitignore`: development configuration
- `README.md`: project documentation

## Running the Project Locally

### Prerequisites

- Node.js and npm
- MongoDB installed and running locally on port `27017`
- Postman or another HTTP client to exercise the API

### Installation

```bash
git clone https://github.com/adrielfunini16/web_project_around_express.git
cd web_project_around_express
npm install
```

Ensure MongoDB is running, then start the server:

```bash
npm run start
```

For development with automatic restart:

```bash
npm run dev
```

To run the linter:

```bash
npm run lint
```

The server listens on port `3000` by default. An alternative port can be supplied through `PORT`. The MongoDB connection string is currently fixed in `app.js`; this version does not read a database URI from an environment variable.

### Development User Setup

This stage uses middleware in `app.js` to assign a fixed `req.user._id` to every request. It is a development placeholder, not authentication.

To test profile updates and use a real user as the owner of cards and likes:

1. Create a user with `POST /users`.
2. Copy the returned MongoDB `_id`.
3. Replace the placeholder `_id` in the development-user middleware in your local `app.js` with that value.
4. Restart the server, or let Nodemon restart it.

Example request body for creating a user:

```json
{
  "name": "Adriel",
  "about": "Full Stack Developer",
  "avatar": "https://example.com/avatar.jpg"
}
```

Example request body for creating a card:

```json
{
  "name": "Mountain view",
  "link": "https://example.com/mountain.jpg"
}
```

Send JSON request bodies with the `Content-Type: application/json` header.

## What I Practiced

- Connecting an Express application to MongoDB
- Designing Mongoose schemas and models
- Creating, reading, updating, and deleting database documents
- Representing relationships with `ObjectId` references
- Validating fields and handling Mongoose errors
- Separating routing, controller logic, and database models
- Managing asynchronous database operations with Promises
- Using `orFail()` for missing documents
- Updating arrays with `$addToSet` and `$pull`
- Testing API behavior with Postman
- Documenting endpoints and local setup

## Current Scope

This repository represents the **Sprint 16 MongoDB/Mongoose backend stage** of the Around the U.S. project. Database persistence and the endpoints documented above are implemented.

Registration/login, password hashing, JWT authentication, and ownership-based authorization are not implemented in this version. Card deletion currently operates by card ID without checking ownership. Users have `name`, `about`, and `avatar` fields; email and password fields are not part of the current user model.

The npm `test` script is still a placeholder. API behavior has been exercised manually with Postman; an automated test suite is not included.

## Planned

The following items are planned for the next stages of the project and are not implemented in this version:

- Add signup/signin endpoints and extend the user model with email and password fields.
- Hash passwords before storage and verify them during signin.
- Issue and validate JWTs for authentication.
- Replace the fixed development user with authentication middleware and add authorization checks.
- Restrict card deletion to its owner, returning `403 Forbidden` when another user attempts to delete it.
- Standardize application response messages in English.
- Connect the React front end to this API and its MongoDB database during the final integration stages of the bootcamp.

## Related Repositories

- [Around the U.S. — React Front End](https://github.com/adrielfunini16/web_project_around_react)
- [React Live Demo](https://adrielfunini16.github.io/web_project_around_react/)

The React application currently consumes a separate external API and its database. It is **not yet connected to this Express/MongoDB backend**. The front end shows the interface and user flows that will be connected to this API as the project progresses toward full-stack integration.

## Author

**Adriel Funini dos Santos**

Full-Stack Web Development student focused on JavaScript, React, Node.js, Express, MongoDB, Mongoose, REST APIs, and modern web development.

- GitHub: [Adriel Funini](https://github.com/adrielfunini16)
- LinkedIn: [Adriel Funini](https://www.linkedin.com/in/adriel-funini/)
