class Kenji extends Fighter {
  constructor(position) {
    super(position);
    this.image.src = "./assets/kenji/Idle.png";
    this.velocity = { x: 0, y: 0 };
    this.framesMax = 4;
    this.scale = 2.5;
    this.offset = { x: 215, y: 169 };
    
    this.mapping_sprites();
  }
}
