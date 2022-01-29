const JokeDataSource = require("../src/jokeDataSource.js")
const config = require("../src/config/appConfig.js")
const axios = require('axios');

// setup mocks 
jest.mock('axios');

/** 
 * Test the data source class exists
*/
describe('Confirm datasource class', () => {
    it('Should be defined', () => {
        const cls = new JokeDataSource("");
        expect(cls).toBeDefined();
    });
});

/** 
 * Test the methods exist on the class
*/
describe('Confirm getJokesAsync method exists', () => {
    it('getJokesAsync method should be defined', () => {
        const cls = new JokeDataSource();
        expect(cls.getJokesAsync).toBeDefined();
    });
});

/** 
 * Test loading data from the external source
 * Requires mocking Axios Get call
*/
describe('Confirm datasource returns data', () => {
    it('Return the list of jokes as json', async () => {   
        const mockData = {
            status: 200,
            data: [
                {
                    id: 1,
                    type: "general",
                    setup: "What did the fish say when it hit the wall?",
                    punchline: "Dam."
                },
                {
                    id: 2,
                    type: "general",
                    setup: "How do you make a tissue dance?",
                    punchline: "You put a little boogie on it."
                },
            ]
        };
        
        axios.get.mockImplementationOnce(() => Promise.resolve(mockData));

        const jokeDS = new JokeDataSource(config.JOKESOURCE);
        const data = await jokeDS.getJokesAsync();
        expect(data).toEqual(mockData.data);
    });
});

/** 
 * Test errors are handled. An error in Axios should be handled by the JokeDataSource class
 * Requires mocking Axios Get call
*/
describe('Confirm datasource handles errors', () => {
    it('Throw an error in axois', async () => {        
        const errorMessage = 'Network Error';            
        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

        const jokeDS = new JokeDataSource(config.JOKESOURCE);
        const data = await jokeDS.getJokesAsync();
        expect(data).toBeNull();
    });
});
