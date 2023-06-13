class Mack extends Fighter {
  constructor({ position, canvas, ctx }) {
    super({ position, canvas, ctx });
    this.name = "mack";
    this.velocity = { x: 0, y: 0 };
    this.framesMax = 8;
    this.scale = 2.5;
    this.offset = { x: 215, y: 165 };

    // basic body hitbox
    this.height = 140;
    this.width = 70;

    this.framesCurrent = 0;

    // sprites
    this.sprites = {
      idle: {
        imageSrc: "./assets/mack/Idle.png",
        framesMax: 8,
      },
      run: {
        imageSrc: "./assets/mack/Run.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "./assets/mack/Jump.png",
        framesMax: 2,
      },
      fall: {
        imageSrc: "./assets/mack/Fall.png",
        framesMax: 2,
      },
      attack: {
        imageSrc: "./assets/mack/Attack1.png",
        framesMax: 6,
      },
      attack2: {
        imageSrc: "./assets/mack/Attack2.png",
        framesMax: 6,
      },
      death: {
        imageSrc: "./assets/mack/Death.png",
        framesMax: 6,
      },
      takeHit: {
        imageSrc: "./assets/mack/Take Hit.png",
        framesMax: 4,
      },
    };

    super.mappingSprites();
  }
}
