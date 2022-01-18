import React, { Suspense, useState, useEffect, useRef } from 'react'
import Head from 'next/head'

import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import Duck from '../components/models/Duck'

import MainLayout from '@/components/layouts/MainLayout'

import Dialogue from '@/components/Dialogue'
import DialoguesData from '@/data/dialoguesData.json'

import * as THREE from 'three'

import NET from 'vanta/dist/vanta.net.min'
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag

const VantaNet = ({ children }) => {
  const [vantaEffect, setVantaEffect] = useState(0)
  const vantaRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          points: 15,
          color: 0x14b679,
          backgroundColor: 0x222222,
          maxDistance: 10,
        }),
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  return (
    <div className="w-full h-full relative" ref={vantaRef}>
      {children}
    </div>
  )
}

function AnimationWrapper() {
  gsap.registerPlugin(ScrollTrigger)
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
  const { scene, camera } = useThree()
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#section-two',
      start: 'top top',
      endTrigger: '#section-five',
      end: 'bottom bottom',
      scrub: 1,
    },
  })

  React.useEffect(() => {
    scene.rotation.set(0, 0, 0)
    camera.position.set(2, 0, 5)

    tl.to(scene.rotation, { y: 4.79 })
      .to(camera.position, { x: -0.1 })
      .to(scene.rotation, { z: 1.6 })
      .to(scene.rotation, { z: 0.02, y: 3.1 }, 'simultaneously')
      .to(camera.position, { x: 0.16 }, 'simultaneously')

    setInterval(() => {
      forceUpdate()
    }, 500)
  }, [])

  return null
}

const Home = () => {
  const duckRef = React.useRef(null)

  const [dialogueIndex, setDialogueIndex] = useState(0)

  const handleOnClick = (event) => {
    event.preventDefault()

    if (dialogueIndex < DialoguesData.length - 1) {
      setDialogueIndex(dialogueIndex + 1)
    } else {
      setDialogueIndex(0)
      return
    }
  }

  return (
    <>
      <Head>
        <title>1tpp | Personal Website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VantaNet>
        <Canvas
          camera={{ fov: 65 }}
          style={{
            width: '100vw',
            height: '100vh',
            zIndex: 50,
            position: 'fixed',
            userSelect: 'none',
          }}
        >
          <Duck position={[0, 0, 0]} />
          <AnimationWrapper />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {/* <OrbitControls ref={duckRef} /> */}
        </Canvas>
        <section className="section-one">
          <div
            onClick={handleOnClick}
          >
            <Dialogue
              actor={DialoguesData[dialogueIndex].actor}
              dialogue={DialoguesData[dialogueIndex].dialogue}
            />
          </div>
        </section>

        <section id="section-two"></section>
        <section id="section-three"></section>
        <section id="section-four"></section>
        <section id="section-five"></section>
      </VantaNet>
    </>
  )
}

export default Home
