const mysql = require("mysql2/promise");

/**
 * Wrapper class to handle all database access
 */
class DataAccess {

  /**
   * Constructor
   * @param {dbConfig} config database config object
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * Get a database connection object to use
   * @returns mysql connection object
   */
  async #getConnection() {
    return await mysql.createConnection({
      host: this.config.HOST,
      user: this.config.USER,
      password: this.config.PASSWORD,
      database: this.config.DB
    });
  }

  /**
   * Add a collection of jokes to the database
   * @param {*} newJokes collection of jokes to add
   * @returns true if successful 
   */
  async addJokesAsync(newJokes) {

    const c = await this.#getConnection();

    try {
      for (const newJoke of newJokes) {
        await c.query('INSERT INTO jokes (type, setup, punchline) VALUES (?, ?, ?)', [newJoke.type, newJoke.setup, newJoke.punchline]);
      }
      return true;
    } catch (e) {
      console.log('caught exception!', e);
      return false;
    } finally {
      c.end();
    }
  }

  /**
   * Gets a random single joke
   * @returns A single record from the database, chosen at random
   */
  async getRandomJokeAsync() {
    try {
      const c = await this.#getConnection();
      const [rows, fields] = await c.query('SELECT * FROM jokes ORDER BY RAND() LIMIT 1');
      if (rows.length > 0) {
        return rows[0];
      }
    } catch (e) {
      console.log('caught exception!', e);
    } finally {
      //c.end();
    }

    return;
  }

  /**
   * Remove all records from the table
   * @returns true if successful
   */
  async clearAllJokesAsync() {
    try {
      const c = await this.#getConnection();
      await c.query('DELETE FROM jokes');
      return true;
    } catch (e) {
      console.log('caught exception!', e);
      return false;
    } finally {
      //c.end();
    }
  }
}

module.exports = DataAccess;