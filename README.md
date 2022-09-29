# LAB - Class 08

## Project: Access Control

### Author: KC Hofstetter

### Problem Domain

Being able to login is great. But controlling access at a more granular level is vital to creating a scalable system. In this lab, you will implement Role Based Access Control (RBAC) using an Access Control List (ACL), allowing to not only restrict access to routes for valid users, but also based on the individual permissions we give each user.

### Links and Resources

- [ci/cd](https://github.com/khofstetter94/auth-api/pull/1) (GitHub Actions)
- [back-end server url](https://kmh-auth-api.herokuapp.com/) (when applicable)

### Setup

- `PORT` - 3001
- `DATABASE_URL` - URL to the running Postgres instance/db

#### How to initialize/run your application (where applicable)

- npm start
- nodemon

#### Features / Routes

- Regular users can READ
- Writers can READ and CREATE
- Editors can READ, CREATE, and UPDATE
- Administrators can READ, CREATE, UPDATE, and DELETE

- POST /signup to create a user
- POST /signin to login a user and receive a token
- GET /secret should require a valid bearer token
- GET /users should require a valid token and “delete” permissions

- Restrict access without a valid token AND a specific capability.
  - V2 API Routes (/api/v2/...) must now be protected with the proper permissions based on user capability, using Bearer Authentication and an ACL
  - app.get(...) should require authentication only, no specific roles
  - app.post(...) should require both a bearer token and the create capability
  - app.put(...) should require both a bearer token and the update capability
  - app.patch(...) should require both a bearer token and the update capability
  - app.delete(...) should require both a bearer token and the delete capability

#### Tests

- In auth-server, run 'npm test' in your terminal

#### UML

![Lab 08 UML - Role Based Access Control](/img/Lab08UML.png)
