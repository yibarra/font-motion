import type { PropsWithChildren } from 'react'
import LoadFontProvider from '../LoadFontProvider'
import FontSettingsProvider from '../FontSettingsProvider'

// Main Provider
const MainProvider = ({ children }: PropsWithChildren) => {
  // render
  return (
    <LoadFontProvider>
      <FontSettingsProvider>
        {children}
      </FontSettingsProvider>
    </LoadFontProvider>
  )
}

export default MainProvider
