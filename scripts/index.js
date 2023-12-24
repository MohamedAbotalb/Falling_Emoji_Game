import { Player } from './Player.js';
const input = document.querySelector('input[type="text"]');
const playBtn = document.querySelector('.play');

playBtn.addEventListener('click', () => {
  let name = input.value.trim();

  // check the name is more than 2 characters and doesn't contain numbers or special characters
  if (name.length < 3 || !name.match(/^[A-Za-z\s]+$/)) {
    Swal.fire({
      title: 'Oops...',
      text: 'Please enter a valid name',
      imageUrl:
        'https://i.pinimg.com/736x/32/3e/3b/323e3b47f07fa1fb0a4b2ecb03b2c965.jpg',
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Sad Emoji',
    });
    input.value = '';
    return;
  }

  const data = Player.players;
  const obj = data.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  if (!obj) {
    const player = new Player(name);
    Player.addPlayer(player);
    input.value = '';
  }
  // we will use the created new object in the game page with welcome message
  // if the object is present we will use its data in the game page with welcome and last score message
});
