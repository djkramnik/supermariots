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

  context.fillRect(0,0,50,50)

  const tileAsset = await loadAsset({ name: 'tiles' })
  context.drawImage(tileAsset, 0, 0)

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

