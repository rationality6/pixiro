class JapanCastle {
  constructor({ ctx }) {
    this.stageName = "japan castle";
    this.background = new Sprite({
      position: { x: 0, y: 0 },
      scale: 1.6,
      imageSrc: "./assets/japan_castle/background.png",
      ctx: ctx,
    });
  }

  render() {
    this.background.update();
  }
}
