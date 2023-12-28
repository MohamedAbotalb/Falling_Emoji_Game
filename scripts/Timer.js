export class Timer {
  #minutes;
  #seconds;
  constructor(minutes, seconds, onTick, onCompleted) {
    this.minutes = minutes;
    this.seconds = seconds;
    this.onTick = onTick;
    this.onCompleted = onCompleted;
    this.interval = null;
  }

  set minutes(value) {
    this.#minutes = value;
  }
  get minutes() {
    return this.#minutes;
  }

  set seconds(value) {
    this.#seconds = value;
  }
  get seconds() {
    return this.#seconds;
  }

  start() {
    this.interval = setInterval(() => {
      this.#tick();
      this.onTick(this.minutes, this.seconds);

      if (this.minutes === 0 && this.seconds === 0) {
        this.#stop();
        this.onCompleted();
      }
    }, 1000);
  }

  #stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  #tick() {
    if (this.seconds > 0) {
      this.seconds--;
    } else if (this.minutes > 0) {
      this.minutes--;
      this.seconds = 59;
    }
  }

  reset() {
    this.#stop();
    this.minutes = 0;
    this.seconds = 0;
  }
}
