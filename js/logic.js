const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.8;

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./assets/background.png",
});

const shop = new Sprite({
  position: { x: 600, y: 128 },
  imageSrc: "./assets/shop.png",
  scale: 2.75,
  framesMax: 6,
});

const player = new Fighter({
  position: { x: 100, y: 100 },
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
    }
  }
});

const enermy = new Fighter({
  position: { x: 800, y: 100 },
  velocity: { x: 0, y: 0 },
  imageSrc: "./assets/kenji/Idle.png",
  framesMax: 4,
  scale: 2.5,
  offset: { x: 215, y: 152 },
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
    // new Audio("./assets/sounds/dash.wav").play();
    new Audio("./assets/sounds/hit.wav").play();
    enermy.hitpoint -= 15;
    player.isAttacking = false;
  } else {
    player.isAttacking = false;
  }
};

const object_collision_detection = ({ player, enermy }) => {
  if (player.position.x + player.width > enermy.position.x) {
    player.position.x -= player.position.x + player.width;
  }

  // // left side
  // if (player.position.x <= 0) {
  //   player.position.x = 0
  // }
};

const animate = () => {
  window.requestAnimationFrame(animate);

  background.update();
  shop.update();

  player.update();
  enermy.update();

  object_collision_detection({ player, enermy });

  hit_detection();
};

animate();

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    if (player.velocity.y === 0) {
      player.velocity.y = -15;
    }
  }

  if (e.key === "ArrowRight") {
    player.velocity.x = 7;
  }

  if (e.key === "ArrowLeft") {
    player.velocity.x = -7;
  }

  if (e.code == "Space") {
    player.image = player.sprites.attack.image;
    player.framesMax = player.sprites.attack.framesMax;
    player.framesHold = 3;
    
    player.attack();
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
