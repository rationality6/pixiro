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

  checkAllHitDetection(player, enermy) {
    player.boxBucket.bucket.forEach((hitbox) => {
      if (
        this.collisionDetection({
          hitbox: hitbox,
          targetPlayer: enermy,
        }) &&
        hitbox.enable
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
    });

    // enermy.boxBucket.bucket.forEach((hitbox) => {
    //   if (
    //     this.collisionDetection({
    //       hitbox: hitbox,
    //       targetPlayer: player,
    //     }) &&
    //     hitbox.enable
    //   ) {
    //     enermy.playSoundHit();
    //     player.hitpoint -= 15;
    //     document.querySelector(
    //       "#playerHealth"
    //     ).style.width = `${player.hitpoint}px`;
    //     hitbox.enable = false;
    //   } else if (hitbox.enable) {
    //   } else {
    //     hitbox.enable = false;
    //   }
    // });
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
    this.stage = new DarkForest({ ctx: this.ctx });

    // player
    const playerOneStartPosition = { x: 100, y: 50 };
    this.player = new Lafull({
      position: playerOneStartPosition,
      ctx: this.ctx,
    });

    // enermy
    const playerTwoStartPosition = { x: 500, y: 50 };
    this.enermy = new Kenji({
      position: playerTwoStartPosition,
      ctx: this.ctx,
    });

    const sensor = new Sensor();

    this.lastPressedKey;

    this.keys = {
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

    // this.sensor.checkAllHitDetection(this.player, this.enermy);

    this.player.boxBucket.renderAll({ object: this.player });
    this.enermy.boxBucket.renderAll({ object: this.enermy });

    this.objectCollisionDetection();

    if (this.player.isAttacking === false && this.player.velocity.y === 0) {
      this.player.switchSprite("idle");
    }

    if (this.enermy.isAttacking === false && this.enermy.velocity.y === 0) {
      this.enermy.switchSprite("idle");
    }

    if (this.player.velocity.y < 0) {
      this.player.switchSprite("jump");
    }
    if (this.player.velocity.y > 0) {
      this.player.switchSprite("fall");
    }

    if (this.keys.ArrowRight.pressed && this.lastPressedKey === "ArrowRight") {
      this.player.velocity.x = 7;
      this.player.switchSprite("run");
    } else if (
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
          this.player.isAttacking = true;
          this.player.switchSprite("attack");
          this.player.boxBucket.enableAttack({ name: "basic_attack" });
          await setDelay(400);
          this.player.isAttacking = false;
          break;
        case "ArrowDown":
          this.player.switchSprite("guard");
          console.log("guard");
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
    });
  }

  // collisions
  objectCollisionDetection() {
    // right side collision
    if (this.player.position.x + this.player.width >= this.enermy.position.x) {
      this.player.velocity.x = 0;
    }

    // // left side
    // if (player.position.x <= 0) {
    //   player.position.x = 0
    // }
  }
}

const setDelay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};
