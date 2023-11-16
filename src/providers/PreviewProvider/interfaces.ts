import type { MutableRefObject, PropsWithChildren } from 'react'

export interface IPreviewProvider extends PropsWithChildren {

}

export interface IPreviewContext extends Pick<IPreviewProvider, 'children'> {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
}