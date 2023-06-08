class Sensor {
  reactangularCollisionDetection({ attackBox, player, enermy }) {
    const x = player.position.x + attackBox.position.x;
    const y = player.position.y + attackBox.position.y;

    return (
      x + attackBox.area.width >= enermy.position.x &&
      x <= enermy.position.x + enermy.width &&
      y + attackBox.area.height >= enermy.position.y &&
      y <= enermy.position.y + enermy.height
    );
  }

  checkAllHitDetection() {
    player.boxBucket.bucket.forEach((item) => {
      this.hitDetection({ attackBox: item });
    });
  }

  hitDetection({ attackBox }) {
    if (
      this.reactangularCollisionDetection({
        attackBox: attackBox,
        player: player,
        enermy: enermy,
      }) &&
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

    if (
      this.reactangularCollisionDetection({
        player: enermy,
        attackBox: attackBox,
        enermy: player,
      }) &&
      enermy.isAttacking
    ) {
      enermy.playSoundHit();
      player.hitpoint -= 15;
      document.querySelector(
        "#enermyHealth"
      ).style.width = `${player.hitpoint}px`;
      enermy.isAttacking = false;
    } else if (enermy.isAttacking) {
    } else {
      enermy.isAttacking = false;
    }
  }
}

const setDelay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

// games
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 360;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.8;

let timer = 20;
let timerId;

let isGameEnded = false;

const sensor = new Sensor();

// stage
const stage = new DarkForest();

// player
const playerOneStartPosition = { x: 100, y: 50 };
const player = new Mack({ position: playerOneStartPosition });

// enermy
const playerTwoStartPosition = { x: 500, y: 50 };
const enermy = new Kenji({ position: playerTwoStartPosition });

// result
const determineWinner = ({ player, enermy, timerId }) => {
  clearTimeout(timerId);
  if (player.hitpoint === enermy.hitpoint) {
    document.querySelector("#displayText").innerHTML = "Tie";
  }
  if (player.hitpoint > enermy.hitpoint) {
    document.querySelector("#displayText").innerHTML = "Player 1 Wins";
    enermy.switchSprite("death");
  }
  if (player.hitpoint < enermy.hitpoint) {
    document.querySelector("#displayText").innerHTML = "Player 2 Wins";
    player.switchSprite("death");
  }

  isGameEnded = true;
};

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
    if (isGameEnded === false) {
      determineWinner({ player, enermy, timerId });
    }
  }
};

// collisions
const objectCollisionDetection = ({ player, enermy }) => {
  // right side collision
  if (player.position.x + player.width >= enermy.position.x) {
    player.velocity.x = 0;
  }

  // // left side
  // if (player.position.x <= 0) {
  //   player.position.x = 0
  // }
};

// input

let lastPressedKey;

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

  stage.render();

  player.update();
  enermy.update();

  sensor.checkAllHitDetection();

  player.boxBucket.renderAll({ object: player });
  enermy.boxBucket.renderAll({ object: enermy });

  objectCollisionDetection({ player, enermy });

  if (player.isAttacking === false && player.velocity.y === 0) {
    player.switchSprite("idle");
  }

  if (enermy.isAttacking === false && enermy.velocity.y === 0) {
    enermy.switchSprite("idle");
  }

  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  }
  if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  if (keys.ArrowRight.pressed && lastPressedKey === "ArrowRight") {
    player.velocity.x = 7;
    player.switchSprite("run");
  } else if (keys.ArrowLeft.pressed && lastPressedKey === "ArrowLeft") {
    player.velocity.x = -7;
    player.switchSprite("run");
  } else {
    player.velocity.x = 0;
  }

  // end game based on health
  if (player.hitpoint <= 0 || enermy.hitpoint <= 0) {
    if (isGameEnded === false) {
      determineWinner({ player, enermy, timerId });
    }
  }
};

animate();

window.addEventListener("keydown", (event) => {
  if (player.middleOfActionDelay) {
    return;
  }

  switch (event.key) {
    case "ArrowUp":
      if (player.velocity.y === 0) {
        player.velocity.y = -13;
        player.switchSprite("jump");
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
      // player.boxBucket.enableAttack({ name: "basic_attack" });
      player.attack();
      // player.gatlingAttack();
      break;
    case "ArrowDown":
      player.switchSprite("guard");
      console.log("guard");
      break;
  }
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
