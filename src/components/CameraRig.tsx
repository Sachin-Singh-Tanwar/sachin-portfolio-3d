import { useMemo, useRef, type MutableRefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'
import { PROJECTS } from '../data/projects'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Props = {
  progressRef: MutableRefObject<number>
  onProgress: (value: number) => void
  focused: number | null
}

export default function CameraRig({ progressRef, onProgress, focused }: Props) {
  const { camera } = useThree()
  const proxy = useRef({ t: 0 })
  const lookAt = useRef(new THREE.Vector3(...PROJECTS[0].position))

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 0.6, 14),
          new THREE.Vector3(0.2, 0.4, 10),
          new THREE.Vector3(-1.2, 1, 5),
          new THREE.Vector3(-4.2, 1.8, 0.5),
          new THREE.Vector3(-1.4, 2.8, -3),
          new THREE.Vector3(2.8, 4.4, -8),
        ],
        false,
        'catmullrom',
        0.5,
      ),
    [],
  )

  useGSAP(() => {
    gsap.to(proxy.current, {
      t: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scroll-track',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress
          onProgress(self.progress)
        },
      },
    })
  }, [onProgress, progressRef])

  useFrame((_, delta) => {
    const t = proxy.current.t
    const position = curve.getPointAt(t)

    const segment = Math.min(PROJECTS.length - 1, Math.floor(t * PROJECTS.length))
    const lookTarget = new THREE.Vector3(...PROJECTS[segment].position)

    if (focused !== null) {
      const card = new THREE.Vector3(...PROJECTS[focused].position)
      position.lerp(card.clone().add(new THREE.Vector3(0, 0.4, 4.4)), 0.88)
      lookTarget.copy(card)
    }

    camera.position.lerp(position, 1 - Math.pow(0.0005, delta))
    lookAt.current.lerp(lookTarget, 1 - Math.pow(0.001, delta))
    camera.lookAt(lookAt.current)
  })

  return null
}
