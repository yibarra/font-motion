import { createContext, useMemo, useRef } from 'react'

import type { IPreviewContext, IPreviewProvider } from './interfaces'

const PreviewContext = createContext({} as IPreviewContext)

const PreviewProvider = ({ children }: IPreviewProvider) => {
  const canvasRef = useRef(null)

  // render
  return (
    <PreviewContext.Provider
      value={useMemo(() => ({
        canvasRef,
      }), [canvasRef])}
    >
      {children}
    </PreviewContext.Provider>
  )
}

export { PreviewContext, PreviewProvider }
export default PreviewProvider
