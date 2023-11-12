import type { PropsWithChildren } from 'react'

export interface IFontTable {
  [name: string]: string | number | Record<string, never> 
}

export declare class FontFace {
  constructor(fontFamily: string, fontURL: string)
  family: string
  style: string
  weight: string
  stretch: string
  unicodeRange: string
  variant: string
  featureSettings: string
  status: string
  load(): Promise<FontFace>
  loaded: Promise<FontFace>
}

export interface CSSStyleDeclaration {
  fontVariationSettings: string | null
}

export interface IFontSettingsContext {
  font: opentype.Font | null
  setInstanceValue(settings: opentype.Table, element: HTMLElement): void | boolean
  setNamedInstanceValue(settings: opentype.Table, element: HTMLElement): void
}

export interface IFontSettingsProvider extends PropsWithChildren {
}

export interface IFontToken {
  ha: number
  x_min: number
  x_max: number
  o: string
}

export interface IFontConvert {
  ascender: number
  descender: number
  boundingBox: {
    yMin: number
    xMin: number
    yMax: number
    xMax: number
  }
  familyName: string
  glyphs: Record<string, IFontToken>
  resolution: number
  original_font_information: string
  underlinePosition: number
  underlineThickness: number
}

export type IFontConvertOptions = {
  restrictContent?: string
  snapping: {
    snapDistance: number
    strength: number
    snapX: number
    snapY: number
  }
}
