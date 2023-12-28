import { Player } from './Player.js';
import { Emoji } from './Emoji.js';
import { Timer } from './Timer.js';

export class Game {
  #player;
  #emoji;
  #timer;
  constructor() {
    const gameContainer = document.querySelector('.game-container');
    const gameCounterContainer = this.#createGameCounterContainer();

    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timer');
    gameCounterContainer.appendChild(timerContainer);
    this.timer = new Timer(
      0,
      10,
      (minutes, seconds) => {
        // Update the timer display
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        timerContainer.textContent = `${formattedMinutes} : ${formattedSeconds}`;
      },
      () => {
        this.lose();
      }
    ).start();
    gameContainer.append(gameCounterContainer);
    const gameBox = document.createElement('div');
    gameBox.classList.add('game-box');

    gameContainer.append(gameBox);

    this.player = Player.currentPlayer;
    this.emoji = new Emoji(Emoji.getRandomSrc(), gameBox);
    gameBox.append(this.emoji.image);
    this.emoji.move(30, 300, gameBox);
  }

  set player(value) {
    this.#player = value;
  }
  get player() {
    return this.#player;
  }

  set emoji(value) {
    this.#emoji = value;
  }
  get emoji() {
    return this.#emoji;
  }

  set timer(value) {
    this.#timer = value;
  }
  get timer() {
    return this.#timer;
  }

  #createGameCounterContainer() {
    const gameCounterContainer = document.createElement('div');
    gameCounterContainer.classList.add('game-counter-container');

    // create emoji counter
    for (let i = 0; i < Emoji.sources.length; i++) {
      const emojiCounter = document.createElement('div');
      emojiCounter.className = 'emoji-counter';

      const emoji = document.createElement('img');
      const span = document.createElement('span');
      emoji.src = Emoji.sources[i];
      span.textContent = 0;

      emojiCounter.append(emoji, span);
      gameCounterContainer.appendChild(emojiCounter);
    }

    return gameCounterContainer;
  }

  getRandomSrc() {
    return Emoji.sources[Math.floor(Math.random() * Emoji.sources.length)];
  }

  lose() {
    Swal.fire({
      title: 'Game Over',
      imageUrl:
        'https://i.pinimg.com/736x/32/3e/3b/323e3b47f07fa1fb0a4b2ecb03b2c965.jpg',
      imageWidth: 150,
      imageHeight: 150,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Home Page',
      cancelButtonText: 'End The Game',
    }).then((result) => {
      Player.update(Player.currentPlayer.name, 50);
      if (result.isConfirmed) {
        window.open('home.html', '_self');
        sessionStorage.clear();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('canceled');
        window.open('', '_self').close();
      }
    });
  }
}
