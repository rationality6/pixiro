class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    framesHold = 10,
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = framesHold;
    this.offset = offset;
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrame() {
    this.framesElapsed += 1;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent += 1;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrame();
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    });
    this.hitpoint = 100;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;

    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 260,
      height: 160,
    };

    this.isAttacking = false;

    // animation
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;

    // gatling
    this.gatling_count = 0;
    this.gatlingStart = false;
    this.gatlingTimeoutHandler = null;

    // sprites
    this.sprites = sprites;
    this.mapping_sprites();
  }

  mapping_sprites() {
    for (const sprite in this.sprites) {
      this.sprites[sprite].image = new Image();
      this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
    }
  }

  update() {
    // attack box
    if (this.isAttacking) {
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }

    // body box
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      this.position.x + 1,
      this.position.y + 1,
      this.width + 1,
      this.height + 1
    );

    // hitpoint
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`HP: ${this.hitpoint}`, this.position.x, this.position.y - 10);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.attackBox.position.x = this.position.x;
    this.attackBox.position.y = this.position.y;

    this.floor_collision_detection_and_gravity();
    this.wall_collision_detection();
    this.draw();
    this.animateFrame();
  }

  floor_collision_detection_and_gravity() {
    const ground = 60;
    if (
      this.position.y + this.height + this.velocity.y >=
      canvas.height - ground
    ) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => (this.isAttacking = false), 500);
  }

  gatling_attack() {
    if (this.gatlingStart == true) {
      this.attack();
      this.gatling_count += 1;
      clearTimeout(this.gatlingTimeoutHandler);
      // console.log("clear gatling attack start");
      this.gatlingTimeoutHandler = setTimeout(() => {
        // console.log(`gatling attack end ${this.gatling_count}}`);
        this.gatlingStart = false;
        this.gatling_count = 0;
      }, 1000);
    } else {
      this.attack();
      this.gatlingStart = true;
      this.gatling_count += 1;
      // console.log("gatling attack start");

      this.gatlingTimeoutHandler = setTimeout(() => {
        this.gatlingStart = false;
        this.gatling_count = 0;
        // console.log("gatling attack end");
      }, 1000);
    }
  }

  wall_collision_detection() {
    // right side
    if (this.position.x + this.width >= canvas.width) {
      this.position.x = canvas.width - this.width;
    }

    // left side
    if (this.position.x <= 0) {
      this.position.x = 0;
    }
  }
}

let soundEffectMixin = {
  playSoundDash() {
    new Audio("./assets/sounds/dash.wav").play();
  },
  playSoundHit() {
    new Audio("./assets/sounds/hit.wav").play();
  },
};

Object.assign(Fighter.prototype, soundEffectMixin);
