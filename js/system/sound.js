const soundEffectMixin = {
  playSoundDash() {
    new Audio("./assets/sounds/dash.wav").play();
  },
  playSoundHit() {
    new Audio("./assets/sounds/hit.wav").play();
  },
};

Object.assign(Fighter.prototype, soundEffectMixin);

let backgroundMusic = new Howl({
  html5: true,
  src: ["./assets/sounds/diskstation_bgm.mp3"],
});

let musicStarted = false;

document.querySelector("body").addEventListener("click", () => {
  if (musicStarted) return;
  
  document.getElementById("curtain").classList.add('hidden')

  backgroundMusic.play();
  musicStarted = true;
});
