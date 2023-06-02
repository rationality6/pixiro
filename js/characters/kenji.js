class Kenji extends Fighter {
  constructor(position) {
    super(position);
    this.image.src = "./assets/kenji/Idle.png";
    this.velocity = { x: 0, y: 0 };
    this.framesMax = 4;
    this.scale = 2.5;
    this.offset = { x: 215, y: 180 };

    this.height = 140

    this.sprites = {
      idle: {
        imageSrc: "./assets/kenji/Idle.png",
        framesMax: 8,
      },
      death: {
        imageSrc: "./assets/kenji/Death.png",
        framesMax: 7,
      },
    };

    this.mappingSprites();

    this.botAttack();
  }

  botAttack() {
    setTimeout(() => {
      // this.setAttackBox()
      this.botAttack();
    }, 1000);
  }
}
