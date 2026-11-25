import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Overlay from './components/Overlay'
import StaticFallback from './components/StaticFallback'
import { useReducedMotion } from './hooks/useReducedMotion'

const Scene = lazy(() => import('./components/Scene'))

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [focused, setFocused] = useState<number | null>(null)
  const progressRef = useRef(0)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  const onProgress = useCallback((value: number) => setProgress(value), [])

  const onNav = useCallback((target: number) => {
    setFocused(null)
    const destination = window.innerHeight * 4 * target
    if (lenisRef.current) {
      lenisRef.current.scrollTo(destination, { duration: 1.2 })
    } else {
      window.scrollTo({ top: destination, behavior: 'smooth' })
    }
  }, [])

  if (reduced) return <StaticFallback />

  return (
    <div className="relative bg-[#050505] text-white">
      <div id="scroll-track" className="h-[500vh]" aria-hidden="true" />

      <div className="fixed inset-0">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
          camera={{ fov: 45, near: 0.1, far: 100 }}
        >
          <Suspense
            fallback={
              <mesh>
                <octahedronGeometry args={[0.4, 0]} />
                <meshBasicMaterial color="#22d3ee" wireframe />
              </mesh>
            }
          >
            <Scene
              progress={progress}
              progressRef={progressRef}
              focused={focused}
              onSelect={setFocused}
              onProgress={onProgress}
            />
          </Suspense>
        </Canvas>
      </div>

      <Overlay
        progress={progress}
        focused={focused}
        onNav={onNav}
        onClear={() => setFocused(null)}
      />
    </div>
  )
}
