import { showPopup } from './popup.js';
import { Player } from './Player.js';
import { Game } from './Game.js';

window.addEventListener('load', () => {
  const currentPlayer = Player.currentPlayer;

  if (!currentPlayer) {
    window.location.href = 'home.html';
    return;
  }
  if (!sessionStorage.getItem('isVisited')) {
    console.log('popup');
    showPopup({
      message: currentPlayer.message,
      img: 'https://pnghq.com/wp-content/uploads/pnghq.com-happy-emoji-download-iphone-emojis.png',
      imgAlt: 'Happy Emoji',
      showConfirmButton: false,
      timer: 3000,
    });
    sessionStorage.setItem('isVisited', true);
  }
});

const startBtn = document.querySelector('#start');
startBtn.addEventListener('click', function () {
  document.body.style.backgroundImage = 'none';
  const game = new Game();
  startBtn.remove();
});
