import { LevelDefinition } from "./types.js"

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