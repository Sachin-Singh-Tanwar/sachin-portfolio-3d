import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 500

export default function Particles() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const array = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      array[i * 3] = (Math.random() - 0.5) * 42
      array[i * 3 + 1] = (Math.random() - 0.5) * 26
      array[i * 3 + 2] = (Math.random() - 0.5) * 42
    }
    return array
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.012
      ref.current.rotation.x += delta * 0.004
    }
  })

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#c7d2fe"
        size={0.035}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
