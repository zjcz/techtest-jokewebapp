const DataAccess = require('./dataAccess.js');
const DataSource = require('./jokeDataSource.js');
const dbConfig = require("../src/config/dbConfig.js");
const appConfig = require("../src/config/appConfig.js");
const JokeDataModel = require("../src/models/jokeDataModel.js");
const JokeViewModel = require("../src/models/jokeViewModel.js");

/**
 * 
 */
class JokeApp {
    /**
     * Remove the old jokes and reload with the latest jokes
     * @returns True if successful
     */
    async refreshDataAsync() {
        const jokeDataSource = new DataSource(appConfig.JOKESOURCE);
        const jokes = await jokeDataSource.getJokesAsync();
        
        try {
            if (jokes) {
                const dataAccess = new DataAccess(dbConfig);
                await dataAccess.clearAllJokesAsync();
                await dataAccess.addJokesAsync(jokes.map(x => new JokeDataModel(0, x.type, x.setup, x.punchline)));
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Get a random joke
     * @returns A random joke
     */
    async getRandomJokeAsync() {
        const dataAccess = new DataAccess(dbConfig);
        const joke = await dataAccess.getRandomJokeAsync();
        if (joke) {
            return new JokeViewModel(joke.setup, joke.punchline);
        } else {
            return null;
        }
    }
}

module.exports = JokeApp;