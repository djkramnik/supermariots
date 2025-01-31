export type Background = {
  tile: string
  ranges: [number, number, number, number][]
}

export type LevelDefinition = {
  backgrounds: Background[]
}