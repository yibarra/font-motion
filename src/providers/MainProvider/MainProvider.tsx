import type { PropsWithChildren } from 'react'
import LoadFontProvider from '../LoadFontProvider'
import FontSettingsProvider from '../FontSettingsProvider'
import PreviewProvider from '../PreviewProvider/PreviewProvider'

// Main Provider
const MainProvider = ({ children }: PropsWithChildren) => {
  // render
  return (
    <LoadFontProvider>
      <FontSettingsProvider>
        <PreviewProvider>
          {children}
        </PreviewProvider>
      </FontSettingsProvider>
    </LoadFontProvider>
  )
}

export default MainProvider
