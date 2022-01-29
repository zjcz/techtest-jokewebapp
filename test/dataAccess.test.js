const DataAcess = require("../src/dataAccess.js");
const dbConfig = require("../src/config/dbConfig.js");

/** 
 * Test the DataAccess class exists
*/
describe('Confirm data access class', () => {
    it('Should be defined', () => {
        const cls = new DataAcess(dbConfig);
        expect(cls).toBeDefined();
    });
});

/** 
 * Test the methods exist on the class
*/
describe('Confirm methods exist', () => {
    it('addJoke method should be defined', () => {
        const cls = new DataAcess(dbConfig);
        expect(cls.addJokesAsync).toBeDefined();
    });

    it('getRandomJoke method should be defined', () => {
        const cls = new DataAcess(dbConfig);
        expect(cls.getRandomJokeAsync).toBeDefined();
    });

    it('clearAllJokes method should be defined', () => {
        const cls = new DataAcess(dbConfig);
        expect(cls.clearAllJokesAsync).toBeDefined();
    });
});
