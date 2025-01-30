;(function main() {
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
})()

