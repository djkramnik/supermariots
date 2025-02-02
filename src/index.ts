import { drawBackground } from "./layer.js";
import { loadStuff } from "./loaders.js";
import SpriteSheet from "./spritesheet.js";
import { Background } from "./types.js";

;(async function main() {
  const canvas = document.getElementById('screen') as HTMLCanvasElement
  if (!canvas) {
    console.error('Could not find canvas')
    return
  }
  const context = canvas.getContext('2d')
  if (!context) {
    throw Error('could not create 2d context?!')
  }

  const [
    bgSprites,
    characterSprites,
    level
  ] = await loadStuff({
    bgAsset: 'tiles.png',
    charAsset: 'characters.gif',
    levelName: '1-1',
  })

  for(const background of level.backgrounds) {
    drawBackground({
      background,
      sprites: bgSprites,
      context, 
    })
  }

  const pos: { x: number, y: number } = {
    x: 64,
    y: 64
  }

  drawMario()

  function drawMario() {
    characterSprites.draw('idle', context!, pos.x, pos.y)
    pos.x += 2
    pos.y += 2
    if (pos.x < 1000) {
      window.requestAnimationFrame(drawMario)
    }
  }
  
})()
