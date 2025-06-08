"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Box, Environment, Float, Text3D, useTexture } from "@react-three/drei"
import { motion } from "framer-motion"
import type { Mesh } from "three"

function AnimatedBox() {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const texture = useTexture("/assets/3d/texture_earth.jpg")

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Box
        ref={meshRef}
        args={[2, 2, 2]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <meshStandardMaterial
          map={texture}
          emissive={hovered ? "#fc52ff" : "#00e1f4"}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      <Text3D font="/fonts/Geist_Bold.json" position={[0, -2, 0]} size={0.5} height={0.1} curveSegments={12}>
        AI
        <meshStandardMaterial color="#fc52ff" emissive="#fc52ff" emissiveIntensity={0.5} />
      </Text3D>
    </Float>
  )
}

export default function AnimatedCube() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="h-[400px] md:h-[500px] w-full"
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <AnimatedBox />
        <Environment preset="night" />
      </Canvas>
    </motion.div>
  )
}
