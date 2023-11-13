import { useFormik } from 'formik'
import { Table } from 'opentype.js'
import Button from './Button'

import './styles.scss'

interface FormObject {
  [key: string]: string | number
}

const createInputSlider = (inputs: Table['tables']) => 
 (inputs.filter((e) => e.type === 'slider'))

 // create inputs
const createInputs = (fvar: Table) => {
  const initialValues = []

  for (const item of Object.keys(fvar).map((i) => fvar[i])) {
    for (const value of item) {
      if (value.tag && initialValues.indexOf({ ...value, type: 'slider'}) === -1) {
        initialValues.push({ ...value, type: 'slider' })
      }

      if (value.coordinates) {
        initialValues.push({ ...value, type: 'button' })
      }
    }
  }

  return initialValues
}

// form variations
const FormVariations = ({ fvar }: opentype.Font['tables']) => {
  const initialValues: FormObject = {}
  const inputs = createInputs(fvar)
  const sliders = createInputSlider(inputs)

  sliders.map((field) => (initialValues[field.tag] = ''))

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log('Dados do formulário:', values)
    },
  })

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div>
        {sliders.map((i) => (
          <label>
            <span>{i.name['en']}</span>
            <input
              type="range"
              id={i.tag}
              name={i.tag}
              value={formik.values[i.tag] as number}
              onChange={formik.handleChange}
              max={i.maxValue}
              min={i.minValue}
              step={1}
            />
          </label>
        ))}

        <div>
          {inputs.filter((i) => i.type === 'button').map((e, index) => (
            <Button {...e} key={index}>
              <span>{e.name['en']}</span>
            </Button>
          ))}
        </div>
      </div>
    </form>
  )
}

export default FormVariations