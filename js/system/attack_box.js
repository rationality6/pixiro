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
    ctx,
  }) {
    this.name = name;
    this.position = position;
    this.offset = offset;
    this.area = area;
    this.delay = delay;

    this.ctx = ctx;

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

    this.ctx.strokeStyle = this.lineColor;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeRect(
      this.position.x + this.offset.x,
      this.position.y + this.offset.y,
      this.area.width,
      this.area.height
    );
  }
}

class BoxBucket {
  constructor({ ctx }) {
    this.bucket = [
      new AttackBox({
        name: "basic_attack",
        area: { width: 200, height: 170 },
        delay: 500,
        ctx: ctx,
      }),
      new AttackBox({
        name: "special_attack",
        area: { width: 30, height: 30 },
        delay: 500,
        ctx: ctx,
      }),
      new AttackBox({
        name: "guard",
        area: { width: 70, height: 70 },
        delay: 500,
        ctx: ctx,
      }),
      new AttackBox({
        name: "bot_attack",
        offset: { x: -190, y: -10 },
        area: { width: 200, height: 170 },
        delay: 1100,
        ctx: ctx,
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
