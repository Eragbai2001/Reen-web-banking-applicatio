'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Card({ texture }: { texture: THREE.Texture }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      // Gentle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh
        ref={meshRef}
        rotation={[0, 0, -Math.PI * 0.05]} // Slight tilt
      >
        <planeGeometry args={[4, 2.5]} /> {/* Adjusted for credit card proportions */}
        <meshPhysicalMaterial
          map={texture}
          metalness={0.6}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  )
}

export function CreditCard3D() {
  const [textureLoaded, setTextureLoaded] = useState(false)
  const texture = useLoader(TextureLoader, '/Reen_Bank_Credit_Card_Mockup_v01 1.png', 
    () => {
      setTextureLoaded(true)
    },
    (error) => {
      console.error('Error loading texture:', error)
      setTextureLoaded(false)
    }
  )

  // Fallback texture in case the main texture fails to load
  const fallbackTexture = new THREE.TextureLoader().load('/Reen_Bank_Credit_Card_Mockup_v01 1.png')

  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Card texture={textureLoaded ? texture : fallbackTexture} />
    </Canvas>
  )
}

