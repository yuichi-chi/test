"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { AbstractShapes } from "@/components/hero/AbstractShapes";

function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 0.35;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 0.25;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    const targetX = mouse.current.x;
    const targetY = -mouse.current.y;

    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroCanvas() {
  const [dpr, setDpr] = useState(1.5);
  const [reducedShapes, setReducedShapes] = useState(false);
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const applyViewport = () => {
      setDpr(window.innerWidth < 768 ? 1 : 1.5);
      setReducedShapes(window.innerWidth < 768);
    };

    const onVisibility = () => {
      setFrameloop(document.hidden ? "never" : "always");
    };

    applyViewport();
    onVisibility();

    window.addEventListener("resize", applyViewport);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", applyViewport);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, dpr]}
      frameloop={frameloop}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#faf9f6"]} />
      <fog attach="fog" args={["#faf9f6", 4, 14]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 4]} intensity={0.35} />
      <AbstractShapes reduced={reducedShapes} />
      <CameraRig />
    </Canvas>
  );
}
