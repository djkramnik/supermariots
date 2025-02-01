import SpriteSheet from "./sprite.js"
import { LevelDefinition } from "./types.js"

export function loadAsset({
  name,
  basePath = '/assets',
}: {
  name: string
  basePath?: string
}): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener('load', function onLoaded() {
      image.removeEventListener('load', onLoaded)
      resolve(image)
    })
    image.src = `${basePath}/${name.trim()}`
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
  bgAsset: string
  charAsset: string
  levelName: string
}): Promise<[SpriteSheet, SpriteSheet, LevelDefinition]> {
  const [loadedBgAsset, loadedCharsAsset, level] = await Promise.all([
    loadAsset({ 
      name: bgAsset,
    }),
    loadAsset({
      name: charAsset,
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