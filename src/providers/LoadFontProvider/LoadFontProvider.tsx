import { createContext, useEffect, useState, useCallback, useMemo } from 'react'
import opentype from 'opentype.js'
import base64 from 'base-64'

import type { ILoadFontContext, ILoadFontProvider } from './interfaces'

const LoadFontContext = createContext({} as ILoadFontContext)

const LoadFontProvider = ({ children }: ILoadFontProvider) => {
  const [ font, setFont ] = useState<opentype.Font | null>(null)

  const loadedFonts: string[] = useMemo(() => [], [])

  // set font face
  const setFontFace = useCallback(async (font: opentype.Font, fontBuffer: ArrayBuffer) => {
    if (document instanceof Object) {
      const uni = new Uint8Array(fontBuffer)
      const base = base64.encode(uni.toString())

      const fontIdentifier = font.names.fontFamily.en // id font

      if (!loadedFonts.includes(fontIdentifier)) {
        loadedFonts.push(fontIdentifier) // add font to list

        const fontFace = `@font-face {
          font-family: '${font.names.fontFamily.en}';
          src: url('data:application/font-ttf;charset=utf-8;base64,${base}') format('truetype');
        }`;

        const style = document.createElement('style')
        style.id = 'font-load-' + fontIdentifier // id
        style.appendChild(document.createTextNode(fontFace))

        const head = document.head || document.getElementsByTagName('head')[0]
        head.appendChild(style)
      }
    }
  }, [loadedFonts])

  // on read file
  const onReadFile = useCallback((file: File) => {
    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        if (e.target) {
          const fontBuffer: ArrayBuffer | null = e.target.result as ArrayBuffer
          if (fontBuffer) {
            const font = opentype.parse(fontBuffer)
  
            setFont(font)
            setFontFace(font, fontBuffer)
          }
        }
      } catch (err) {
        console.error(`[ERROR READ FILE]: ${err}`)
      }
    }

    reader.onerror = (err) => {
      console.error(`[ERROR READ FILE]: ${err?.type}`)
    }

    reader.readAsArrayBuffer(file)
  }, [ setFont, setFontFace ])

  // use effect
  useEffect(() => {
    const load = () => {
      if (typeof window === 'undefined') {
        return
      }

      const url = `${import.meta.env.VITE_URL}${import.meta.env.VITE_FONT_DEFAULT}`
      const buffer = fetch(url).then(res => res.arrayBuffer())

      buffer.then(data => {
        const font = opentype.parse(data)

        setFont(font)
        setFontFace(font, data)
      })
    }

    load()
  }, [setFontFace])

  // render
  return (
    <LoadFontContext.Provider
      value={useMemo(() => ({
        font,
        onReadFile
      }), [font, onReadFile])}
    >
      {children}
    </LoadFontContext.Provider>
  )
}

export { LoadFontContext, LoadFontProvider }
export default LoadFontProvider
