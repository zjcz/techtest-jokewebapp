if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express");
const jokeApp = require("./src/jokeApp.js");

const ja = new jokeApp();
const app = express();

// refresh the data on startup
const startupCalls = async function() { 
    await ja.refreshDataAsync(); 
};
startupCalls();

// setup static page access 
app.use(express.static('public'))

// setup the api endpoint for returning the joke
app.use(express.json()); 
app.get("/api/getJoke", async (req, res) => {
    res.json(await ja.getRandomJokeAsync());
});

// finally, setup the port listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});
