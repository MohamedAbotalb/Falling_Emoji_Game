export class Image {
  #image;

  constructor(src = '') {
    this.image = document.createElement('img');
    this.image.src = src;
  }

  set image(value) {
    this.#image = value;
  }
  get image() {
    return this.#image;
  }
}
