import { useCallback } from 'react'

// use font
const useFont = (font: opentype.Font) => {
  // get name
  const getName = useCallback((font: opentype.Font) => {
    if (font.names) {
      return font.names?.fontFamily.en
    }

    return ''
  }, [])

  // get fvar table
  const getFvarTable = useCallback((font: opentype.Font) => {
    if (font.tables) {
      return font.tables['fvar']
    }

    return false
  }, [])

  // get name instance
  const getNamedInstance = useCallback((i: number) => {
    const fvar = getFvarTable(font)

    if (fvar) {
      return fvar.instances[i]
    }

    return null
  }, [ font, getFvarTable ])

  // get named instance setting
  const getNamedInstanceSetting = useCallback((index: number) => {
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
  }, [ font, getFvarTable ])

  return {
    getFvarTable,
    getNamedInstance,
    getNamedInstanceSetting,
    getName,
  }
}

export default useFont