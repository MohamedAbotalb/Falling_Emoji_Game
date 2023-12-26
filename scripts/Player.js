export class Player {
  #name;
  #score;
  static #players;
  static #currentPlayer;

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

  static set currentPlayer(playerName) {
    let message = '';
    let player = Player.players.find(
      (item) => item.name.toLowerCase() === playerName.toLowerCase()
    );

    if (!player) {
      player = new Player(playerName);
      Player.#add(player);
      message = `Welcome ${player.name}`;
    } else {
      message = `Welcome ${player.name}\nYour Last Score is ${player.score}`;
    }

    const { name, score } = player;
    Player.#currentPlayer = player;
    sessionStorage.setItem(
      'currentPlayer',
      JSON.stringify({ name, score, message })
    );
  }
  static get currentPlayer() {
    const storedPlayer = sessionStorage.getItem('currentPlayer');

    Player.#currentPlayer = storedPlayer ? JSON.parse(storedPlayer) : '';

    return Player.#currentPlayer;
  }

  static #add(player) {
    const { name, score } = player;
    const players = Player.players;
    players.push({ name, score });
    Player.players = players;
  }

  static update(playerName, newScore) {
    const players = Player.players;
    const player = players.find(
      (item) => item.name.toLowerCase() === playerName.toLowerCase()
    );
    if (player) {
      player.score = newScore;
      Player.players = players;
    }
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
