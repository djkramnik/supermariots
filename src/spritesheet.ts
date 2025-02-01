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
  define(
    name: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const buffer = document.createElement('canvas')
    buffer.width = width
    buffer.height = height
    const ctx = buffer.getContext('2d')
    if (!ctx) {
      throw Error('spritesheet unable to create 2d canvas context')
    }
    ctx.drawImage(
      this.image,
      x,
      y,
      width,
      height,
      0,
      0,
      width,
      height,
    )
    this.tiles.set(name, buffer)
  }
  defineTile(
    name: string,
    x: number,
    y: number
  ) {
    this.define(
      name,
      x * this.width,
      y * this.height,
      this.width,
      this.height,
    )
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