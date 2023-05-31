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

  switchSprite(sprite) {
    if (sprite === "idle") {
      this.image.src = this.sprites.idle.image.src;
      this.framesMax = this.sprites.idle.framesMax;
      this.framesHold = 5;
    }
    if (sprite === "run") {
      this.image.src = this.sprites.run.image.src;
      this.framesMax = this.sprites.run.framesMax;
    }
    if (sprite === "jump") {
      this.image.src = this.sprites.jump.image.src;
      this.framesMax = this.sprites.jump.framesMax;
    }
    if (sprite === "fall") {
      this.image.src = this.sprites.fall.image.src;
      this.framesMax = this.sprites.fall.framesMax;
    }
    if (sprite === "attack") {
      this.image.src = this.sprites.attack.image.src;
      this.framesMax = this.sprites.attack.framesMax;
    }
    if (sprite === "attack2") {
      this.image.src = this.sprites.attack2.image.src;
      this.framesMax = this.sprites.attack2.framesMax;
    }
  }
}