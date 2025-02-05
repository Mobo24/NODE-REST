# Node.js REST API for Resume

This is a Node.js REST API that provides user registration and login functionality along with authentication and authorization middleware. The API is designed to serve as a backend for my resume and portfolio, and it can be extended in the future with additional endpoints.

## Features

- **User Registration:** Allows new users to register.
- **User Login:** Enables users to securely log in.
- **Authentication & Authorization:** Protects routes using middleware.
- **Extensible:** Easily add new endpoints and functionality as needed.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or above)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Mobo24/NODE-REST

2. **Navigate to the project directory:**

    ```bash
    cd your-repo-name

3. **Install dependencies:**

    ```bash
    npm i

4. **Configure environment variables:**

    ```bash
    MONGO_URL = "************************"
    CRYPTO_SECRET ="******************"
    JWT_SECRET_KEY ="*******************"
    JWT_HEADER= "****************"

## Running the App

### Start the Server

    To run the application in production mode, use:

    npm start
    Development Mode:
    For development, if you are using nodemon, you can run:

    npm run dev
    (Ensure you have the following scripts in your package.json if you haven't already:)

    "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
    }

## Running Tests
    Tests are already included. You run them with
    npm test

## Inspiration And Learning Material
    TomDoesTech. “Build a REST API with Node.Js, Express, TypeScript, MongoDB & Zod.” YouTube, YouTube, 5 Oct. 2021, www.youtube.com/watch?v=BWUi6BS9T5Y. 

## Future Plans

- **Resume Integration:** Further develop the API to integrate with my resume, including endpoints. Thinking of creating an easter egg section 
- **Expand Tests And Security Measures:** Add more robust error handling, validation, and additional security measures, expand the tests.
- **Frontend Integration:** Develop a frontend interface to showcase my resume data directly from the API. Think of it like a content manager system.

## License

This project is licensed under the MIT License.