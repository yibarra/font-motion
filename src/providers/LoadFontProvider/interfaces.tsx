import type { PropsWithChildren } from 'react'

export interface ILoadFontContext {
  font: opentype.Font | null
  onReadFile(file: File): void
}

export interface ILoadFontProvider extends PropsWithChildren {
}