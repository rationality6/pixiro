class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    ctx,
    positionReversed = false,
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
      ctx,
    });

    // default state
    this.hitpoint = 100;
    this.height = 150;
    this.width = 50;

    this.ground = 60;
    
    this.positionReversed = positionReversed;

    this.velocity = velocity;

    this.isAttacking = false;


    // animation
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;

    // gatling
    this.gatling_count = 0;
    this.gatlingStart = false;
    this.gatlingTimeoutHandler = null;

    this.boxBucket = new BoxBucket({ ctx: this.ctx });
  }

  mappingSprites() {
    for (const sprite in this.sprites) {
      this.sprites[sprite].image = new Image();

      if(this.positionReversed){
        this.sprites[sprite].image.src = this.sprites[sprite].imageSrcReversed;
      }else{
        this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
      }
      

    }
  }

  drawBodyBox() {
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    this.ctx.strokeStyle = "blue";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(
      this.position.x - 1,
      this.position.y - 1,
      this.width + 2,
      this.height + 2
    );
  }

  drawHitPoint() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(
      `HP: ${this.hitpoint}`,
      this.position.x,
      this.position.y - 10
    );
  }

  update(gravity) {
    // body box
    this.drawBodyBox();

    // hitpoint
    this.drawHitPoint();

    // moving
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.floorCollisionDetectionAndGravity(gravity);
    this.wallCollisionDetection();
    this.draw();
    this.animateFrame();
  }

  setActionDelay(msecond) {
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.middleOfActionDelay = true;
    setTimeout(() => (this.middleOfActionDelay = false), msecond);
  }

  floorCollisionDetectionAndGravity(gravity) {
    if (
      this.position.y + this.height + this.velocity.y >=
      this.ctx.canvas.height - this.ground
    ) {
      this.velocity.y = 0;
      this.position.y = 160;
    } else {
      this.velocity.y += gravity;
    }
  }

  wallCollisionDetection() {
    // right side
    if (this.position.x + this.width >= this.ctx.canvas.width) {
      this.position.x = this.ctx.canvas.width - this.width;
    }

    // left side
    if (this.position.x <= 0) {
      this.position.x = 0;
    }
  }

  async attack(delay) {
    this.setActionDelay(delay);
    this.isAttacking = true;
    await setDelay(delay);
    this.isAttacking = false;
  }

  gatlingAttack() {
    if (this.gatlingStart == true) {
      this.attack(400);
      this.gatling_count += 1;
      clearTimeout(this.gatlingTimeoutHandler);
      // console.log("clear gatling attack start");

      this.switchSprite("attack2");

      this.gatlingTimeoutHandler = setTimeout(() => {
        // console.log(`gatling attack end ${this.gatling_count}}`);
        this.gatlingStart = false;
        this.gatling_count = 0;
      }, 500);
    } else {
      this.attack(400);
      this.gatlingStart = true;
      this.gatling_count += 1;
      // console.log("gatling attack start");

      this.switchSprite("attack");

      this.gatlingTimeoutHandler = setTimeout(() => {
        this.gatlingStart = false;
        this.gatling_count = 0;
        // console.log("gatling attack end");
      }, 500);
    }
  }

  switchSprite(sprite) {
    if (
      this.image === this.sprites.attack.image &&
      this.framesCurrent < this.sprite.attack.framesMax - 1
    )
      return;

    if (sprite === "idle") {
      if (this.image !== this.sprites.idle.image) {
        this.image.src = this.sprites.idle.image.src;
        this.framesMax = this.sprites.idle.framesMax;
        this.framesHold = 5;
      }
    }
    if (sprite === "run") {
      if (this.image !== this.sprites.run.image) {
        this.image.src = this.sprites.run.image.src;
        this.framesMax = this.sprites.run.framesMax;
      }
    }
    if (sprite === "jump") {
      this.image.src = this.sprites.jump.image.src;
      this.framesMax = this.sprites.jump.framesMax;
      this.framesCurrent = 0;
    }
    if (sprite === "fall") {
      this.image.src = this.sprites.fall.image.src;
      this.framesMax = this.sprites.fall.framesMax;
      this.framesCurrent = 0;
    }
    if (sprite === "attack") {
      if (this.image !== this.sprites.attack.image) {
        this.image.src = this.sprites.attack.image.src;
        this.framesMax = this.sprites.attack.framesMax;
        this.framesCurrent = 0;
      }
    }
    if (sprite === "attack2") {
      if (this.image !== this.sprites.attack2.image) {
        this.image.src = this.sprites.attack2.image.src;
        this.framesMax = this.sprites.attack2.framesMax;
        this.framesCurrent = 0;
      }
    }
    if (sprite === "guard") {
      if (this.image !== this.sprites.guard.image) {
        this.image.src = this.sprites.guard.image.src;
        this.framesMax = this.sprites.guard.framesMax;
        this.framesCurrent = 0;
      }
    }
    if (sprite === "death") {
      this.image.src = this.sprites.death.image.src;
      this.framesMax = this.sprites.death.framesMax;
      this.framesCurrent = 0;
    }
  }
}

const botPatternMixin = () => {
  // will add bot code and patterns
};

Object.assign(Fighter.prototype, botPatternMixin);
