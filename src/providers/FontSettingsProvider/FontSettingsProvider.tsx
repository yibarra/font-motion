import { createContext, useCallback, useContext } from 'react'

import { LoadFontContext } from '../LoadFontProvider/LoadFontProvider'
import { getFvarTable } from './helpers'
import type { IFontSettingsContext, IFontSettingsProvider } from './interfaces'

// Load Font Context
const FontSettingsContext = createContext({} as IFontSettingsContext)

// Load Font Provider
const FontSettingsProvider = ({ children }: IFontSettingsProvider) => {
  const { font } = useContext(LoadFontContext)

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

  // render
  return (
    <FontSettingsContext.Provider
      value={{
        font,
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
