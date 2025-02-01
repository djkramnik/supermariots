import SpriteSheet from "./spritesheet.js"

export type TileDefinition<T extends string> = [T, number, number]
export type SpriteDefinition<T extends string> = [T, number, number, number, number]

export const initSpriteSheet = <T extends string = string>({
  asset,
  tiles = [],
  sprites = [],
  width = 16,
  height = 16,
}: {
  asset: HTMLImageElement
  tiles?: TileDefinition<T>[]
  sprites?: SpriteDefinition<T>[]
  width?: number
  height?: number
}): SpriteSheet => {
  const spriteSheet = new SpriteSheet(asset, width, height)
  tiles.forEach(tile => spriteSheet.defineTile(...tile))
  sprites.forEach(sprite => spriteSheet.define(...sprite))
  return spriteSheet
}