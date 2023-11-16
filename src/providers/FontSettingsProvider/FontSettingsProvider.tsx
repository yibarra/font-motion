import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { Table } from 'opentype.js'

import { LoadFontContext } from '../LoadFontProvider/LoadFontProvider'
import { getFvarTable } from './helpers'
import type { IFontSettingsContext, IFontSettingsProvider } from './interfaces'

// Load Font Context
const FontSettingsContext = createContext({} as IFontSettingsContext)

// Load Font Provider
const FontSettingsProvider = ({ children }: IFontSettingsProvider) => {
  const { font } = useContext(LoadFontContext)

  const [fvar, setFvar] = useState<Pick<Table, 'coordinates'>>({ coordinates: { 'wdth': 0, 'wght' : 0 }})

  // set css instance value
  const setInstanceValue = useCallback((settings: opentype.Table, element: HTMLElement) => {
    if (settings instanceof Object === false) {
      return false
    }

    const cssProperties = Object.keys(settings).map((key: string) => `'${key}' ${settings[key]}`)
  
    if (cssProperties && element instanceof Object) {
      const css = element.style
      css.fontVariationSettings = cssProperties.join()
    }

    return true
  }, [])

  // set name instance value
  const setNamedInstanceValue = useCallback((settings: opentype.Table, element: HTMLElement) => {
    if (!font) {
      return false
    }

    const fvar = getFvarTable(font)

    if (fvar) {
      if (setInstanceValue(settings, element)) {
        return settings
      }
    }
  }, [ font, setInstanceValue ])

  // load change
  useEffect(() => {
    if (fvar) {
      setInstanceValue(fvar.coordinates, document.body)
    }
  }, [ fvar, setInstanceValue ])

  // render
  return (
    <FontSettingsContext.Provider
      value={{
        font,
        fvar,
        setFvar,
        setInstanceValue,
        setNamedInstanceValue
      }}
    >
      {children}
    </FontSettingsContext.Provider>
  )
}

export { FontSettingsContext, FontSettingsProvider }
export default FontSettingsProvider
