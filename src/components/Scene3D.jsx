import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Edges } from '@react-three/drei';
import * as THREE from 'three';

function RoboticHead({ mouse }) {
  const group = useRef();
  const eyeL = useRef();
  const eyeR = useRef();
  const blinkAccum = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      const tx = mouse.current.x * 0.4;
      const ty = mouse.current.y * 0.25;
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        tx + Math.sin(t * 0.3) * 0.1,
        0.06,
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        ty + Math.sin(t * 0.4) * 0.05,
        0.06,
      );
    }
    // Throttle blink calc to ~10fps — saves cycles, imperceptible
    blinkAccum.current += delta;
    if (blinkAccum.current > 0.1) {
      blinkAccum.current = 0;
      const blink = (Math.sin(t * 4) + 1) / 2;
      const intensity = 1.2 + blink * 1.4;
      if (eyeL.current) eyeL.current.material.emissiveIntensity = intensity;
      if (eyeR.current) eyeR.current.material.emissiveIntensity = intensity;
    }
  });

  return (
    <group ref={group}>
      {/* Outer wireframe icosahedron */}
      <mesh>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial color="#ff0033" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Inner core */}
      <mesh>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial
          color="#0a0a0c"
          metalness={0.9}
          roughness={0.15}
          emissive="#330011"
          emissiveIntensity={0.6}
        />
        <Edges threshold={15} color="#ff0033" />
      </mesh>

      {/* Eyes */}
      <mesh ref={eyeL} position={[-0.55, 0.25, 1.45]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial
          color="#ff0033"
          emissive="#ff0033"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={eyeR} position={[0.55, 0.25, 1.45]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial
          color="#ff0033"
          emissive="#ff0033"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Mouth bar */}
      <mesh position={[0, -0.55, 1.4]}>
        <boxGeometry args={[0.7, 0.06, 0.06]} />
        <meshStandardMaterial
          color="#ff0033"
          emissive="#ff0033"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>

      {/* Orbiting ring */}
      <OrbitRing radius={3.1} thickness={0.02} speed={0.5} tilt={0.4} />
      <OrbitRing radius={3.5} thickness={0.012} speed={-0.35} tilt={-0.3} />
    </group>
  );
}

function OrbitRing({ radius, thickness, speed, tilt }) {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * speed;
  });
  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, thickness, 8, 64]} />
        <meshStandardMaterial
          color="#ff0033"
          emissive="#ff0033"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>
      <Particle radius={radius} />
    </group>
  );
}

function Particle({ radius }) {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    ref.current.position.x = Math.cos(t * 0.8) * radius;
    ref.current.position.y = Math.sin(t * 0.8) * radius;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color="#ff0033" toneMapped={false} />
    </mesh>
  );
}

function ParticleField() {
  const ref = useRef();
  const points = useMemo(() => {
    const count = 250;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.03;
      ref.current.rotation.x = s.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ff0033" size={0.05} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

export default function Scene3D() {
  const mouse = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(!document.hidden);

  useEffect(() => {
    const onVis = () => setActive(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const onMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -((e.clientY / window.innerHeight) * 2 - 1);
    mouse.current.x = x;
    mouse.current.y = y;
  };

  return (
    <div className="scene-wrap" onPointerMove={onMove} style={{ pointerEvents: 'auto' }}>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 7], fov: 55 }}
      >
        <color attach="background" args={[0x000000]} />
        <fog attach="fog" args={[0x000000, 8, 22]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#ff0033" />
        <pointLight position={[-5, -3, 4]} intensity={1.2} color="#ff5577" />
        <Stars radius={40} depth={30} count={400} factor={2.5} fade speed={1} />
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
          <RoboticHead mouse={mouse} />
        </Float>
        <ParticleField />
      </Canvas>
    </div>
  );
}
