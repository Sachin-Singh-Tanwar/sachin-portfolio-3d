import { useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import * as THREE from 'three'
import CameraRig from './CameraRig'
import Effects from './Effects'
import Particles from './Particles'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../data/projects'

type Props = {
  progress: number
  progressRef: MutableRefObject<number>
  focused: number | null
  onSelect: (index: number) => void
  onProgress: (value: number) => void
}

export default function Scene({
  progress,
  progressRef,
  focused,
  onSelect,
  onProgress,
}: Props) {
  const tilt = useRef<THREE.Group>(null)
  const activeIndex = Math.min(PROJECTS.length - 1, Math.floor(progress * PROJECTS.length))

  useFrame(({ pointer }, delta) => {
    if (!tilt.current) return
    tilt.current.rotation.y = THREE.MathUtils.lerp(
      tilt.current.rotation.y,
      pointer.x * 0.06,
      1 - Math.pow(0.02, delta),
    )
    tilt.current.rotation.x = THREE.MathUtils.lerp(
      tilt.current.rotation.x,
      -pointer.y * 0.04,
      1 - Math.pow(0.02, delta),
    )
  })

  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 9, 34]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 9, 5]} intensity={1.1} color="#a5b4fc" />
      <pointLight position={[-6, 2, 3]} intensity={14} distance={20} color="#0ea5e9" />
      <pointLight position={[4, 3, -7]} intensity={12} distance={18} color="#8b5cf6" />

      <CameraRig progressRef={progressRef} onProgress={onProgress} focused={focused} />

      <group ref={tilt}>
        <Physics gravity={[0, 0, 0]}>
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              active={activeIndex === index && focused === null}
              focused={focused === index}
              onSelect={() => onSelect(index)}
            />
          ))}
        </Physics>

        <Particles />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.6, -2]}>
          <planeGeometry args={[90, 90]} />
          <MeshReflectorMaterial
            resolution={512}
            blur={[400, 120]}
            mixBlur={1}
            mixStrength={0.35}
            roughness={0.92}
            metalness={0.45}
            depthScale={1.1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
          />
        </mesh>

        <mesh position={[2.8, 1.2, -10.5]}>
          <torusGeometry args={[1.1, 0.035, 16, 90]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
        </mesh>
        <mesh position={[2.8, 1.2, -10.5]}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshBasicMaterial color="#0ea5e9" transparent opacity={0.06} />
        </mesh>
      </group>

      <Effects focusDistance={0.015 + progress * 0.012} />
    </>
  )
}
