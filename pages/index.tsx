import type { NextPage } from 'next'
import { useRef, useState, useEffect } from 'react'

import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'

function Box(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)

  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHovered(true)}
      onPointerOut={(event) => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Square = ({ children }: any) => {
  return (
    <div style={{ backgroundColor: 'red', width: 250, height: 250 }}>
      {children}
    </div>
  )
}

const Home: NextPage = () => {
  const boxRef = useRef<HTMLDivElement>(null!)
  const el = useRef<HTMLDivElement>(null!)
  const q = gsap.utils.selector(el)

  useEffect(() => {
    gsap.to(boxRef.current, { rotation: '+=360' })
    gsap.to(q('.box'), {
      x: 100,
      stagger: 0.33,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
    })
  }, [])

  return (
    <div className="container mx-auto">
      <div className="flex justify-center h-screen">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </div>
      <div ref={el} className="w-full h-screen">
        <Square className="box" />
        <Square className="box" />
        <Square className="box" />
      </div>
    </div>
  )
}

export default Home
