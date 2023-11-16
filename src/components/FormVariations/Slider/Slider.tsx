import { useCallback, useContext, useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { FontSettingsContext } from '../../../providers/FontSettingsProvider/FontSettingsProvider'

const Slider = ({ input, callback }: {
  input: opentype.Table
  callback(key: string, value: number): void
}) => {
  const { fvar } = useContext(FontSettingsContext)
  const [value, setValue] = useState(input.defaultValue)

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (typeof callback === 'function') {
      const val = parseFloat(event.target.value)
  
      callback(input.tag, val)
      setValue(val)
    }
  }, [callback, input, setValue])

  // use effect
  useEffect(() => {
    if (fvar.coordinates) {
      setValue(fvar.coordinates[input.tag])
    }
  }, [fvar.coordinates, input.tag, setValue])

  // render
  return (
    <label>
      <span>{input.name['en']}</span>
      <span>value: {value}</span>
      <input
        id={input.tag}
        name={input.tag}
        max={input.maxValue}
        min={input.minValue}
        onChange={onChange}
        step={1}
        type="range"
        value={value}
      />
    </label>
  )
}

export default Slider
