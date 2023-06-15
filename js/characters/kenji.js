class Kenji extends Fighter {
  constructor({ position, ctx, positionReversed = false }) {
    super({ position, ctx, positionReversed });
    this.name = "kenji";
    this.velocity = { x: 0, y: 0 };
    this.framesMax = 4;
    this.scale = 2.5;
    this.offset = { x: 215, y: 180 };

    // basic body hitbox
    this.height = 140;

    // sprites
    this.sprites = {
      idle: {
        imageSrc: "",
        imageSrcReversed: "./assets/kenji/Idle.png",
        framesMax: 4,
      },
      death: {
        imageSrc: "",
        imageSrcReversed: "./assets/kenji/Death.png",
        framesMax: 7,
      },
      fall: {
        imageSrc: "",
        imageSrcReversed: "./assets/kenji/Fall.png",
        framesMax: 2,
      },
      attack: {
        imageSrc: "",
        imageSrcReversed: "./assets/kenji/Attack1.png",
        framesMax: 4,
      },
      takeHit: {
        imageSrc: "",
        imageSrcReversed: "./assets/kenji/Take hit.png",
        framesMax: 3,
      },
    };

    super.mappingSprites();

    this.botActionLoop();
  }

  botActionLoop() {
    setTimeout(async () => {
      const actionNumber = getRandomInt(4);

      this.botAttack();
      this.botMoveForward();

      this.botActionLoop();
    }, 2000);
  }

  async botAttack() {
    this.isAttacking = true;
    this.switchSprite("attack");
    this.boxBucket.enableAttack({ name: "bot_attack" });
    await setDelay(300);
    this.isAttacking = false;
  }

  botMoveForward() {
    this.velocity.x = 10;
  }
}
