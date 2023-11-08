import { useRef, useEffect, useContext } from 'react'
import type { Glyph as IGlyph } from 'opentype.js'
import type { HTMLAttributes } from 'react'

import { FontSettingsContext } from '../../../providers/FontSettingsProvider/FontSettingsProvider'
import './styles.scss'

const Glyph = ({ glyph, fontFamily, instances, ...props }: HTMLAttributes<HTMLDivElement> & {
  glyph: IGlyph
  fontFamily: string
  instances: opentype.Table
}) => {
  const element = useRef(null)
  const { setInstanceValue } = useContext(FontSettingsContext)

  useEffect(() => {
    if (element.current) {
      const findInstance = instances[0]
    
      if (findInstance) {
        setInstanceValue(findInstance, element.current)
      }
    }
  }, [instances, setInstanceValue])

  // render
  return (
    <div className="glyph" {...props} ref={element}>
      <div>
        <span className="glyph--value">{glyph.name}</span>
      </div>
      <div>
        <span className="glyph--name" style={{
          fontFamily,
        }}>{String.fromCharCode(glyph.unicode ?? 0)}</span>
      </div>
      <div>
        <span className="glyph--value">{glyph.unicode}</span>
      </div>
    </div>
  )
}

export default Glyph
