class AttackBox {
  constructor({
    position = { x: 0, y: 0 },
    offset = { x: 0, y: 0 },
    area = { width: 0, height: 0 },
    name,
    lineColor = "green",
    lineWidth = 2,
    enable = false,
    delay = 500,
    setTimeoutHandlers = [],
  }) {
    this.name = name;
    this.position = position;
    this.offset = offset;
    this.area = area;
    this.delay = delay

    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.enable = enable;

    this.setTimeoutHandlers = setTimeoutHandlers;
  }

  updatePosition({ object }) {
    this.position.x = object.position.x;
    this.position.y = object.position.y;
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
      new AttackBox({
        name: "basic_attack",
        area: { width: 200, height: 170 },
        delay: 500,
      }),
      new AttackBox({
        name: "special_attack",
        area: { width: 30, height: 30 },
        delay: 500,
      }),
      new AttackBox({
        name: "bot_attack",
        offset: { x: -190, y: -10 },
        area: { width: 200, height: 170 },
        delay: 500,
      }),
    ];
  }

  enableAttack({ name }) {
    this.bucket.forEach(async (item) => {
      if (item.name === name) {
        item.enable = true;
        await setDelay(item.delay);
        item.enable = false;
      }
    });
  }

  updatePositions({ object }) {
    this.bucket.forEach((bucketItem) => {
      bucketItem.updatePosition({ object });
    });
  }

  renderAll({ object }) {
    this.updatePositions({ object: object });

    this.bucket.forEach((bucketItem) => {
      bucketItem.render();
    });
  }
}
