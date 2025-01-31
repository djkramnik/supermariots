class SpriteSheet {
  image: HTMLImageElement
  width: number
  height: number
  tiles: Map<string, HTMLCanvasElement>

  constructor(
    image: HTMLImageElement,
    width: number,
    height: number) {
      this.image = image
      this.width = width
      this.height = height
      this.tiles = new Map()
  }
  define(name: string, x: number, y: number) {
    const buffer = document.createElement('canvas')
    buffer.width = this.width
    buffer.height = this.height
    const ctx = buffer.getContext('2d')
    if (!ctx) {
      throw Error('spritesheet unable to create 2d canvas context')
    }
    ctx.drawImage(
      this.image,
      x * this.width,
      y * this.height,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height,
    )
    this.tiles.set(name, buffer)
  }
  draw(name: string, context: CanvasRenderingContext2D, x: number, y: number) {
    const buffer = this.tiles.get(name)
    if (!buffer) {
      console.error(`draw: tile '${name}' is not defined`)
      return
    }
    context.drawImage(buffer, x, y)
  }
  drawTile(name: string, context: CanvasRenderingContext2D, x: number, y: number) {
    this.draw(name, context, x * this.width, y * this.height)
  }
}

export default SpriteSheet