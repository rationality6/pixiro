class Hosta extends Fighter {
  constructor({ position, ctx, positionReversed = false }) {
    super({ position, ctx, positionReversed });
    this.name = "hosta";
    this.velocity = { x: 0, y: 0 };
    this.framesMax = 8;
    this.scale = 2.5;
    this.offset = { x: 165, y: 140 };

    // basic body hitbox
    this.height = 140;
    this.width = 90;

    this.framesCurrent = 0;

    // sprites
    this.sprites = {
      idle: {
        imageSrc: "./assets/hosta/Idle.png",
        imageSrcReversed: "./assets/hosta_reversed/idle.png",
        framesMax: 11,
      },
      run: {
        imageSrc: "./assets/hosta/Run.png",
        framesMax: 8,
        imageSrcReversed: "./assets/hosta_reversed/run.png",
      },
      jump: {
        imageSrc: "./assets/hosta/Jump.png",
        framesMax: 3,
        imageSrcReversed: "",
      },
      fall: {
        imageSrc: "./assets/hosta/Fall.png",
        framesMax: 3,
        imageSrcReversed: "",
      },
      attack3: {
        imageSrc: "./assets/hosta/Attack1.png",
        framesMax: 7,
        imageSrcReversed: "",
      },
      attack2: {
        imageSrc: "./assets/hosta/Attack2.png",
        framesMax: 6,
        imageSrcReversed: "",
      },
      attack: {
        imageSrc: "./assets/hosta/attack_slow2.png",
        imageSrcReversed: "./assets/hosta_reversed/attack_slow2.png",
        framesMax: 12,
      },
      death: {
        imageSrc: "./assets/hosta/Death.png",
        framesMax: 6,
        imageSrcReversed: "./assets/hosta_reversed/death.png",
      },
      takeHit: {
        imageSrc: "./assets/hosta/Take hit.png",
        framesMax: 4,
        imageSrcReversed: "",
      },
    };

    super.mappingSprites();

    this.botActionLoop();
  }

  botActionLoop() {
    setTimeout(async () => {
      const actionNumber = getRandomInt(5);

      switch (actionNumber) {
        case 0:
          this.botAttack();
          break;
        case 1:
          this.botMoveForward();
          this.botAttack();
          break;
        case 2:
          this.botMoveBack();
          this.botAttack();
          break;
        case 3:
          this.botJump();
          this.botAttack();
          break;
        case 3:
          this.botMoveBack();
          this.botJump();
          this.botMoveBack();
          this.botAttack();
          break;
      }
      this.botActionLoop();
    }, 1400);
  }

  async botAttack() {
    this.isAttacking = true;
    this.switchSprite("attack");
    this.boxBucket.enableAttack({ name: "bot_attack" });
    await setDelay(900);
    this.isAttacking = false;
  }

  async botMoveForward() {
    this.velocity.x = 7;
    await setDelay(300);
    this.velocity.x = 0;
  }

  async botMoveBack() {
    this.velocity.x = -7;
    await setDelay(300);
    this.velocity.x = 0;
  }

  botJump() {
    this.velocity.y = -12;
  }
}
