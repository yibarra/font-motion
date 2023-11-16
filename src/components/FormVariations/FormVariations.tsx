import { useContext } from 'react'
import Button from './Button'

import { FontSettingsContext } from '../../providers/FontSettingsProvider/FontSettingsProvider'
import Slider from './Slider'
import { createInputSlider, createInputs } from './helpers'
import './styles.scss'


// form variations
const FormVariations = ({ tableFVar }: opentype.Font['tables']) => {
  const { fvar, setFvar } = useContext(FontSettingsContext)

  const inputs = createInputs(tableFVar)
  const sliders = createInputSlider(inputs)

  // slider
  const updateFVarAxe = (key: string, value: number) => {
    const coordinates = fvar.coordinates

    if (coordinates) {
      coordinates[key] = value
      
      setFvar({ coordinates })
    }
  }

  // button
  const updateCanvas = (settings: opentype.Table) => {
    setFvar({ coordinates: settings.coordinates })
  }

  return (
    <div className="form">
      <div className="form-axes">
        {sliders.map((i, index) => (
          <Slider callback={updateFVarAxe} input={i} key={index} />
        ))}
      </div>

      <div className="form-settings">
        {inputs.filter((i) => i.type === 'button').map((e, index) => (
          <Button {...e} key={index} onClick={() => updateCanvas(e)}>
            <span>B</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default FormVariations