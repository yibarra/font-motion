import { useRef, useEffect, useContext } from 'react'
import type { HTMLAttributes, PropsWithChildren } from 'react'

import { FontSettingsContext } from '../../../providers/FontSettingsProvider/FontSettingsProvider'

const Button = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>> & opentype.Table) => {
  const { font, setInstanceValue } = useContext(FontSettingsContext)
  const element = useRef(null)

  // use effect
  useEffect(() => {
    if (element.current) {
      setInstanceValue(props.coordinates, element.current)
    }
  }, [ props, setInstanceValue, element ])

  // render
  return (
    <button
      onClick={props.onClick}
      ref={element}
      type="button"
      style={{
        fontFamily: font?.names.fontFamily['en']
      }}
    >
      {children}
    </button>
  )
}

Button.displayName = 'FormVariations.Button'
export default Button