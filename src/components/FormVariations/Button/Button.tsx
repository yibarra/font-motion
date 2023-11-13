import { useRef, type HTMLAttributes, type PropsWithChildren, useEffect, useContext } from 'react'
import { FontSettingsContext } from '../../../providers/FontSettingsProvider/FontSettingsProvider'

const Button = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>> & any) => {
  const { setInstanceValue } = useContext(FontSettingsContext)
  const element = useRef(null)

  // use effect
  useEffect(() => {
    if (element.current) {
      setInstanceValue(props.coordinates, element.current)
    }
  }, [ props, setInstanceValue, element ])

  // render
  return (
    <button ref={element} type="button">
      {children}
    </button>
  )
}

Button.displayName = 'FormVariations.Button'
export default Button