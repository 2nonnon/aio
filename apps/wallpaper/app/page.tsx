'use client'

import { Canvas } from '@react-three/fiber'
import Content from './index'

export default async function Page() {
  return <>
    <Canvas
      shadows={ true }
      camera={ {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [1, 3, 2],
      } }
    >
      <Content ></Content>
    </Canvas>
  </>
}
