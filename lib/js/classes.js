class Background {
  constructor({ position, imageSrc }) {
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y)
  }
  update() {
    this.draw()
  }
}

class Fighter {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.height = 150
    this.width = 50
    this.attackBox = {
      position: {
        x: this.position.x + 30,
        y: this.position.y + 30
      },
      width: 90,
      height: 50
    }
    this.isAttacking = false
  }

  draw() {
    ctx.fillStyle = 'red'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    // attack box
    ctx.fillStyle = 'green'
    ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
  }

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.attackBox.position.x = this.position.x + 30
    this.attackBox.position.y = this.position.y + 30

    this.collision_detection()
    this.draw()
  }

  attack() {
    this.isAttacking = true
    setTimeout(() => this.isAttacking = false, 200)
  }

  collision_detection() {
    // collision detection bottom side
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
    } else {
      this.velocity.y += gravity
    }

    // collision detection right side
    if (this.position.x + this.width >= canvas.width) {
      this.position.x = canvas.width - this.width
    }

    // collision detection left side
    if (this.position.x <= 0) {
      this.position.x = 0
    }
  }
}