/**
 * Joke Data model, used to model jokes stored in the database
 */
class JokeDataModel {
  constructor(id, type, setup, punchline) {
    this.id = id;
    this.type = type;
    this.setup = setup;
    this.punchline = punchline;
  }
}

module.exports = JokeDataModel;