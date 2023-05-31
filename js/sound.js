let soundEffectMixin = {
  playSoundDash() {
    new Audio("./assets/sounds/dash.wav").play();
  },
  playSoundHit() {
    new Audio("./assets/sounds/hit.wav").play();
  },
};

Object.assign(Fighter.prototype, soundEffectMixin);
