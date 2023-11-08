import { useCallback, useContext } from 'react'

import { FontSettingsContext } from '../../../providers/FontSettingsProvider/FontSettingsProvider'
import Glyph from '../Glyph'
import './styles.scss'

const Glyphs = () => {
  const { font } = useContext(FontSettingsContext)

  const getGlyphs = useCallback(() => {
    if (font) {
      const items = []
  
      for (let i = 0; i < font.glyphs.length; i++) {
        const value = font.glyphs.get(i)

        if (value.unicode) {
          items.push(
            <Glyph
              fontFamily={font?.names.fontFamily['en']}
              instances={font.tables.fvar.instances}
              glyph={value}
              key={i}
            />
          )
        }
      }
  
      return items
    }
    
    return <></>
  }, [font])

  return (
    <div className="glyphs">
      <p>total: {font && font.glyphs.length}</p>
      <div className="glyphs--grid">{getGlyphs()}</div>
    </div>
  )
}

Glyphs.displayName = 'Glyphs'
export default Glyphs
