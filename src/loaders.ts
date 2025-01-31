import SpriteSheet from "./sprite.js"
import { Background, LevelDefinition } from "./types.js"

export function loadAsset({
  name,
  basePath = '/assets',
  extension = '.png',
}: {
  name: string
  basePath?: string
  extension?: string
}): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener('load', function onLoaded() {
      image.removeEventListener('load', onLoaded)
      resolve(image)
    })
    image.src = `${basePath}/${name.trim()}${extension}`
  })
}

export async function loadLevel({
  name,
  basePath ='/levels',
}: {
  name: string
  basePath?: string
}): Promise<LevelDefinition> {
  const url = `${basePath}/${name.trim()}.json`
  const response = await fetch(url)
  const json = await response.json()
  return json as LevelDefinition
}

export async function loadBackgroundSprites({
  asset,
  levelName,
  canvas,
}: {
  asset: string
  levelName: string
  canvas: HTMLCanvasElement
}): Promise<[SpriteSheet, LevelDefinition]> {

  const context = canvas.getContext('2d')
  if (!context) {
    throw Error('could not create 2d context?!')
  }
  const [loadedAsset, level] = await Promise.all([
    loadAsset({ name: asset }),
    loadLevel({ name: levelName })
  ])
  const sprites = new SpriteSheet(loadedAsset, 16, 16)
  sprites.define('ground', 0, 0)
  sprites.define('sky', 3, 23)
  for(const background of level.backgrounds) {
    drawBackground({
      background,
      sprites,
      context, 
    })
  }
  return [sprites, level]
}

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
  for(const range of ranges) {
    const [xstart, xend, ystart, yend] = range
    for(let i = xstart; i < xend; i += 1) {
      for(let j = ystart; j < yend; j += 1) {
        sprites.drawTile(tile, context, i, j)
      }
    }
  }
}