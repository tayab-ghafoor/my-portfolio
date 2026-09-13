import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, ContactShadows, Float, Grid, Line } from "@react-three/drei";
import * as THREE from "three";
import { HeroSceneFallback } from "@/components/hero-scene-fallback";

/**
 * Hero visual: an isolated cluster of modules on a lit base plate, wired
 * together like nodes on a schematic. The metaphor is deliberate, not
 * decorative — separated, individually-lit blocks connected to one shared
 * hub is the same shape as "tenants isolated on one platform" (MediNest)
 * and "independent modules wired into one system" (SysNova). It now runs
 * full-bleed behind the hero copy instead of boxed into a corner, with a
 * blueprint grid floor and circuit-style connectors reinforcing the theme
 * through the rest of the page.
 */

const PALETTE = ["#2DD9CC", "#7B7FFF", "#3A4358", "#F2A93B", "#546077"];

type ModuleSpec = {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  emissive: string;
};

function buildModules(): ModuleSpec[] {
  const cols = 3;
  const rows = 3;
  const gap = 1.7;
  const modules: ModuleSpec[] = [];
  let i = 0;
  for (let x = 0; x < cols; x++) {
    for (let z = 0; z < rows; z++) {
      // Skip a corner so the cluster reads as an irregular, organic group
      // rather than a rigid server-rack grid.
      if (x === 1 && z === 1) {
        i++;
        continue;
      }
      const height = 0.55 + ((i * 41) % 100) / 100 * 2.05;
      const color = PALETTE[i % PALETTE.length];
      modules.push({
        position: [(x - 1) * gap, height / 2 - 1.05, (z - 1) * gap],
        size: [0.82, height, 0.82],
        color,
        emissive: color,
      });
      i++;
    }
  }
  return modules;
}

const HUB: [number, number, number] = [0, -1.05, 0];

function Connectors({ modules }: { modules: ModuleSpec[] }) {
  return (
    <>
      {modules.map((m, idx) => {
        const base: [number, number, number] = [m.position[0], -1.05, m.position[2]];
        return (
          <Line
            key={idx}
            points={[HUB, base]}
            color="#4FE0D4"
            transparent
            opacity={0.28}
            lineWidth={1}
          />
        );
      })}
    </>
  );
}

function Modules({ interactive }: { interactive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const modules = useMemo(buildModules, []);
  const pointer = useRef({ x: 0, y: 0 });
  const t = useRef(0);

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    t.current += delta;
    groupRef.current.rotation.y += delta * 0.06;
    if (interactive) {
      const targetX = pointer.current.y * 0.1;
      const targetZ = -pointer.current.x * 0.14;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.035);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, 0.035);
    }
  });

  return (
    <group ref={groupRef} rotation={[0.16, 0.55, 0]}>
      <Connectors modules={modules} />
      {modules.map((m, idx) => (
        <RoundedBox
          key={idx}
          args={m.size}
          radius={0.06}
          smoothness={4}
          position={m.position}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={m.color}
            emissive={m.emissive}
            emissiveIntensity={0.22}
            roughness={0.35}
            metalness={0.35}
          />
        </RoundedBox>
      ))}
      {/* Hub node — the shared platform the isolated modules sit on */}
      <mesh position={HUB}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color="#4FE0D4" emissive="#2DD9CC" emissiveIntensity={1.1} />
      </mesh>
    </group>
  );
}

function Rig({ interactive }: { interactive: boolean }) {
  const { camera } = useThree();
  const base = useMemo(() => camera.position.clone(), [camera]);
  useFrame(({ clock }) => {
    if (!interactive) return;
    const tt = clock.getElapsedTime();
    camera.position.x = base.x + Math.sin(tt * 0.12) * 0.35;
    camera.position.y = base.y + Math.cos(tt * 0.1) * 0.2;
    camera.lookAt(0, -0.2, 0);
  });
  return null;
}

function Scene({ interactive }: { interactive: boolean }) {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2("#080b12", 0.055);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.05} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4, 2, -2]} intensity={9} color="#7B7FFF" distance={10} />
      <pointLight position={[3, 1, 3]} intensity={7} color="#2DD9CC" distance={9} />
      <pointLight position={[0, 3, -4]} intensity={4} color="#F2A93B" distance={9} />

      <Rig interactive={interactive} />

      {interactive ? (
        <Modules interactive={interactive} />
      ) : (
        <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.22}>
          <Modules interactive={interactive} />
        </Float>
      )}

      <Grid
        position={[0, -1.06, 0]}
        args={[40, 40]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#1c2a3f"
        sectionSize={2.5}
        sectionThickness={1}
        sectionColor="#2dd9cc"
        fadeDistance={17}
        fadeStrength={1.4}
        followCamera={false}
        infiniteGrid
      />

      <ContactShadows position={[0, -1.05, 0]} opacity={0.5} scale={12} blur={2.4} far={2.4} resolution={256} />
    </>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  return coarse;
}

export function HeroScene() {
  const reducedMotion = usePrefersReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();
  const [webglFailed, setWebglFailed] = useState(false);

  if (webglFailed) {
    return <HeroSceneFallback />;
  }

  return (
    <div
      className="relative w-full h-full min-h-[420px]"
      role="img"
      aria-label="An ambient 3D scene: a cluster of separated, individually-lit modules wired to a shared hub on a blueprint grid, representing isolated tenants and independent modules on one platform"
      data-testid="hero-scene"
    >
      <Canvas
        dpr={[1, 1.6]}
        shadows
        camera={{ position: [5.4, 3.6, 7.2], fov: 32 }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            (e) => {
              e.preventDefault();
              setWebglFailed(true);
            },
            { once: true }
          );
        }}
        onError={() => setWebglFailed(true)}
      >
        <Suspense fallback={null}>
          <Scene interactive={!reducedMotion && !isCoarsePointer} />
        </Suspense>
      </Canvas>
    </div>
  );
}
