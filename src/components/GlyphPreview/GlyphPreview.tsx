import { memo, useContext, useRef } from 'react'
import { Canvas, ThreeElements } from '@react-three/fiber'
import { AccumulativeShadows, Center, GizmoHelper, GizmoViewport, Grid, OrbitControls, Outlines, PerspectiveCamera, RandomizedLight, Text3D } from '@react-three/drei'
import { FontSettingsContext } from '../../providers/FontSettingsProvider/FontSettingsProvider'
import { fontConvert } from '../../providers/FontSettingsProvider/helpers'
import './styles.scss'


function Ground() {
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: '#6f6f6f',
    sectionSize: 3,
    sectionThickness: 1,
    sectionColor: '#9d4b4b',
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true
  }
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
}

function Box(props: ThreeElements['mesh'] & { fontConvert: any}) {
  const ref = useRef<THREE.Mesh>(null!)

  // useFrame((state, delta) => (ref.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      castShadow
      ref={ref}
      receiveShadow
      scale={0.2}
    >
      <Center position={[0, 5, 0]}>
        <Text3D
          bevelThickness={1}
          bevelSize={10}
          bevelOffset={0}
          bevelSegments={15}
          castShadow
          curveSegments={30}
          font={props.fontConvert}
          height={1}
          size={10}
        >
          B
          <meshBasicMaterial color="white" />
        </Text3D>
      </Center>
    </mesh>
  )
}

const Shadows = memo(() => (
  <AccumulativeShadows temporal color="#9d4b4b" colorBlend={0.5} alphaTest={0.9} scale={20}>
    <RandomizedLight amount={8} radius={1} position={[5, 5, -5]} />
  </AccumulativeShadows>
))

const Controls = () => {
  return (
    <>
      <GizmoHelper
        alignment="bottom-right"
        margin={[100, 100]}
        >
        <GizmoViewport
          axisColors={['red', 'green', 'blue']}
          labelColor="white"
          axisHeadScale={1}
        />
      </GizmoHelper>

      <OrbitControls makeDefault />
    </>
  )
}

const GlyphPreview = () => {
  const { font } = useContext(FontSettingsContext)

  if (!font) {
    return <></>
  }

  const fontS =  fontConvert(font, 8, {
    restrictContent: '',
    snapping: {
      strength: 1,
      snapDistance: 10,
      snapX: 10,
      snapY: 1
    }
  })

  return (
    <div className="glyph-preview">
      <Canvas
        shadows
        style={{
          backgroundColor: '#303035'
        }}
      >
        <PerspectiveCamera
          makeDefault
          aspect={1}
          far={100}
          fov={20}
          near={1}
          onUpdate={(self) => self.lookAt(0, 0.8, 0)}
          rotation={[-0.38, 0, 0]}
          position={[-10, 8, 10]}
          zoom={1.5}
        />

        <Ground />
        <Box fontConvert={fontS} />
      </Canvas>
    </div>
  )
}

GlyphPreview.displayName = 'GlyphPreview'
export default GlyphPreview
