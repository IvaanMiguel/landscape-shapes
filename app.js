const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const groundY = 450
const trunksY = groundY + 15
const cloudsTotal = 7
const branchSpreading = 25

const sunColor = '#f5c184'
const trunkColor = 'brown'
const grassColor = '#acdabd'
const skyColor = '#c7ebfb'

const leafsColors = [
  '#a77fbb',
  '#88cca7',
  '#fec67c',
  '#f272ad'
]

function drawCloud(x, y) {
  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.arc(x - 30, y + 30, 30, 0, Math.PI * 2)
  ctx.fill()

  ctx.arc(x + 30, y + 30, 30, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillRect(x - 30, y, 60, 60)
  ctx.fill()

  ctx.arc(x - 10, y + 5, 30, 0, Math.PI * 2)
  ctx.fill()

  ctx.arc(x + 20, y + 5, 15, 0, Math.PI * 2)
  ctx.fill()
}

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function setBackground() {
  ctx.fillStyle = skyColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  ctx.beginPath()
  ctx.fillStyle = sunColor
  ctx.arc(getRandomBetween(100, canvas.width - 100), 150, 50, 0, Math.PI * 2)
  ctx.fill()

  for(let i = 0; i < cloudsTotal; i++) {
    drawCloud(getRandomBetween(100, canvas.width - 100), getRandomBetween(60, 250));
  }

  ctx.fillStyle = grassColor
  ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY)
}

function getLeafsColor() {
  return leafsColors[Math.floor(Math.random() * leafsColors.length)]
}

function drawLeafs(trunkX, trunkHeight) {
  ctx.beginPath()

  switch(Math.floor(Math.random() * 3)) {
    case 0: // Circle
      ctx.arc(trunkX, trunkHeight + 10, 60, 0, Math.PI * 2)
      break;

    case 1: // Rectangle
      ctx.fillRect(trunkX - 40, trunkHeight - 50, 80, 120)
      break;

    case 2: // Triangle
      ctx.moveTo(trunkX - 60, trunkHeight + 70)
      ctx.lineTo(trunkX + 60, trunkHeight + 70)
      ctx.lineTo(trunkX, trunkHeight - 80)
      break;
  }

  ctx.fillStyle = getLeafsColor()
  ctx.fill()
}

function drawTrunk(trunkX) {
  const trunkHeight = getRandomBetween(trunksY - 120, trunksY - 250)

  drawLeafs(trunkX, trunkHeight)

  ctx.beginPath()
  ctx.moveTo(trunkX, trunksY)

  ctx.lineTo(trunkX, trunkHeight)

  ctx.moveTo(trunkX, trunkHeight + 20)
  ctx.lineTo(trunkX - branchSpreading, trunkHeight + 5)

  ctx.moveTo(trunkX, trunkHeight + 20)
  ctx.lineTo(trunkX + branchSpreading, trunkHeight + 5)
  
  ctx.moveTo(trunkX, trunkHeight + 40)
  ctx.lineTo(trunkX - branchSpreading, trunkHeight + 25)

  ctx.moveTo(trunkX, trunkHeight + 40)
  ctx.lineTo(trunkX + branchSpreading, trunkHeight + 25)

  ctx.moveTo(trunkX, trunkHeight + 60)
  ctx.lineTo(trunkX - branchSpreading, trunkHeight + 45)

  ctx.moveTo(trunkX, trunkHeight + 60)
  ctx.lineTo(trunkX + branchSpreading, trunkHeight + 45)

  ctx.strokeStyle = trunkColor
  ctx.stroke()
}

function drawTrees() {
  let treesSpacing = 100

  while (treesSpacing < canvas.width) {
    drawTrunk(treesSpacing)
    treesSpacing += 130
  }
}

canvas.addEventListener('click', () => {
  setBackground()
  drawTrees()
})

setBackground()
drawTrees()
