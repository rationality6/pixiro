class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 10
    this.offset = offset
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale)
  }
  update() {
    this.draw()
    this.framesElapsed += 1
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent += 1
      } else {
        this.framesCurrent = 0
      }
    }
  }
}

class Fighter extends Sprite {
  constructor({ position, velocity, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
    })
    this.hitpoint = 100
    this.velocity = velocity
    this.height = 150
    this.width = 50
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: 180,
      height: 60
    }
    this.isAttacking = false

    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 10
  }

  // draw() {
  //   ctx.strokeStyle = 'red'
  //   ctx.lineWidth = 2;
  //   ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)

  //   ctx.strokeStyle = 'blue'
  //   ctx.lineWidth = 2;
  //   ctx.strokeRect(this.position.x + 1, this.position.y + 1, this.width + 1, this.height + 1)

  //   // attack box
  //   if (this.isAttacking) {
  //     ctx.strokeStyle = 'green'
  //     ctx.lineWidth = 2;
  //     ctx.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
  //   }

  //   // hitpoint
  //   ctx.fillStyle = 'white'
  //   ctx.font = '20px Arial'
  //   ctx.fillText(`HP: ${this.hitpoint}`, this.position.x, this.position.y - 10)

  // }

  update() {
    this.framesElapsed += 1
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent += 1
      } else {
        this.framesCurrent = 0
      }
    }
    
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.attackBox.position.x = this.position.x - 30
    this.attackBox.position.y = this.position.y + 30

    this.floor_collision_detection_and_gravity()

    this.wall_collision_detection()

    this.draw()
  }

  floor_collision_detection_and_gravity() {
    const ground = 100
    if (this.position.y + this.height + this.velocity.y >= canvas.height - ground) {
      this.velocity.y = 0
    } else {
      this.velocity.y += gravity
    }
  }

  attack() {
    this.isAttacking = true
    setTimeout(() => this.isAttacking = false, 200)
  }

  wall_collision_detection() {
    // right side
    if (this.position.x + this.width >= canvas.width) {
      this.position.x = canvas.width - this.width
    }

    // left side
    if (this.position.x <= 0) {
      this.position.x = 0
    }
  }

}