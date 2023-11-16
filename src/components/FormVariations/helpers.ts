import type { Table } from 'opentype.js'

// create input slider
export const createInputSlider = (inputs: Table['tables']) => 
 (inputs.filter((e) => e.type === 'slider'))

 // create inputs
export const createInputs = (fvar: Table) => {
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
