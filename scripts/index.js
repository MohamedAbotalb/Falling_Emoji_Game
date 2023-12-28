import { Player } from './Player.js';
import { showPopup } from './popup.js';
const input = document.querySelector('input[type="text"]');
const playBtn = document.querySelector('.play');

playBtn.addEventListener('click', () => {
  let name = input.value.trim();

  // check the name is more than 2 characters and doesn't contain numbers or special characters
  if (name.length < 3 || !name.match(/^[A-Za-z\s]+$/)) {
    showPopup({
      message: 'Oops...\nPlease enter a valid name',
      img: 'https://i.pinimg.com/736x/32/3e/3b/323e3b47f07fa1fb0a4b2ecb03b2c965.jpg',
      imgAlt: 'Sad Emoji',
      showConfirmButton: true,
      timer: 0,
    });
    input.value = '';
    return;
  }

  Player.currentPlayer = name;
  input.value = '';
  window.open('game.html', '_self');
});
