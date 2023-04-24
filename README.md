# **_Getting Started with Node.js and TypeScript_**

This project is built using Node.js and TypeScript, and uses the Express framework for creating web applications. It also utilizes Mongoose as an Object Data Modeling (ODM) library for MongoDB.

## **Prerequisites**

Before running this project, ensure that you have the following software installed on your machine:

-   Node.js (v14.17.0 or higher)
-   Yarn (v1.22.10 or higher)

## **Installation**

To install this project, follow the steps below:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `yarn / yarn add` to install all the project dependencies.
4. Exchange the env file with the .env.example file and fill in the required fields.

## **Running the Project**

To run the project, execute the following command in your terminal: `yarn dev `

-   This will start the on http://localhost:4000/
-   For Live demo: [click me](https://documentation-portfolio.onrender.com/)...

<!-- ## **API Documentation**

The API documentation for this project is available at https://documenter.getpostman.com/view/16736400/Tzz7QJ7o. -->

[//]: # 'Path: README.md'

## **Project Structure**

The project follows the Model-View-Controller (MVC) pattern for structuring the application code. The folder structure is as follows:

 <!-- Contains the source code for the application. -->

-   base-routes/: Contains the base route files for each endpoint.
-   controllers/: Contains the controller files for each endpoint.
-   middlewares/: Contains the middleware files for the application.
-   models/: Contains the Mongoose model files for each data entity.
-   routes/: Contains the route files for each endpoint.
-   config/: Contains the configuration files for the application.
-   types/: Contains TypeScript type definitions.
-   utils/: Contains the utility files for the application.
-   types.d.ts: Contains the compiled TypeScript files, ready for deployment.
-   src/ server.ts: The main file for setting up the Express app.

## **Open Source Contribution**

Contributing to this project is welcomed and appreciated. If you would like to contribute, please follow these steps:

-   Fork the repository.
-   Create a new branch with a descriptive name for your changes.
-   Make your changes, ensuring that they follow the project's code style and guidelines.
-   Write tests for your changes and ensure that all tests pass.
-   Submit a pull request to the original repository's main branch with a clear description of your changes.

We value contributions that improve the project's functionality, fix bugs, improve performance, or enhance security. Contributions that add new features, optimize existing code, or improve documentation are also welcomed.

## **Conclusion**

👉 This project is an **Open Source** web application built on Node.js and TypeScript, utilizing the Express framework and Mongoose as an ODM library for MongoDB. It includes token-based security for API authentication, and contributions to this project are appreciated. Contributors can follow the steps outlined above to submit their changes.
