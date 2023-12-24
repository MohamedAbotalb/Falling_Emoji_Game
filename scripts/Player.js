export class Player {
  #name;
  #score;
  static #players;

  constructor(name, score = 0) {
    this.name = Player.#pascalCase(name);
    this.score = score;
  }

  set name(value) {
    this.#name = value;
  }
  get name() {
    return this.#name;
  }

  set score(value) {
    this.#score = value;
  }
  get score() {
    return this.#score;
  }

  static set players(value) {
    Player.#players = value;

    localStorage.setItem('players', JSON.stringify(Player.#players));
  }
  static get players() {
    const storedPlayers = localStorage.getItem('players');

    Player.#players = storedPlayers ? JSON.parse(storedPlayers) : [];

    return Player.#players;
  }

  static #addPlayer(player) {
    const { name, score } = player;
    const players = Player.players;
    players.push({ name, score });
    Player.players = players;
  }
  static get addPlayer() {
    return Player.#addPlayer;
  }

  static #pascalCase(input) {
    input = new String(input);
    const segments = input.split(' ');
    let newSegments = [];

    for (let i = 0; i < segments.length; i++) {
      const word = segments[i];

      const capitalizedWord = word.replace(word[0], word[0].toUpperCase());

      newSegments.push(capitalizedWord);
    }

    return newSegments.join(' ');
  }
}
