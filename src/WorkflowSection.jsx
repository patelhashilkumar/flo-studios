import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float, Sparkles } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WorkflowSection.css';

gsap.registerPlugin(ScrollTrigger);

const workflowSteps = [
  {
    num: "01",
    tag: "DISCOVERY & CONCEPT",
    title: "Brand Architecture",
    desc: "Immersive briefing, narrative exploration, and strategic alignment to establish the core creative vision.",
    color: "#0e0e12"
  },
  {
    num: "02",
    tag: "DIRECTION & LOOKDEV",
    title: "Visual Language",
    desc: "Developing bespoke styleframes, motion principles, cinematic lighting, and 3D material palettes.",
    color: "#0e0e12"
  },
  {
    num: "03",
    tag: "KINETIC PRODUCTION",
    title: "Motion Craft",
    desc: "Rigorous 3D animation, physics simulation, fluid dynamics, and dynamic type choreography.",
    color: "#0e0e12"
  },
  {
    num: "04",
    tag: "FINISHING & RELEASE",
    title: "Master Delivery",
    desc: "Precision color mastering, spatial sound design, multi-platform specs, and high-impact launch assets.",
    color: "#0e0e12"
  }
];

/* ─── Stealth Luxury Aircraft Model (Obsidian & Platinum) ─── */
function PaperPlane({ meshRef }) {
  const planeGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    const vertices = new Float32Array([
      // === NOSE TIP ===
      0,    0,    -2.0,    // 0  nose

      // === FUSELAGE SPINE (top ridge) ===
      0,    0.18, -1.2,    // 1  spine front
      0,    0.22, -0.3,    // 2  spine mid
      0,    0.28,  0.6,    // 3  spine rear
      0,    0.35,  1.2,    // 4  tail tip top

      // === FUSELAGE BELLY (bottom keel) ===
      0,   -0.06, -1.2,    // 5  belly front
      0,   -0.08, -0.3,    // 6  belly mid
      0,   -0.06,  0.6,    // 7  belly rear
      0,    0.0,   1.2,    // 8  tail tip bottom

      // === LEFT WING ===
      -0.35, 0.06, -0.8,   // 9   left wing root front
      -1.8,  0.12,  0.1,   // 10  left wing tip front
      -1.6,  0.10,  0.6,   // 11  left wing tip rear
      -0.30, 0.08,  0.5,   // 12  left wing root rear

      // === RIGHT WING ===
      0.35,  0.06, -0.8,   // 13  right wing root front
      1.8,   0.12,  0.1,   // 14  right wing tip front
      1.6,   0.10,  0.6,   // 15  right wing tip rear
      0.30,  0.08,  0.5,   // 16  right wing root rear

      // === TAIL FIN (vertical stabilizer) ===
      0,     0.28,  0.6,   // 17  fin base front  (=3)
      0,     0.75,  0.9,   // 18  fin top
      0,     0.35,  1.2,   // 19  fin base rear   (=4)

      // === LEFT HORIZONTAL TAIL ===
      -0.15, 0.20,  0.7,   // 20  left htail root
      -0.7,  0.22,  1.0,   // 21  left htail tip
      -0.15, 0.22,  1.1,   // 22  left htail rear

      // === RIGHT HORIZONTAL TAIL ===
      0.15,  0.20,  0.7,   // 23  right htail root
      0.7,   0.22,  1.0,   // 24  right htail tip
      0.15,  0.22,  1.1,   // 25  right htail rear
    ]);

    const indices = [
      // Fuselage
      0, 1, 9,    1, 2, 12,   1, 12, 9,   2, 3, 12, // top-left
      0, 13, 1,   1, 13, 16,  1, 16, 2,   2, 16, 3, // top-right
      0, 9, 5,    5, 9, 12,   5, 12, 6,   6, 12, 7, // bottom-left
      0, 5, 13,   5, 16, 13,  5, 6, 16,   6, 7, 16, // bottom-right
      
      // Wings
      9, 10, 11,  9, 11, 12, // left top
      9, 11, 10,  9, 12, 11, // left bottom
      13, 15, 14, 13, 16, 15, // right top
      13, 14, 15, 13, 15, 16, // right bottom
      
      // Tail sections
      17, 18, 19, 19, 18, 17, // fin
      3, 4, 7,    4, 8, 7,    // rear fuselage
      20, 21, 22, 22, 21, 20, // left h-tail
      23, 24, 25, 25, 24, 23, // right h-tail
    ];

    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    
    const nonIndexedGeo = geo.toNonIndexed();
    nonIndexedGeo.computeVertexNormals();
    
    return nonIndexedGeo;
  }, []);

  return (
    <group ref={meshRef} scale={[0.92, 0.92, 0.92]}>
      {/* Nose faces forward along trajectory */}
      <group rotation={[0, Math.PI, 0]}>
        
        {/* Obsidian Stealth Body with Specular Bevels */}
        <mesh geometry={planeGeo}>
          <meshStandardMaterial
            color="#141418"
            roughness={0.22}
            metalness={0.88}
            side={THREE.DoubleSide}
            flatShading={true}
          />
        </mesh>

        {/* Polished Platinum Chrome Spine Stripe */}
        <mesh position={[0, 0.23, -0.3]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.06, 0.015, 1.8]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.08} metalness={0.96} />
        </mesh>

        {/* Luminous Ice Flare Engine Light */}
        <pointLight position={[0, 0, 1.25]} intensity={2.5} distance={8} color="#e0f2fe" />
        
        {/* Precision Exhaust Nozzle Ring */}
        <mesh position={[0, 0.05, 1.23]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.09, 0.018, 16, 32]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Tinted Aero Cockpit Canopy */}
        <mesh position={[0, 0.165, -1.3]} rotation={[0.3, 0, 0]}>
          <planeGeometry args={[0.12, 0.08]} />
          <meshStandardMaterial 
            color="#090d16" 
            emissive="#38bdf8"
            emissiveIntensity={0.35}
            roughness={0.1} 
            metalness={0.95}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Glowing Milestone Ring ─── */
function GlowRing({ active }) {
  const ringRef = useRef();
  const targetVec = useRef(new THREE.Vector3());
  
  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x = state.clock.elapsedTime * 0.35;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.25;
    
    const targetScale = active ? 1.25 : 0.85;
    targetVec.current.set(targetScale, targetScale, targetScale);
    ringRef.current.scale.lerp(targetVec.current, 0.06);
  });
  
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[1.2, 0.032, 16, 64]} />
      <meshStandardMaterial 
        color="#18181c" 
        metalness={0.9}
        roughness={0.2}
        transparent 
        opacity={active ? 0.45 : 0.12} 
      />
    </mesh>
  );
}

function getDeterministicNoise(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/* ─── Ambient Cosmic Dust Particles along Path ─── */
function PathParticles({ curve }) {
  const pointsRef = useRef();
  
  const particles = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 150; i++) {
      const t = getDeterministicNoise(i * 1.17 + 0.1);
      const point = curve.getPointAt(t);
      pts.push(
        point.x + (getDeterministicNoise(i * 2.31 + 0.2) - 0.5) * 6,
        point.y + (getDeterministicNoise(i * 3.47 + 0.3) - 0.5) * 6,
        point.z + (getDeterministicNoise(i * 4.93 + 0.4) - 0.5) * 6
      );
    }
    return new Float32Array(pts);
  }, [curve]);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.07} 
        color="#94a3b8" 
        transparent 
        opacity={0.35} 
        sizeAttenuation 
      />
    </points>
  );
}

/* ─── Dashed Trajectory Flight Line ─── */
function DashedPath({ geometry }) {
  const lineRef = useRef();
  const matRef = useRef();
  
  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.computeLineDistances();
    }
  }, [geometry]);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.dashOffset = -state.clock.elapsedTime * 1.5;
    }
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineDashedMaterial
        ref={matRef}
        color="#18181b"
        opacity={0.28}
        transparent
        dashSize={0.8}
        gapSize={0.45}
        linewidth={1.2}
      />
    </line>
  );
}

// The 3D Scene Component
function Scene({ progressRef, activeIndex, setActiveIndex }) {
  const { camera } = useThree();
  const planeRef = useRef();
  
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 3, 0),
      new THREE.Vector3(-6, 1, -12),
      new THREE.Vector3(6, -2, -24),
      new THREE.Vector3(-4, -5, -36),
      new THREE.Vector3(0, -8, -50),
      new THREE.Vector3(4, -12, -75),
    ], false, 'catmullrom', 0.5);
  }, []);

  const milestones = useMemo(() => {
    const points = [];
    const fractions = [0.12, 0.37, 0.62, 0.87];
    fractions.forEach(f => {
      points.push({
        position: curve.getPointAt(f),
        fraction: f
      });
    });
    return points;
  }, [curve]);

  const dashedLineGeo = useMemo(() => {
    const points = curve.getPoints(300);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    geo.computeBoundingSphere();
    return geo;
  }, [curve]);

  useFrame((state) => {
    const p = progressRef.current?.value ?? 0;
    
    let newIndex = 0;
    if (p > 0.75) newIndex = 3;
    else if (p > 0.50) newIndex = 2;
    else if (p > 0.25) newIndex = 1;
    if (newIndex !== activeIndex) setActiveIndex(newIndex);

    const t = Math.min(p, 0.99);
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);
    
    if (planeRef.current) {
      planeRef.current.position.copy(point);
      const lookTarget = point.clone().add(tangent);
      planeRef.current.lookAt(lookTarget);
      
      const bankAngle = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      planeRef.current.rotation.z += bankAngle;
    }

    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const cameraOffset = new THREE.Vector3()
      .copy(normal).multiplyScalar(2)
      .add(new THREE.Vector3(0, 12, 4));

    const targetCamPos = point.clone().add(cameraOffset);
    camera.position.lerp(targetCamPos, 0.06);

    const lookAheadPoint = curve.getPointAt(Math.min(p + 0.08, 0.99));
    camera.lookAt(lookAheadPoint);
  });

  return (
    <>
      <ambientLight intensity={1.3} />
      <directionalLight position={[10, 16, 10]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-6, 6, -10]} intensity={0.4} color="#e2e8f0" />

      <Sparkles count={80} scale={60} size={1} speed={0.2} opacity={0.08} color="#64748b" />
      <PathParticles curve={curve} />

      <DashedPath geometry={dashedLineGeo} />

      {milestones.map((m, i) => {
        const isActive = activeIndex === i;
        const step = workflowSteps[i];
        
        return (
          <group key={i} position={m.position}>
            {/* Obsidian Metallic Milestone Pearl */}
            <Float speed={2} floatIntensity={0.3}>
              <mesh>
                <sphereGeometry args={[isActive ? 0.38 : 0.24, 32, 32]} />
                <meshStandardMaterial 
                  color={isActive ? "#0e0e12" : "#27272a"}
                  emissive={isActive ? "#1e293b" : "#000000"}
                  emissiveIntensity={isActive ? 0.5 : 0}
                  roughness={0.12}
                  metalness={0.92}
                />
              </mesh>
            </Float>

            {/* Orbiting Glass Halo */}
            <GlowRing active={isActive} />

            {/* 3D Liquid Glass Milestone Card */}
            <Html 
              distanceFactor={12}
              style={{ pointerEvents: 'none' }}
            >
              <div className={`milestone-label ${isActive ? 'active' : ''} ${i % 2 === 0 ? 'align-right' : 'align-left'}`}>
                <span className="milestone-ghost" aria-hidden="true">{step.num}</span>
                <div className="milestone-meta">
                  <span className="milestone-num">PHASE {step.num}</span>
                  <span className="milestone-pulse" aria-hidden="true" />
                  <span className="milestone-tag">{step.tag}</span>
                </div>
                <h4 className="milestone-title">{step.title}</h4>
                <p className="milestone-desc">{step.desc}</p>
                <div className="milestone-footer" aria-hidden="true">
                  <span className="milestone-discipline">FLO MOTION PROCESS</span>
                  <div className="milestone-stepper">
                    {workflowSteps.map((_, sIdx) => (
                      <span key={sIdx} className={`milestone-stepper-dot ${sIdx <= i ? 'filled' : ''}`} />
                    ))}
                  </div>
                </div>
              </div>
            </Html>
          </group>
        );
      })}

      {/* The Obsidian Stealth Jet */}
      <PaperPlane meshRef={planeRef} />
    </>
  );
}

export default function WorkflowSection() {
  const sectionRef = useRef(null);
  const progressObj = useRef({ value: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(progressObj.current, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1.5
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="workflow-section" id="workflow" ref={sectionRef}>
      {/* 2D UI Overlay */}
      <div className="workflow-ui">
        <div className="workflow-header">
          <span className="workflow-label">
            <span className="workflow-label-dot" />
            PROCESS
          </span>
          <h2 className="workflow-title">The Journey</h2>
          <p className="workflow-subtitle">
            How we translate creative vision into iconic motion systems and 3D worlds.
          </p>
        </div>

        {/* Step indicators */}
        <div className="workflow-steps-indicator">
          {workflowSteps.map((step, i) => (
            <div 
              key={i} 
              className={`workflow-step-dot ${activeIndex === i ? 'active' : ''} ${activeIndex > i ? 'completed' : ''}`}
            >
              <span className="workflow-step-dot-num">{step.num}</span>
              <span className="workflow-step-dot-title">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="workflow-canvas-container">
        <Canvas camera={{ position: [0, 5, 5], fov: 55 }}>
          <fog attach="fog" args={['#ffffff', 15, 55]} />
          <Scene 
            progressRef={progressObj} 
            activeIndex={activeIndex} 
            setActiveIndex={setActiveIndex} 
          />
        </Canvas>
      </div>
    </section>
  );
}
