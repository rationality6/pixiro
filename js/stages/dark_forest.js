class DarkForest {
  constructor() {
    this.background = new Sprite({
      position: { x: 0, y: 0 },
      scale: 0.63,
      imageSrc: "./assets/background.png",
    });

    this.shop = new Sprite({
      position: { x: 260, y: -16 },
      imageSrc: "./assets/shop.png",
      scale: 2.5,
      framesHold: 8,
      framesMax: 6,
    });
  }

  update_stage() {
    this.background.update();
    this.shop.update();
  }
}
