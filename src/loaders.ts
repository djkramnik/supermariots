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

export async function loadStuff({
  bgAsset,
  charAsset,
  levelName,
}: {
  bgAsset: string | [string, string]
  charAsset: string | [string, string]
  levelName: string
}): Promise<[SpriteSheet, SpriteSheet, LevelDefinition]> {
  const [loadedBgAsset, loadedCharsAsset, level] = await Promise.all([
    loadAsset({ 
      name: Array.isArray(bgAsset) ? bgAsset[0] : bgAsset,
      extension: Array.isArray(bgAsset) ? bgAsset[1] : undefined,
    }),
    loadAsset({
      name: Array.isArray(charAsset) ? charAsset[0] : charAsset,
      extension: Array.isArray(charAsset) ? charAsset[1] : undefined,
    }),
    loadLevel({ name: levelName })
  ])

  // define bg sprites
  const bgSprites = new SpriteSheet(loadedBgAsset, 16, 16)
  bgSprites.defineTile('ground', 0, 0)
  bgSprites.defineTile('sky', 3, 23)

  // define character sprites
  const charSprites = new SpriteSheet(loadedCharsAsset, 16, 16)
  charSprites.define('idle', 276, 44, 16, 16)

  return [bgSprites, charSprites, level]
}