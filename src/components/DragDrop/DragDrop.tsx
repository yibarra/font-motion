import { useContext, useRef } from 'react'
import type { DragEvent, ChangeEvent } from 'react'

import { LoadFontContext } from '../../providers/LoadFontProvider/LoadFontProvider'
import './styles.scss'

const DragAndDrop = () => {
  const { onReadFile } = useContext(LoadFontContext)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // handler click trigger
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // handler file select
  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null

    if (file) {
      onReadFile(file)
    }
  }

  // drop drag
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const file = event.dataTransfer.files[0]

    if (file) {
      onReadFile(file)
    }
  }

  // prevent event
  const handleDragOverEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  // render
  return (
    <div
      className="drag-drop"
      draggable={true}
      onDrop={handleDrop}
      onDragOver={handleDragOverEnter}
      onDragEnter={handleDragOverEnter}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelected}
      />
      <p>Arrastra y suelta archivos aquí!</p>
    </div>
  )
}

DragAndDrop.displayName = 'DragAndDrop'
export default DragAndDrop
