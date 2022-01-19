import React, { Suspense, useState, useEffect, useRef } from 'react'
import Head from 'next/head'

import Typed from 'typed.js'

import { Canvas, useThree } from '@react-three/fiber'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import Duck from '../components/models/Duck'

import Dialogue from '@/components/Dialogue'
import DialoguesData from '@/data/dialoguesData.json'

import Container from '@/components/Container'

import * as THREE from 'three'

import NET from 'vanta/dist/vanta.net.min'
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

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
    <div className="w-screen" ref={vantaRef}>
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
      trigger: '#section-one',
      start: 'top top',
      endTrigger: '#section-five',
      end: 'bottom bottom',
      scrub: 1,
    },
  })

  React.useEffect(() => {
    scene.rotation.set(0, 0, 0)
    camera.position.set(2, 1, 5)

    tl.to(scene.rotation, { x: 2, y: 2 })
      .to(scene.rotation, { x: 0.4, y: 2, z: -0.2 })
      .to(scene.rotation, { x: -0.2, y: 2, z: 0.4 })
      .to(scene.rotation, { x: 0.02, y: 1, z: 1 }, 'simultaneously')
      .to(camera.rotation, { x: -0.2, y: 0.4, z: 3 }, 'simultaneously')
    setInterval(() => {
      forceUpdate()
    }, 500)
  }, [])

  return null
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Programming Experience',
    },
  },
}

const labels = [
  'Rust',
  'Python',
  'C',
  'C#',
  'Kolin',
  'Java',
  'JavaScript',
  'Solidity',
]

const data = {
  labels,
  datasets: [
    {
      label: 'ระดับความรู้',
      data: [1.5, 3.7, 4.2, 3, 1.2, 3.8, 4.7, 0.1, 10],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

const Home = () => {
  const duckRef = React.useRef(null)
  const TypedRef = useRef(null)
  const [repoList, setRepoList] = useState([])
  const [dialogueIndex, setDialogueIndex] = useState(0)

  useEffect(() => {
    const typed = new Typed(TypedRef.current, {
      strings: ['Welcome to 1tpp.com', 'print("Panapat Pilapa")'], // Strings to display
      // Speed settings, try diffrent values untill you get good results
      startDelay: 300,
      typeSpeed: 80,
      backSpeed: 20,
      backDelay: 20,
      smartBackspace: true,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    })

    AOS.init()
    AOS.refresh()

    fetch('https://api.github.com/users/1tpp/repos')
      .then((res) => res.json())
      .then((data) => {
        const result = data.filter((repo) => {
          return repo.fork == false
        })

        setRepoList(result)
      })

    return () => {
      typed.destroy()
    }
  }, [])

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
            zIndex: 10,
            position: 'fixed',
            userSelect: 'none',
          }}
        >
          <Suspense fallback={null}>
            <Duck position={[0, 0, 0]} />
            <AnimationWrapper />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* <OrbitControls ref={duckRef} /> */}
          </Suspense>
        </Canvas>

        <Container>
          <section
            id="section-one"
            className="w-full h-screen flex justify-center items-center relative z-50"
          >
            <div className="text-white">
              <span className="text-4xl typed" ref={TypedRef}></span>
            </div>
          </section>

          <section
            id="section-two"
            className="w-full h-screen flex justify-center items-center relative z-50"
          >
            <div
              data-aos="flip-down"
              className="flex flex-col items-center justify-center"
            >
              <h3 className="text-2xl font-bold tracking-tight dark:text-white">
                Project on Github
              </h3>
              <div className="space-y-8 flex justify-center items-end flex-row flex-wrap">
                {repoList.map((repo) => (
                  <a key={repo.id} href={`${repo.html_url}`} target="_blank">
                    <div
                      data-aos="flip-down"
                      className="p-6 mr-8 max-w-sm h-32 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 hover:border-green-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                      <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {repo.name}
                      </h3>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {repo.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section
            id="section-three"
            className="w-full h-screen grid  lg:grid-cols-2 relative z-50"
          >
            <div></div>
            <div className="w-full h-full p-12">
              <div
                data-aos="fade-left"
                className="flex flex-col items-center justify-center space-x-4"
              >
                <h3 className="text-4xl font-bold text-white">Profile</h3>

                <p className="text-2xl text-white">
                  {'{'}
                  <p className="pl-4">
                    "รูป":
                    <a
                      className="hover:text-green-400"
                      href="https://cdn.discordapp.com/attachments/904252206226735114/933448755435429908/Profile.png"
                    >
                      "https://cdn.discordapp.com/attachments/904252206...."
                    </a>
                  </p>
                  <p className="pl-4">
                    "ชื่อ":{' '}
                    <span className="hover:text-green-400">
                      "ปาณพัฒน์ พิลาภา"
                    </span>
                    ,
                  </p>
                  <p className="pl-4">
                    "ชื่อเล่น":{' '}
                    <span className="hover:text-green-400">"อิฐ"</span>,
                  </p>
                  <p className="pl-4">
                    "อายุ":{' '}
                    <span className="hover:text-green-400">"17 ปี"</span>,
                  </p>
                  <p className="pl-4">
                    "ความสามารถ":{' '}
                    <span className="hover:text-green-400">
                      "C, Java, Javascript, Python, Kotlin, C#, Rust, Solidity"
                    </span>
                    ,
                  </p>
                  <p className="pl-4">
                    "ความสนใจ":
                    <span className="hover:text-green-400">
                      "Blockchain, Game Development, Web Technology, Internet Of
                      Thing, UX/UI, Financial"{' '}
                    </span>
                  </p>
                  {'}'}
                </p>
              </div>
            </div>
          </section>
          <section
            id="section-four"
            className="w-full h-screen grid grid-cols-2 relative z-50"
          >
            <div></div>
            <div data-aos="zoom-in-left">
              <Bar options={options} data={data} />
            </div>
          </section>
          <section id="section-five" className="w-full h-screen relative z-50">
            <div
              className="text-white bottom-10 absolute"
            >
              <h3>Contact</h3>
              <div className="space-x-10 text-2xl font-bold">
                <a className="hover:text-green-400" href="">
                  Facebook
                </a>
                <a
                  className="hover:text-green-400"
                  href="https://twitter.com/1tppcom"
                >
                  Twitter
                </a>
                <a
                  className="hover:text-green-400"
                  href="https://github.com/1tpp"
                >
                  Github
                </a>
                <a
                  className="hover:text-green-400"
                  href="https://www.linkedin.com/in/1tpp/"
                >
                  Linkedin
                </a>
                <a
                  className="hover:text-green-400"
                  href="mailto:contact@1tpp.com?subject = Feedback&body = Message"
                  target="_blank"
                >
                  Email
                </a>
                <a
                  className="hover:text-green-400"
                  href="https://blog.1tpp.com"
                  target="_blank"
                >
                  Blog
                </a>
              </div>
            </div>
          </section>
        </Container>
      </VantaNet>
    </>
  )
}

export default Home
