# Login-Signup-ChangePassword-Flow-with-Adaptive-Cards

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.3.

## Pre-Requisites: Install the following-
1. [Angular CLI]() 
2. [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)
3. [Node.js](https://nodejs.org/en/download/)
4. [Express.js](https://expressjs.com/en/starter/installing.html#:~:text=Now%20install%20Express%20in%20the%20myapp%20directory)
5. [NoSQLbooster for MongoDB](https://nosqlbooster.com/downloads)

## Follow these steps
    Clone the Repo (Check out the code to local machine)
    Create a database “dummy”
    Run the commands from /src/databaseSetup.txt
    This will create a table and add entries.
    Open a terminal at root and run following commands
        ng build (This will build your project and check for all dependencies)
        node server.js (This will initialize the express server and host it locally. You can visit http://localhost:4200

## Output:
![image](https://github.com/jadhavnikhil953/Login-Signup-ChangePassword-Flow-with-Adaptive-Cards/assets/95047914/fe83e5e2-24f7-4802-bc4b-cc7cb881c046)

## Database setup:
![image](https://github.com/jadhavnikhil953/Login-Signup-ChangePassword-Flow-with-Adaptive-Cards/assets/95047914/2bdcd116-33ff-4e1d-8a68-031a6327c1f2)

## Crypto-js
Here, I have used AES for encrypting and decrypting sensitive information over the network calls and HmacSHA256 to hash the password before storing in the database. Reference to these algorithms have been taken from [crypto-js](https://www.npmjs.com/package/crypto-js)

## Adaptive Cards
[Adaptive Cards](https://www.npmjs.com/package/adaptivecards) are a new way for developers to exchange card content in a common and consistent way. To demonstrate a simple use case, I have create an adaptive card to display a youtube video as part of the card content. More [emplates](https://adaptivecards.io/explorer/AdaptiveCard.html)

## Session Storage
Once you are logged in, you can continue to use the application for 60 minutes before being logged out. If you refresh the application at any point before the expiration of session, session is restored and timer is updated.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
