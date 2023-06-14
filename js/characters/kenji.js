class Kenji extends Fighter {
  constructor({ position, ctx }) {
    super({ position, ctx });
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
        imageSrc: "./assets/kenji/Idle.png",
        framesMax: 4,
      },
      death: {
        imageSrc: "./assets/kenji/Death.png",
        framesMax: 7,
      },
      fall: {
        imageSrc: "./assets/kenji/Fall.png",
        framesMax: 2,
      },
      attack: {
        imageSrc: "./assets/kenji/Attack1.png",
        framesMax: 4,
      },
      takeHit: {
        imageSrc: "./assets/kenji/Take hit.png",
        framesMax: 3,
      },
    };

    super.mappingSprites();

    this.botAttackLoop();
  }

  botAttackLoop() {
    setTimeout(async () => {
      this.isAttacking = true;
      this.switchSprite("attack");
      this.boxBucket.enableAttack({ name: "bot_attack" });
      await setDelay(300);
      this.isAttacking = false;
      this.botAttackLoop();
    }, 1000);
  }
}
