const soundEffectMixin = {
  playSoundDash() {
    new Audio("./assets/sounds/dash_mod.mp3").play();
  },
  playSoundHit() {
    new Audio("./assets/sounds/hit_mod.mp3").play();
  },
  playSoundSwordClash() {
    new Audio("./assets/sounds/sword_crash_mod.mp3").play();
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
