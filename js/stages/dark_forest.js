class DarkForest {
  constructor({ctx: ctx}) {
    this.stageName = "dark forest";
    this.background = new Sprite({
      position: { x: 0, y: 0 },
      scale: 0.63,
      imageSrc: "./assets/dark_forest/background.png",
      ctx: ctx,
    });

    this.shop = new Sprite({
      position: { x: 260, y: -16 },
      imageSrc: "./assets/dark_forest/shop.png",
      scale: 2.5,
      framesHold: 8,
      framesMax: 6,
      ctx: ctx,
    });
  }

  render() {
    this.background.update();
    this.shop.update();
  }
}
