import { FontData } from '@react-three/drei'
import type { IFontConvertOptions } from './interfaces'

// get name
export const getName = (font: opentype.Font) => {
  if (font.names) {
    return font.names?.fontFamily.en
  }

  return ''
}

// get fvar table
export const getFvarTable = (font?: opentype.Font) => {
  if (font && font.tables) {
    return font.tables['fvar']
  }

  return undefined
}

// get name instance
export const getNamedInstance = (font: opentype.Font, i: number) => {
  const fvar = getFvarTable(font)

  if (fvar) {
    return fvar.instances[i]
  }

  return null
}

// get named instance setting
export const getNamedInstanceSetting = (font: opentype.Font, index: number) => {
  const fvar = getFvarTable(font)

  if (fvar) {
    const settings = []
    const values = fvar.instances[index].coordinates

    for (const item of fvar.axes) {
      settings.push(`'${item.tag}' ${values[item.tag].toString()}`)
    }

    return settings.join()
  }

  return null
}

// snap
export const snap = (v: number, distance: number, strength: number) => 
  (v * (1.0 - strength)) + (strength * Math.round(v / distance) * distance)

// get path
export const getPath = (value: number, snapValue: number, distance: number, strength: number) => {
  let path = String(snap(value + snapValue, distance, strength) - snapValue)
  path += ' '

  return path
}

 // font convert
export const fontConvert = (font: opentype.Font, indexLetter: number, options: IFontConvertOptions) => {
  const {
    restrictContent,
    snapping: {
      strength = 0,
      snapDistance = 0,
      snapX = 0,
      snapY = 0
    },
  } = options

  const scale = (1000 * 100) / ((font.unitsPerEm || 2048) * 72)
  const result: any = {
    ascender: 0,
    descender: 0,
    boundingBox: {
      yMin: Math.round(font.tables.head.yMin * scale),
      xMin: Math.round(font.tables.head.xMin * scale),
      yMax: Math.round(font.tables.head.yMax * scale),
      xMax: Math.round(font.tables.head.xMax * scale)
    },
    familyName: '',
    glyphs: {},
    resolution: 0,
    original_font_information: '',
    underlinePosition: 0,
    underlineThickness: 0,
  }

  const restriction: { range: number[] | null; set: string | null } = {
    range: null,
    set: null
  };

  if (restrictContent && restrictContent.length) {
    const rangeSeparator = '-'

    if (restrictContent.indexOf(rangeSeparator) !== -1) {
      const rangeParts = restrictContent.split(rangeSeparator)

      if (rangeParts.length === 2 && !isNaN(Number(rangeParts[0])) && !isNaN(Number(rangeParts[1]))) {
        restriction.range = [parseInt(rangeParts[0]), parseInt(rangeParts[1])]
      }
    }

    if (restriction.range === null) {
      restriction.set = restrictContent
    }
  }

  const glyph = font.glyphs.get(indexLetter)
  
  if (glyph) {
    const unicodes: number[] = []

    if (glyph.unicode !== undefined) {
      unicodes.push(glyph.unicode)
    }

    if (glyph.unicodes.length) {
      glyph.unicodes.forEach((unicode) => {
        if (unicodes.indexOf(unicode) === -1) {
          unicodes.push(unicode)
        }
      })
    }

    unicodes.forEach((unicode: number) => {
      const glyphCharacter = String.fromCharCode(unicode)
      let needToExport = true

      if (restriction.range !== null) {
        needToExport = unicode >= restriction.range[0] && unicode <= restriction.range[1]
      } else if (restriction.set !== null && restrictContent) {
        needToExport = restrictContent.indexOf(glyphCharacter) !== -1
      }

      if (needToExport) {
        const token = { ha: 0, x_min: 0, x_max: 0, o: '' }
        const { advanceWidth = 1, xMax = 0, xMin = 0 } = glyph

        token.ha = Math.round(advanceWidth * scale)
        token.x_min = Math.round(xMin * scale)
        token.x_max = Math.round(xMax * scale)
        token.o = ''

        glyph.path.commands.forEach((command) => {
          token.o += command.type.toLowerCase()
          token.o += ' '

          if (command.type !== 'Z') {
            if (command.x !== undefined && command.y !== undefined) {
              token.o += getPath(Math.round(command.x * scale), snapX, snapDistance, strength)
              token.o += getPath(Math.round(command.y * scale), snapY, snapDistance, strength)
            }
          }
      
          if (command.type === 'Q' || command.type === 'C') {
            if (command.x1 !== undefined && command.y1 !== undefined) {
              token.o += getPath(Math.round(command.x1 * scale), snapX, snapDistance, strength)
              token.o += getPath(Math.round(command.y1 * scale), snapY, snapDistance, strength)
            }
          }
      
          if (command.type === 'C') {
            if (command.x2 !== undefined && command.y2 !== undefined) {
              token.o += getPath(Math.round(command.x2 * scale), snapX, snapDistance, strength)
              token.o += getPath(Math.round(command.y2 * scale), snapY, snapDistance, strength)
            }
          }
        })

        result.glyphs[String.fromCharCode(unicode)] = token
      }
    })
  }

  result.familyName = font.names.fontFamily['en']
  result.ascender = Math.round(font.ascender * scale)
  result.descender = Math.round(font.descender * scale)
  result.underlinePosition = Math.round(font.tables.post.underlinePosition * scale)
  result.underlineThickness = Math.round(font.tables.post.underlineThickness * scale)

  result.boundingBox = {
    yMin: Math.round(font.tables.head.yMin * scale),
    yMax: Math.round(font.tables.head.yMax * scale),
  }

  result.resolution = 1000

  return result
}
