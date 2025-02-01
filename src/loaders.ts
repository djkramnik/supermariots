import { initSpriteSheet } from "./sprite.js"
import SpriteSheet from "./spritesheet.js"
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
  const bgSprites = initSpriteSheet({
    asset: loadedBgAsset,
    tiles: [
      ['ground', 0, 0],
      ['sky', 3, 23]
    ]
  })
  
  const charSprites = initSpriteSheet({
    asset: loadedCharsAsset,
    sprites: [
      ['idle', 276, 44, 16, 16]
    ]
  })

  return [bgSprites, charSprites, level]
}