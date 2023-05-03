const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.8

const background = new Background(
  {
    position: { x: 0, y: 0 },
    imageSrc: '../assets/background.png'
  }
)

const player = new Fighter(
  {
    position: { x: 100, y: 100 },
    velocity: { x: 0, y: 0 }
  }
)

const enermy = new Fighter(
  {
    position: { x: 800, y: 100 },
    velocity: { x: 0, y: 0 }
  }
)

const reactangularCollisionDetection = ({ rect1, rect2 }) => {
  return (rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x
    && rect1.attackBox.position.x <= rect2.position.x + rect2.width
    && rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y
    && rect1.attackBox.position.y <= rect2.position.y + rect2.height)
}

const hit_detection = () => {
  if (reactangularCollisionDetection({ rect1: player, rect2: enermy }) && player.isAttacking) {
    new Audio('../assets/sounds/dash.wav').play()
    player.isAttacking = false
  } else {
    player.isAttacking = false
  }
}

const animate = () => {
  window.requestAnimationFrame(animate)

  background.update()
  player.update()
  enermy.update()

  hit_detection()
}

animate()

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    if (player.velocity.y === 0) {
      player.velocity.y = -15
    }
  }

  if (e.key === 'ArrowRight') {
    player.velocity.x = 7
  }

  if (e.key === 'ArrowLeft') {
    player.velocity.x = -7
  }

  if (e.code == "Space") {
    player.attack()
  }

})

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight') {
    player.velocity.x = 0
  }
  if (e.key === 'ArrowLeft') {
    player.velocity.x = 0
  }
})
