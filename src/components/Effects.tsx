import { useMemo } from 'react'
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Vignette,
} from '@react-three/postprocessing'
import { Vector2 } from 'three'

export default function Effects({ focusDistance }: { focusDistance: number }) {
  const aberration = useMemo(() => new Vector2(0.001, 0.001), [])

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <DepthOfField
        focusDistance={focusDistance}
        focalLength={0.05}
        bokehScale={2}
        height={480}
      />
      <Vignette eskil={false} offset={0.25} darkness={0.65} />
      <ChromaticAberration offset={aberration} />
    </EffectComposer>
  )
}
