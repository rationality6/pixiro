const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 360;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.8;

let timer = 20;
let game_ended = false;

const stage = new DarkForest();

const player = new Mack({
  position: { x: 100, y: 50 },
  imageSrc: "./assets/samuraiMack/Idle.png",
});

const enermy = new Kenji({ position: { x: 500, y: 50 } });

const reactangularCollisionDetection = ({ rect1, rect2 }) => {
  return (
    rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
    rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
    rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
    rect1.attackBox.position.y <= rect2.position.y + rect2.height
  );
};

const hit_detection = () => {
  if (
    reactangularCollisionDetection({ rect1: player, rect2: enermy }) &&
    player.isAttacking
  ) {
    player.playSoundHit();
    enermy.hitpoint -= 15;
    document.querySelector(
      "#enermyHealth"
    ).style.width = `${enermy.hitpoint}px`;
    player.isAttacking = false;
  } else if (player.isAttacking) {
  } else {
    player.isAttacking = false;
  }
};

const object_collision_detection = ({ player, enermy }) => {
  // right side collision
  if (player.position.x + player.width >= enermy.position.x) {
    player.velocity.x = 0;
  }

  // // left side
  // if (player.position.x <= 0) {
  //   player.position.x = 0
  // }
};

const determineWinner = ({ player, enermy, timerId }) => {
  clearTimeout(timerId);
  if (player.hitpoint === enermy.hitpoint) {
    document.querySelector("#displayText").innerHTML = "Tie";
  }
  if (player.hitpoint > enermy.hitpoint) {
    document.querySelector("#displayText").innerHTML = "Player 1 Wins";
  }
  if (player.hitpoint < enermy.hitpoint) {
    document.querySelector("#displayText").innerHTML = "Player 2 Wins";
  }

  game_ended = true;
};

let timerId;

const decreseTime = () => {
  if (timer) {
    timer -= 1;
  }

  timerId = setTimeout(decreseTime, 1000);
  document.querySelector("#timer").innerHTML = timer;

  // set begin title
  if (timer > 28) {
    document.querySelector("#displayText").innerHTML = "Let's rock";
  } else {
    document.querySelector("#displayText").innerHTML = "";
  }

  if (timer === 0) {
    if(game_ended === false){
      determineWinner({ player, enermy, timerId });
    }
  }
};

let lastPressedKey;
let lastPressedHandler;

const keys = {
  ArrayUp: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

decreseTime();

const animate = () => {
  window.requestAnimationFrame(animate);

  stage.update_stage();

  player.update();
  enermy.update();

  object_collision_detection({ player, enermy });

  hit_detection();

  if (player.isAttacking === false && player.velocity.y === 0) {
    player.image.src = player.sprites.idle.image.src;
    player.framesMax = player.sprites.idle.framesMax;
  }

  player.velocity.x = 0;
  if (keys.ArrowRight.pressed && lastPressedKey === "ArrowRight") {
    player.velocity.x = 7;
    player.image.src = player.sprites.run.image.src;
    player.framesMax = player.sprites.run.framesMax;
  }
  if (keys.ArrowLeft.pressed && lastPressedKey === "ArrowLeft") {
    player.velocity.x = -7;
    player.image.src = player.sprites.run.image.src;
    player.framesMax = player.sprites.run.framesMax;
  }

  // end game based on health
  if (player.hitpoint <= 0 || enermy.hitpoint <= 0) {
    if(game_ended === false){
      determineWinner({ player, enermy, timerId });
    }
    
  }
};

animate();

window.addEventListener("keydown", (event) => {
  // console.log(event.key)
  switch (event.key) {
    case "ArrowUp":
      if (player.velocity.y === 0) {
        player.velocity.y = -13;
        player.image.src = player.sprites.jump.image.src;
        player.framesMax = player.sprites.jump.framesMax;
        player.framesHold = 10;
      }
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      lastPressedKey = "ArrowRight";
      lastPressedKey = event.key;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      lastPressedKey = "ArrowLeft";
      lastPressedKey = event.key;
      break;
    case " ":
      player.image.src = player.sprites.attack.image.src;
      player.framesMax = player.sprites.attack.framesMax;
      player.framesHold = 4;
      player.gatling_attack();
      break;
  }

  // lastPressedHandler = setTimeout(() => (lastPressedKey = ""), 500);
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") {
    keys.ArrayUp.pressed = false;
  }

  if (event.key === "ArrowRight") {
    keys.ArrowRight.pressed = false;
  }

  if (event.key === "ArrowLeft") {
    keys.ArrowLeft.pressed = false;
  }
});
