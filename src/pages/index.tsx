import React, { Suspense, useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'

import Duck from '../components/models/Duck'

import MainLayout from '@/components/layouts/MainLayout'

import Navbar from '@/components/Navbar'
import Dialogue from '@/components/Dialogue'
import DialoguesData from '@/data/dialoguesData.json'

const Home: NextPage = () => {
  const duckRef = React.useRef<any>(null)

  const [dialogueIndex, setDialogueIndex] = useState(0)

  const handleOnClick = (event: any) => {
    event.preventDefault()

    if (dialogueIndex < DialoguesData.length - 1) {
      setDialogueIndex(dialogueIndex + 1)
    } else {
      setDialogueIndex(0)
      return
    }

    console.log(dialogueIndex)
  }

  return (
    <div>
      <Head>
        <title>1tpp | Personal Website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        {/* <Navbar /> */}

        <div onClick={handleOnClick}>
          <Dialogue
            actor={DialoguesData[dialogueIndex].actor}
            dialogue={DialoguesData[dialogueIndex].dialogue}
          />
        </div>

        <Canvas shadows dpr={[1, 2]} camera={{ fov: 90 }}>
          <Suspense fallback={null}>
            <Stage
              controls={duckRef}
              preset="rembrandt"
              intensity={1}
              environment="city"
            >
              <Duck position={[0, 0, 0]} />
            </Stage>
          </Suspense>
          <OrbitControls ref={duckRef} />
        </Canvas>
      </MainLayout>
    </div>
  )
}

export default Home
