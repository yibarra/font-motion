import React from 'react'

import DragDrop from '../../components/DragDrop'
import Font from '../../components/Font'
import './styles.scss'

const Main = () => {
  return (
    <div className="main">
      <DragDrop />

      <Font />
    </div>
  )
}

Main.displayName = 'Layout.Main'
export default Main
