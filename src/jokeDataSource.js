const axiosClient = require('axios');

/**
 * Class to handle accessing the joke data from the external datasource (website)
 */
class JokeDataSource {

    /**
     * Constructor
     * @param {String} url The url to access the data from
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * Get the joke json data from the url
     * @returns json data containing the jokes, or null if unable to access the datasource url
     */
    async getJokesAsync() {
        let jokeData = null;

        try {
            const res = await axiosClient.get(this.url);
            if (res.status = 200) {
                jokeData = res.data;
            }
        } catch (e) {
            console.log("error downloading joke data from url");
            console.log(e);
        }

        return jokeData;
    }
}

module.exports = JokeDataSource;