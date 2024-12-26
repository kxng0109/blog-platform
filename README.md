# Blog App

A Node.js application that allows users to create, edit, view, and delete their blogs. The app ensures data security and user authentication using JWT. Admin-level permissions enable enhanced control over user-generated content.

## Table of Contents

- <a href="#features">Features</a>
- <a href="#technologies-used">Technologies Used</a>
- <a href="#prerequisites">Prerequisites</a>
- <a href="#installation">Installation</a>
- <a href="#environment-variables">Environment Variables</a>
- <a href="#usage">Usage</a>
- <a href="#api-endpoints">API Endpoints</a>
- <a href="#license">License</a>

## Features

- **User Authentication**: Secure login and registration using JWT.
- **CRUD Operations**:
	- Users can create, edit, view, and delete their own blogs.
	- Admins can manage all users' blogs.
- **Security Measures**:
	- Implements security headers using helmet.
	- Rate limiting via express-rate-limiter.
- **Database Flexibility**: Uses MongoDB for data storage.

## Technologies Used

- Node.js
- Express.js
- MongoDB (via mongoose)
- JWT
- bcrypt.js
- axios
- helmet
- express-rate-limit


## Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or hosted)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
	```bash
	git clone https://github.com/yourusername/blog-app.git
	cd blog-app
	```

2. Install dependencies:
	```bash
	npm install
	```

3. Set up environment variables (see <a href="#environment-variables">Environment Variables</a>).

4. Start the server:
	```bash
	npm start
	```

## Environment Variables

Create a .env file in the root directory with the following variables:
```plaintext
PORT=3000
MONGO_URI=<link_to_mongodb_database>
JWT_SECRET=<your_jwt_secret>
```
Replace <link_to_mongodb_database> with the path to your mongoDB database
Replace <your_jwt_secret> with a secure secret key for JWT.
Note: Never push your .env file to version control.

## Usage
1. Start the server:
```bash
npm start
```

2. Access the application via:
```plaintext
http://localhost:PORT
```
Note: "PORT" is set to 3000 by default.

3. Use tools like Postman to test API endpoints.

## API Endpoints
### Authentication
- POST /app/register: Register a new user with name, email and password.
- POST /app/login: Login with email and password.

### Blogs
- GET ```/app/blog/```: Fetch all blogs.
- GET ```/app/blogs/:id```: Fetch a single blog by ID.
- GET ```/app/blog/personal/```: Fetch your own blogs
- POST ```/app/blogs```: Create a new blog.
- PATCH ```/app/blogs/:id```: Update a blog by ID.
- DELETE ```/app/blogs/:id```: Delete a blog by ID.
Note: Authentication is required for all endpoints.

## License
This project is licensed under the MIT License - see the <a href="/LICENSE">LICENSE</a> file for details.
