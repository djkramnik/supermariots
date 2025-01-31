import { loadBackgroundSprites } from "./loaders.js";

;(async function main() {
  const canvas = document.getElementById('screen') as HTMLCanvasElement
  if (!canvas) {
    console.error('Could not find canvas')
    return
  }
  const [sprites, level] = await loadBackgroundSprites({
    asset: 'tiles',
    levelName: '1-1',
    canvas,
  })
})()

