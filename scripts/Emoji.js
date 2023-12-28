import { Image } from './Image.js';
export class Emoji extends Image {
  static #sources = [
    '../images/hearteyes.png',
    '../images/sunglasses.png',
    '../images/happy.png',
    '../images/partying.png',
    '../images/thinking.png',
  ];
  constructor(src, gameBox) {
    super(src);
    this.gameBox = gameBox;
    this.image.style.top = '0';
    this.image.style.left = `${Math.floor(
      Math.random() *
        (this.gameBox.getBoundingClientRect().width -
          this.image.getBoundingClientRect().width -
          50)
    )}px`;
  }

  static get sources() {
    return Emoji.#sources;
  }

  move(step, seconds) {
    const gameBoxHeight = this.gameBox.offsetHeight;
    const imageHeight = this.image.offsetHeight;
    const bottomBoundary = gameBoxHeight - imageHeight;

    const handleMoveEvent = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          this.moveLeft();
          break;
        case 'ArrowRight':
          this.moveRight();
          break;
      }
    };
    document.addEventListener('keydown', handleMoveEvent);
    let top;
    let id = setInterval(() => {
      top = parseInt(this.image.style.top) + step;

      if (top > bottomBoundary) {
        clearInterval(id);
        document.removeEventListener('keydown', handleMoveEvent);
        const emoji = this.generateNewEmoji();
        emoji.move(step, seconds, this.gameBox);
      } else {
        this.image.style.top = `${top}px`;
      }
      console.log(this.image.style.top);
    }, seconds);
  }

  moveLeft() {
    const currentLeft = parseInt(this.image.style.left, 10);
    const newLeft = Math.max(0, currentLeft - this.image.width);
    this.image.style.left = `${newLeft}px`;
  }

  moveRight() {
    const currentLeft = parseInt(this.image.style.left, 10);
    const maxWidth =
      this.gameBox.getBoundingClientRect().width - this.image.width - 10;
    const newLeft = Math.min(maxWidth, currentLeft + this.image.width);
    this.image.style.left = `${newLeft}px`;
  }

  isColliding() {
    const emojiRect = this.image.getBoundingClientRect();
    const elementsBelowEmoji = document.elementsFromPoint(
      emojiRect.x + emojiRect.width / 2,
      emojiRect.y + emojiRect.height + 1
    );

    // Check collision with elements below the emoji
    for (const element of elementsBelowEmoji) {
      if (element !== this.image) {
        const elementRect = element.getBoundingClientRect();
        if (
          emojiRect.bottom >= elementRect.top &&
          emojiRect.left < elementRect.right &&
          emojiRect.right > elementRect.left
        ) {
          return true; // Collision detected
        }
      }
    }

    return false; // No collision
  }

  static getRandomSrc() {
    return Emoji.#sources[Math.floor(Math.random() * Emoji.#sources.length)];
  }

  generateNewEmoji() {
    const newSrc = Emoji.getRandomSrc();
    const emoji = new Emoji(newSrc, this.gameBox);

    return emoji;
  }
}
