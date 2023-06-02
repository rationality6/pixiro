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

    this.framesCurrent = 0

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
    this.mappingSprites();
  }
}
