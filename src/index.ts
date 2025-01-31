import { loadAsset, loadLevel } from "./loaders.js";
import SpriteSheet from "./sprite.js";
import { Background } from "./types.js";

;(async function main() {
  const canvas = document.getElementById('screen') as HTMLCanvasElement
  if (!canvas) {
    console.error('cannot find canvas element')
    return
  }
  const context = canvas.getContext('2d')
  if (!context) {
    console.error('could not create 2d context?!')
    return
  }

  const tileAsset = await loadAsset({ name: 'tiles' })
  const sprites = new SpriteSheet(tileAsset, 16, 16)

  const level = await loadLevel({ name: '1-1'})
  console.log('LEVEL:', level)

  sprites.define('ground', 0, 0)
  sprites.define('sky', 3, 23)
  // sprites.draw('sky', context, 0, 0) 

  for(const background of level.backgrounds) {
    drawBackground({
      background,
      sprites,
      context, 
    })
  }

})()

function drawBackground({
  background,
  context,
  sprites,
}: {
  background: Background
  context: CanvasRenderingContext2D
  sprites: SpriteSheet
}) {

  const { tile, ranges } = background
  console.log('background?', tile, ranges)
  for(const range of ranges) {
    const [xstart, xend, ystart, yend] = range
    for(let i = xstart; i < xend; i += 1) {
      for(let j = ystart; j < yend; j += 1) {
        sprites.drawTile(tile, context, i, j)
      }
    }
  }
}


