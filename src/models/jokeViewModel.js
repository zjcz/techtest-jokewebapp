/**
 * Joke Data model, used to model jokes sent via the api to the frontend
 */
class JokeViewModel {
    constructor(setup, punchline) {
      this.setup = setup;
      this.punchline = punchline;
    }
  }
  
  module.exports = JokeViewModel;