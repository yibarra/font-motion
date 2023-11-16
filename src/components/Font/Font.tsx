import Glyphs from './Glyphs'
import GlyphPreview from '../GlyphPreview'
import FormVariations from '../FormVariations/FormVariations'
import { useContext } from 'react'
import { FontSettingsContext } from '../../providers/FontSettingsProvider/FontSettingsProvider'

const Font = () => {
  const { font, setInstanceValue } = useContext(FontSettingsContext)

  console.info(setInstanceValue)

  // render
  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap'}}>
      {font && (
        <>
          <GlyphPreview
            snapping={{
              strength: 80,
              snapDistance: 1,
              snapX: 0,
              snapY: 0
            }}
          />

          <FormVariations tableFVar={font?.tables['fvar']} />

          <Glyphs />
        </>
      )}
    </div>
  )
}

export default Font
