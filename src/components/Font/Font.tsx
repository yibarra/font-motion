import { useState } from 'react'

import Glyphs from './Glyphs'
import GlyphPreview from '../GlyphPreview'

const Font = () => {
  const [fontSize, setFontSize] = useState(0.5)

  const handleSliderChange = (event: any) => {
    setFontSize(parseFloat(event.target.value))
  }

  return (
    <div>
      <div>
        <div>
          <label htmlFor="fontSizeSlider">Ajustar Tamaño de Fuente:</label>
          <input
            type="range"
            id="fontSizeSlider"
            min="0"
            max="1"
            step="0.01"
            value={fontSize}
            onChange={handleSliderChange}
          />
        </div>

        <div>
          <label htmlFor="strength">Strength:</label>
          <input
            type="range"
            id="fontStrengthSlider"
            min="0"
            max="1"
            step="0.01"
            value={fontSize}
            onChange={handleSliderChange}
          />
        </div>

        <div>
          <label htmlFor="fontDistanceSlider">Distance:</label>
          <input
            type="range"
            id="fontSizeSlider"
            min="0"
            max="1"
            step="0.01"
            value={fontSize}
            onChange={handleSliderChange}
          />
        </div>
        <div>
          <label htmlFor="fontXSlider">X:</label>
          <input
            type="range"
            id="fontSizeSlider"
            min="0"
            max="1"
            step="0.01"
            value={fontSize}
            onChange={handleSliderChange}
          />
        </div>
        <div>
          <label htmlFor="fontYSlider">Y:</label>
          <input
            type="range"
            id="fontSizeSlider"
            min="0"
            max="1"
            step="0.01"
            value={fontSize}
            onChange={handleSliderChange}
          />
        </div>
      </div>

      <GlyphPreview />
      <Glyphs />
    </div>
  )
}

export default Font
