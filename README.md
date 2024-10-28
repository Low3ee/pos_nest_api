# NESTJS Auth API by jlerocher

This is a application for managing users, roles, and permissions, organizations, and more. All in NestJS and TypeScript and Postgres SQL. At the end it will provide a RESTful API for:

- User management(create, read, update, delete)
- Role & Permission management
- Organization management(Create, Read, Update, Delete, Add user to organization, Remove user from organization)
- User authentication
  - Login(Password, Socials, Magic Links)
  - Logout
  - Refresh Token
  - Forgot Password
  - Reset Password
  - Change Password
- User authorization

## Tech Stack

- **NestJS** as a backend framework
- **TypeScript** for strong typing and better code quality
- **Prisma** for database ORM
- **PostgreSQL** as a database
- **Swagger** for API documentation
- **Jest** for unit testing
- **Supertest** for API testing
- **Prettier** for code formatting
- **ESLint** for code linting

## Getting Started

To get started, follow these steps:

### Clone the repository

    To clone the repository, use the following command:

    ```bash
    git clone https://github.com/jlerocher/nestjs-auth-api.git
    ```

### Install dependencies

To install the dependencies, use the following command:

    ```bash
    npm install
    ```

### Populate .env file

    To populate the .env file, fill all the fields with the appropriate values in the .env.example file and rename it to .env

### Run the application

To run the application, use the following command:

    ```bash
    npm run start:dev
    ```

## Usage

The application is now running on port 3030. You can access the API documentation at [http://localhost:3030/swagger](http://localhost:3030/swagger).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License.
