class Mack extends Fighter {
  constructor(position) {
    super(position);
    this.velocity = { x: 0, y: 0 };
    this.framesMax = 8;
    this.scale = 2.5;
    this.offset = { x: 215, y: 165 };

    // basic body hitbox
    this.height = 140;
    this.width = 70;

    // sprites
    this.sprites = {
      idle: {
        imageSrc: "./assets/samuraiMack/Idle.png",
        framesMax: 8,
      },
      run: {
        imageSrc: "./assets/samuraiMack/Run.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "./assets/samuraiMack/Jump.png",
        framesMax: 2,
      },
      fall: {
        imageSrc: "./assets/samuraiMack/Fall.png",
        framesMax: 2,
      },
      attack: {
        imageSrc: "./assets/samuraiMack/Attack1.png",
        framesMax: 6,
      },
      attack2: {
        imageSrc: "./assets/samuraiMack/Attack2.png",
        framesMax: 6,
      },
      death: {
        imageSrc: "./assets/samuraiMack/Death.png",
        framesMax: 6,
      },
    };
    this.mapping_sprites();
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

      this.switchSprite("attack2");

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

      this.switchSprite("attack");

      this.gatlingTimeoutHandler = setTimeout(() => {
        this.gatlingStart = false;
        this.gatling_count = 0;
        // console.log("gatling attack end");
      }, 1000);
    }
  }
}
