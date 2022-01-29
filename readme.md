# Tech Test-Random Joke Webapp

## Introduction
Tech test for a software developer interview.  The brief was:

> ### Development Test - Full Stack Developer Task
> **Design/Development Brief**
>
> Build a new Web application. Node.js would be our preferred language, but you may use another language if you prefer. You may use Express or another framework as a base for your code.
>
> Create a database of your choice, and import data into it from https://github.com/15Dkatz/official_joke_api/blob/master/jokes/index.json
>
> Create a UI to read and display the Jokes one at a time, chosen at random showing the “setup” property from the json. Click on the page to reveal the “punchline” from the joke, then click again to reveal the next joke.
>
> Show your design skills by producing an attractive and intuitive design. Show your coding skills across all levels from the database queries and application code to the client-side HTML and CSS.
>
> **Deliverable**
>
> Share your code via a git repository. 
> 
> Document in the README, all steps required to install the code/database and run and browse the application on a local system. We may not be familiar with your chosen database, so please add full installation steps.
> 
> **Please note the following:**
> 
> Please do not use Mongo db, use a sql database like mysql
> 
> We prefer that you don’t use frameworks like react, Angular etc because the purpose of the test is for you to showcase your javascript, HTML, CSS, JQUERY coding skills.
> 

## Run the Code

To run the app, first clone the repository then use the following at the command line from the repository root folder to download the npm packages required for this project.
````
npm install
````

The demo requires MySql to run.  Use the init.sql script to create the database and tables required by the app
Edit \src\config\dbConfig.js to add the connect details to your mySql instance

Next, create a .env file in the repository root folder, copy the following and complete the details with your settings
````
DATABASE_HOST=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
````

To run the app, execute the following at the command line from the repository root folder
````
node app.js
````
## How it works
On startup, the application loads the jokes from the github repository and stores them in the database.  When a user loads the web page, it makes a request to the backend for a joke to display via an API call, and the app loads a random joke from the database.

## Tech Stack
- Node.js
- Express
- Axios
- MySql
- Jest Unit Testing

## Design Choices
I decided to use Node.js with Express to develop the web application, storing the data in a MySql database. This was the first time I have used these technologies but felt it was important to use the technologies I would be using if I was successful for the role.

I followed the TDD methodology to develop the backend app.  This was the first time I have done this and I found the process slow going at first, as it was also the first time I have used [Jest](https://jestjs.io/).  But overall it was a good experience, making it quicker to find bugs and gave me confidence with the code as I started to work on the frontend.

On the frontend the webpage loads one joke at a time using vanilla javascript to request the data from the node backend server via an API call.

The background photo is by [Tim Mossholder](https://unsplash.com/photos/imlD5dbcLM4) on [Unsplash](https://unsplash.com/).  The favicon was created at [favicon.io](https://favicon.io/favicon-generator/)

## End Result
I am please with the end result.  It is the first time using most of the technologies and it is good to get some real experience in them.

## To Do
At some point in the future I'd like to implement the following:
 - Convert to Typescript
 - Use Docker
 - Better log handling