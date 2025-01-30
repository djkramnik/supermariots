import SpriteSheet from "./sprite.js";

;(async function main() {
  console.log('hi')
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
  console.log('hello!')
  const sprites = new SpriteSheet(tileAsset, 16, 16)
  sprites.define('ground', 0, 0)
  sprites.draw('ground', context, 0, 0)

  function loadAsset({
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
})()

