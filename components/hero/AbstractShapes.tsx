"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

type WireShapeProps = {
  position: [number, number, number];
  scale: number;
  speed: number;
  opacity?: number;
};

function WireIcosahedron({ position, scale, speed, opacity = 0.35 }: WireShapeProps) {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * 0.6;
      ref.current.rotation.y += delta * speed;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.35}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#8a8a8a" wireframe transparent opacity={opacity} />
      </mesh>
    </Float>
  );
}

function WireTorus({
  position,
  scale,
  opacity = 0.22,
}: {
  position: [number, number, number];
  scale: number;
  opacity?: number;
}) {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.25}>
      <mesh ref={ref} position={position} scale={scale} rotation={[Math.PI / 4, 0.3, 0]}>
        <torusGeometry args={[0.85, 0.02, 10, 40]} />
        <meshBasicMaterial color="#111111" wireframe transparent opacity={opacity} />
      </mesh>
    </Float>
  );
}

type AbstractShapesProps = {
  reduced?: boolean;
};

export function AbstractShapes({ reduced = false }: AbstractShapesProps) {
  if (reduced) {
    return (
      <>
        <WireIcosahedron position={[-1.5, 0.5, -1]} scale={1.2} speed={0.12} opacity={0.3} />
        <WireTorus position={[2, -0.3, -1.5]} scale={0.9} opacity={0.18} />
      </>
    );
  }

  return (
    <>
      <WireIcosahedron position={[-2.2, 0.8, -1]} scale={1.4} speed={0.15} />
      <WireIcosahedron position={[2.5, -0.5, -2]} scale={1.1} speed={-0.12} />
      <WireIcosahedron position={[0.4, 1.3, -2.5]} scale={0.85} speed={0.1} opacity={0.28} />
      <WireTorus position={[1.8, 0.9, -1.5]} scale={1} />
    </>
  );
}
