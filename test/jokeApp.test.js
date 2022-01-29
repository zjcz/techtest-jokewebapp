const JokeApp = require("../src/jokeApp.js")

const DataAcess = require("../src/dataAccess.js");
const JokeDataSource = require('../src/jokeDataSource.js');
const JokeDataModel = require("../src/models/jokeDataModel.js");
const JokeViewModel = require("../src/models/jokeViewModel.js");

// setup mocks 
jest.mock('../src/dataAccess.js');
jest.mock('../src/jokeDataSource.js');

/** 
 * Test the JokeApp class exists
*/
describe('Confirm jokeApp class exists', () => {
  it('Should be defined', () => {
      const cls = new JokeApp();
      expect(cls).toBeDefined();
  });
});

/** 
 * Test the methods exist on the class
*/
describe('Confirm methods exist', () => {
  it('refreshData method should be defined', () => {
      const cls = new JokeApp();
      expect(cls.refreshDataAsync).toBeDefined();
  });

  it('getRandomJoke method should be defined', () => {
      const cls = new JokeApp();
      expect(cls.getRandomJokeAsync).toBeDefined();
  });
});

/** 
 * Test we can load a joke
 * Requires mocking the DataAccess class
*/
describe('Confirm get random joke', () => {
  const jokeData = new JokeDataModel(0, "joke type", "joke setup", "joke punchline");

  beforeAll(() => {
    DataAcess.mockImplementation(() => {
      return {
        getRandomJokeAsync: () => {
          return Promise.resolve(jokeData);
        },
      };
    });
  });

  it('Returns a joke', async () => {
      const cls = new JokeApp();
      const data = await cls.getRandomJokeAsync();
      expect(data.setup).toEqual(jokeData.setup);
      expect(data.punchline).toEqual(jokeData.punchline);
  });
});

/** 
 * Test getting the data from the web and saving to the database
 * Requires mocking the DataSource and the DataAccess class
*/
describe('Confirm refresh data', () => {
  // mock data from the web (to store in the db)
  const jokeJsonData = {
    id: 1,
    type: 'bad',
    setup: 'setup 1',
    punchline: 'da da!'
  };
 
  // Mock DataAccess class for use in this test, and store the data in a variable to act as a datastore
  var jokeDataStore = [];
  class MockDataAccess {  
    async addJokesAsync(newJokes) {
      jokeDataStore = newJokes;
    }
    async getRandomJokeAsync() {        
      return jokeDataStore[0];
    }
    async clearAllJokesAsync() {
      jokeDataStore = [];
    }
  }

  // Setup the mocks
  beforeAll(() => {
    JokeDataSource.mockImplementation(() => {
      return {
        getJokesAsync: () => {
          return Promise.resolve([jokeJsonData]);
        },
      };
    });

    DataAcess.mockImplementation(() => {      
      return new MockDataAccess();      
    });
  });

  // test refreshing the data.  This will 
  // - download the data from the web
  // - save it to our db
  // - test reloading it
  it('Refresh the data', async () => {
      const cls = new JokeApp();
      await cls.refreshDataAsync();
      const data = await cls.getRandomJokeAsync();            
      expect(data.setup).toEqual(jokeJsonData.setup);
      expect(data.punchline).toEqual(jokeJsonData.punchline);
  });
});


/** 
 * Test failing to download the data from the web doesn't leave an empty database
 * Requires mocking the DataSource and the DataAccess class
*/
describe('Confirm failed data download doesnt delete previous data', () => {
  // mock existing data 
  const existingJokeData = new JokeDataModel(0, "joke type", "joke setup", "joke punchline");
 
  // Mock DataAccess class for use in this test, and store the data in a variable to act as a datastore
  var jokeDataStore = [existingJokeData];
  class MockDataAccess {  
    async addJokesAsync(newJokes) {
      jokeDataStore = newJokes;
    }
    async getRandomJokeAsync() {        
      return jokeDataStore[0];
    }
    async clearAllJokesAsync() {
      jokeDataStore = [];
    }
  }

  // Setup the mocks
  beforeAll(() => {
    JokeDataSource.mockImplementation(() => {
      return {
        getJokesAsync: () => {
          //return null;
          return Promise.resolve(null);
        },
      };
    });

    DataAcess.mockImplementation(() => {      
      return new MockDataAccess();      
    });
  });

  // test failing to refreshing the data.  This will 
  // - fail to download the data from the web
  // - should not clear down the db
  // - test reloading it
  it('Refresh the data', async () => {
      const cls = new JokeApp();
      await cls.refreshDataAsync();
      const data = await cls.getRandomJokeAsync();            
      expect(data.setup).toEqual(existingJokeData.setup);
      expect(data.punchline).toEqual(existingJokeData.punchline);
  });
});
