import { useContext, useRef } from 'react'
import { FontSettingsContext } from '../../../providers/FontSettingsProvider/FontSettingsProvider'
import { Canvas, ThreeElements } from '@react-three/fiber'
import { Center, OrbitControls, Text3D } from '@react-three/drei'
import { fontConvert } from '../../../providers/FontSettingsProvider/helpers'

function Box(props: ThreeElements['mesh'] & { fontConvert: any}) {
  const ref = useRef<THREE.Mesh>(null!)

  // useFrame((state, delta) => (ref.current.rotation.x += delta))

  console.info(props.fontConvert)

  return (
    <mesh
      {...props}
      ref={ref}
      scale={0.5}
    >
    <Center>
      <Text3D font={props.fontConvert} {
        ...{
          size: 10,
        height: 1,
        curveSegments: 10,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 15
      }}
      >B</Text3D>
    </Center>
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}

const Glyphs = () => {
  const { font } = useContext(FontSettingsContext)

  if (!font) {
    return <></>
  }

  const fontS =  fontConvert(font, 8, '')

  return (
    <div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[20, 20, 20]} />

        <Box fontConvert={fontS} />

        <axesHelper scale={1} position={[0, 0, 0]} onUpdate={(self) => self.setColors('#fff000', 'blue', '#2080ff')} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  )
}

Glyphs.displayName = 'Glyphs'
export default Glyphs