import SpriteSheet from "./spritesheet.js"
import { Background } from "./types.js"

export type Layer = (context: CanvasRenderingContext2D) => void

export const createBackgroundLayer = ({
  backgrounds,
  sprites,
}: {
  backgrounds: Background[]
  sprites: SpriteSheet
}) => {
  const buffer = document.createElement('canvas')
  const context = buffer.getContext('2d')
  if (!context) {
    throw Error('no context in createBackgroundLayer')
  }
  buffer.width = 256
  buffer.height = 240

  backgrounds.forEach((bg: Background) => {
    drawBackground({
      background: bg,
      sprites,
      context: context!
    })
  })

  const draw: Layer = (context: CanvasRenderingContext2D) => {
    context.drawImage(buffer, 0, 0)
  }
  return draw
}

export function drawBackground({
  background,
  context,
  sprites,
}: {
  background: Background
  context: CanvasRenderingContext2D
  sprites: SpriteSheet
}) {

  const { tile, ranges } = background
  for(const range of ranges) {
    const [xstart, xend, ystart, yend] = range
    for(let i = xstart; i < xend; i += 1) {
      for(let j = ystart; j < yend; j += 1) {
        sprites.drawTile(tile, context, i, j)
      }
    }
  }
}
