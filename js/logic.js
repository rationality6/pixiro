const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 360;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.8;

let timer = 30;

const background = new Sprite({
  position: { x: 0, y: 0 },
  scale: 0.63,
  imageSrc: "./assets/background.png",
});

const shop = new Sprite({
  position: { x: 260, y: -16 },
  imageSrc: "./assets/shop.png",
  scale: 2.5,
  framesMax: 6,
});

const player = new Fighter({
  position: { x: 100, y: 50 },
  velocity: { x: 0, y: 0 },
  imageSrc: "./assets/samuraiMack/Idle.png",
  framesMax: 8,
  scale: 2.5,
  offset: { x: 215, y: 152 },
  sprites: {
    idle: {
      imageSrc: "./assets/samuraiMack/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./assets/samuraiMack/Run.png",
      framesMax: 8,
    },
    attack: {
      imageSrc: "./assets/samuraiMack/Attack1.png",
      framesMax: 6,
    },
    attack2: {
      imageSrc: "./assets/samuraiMack/Attack2.png",
      framesMax: 6,
    },
  },
});

const enermy = new Fighter({
  position: { x: 500, y: 50 },
  velocity: { x: 0, y: 0 },
  imageSrc: "./assets/kenji/Idle.png",
  framesMax: 4,
  scale: 2.5,
  offset: { x: 215, y: 169 },
});

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
    player.velocity.x = -7;
  }

  // // left side
  // if (player.position.x <= 0) {
  //   player.position.x = 0
  // }
};

const determineWinner = ({ player, enermy, timerId }) => {
  clearTimeout(timerId)
  if (player.hitpoint === enermy.hitpoint) {
    document.querySelector("#displayText").innerHTML = "Tie";
  }
  if (player.hitpoint > enermy.hitpoint) {
    document.querySelector("#displayText").innerHTML = "Player 1 Wins";
  }
  if (player.hitpoint < enermy.hitpoint) {
    document.querySelector("#displayText").innerHTML = "Player 2 Wins";
  }
};

let timerId

const decreseTime = () => {
  if (timer) {
    timer -= 1;
  }

  timerId = setTimeout(decreseTime, 1000);
  document.querySelector("#timer").innerHTML = timer;

  if (timer === 0) {
    determineWinner({ player, enermy, timerId });
  }
};

decreseTime();

const animate = () => {
  window.requestAnimationFrame(animate);

  background.update();
  shop.update();

  player.update();
  enermy.update();

  object_collision_detection({ player, enermy });

  hit_detection();

  // end game based on health
  if (player.hitpoint <= 0 || enermy.hitpoint <= 0) {
    determineWinner({ player, enermy, timerId });
  }
};

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      player.velocity.y = -15;
      break;
    case "ArrowRight":
      player.velocity.x = 7;
      break;
    case "ArrowLeft":
      player.velocity.x = -7;
      break;
    case " ":
      player.image = player.sprites.attack.image;
      player.framesMax = player.sprites.attack.framesMax;
      player.framesHold = 4;
      player.gatling_attack();
      break;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") {
    player.velocity.x = 0;
  }
  if (e.key === "ArrowLeft") {
    player.velocity.x = 0;
  }
});
