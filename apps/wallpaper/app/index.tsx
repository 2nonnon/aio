'use client'

import { useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, useHelper } from '@react-three/drei'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Perf } from 'r3f-perf'
import type { DirectionalLight, SkinnedMesh } from 'three'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import * as THREE from 'three'

// import { EffectComposer } from '@react-three/postprocessing'
// import { BlendFunction } from 'postprocessing'
import { useControls } from 'leva'

// import Drunk from './Drunk'

const Model = forwardRef<SkinnedMesh>((_, ref) => {
  const result = useLoader(MMDLoader, '/model/kfk/卡芙卡.pmx')

  console.log(result)

  result.castShadow = true
  // result.receiveShadow = true
  result.scale.set(0.1, 0.1, 0.1)

  useImperativeHandle(ref, () => {
    return result
  }, [result])

  return <primitive object={result} />
})

export default function Experience() {
  const modelRef = useRef<SkinnedMesh>(null)

  // const drunkRef = useRef<any>(null)

  // const drunkProps = useControls('Drunk Effect', {
  //   frequency: { value: 2, min: 1, max: 20 },
  //   amplitude: { value: 0.1, min: 0, max: 1 },
  // })

  const directionalLightRef = useRef<DirectionalLight>(null)

  useHelper((directionalLightRef as any), THREE.DirectionalLightHelper, 1, 'red')

  const { sunPosition } = useControls('sky', {
    sunPosition: { value: [1, 2, 3] },
  })

  useFrame((state, _delta) => {
    if (modelRef.current) {
      const position = new THREE.Vector3()
      position.copy(modelRef.current.position)
      position.y += 2
      state.camera.lookAt(position)
    }
  })

  return <>

    <color args={ ['ivory'] } attach="background" />

    <Perf position="top-left" />

    <OrbitControls makeDefault />

    {/* <EffectComposer>
      <Drunk
        ref={ drunkRef }
        { ...drunkProps }
        blendFunction={ BlendFunction.DARKEN }
      />
    </EffectComposer> */}

    <directionalLight
      ref={directionalLightRef}
      position={sunPosition}
      intensity={ 1.5 }
      castShadow
      shadow-mapSize={ [1024, 1024] }
      shadow-camera-near={ 1 }
      shadow-camera-far={ 10 }
      shadow-camera-top={ 5 }
      shadow-camera-right={ 5 }
      shadow-camera-bottom={ -5 }
      shadow-camera-left={ -5 }
    />
    <ambientLight intensity={ 0.5 } />

    <Model ref={modelRef}/>

    <mesh scale={[10, 10, 1]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry></planeGeometry>
      <meshStandardMaterial color={'ivory'} transparent></meshStandardMaterial>
    </mesh>
  </>
}
