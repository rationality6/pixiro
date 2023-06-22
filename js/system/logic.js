class Sensor {
  collisionDetection({ hitbox, targetPlayer }) {
    const hitbox_x_start = hitbox.position.x + hitbox.offset.x;
    const hitbox_x_end =
      hitbox.position.x + hitbox.offset.x + hitbox.area.width;
    const hitbox_y_start = hitbox.position.y + hitbox.offset.y;
    const hitbox_y_end =
      hitbox.position.y + hitbox.offset.y + hitbox.area.height;

    const result =
      targetPlayer.position.x <= hitbox_x_end &&
      hitbox_x_start <= targetPlayer.position.x + targetPlayer.width &&
      targetPlayer.position.y <= hitbox_y_end &&
      hitbox_y_start <= targetPlayer.position.y + targetPlayer.height;
    return result;
  }

  hitboxCollisionDetection({ hitbox1, hitbox2 }) {
    const hitbox1_x_start = hitbox1.position.x + hitbox1.offset.x;
    const hitbox1_x_end = hitbox1.position.x + hitbox1.offset.x + hitbox1.width;
    const hitbox1_y_start = hitbox1.position.y + hitbox1.offset.y;
    const hitbox1_y_end =
      hitbox1.position.y + hitbox1.offset.y + hitbox1.height;

    const hitbox2_x_start = hitbox2.position.x + hitbox2.offset.x;
    const hitbox2_x_end = hitbox2.position.x + hitbox2.offset.x + hitbox2.width;
    const hitbox2_y_start = hitbox2.position.y + hitbox2.offset.y;
    const hitbox2_y_end =
      hitbox2.position.y + hitbox2.offset.y + hitbox2.height;

    // const result = (
    //   hitbox1_x_start <= hitbox2_x_end &&
    // )
  }

  checkAllHitDetection(player, enermy) {
    player.boxBucket.bucket.forEach((hitbox) => {
      if (hitbox.enable) {
        if (
          this.collisionDetection({
            hitbox: hitbox,
            targetPlayer: enermy,
          })
        ) {
          player.playSoundHit();
          enermy.hitpoint -= 15;
          document.querySelector(
            "#enermyHealth"
          ).style.width = `${enermy.hitpoint}px`;
          hitbox.enable = false;
        } else if (hitbox.enable) {
        } else {
          hitbox.enable = false;
        }
      }
    });

    enermy.boxBucket.bucket.forEach((hitbox) => {
      if (hitbox.enable) {
        if (
          this.collisionDetection({
            hitbox: hitbox,
            targetPlayer: player,
          })
        ) {
          enermy.playSoundHit();
          player.hitpoint -= 15;
          document.querySelector(
            "#playerHealth"
          ).style.width = `${player.hitpoint}px`;
          hitbox.enable = false;
        } else if (hitbox.enable) {
        } else {
          hitbox.enable = false;
        }
      }
    });
  }
}

class Pixiro {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 640;
    this.canvas.height = 360;

    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.gravity = 0.8;

    this.timer = 30;
    this.timerId;

    this.isGameEnded = false;

    // stage
    this.stage = new JapanCastle({ ctx: this.ctx });

    // player
    const playerOneStartPosition = { x: 100, y: 50 };
    this.player = new Lafull({
      position: playerOneStartPosition,
      ctx: this.ctx,
    });

    // enermy
    const playerTwoStartPosition = { x: 500, y: 50 };
    this.enermy = new Hosta({
      position: playerTwoStartPosition,
      ctx: this.ctx,
      positionReversed: true,
    });

    this.sensor = new Sensor();

    this.lastPressedKey;

    this.keys = {
      ArrayUp: {
        pressed: false,
      },
      ArrowLeft: {
        pressed: false,
      },
      ArrowDown: {
        pressed: false,
      },
      ArrowRight: {
        pressed: false,
      },
    };

    this.inputHandler();
  }

  run() {
    this.animate();
    this.decreseTime();
  }

  animate() {
    window.requestAnimationFrame(() => {
      this.animate();
    });

    this.stage.render();

    this.player.update(this.gravity);
    this.enermy.update(this.gravity);

    this.sensor.checkAllHitDetection(this.player, this.enermy);

    this.player.boxBucket.renderAll({ object: this.player });
    this.enermy.boxBucket.renderAll({ object: this.enermy });

    this.objectCollisionDetection();

    if (this.player.isAttacking === false && this.player.velocity.y === 0) {
      this.player.switchSprite("idle");
    }

    if (this.enermy.isAttacking === false && this.enermy.velocity.y === 0) {
      this.enermy.switchSprite("idle");
    }

    if (this.player.isAttacking === false) {
      if (this.player.velocity.y < 0) {
        this.player.switchSprite("jump");
      }
      if (this.player.velocity.y > 0) {
        this.player.switchSprite("fall");
      }
    }

    if (this.enermy.isAttacking === false) {
      if (this.enermy.velocity.y < 0) {
        this.enermy.switchSprite("jump");
      }
      if (this.enermy.velocity.y > 0) {
        this.enermy.switchSprite("fall");
      }
    }

    if (
      this.player.isAttacking === false &&
      this.keys.ArrowRight.pressed &&
      this.lastPressedKey === "ArrowRight"
    ) {
      this.player.velocity.x = 7;
      this.player.switchSprite("run");
    } else if (
      this.player.isAttacking === false &&
      this.keys.ArrowLeft.pressed &&
      this.lastPressedKey === "ArrowLeft"
    ) {
      this.player.velocity.x = -7;
      this.player.switchSprite("run");
    } else {
      this.player.velocity.x = 0;
    }

    // end game based on health
    if (this.player.hitpoint <= 0 || this.enermy.hitpoint <= 0) {
      if (this.isGameEnded === false) {
        this.determineWinner();
      }
    }
  }

  decreseTime() {
    if (this.timer) {
      this.timer -= 1;
    }

    this.timerId = setTimeout(() => this.decreseTime(), 1000);
    document.querySelector("#timer").innerHTML = this.timer;

    // set begin title
    if (this.timer > 28) {
      document.querySelector("#displayText").innerHTML = "Let's rock";
    } else {
      document.querySelector("#displayText").innerHTML = "";
    }

    if (this.timer === 0) {
      if (this.isGameEnded === false) {
        this.determineWinner();
      }
    }
  }

  // result
  determineWinner() {
    clearTimeout(this.timerId);
    if (this.player.hitpoint === this.enermy.hitpoint) {
      document.querySelector("#displayText").innerHTML = "Tie";
    }
    if (this.player.hitpoint > this.enermy.hitpoint) {
      document.querySelector("#displayText").innerHTML = "Player 1 Wins";
      this.enermy.switchSprite("death");
    }
    if (this.player.hitpoint < this.enermy.hitpoint) {
      document.querySelector("#displayText").innerHTML = "Player 2 Wins";
      this.player.switchSprite("death");
    }
    this.isGameEnded = true;
  }

  inputHandler() {
    window.addEventListener("keydown", async (event) => {
      if (this.player.middleOfActionDelay) {
        return;
      }

      switch (event.key) {
        case "ArrowUp":
          if (this.player.velocity.y === 0) {
            this.player.velocity.y = -13;
            this.player.switchSprite("jump");
          }
          break;
        case "ArrowRight":
          this.keys.ArrowRight.pressed = true;
          this.lastPressedKey = "ArrowRight";
          this.lastPressedKey = event.key;
          break;
        case "ArrowLeft":
          this.keys.ArrowLeft.pressed = true;
          this.lastPressedKey = "ArrowLeft";
          this.lastPressedKey = event.key;
          break;
        case " ":
          if (this.player.isAttacking == true) return;
          this.player.isAttacking = true;
          this.player.switchSprite("attack");
          this.player.boxBucket.enableAttack({ name: "basic_attack" });
          await setDelay(500);
          this.player.isAttacking = false;
          break;
        case "ArrowDown":
          if (this.player.isAttacking == true) return;
          this.player.isAttacking = true;
          this.player.switchSprite("guard");
          this.player.boxBucket.enableAttack({ name: "guard" });
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      if (event.key === "ArrowUp") {
        this.keys.ArrayUp.pressed = false;
      }

      if (event.key === "ArrowRight") {
        this.keys.ArrowRight.pressed = false;
      }

      if (event.key === "ArrowLeft") {
        this.keys.ArrowLeft.pressed = false;
      }
      if (event.key === "ArrowDown") {
        this.keys.ArrowLeft.pressed = false;
        this.player.isAttacking = false;
      }
    });
  }

  objectCollisionDetection() {
    if (this.player.position.x + this.player.width >= this.enermy.position.x) {
      this.player.position.x -= 12;
      this.player.position.y -= 2;

      this.enermy.position.x += 12;
      this.enermy.position.y += 2;
    }
  }
}

const setDelay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
