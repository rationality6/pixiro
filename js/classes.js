class AttackBox {
  constructor({
    position = { x: 0, y: 0 },
    offset = { x: 0, y: 0 },
    area = { width: 0, height: 0 },
    name,
    lineColor = "green",
    lineWidth = 2,
    enable = false,

    setTimeoutHandlers = [],
  }) {
    this.name = name;
    this.position = position;
    this.offset = offset;
    this.area = area;

    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.enable = enable;

    this.setTimeoutHandlers = setTimeoutHandlers;
  }

  render() {
    if (!this.enable) return;

    ctx.strokeStyle = this.lineColor;
    ctx.lineWidth = this.lineWidth;
    ctx.strokeRect(
      this.position.x + this.offset.x,
      this.position.y + this.offset.y,
      this.area.width,
      this.area.height
    );
  }
}

class BoxBucket {
  constructor() {
    this.bucket = [
      new AttackBox({ name: "basic_attack", area: { width: 20, height: 20 } }),
      new AttackBox({
        name: "special_attack",
        position: { x: 40, y: 40 },
        area: { width: 30, height: 30 },
      }),
    ];
  }

  renderAll() {
    this.bucket.forEach((item) => {
      item.render();
    });
  }
}
