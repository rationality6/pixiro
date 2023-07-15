class JapanCastle {
  constructor({ ctx }) {
    this.stageName = "japan castle";
    this.background = new Sprite({
      position: { x: 0, y: 0 },
      scale: 1.6,
      imageSrc: "./assets/japan_castle/background.png",
      ctx: ctx,
    });

    this.cat1 = new Sprite({
      position: { x: 220, y: 245 },
      scale: 0.07,
      imageSrc: "./assets/cat_idle.png",
      ctx: ctx,
    });

    this.cat2 = new Sprite({
      position: { x: 490, y: 175 },
      scale: 0.03,
      imageSrc: "./assets/cat_idle.png",
      ctx: ctx,
    });
  }

  render() {
    this.background.update();
    this.cat1.update();
    this.cat2.update();
  }
}
