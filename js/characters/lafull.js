class Lafull extends Fighter {
  constructor({ position, ctx, positionReversed = false }) {
    super({ position, ctx, positionReversed });
    this.name = "lafull";
    this.velocity = { x: 0, y: 0 };
    this.framesMax = 8;
    this.scale = 3;
    this.offset = { x: 215, y: 165 };

    // basic body hitbox
    this.height = 140;
    this.width = 70;

    this.framesCurrent = 0;

    // sprites
    this.sprites = {
      idle: {
        imageSrc: "./assets/lafull/Idle.png",
        framesMax: 10,
      },
      run: {
        imageSrc: "./assets/lafull/Run.png",
        framesMax: 8,
      },
      jump: {
        imageSrc: "./assets/lafull/Jump.png",
        framesMax: 3,
      },
      fall: {
        imageSrc: "./assets/lafull/Fall.png",
        framesMax: 3,
      },
      attack3: {
        imageSrc: "./assets/lafull/Attack1.png",
        framesMax: 7,
      },
      attack2: {
        imageSrc: "./assets/lafull/Attack2.png",
        framesMax: 6,
      },
      attack: {
        imageSrc: "./assets/lafull/Attack3.png",
        framesMax: 8,
      },
      death: {
        imageSrc: "./assets/lafull/Death.png",
        framesMax: 6,
      },
      takeHit: {
        imageSrc: "./assets/lafull/Take hit.png",
        framesMax: 4,
      },
      guard: {
        imageSrc: "./assets/lafull/Attack1.png",
        framesMax: 7,
      },
    };

    super.mappingSprites();
  }
}
