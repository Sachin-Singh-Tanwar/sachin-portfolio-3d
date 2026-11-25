import { useMemo, useRef, useState } from 'react'
import { RigidBody, type RapierRigidBody } from '@react-three/rapier'
import { RoundedBox, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { Project } from '../data/projects'

type Props = {
  project: Project
  active: boolean
  focused: boolean
  onSelect: () => void
}

export default function ProjectCard({ project, active, focused, onSelect }: Props) {
  const body = useRef<RapierRigidBody>(null)
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { camera, pointer } = useThree()

  const target = useMemo(() => new THREE.Vector3(), [])
  const mouseWorld = useMemo(() => new THREE.Vector3(), [])
  const scaleVec = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    const rigid = body.current
    if (rigid) {
      mouseWorld.set(pointer.x * 2.2, pointer.y * 1.4, 4.5).unproject(camera)
      const direction = mouseWorld.sub(camera.position).normalize()
      target.copy(camera.position).add(direction.multiplyScalar(9))
      target.x += project.position[0] * 0.22
      target.y += project.position[1] * 0.25

      const pos = rigid.translation()
      const strength = 0.55
      rigid.addForce(
        {
          x: (target.x - pos.x) * strength,
          y: (target.y - pos.y) * strength,
          z: (target.z - pos.z) * strength,
        },
        true,
      )
      rigid.applyTorqueImpulse({ x: 0.0008, y: 0.0012, z: 0 }, true)
    }

    if (group.current) {
      const goal = hovered || focused ? 1.06 : 1
      scaleVec.setScalar(goal)
      group.current.scale.lerp(scaleVec, 1 - Math.pow(0.001, delta))

      if (focused) {
        group.current.quaternion.slerp(camera.quaternion, 1 - Math.pow(0.002, delta))
      } else {
        group.current.rotation.y += delta * 0.12
        group.current.rotation.x = THREE.MathUtils.lerp(
          group.current.rotation.x,
          pointer.y * 0.06,
          0.04,
        )
      }
    }
  })

  const glow = hovered || focused ? 0.85 : active ? 0.45 : 0.22

  return (
    <RigidBody
      ref={body}
      type="dynamic"
      colliders="cuboid"
      position={project.position}
      linearDamping={2.4}
      angularDamping={2.6}
    >
      <group
        ref={group}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        onClick={(event) => {
          event.stopPropagation()
          onSelect()
        }}
      >
        <RoundedBox args={[3.4, 2.1, 0.14]} radius={0.14} smoothness={5}>
          <meshPhysicalMaterial
            color="#0a1020"
            metalness={0.3}
            roughness={0.15}
            transmission={0.5}
            thickness={0.4}
            transparent
            opacity={0.9}
            emissive={project.color}
            emissiveIntensity={glow}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[3.2, 1.94]} />
          <meshBasicMaterial color={project.color} transparent opacity={0.05} />
        </mesh>

        <Text
          position={[0, 0.5, 0.14]}
          fontSize={0.24}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
        >
          {project.title}
        </Text>
        <Text
          position={[0, -0.04, 0.14]}
          fontSize={0.125}
          color="#c7d2fe"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.05}
          lineHeight={1.3}
        >
          {project.desc}
        </Text>
        <Text
          position={[0, -0.65, 0.14]}
          fontSize={0.12}
          color={project.color}
          anchorX="center"
          anchorY="middle"
        >
          {project.stack}
        </Text>
      </group>
    </RigidBody>
  )
}
