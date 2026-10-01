import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float, Sparkles } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WorkflowSection.css';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   AUTHENTIC FLO STUDIOS METHODOLOGY COPY
   ═══════════════════════════════════════════════════ */

const WORKFLOW_STEPS = [
  {
    num: "01",
    tag: "DISCOVERY",
    title: "Vision & Direction",
    desc: "Unearthing brand narrative, kinetic principles, and technical requirements through intensive creative exploration.",
    deliverable: "Motion Brand Bible • Visual Trajectory",
    color: "#ff3b30"
  },
  {
    num: "02",
    tag: "PROTOTYPING",
    title: "Motion & 3D R&D",
    desc: "Kinetic storyboarding, procedural geometry sculpture, and lighting studies to establish a signature visual universe.",
    deliverable: "Procedural Shaders • 3D Pre-Vis",
    color: "#ff3b30"
  },
  {
    num: "03",
    tag: "PRODUCTION",
    title: "Cinema & Craft",
    desc: "High-fidelity physics simulations, raytraced GPU rendering, typographic micro-interactions, and bespoke sound design.",
    deliverable: "Raytraced CGI • Sonic Architecture",
    color: "#ff3b30"
  },
  {
    num: "04",
    tag: "DEPLOYMENT",
    title: "Master Delivery",
    desc: "Multi-platform 4K/8K rendering, spatial audio mastering, and interactive asset packaging engineered for iconic global reveals.",
    deliverable: "Master 8K Renders • Interactive Code",
    color: "#ff3b30"
  }
];

/* ═══════════════════════════════════════════════════
   STEALTH OBSIDIAN SUPERSONIC CRAFT
   Replaces crude red cartoon jet with luxury craft
   ═══════════════════════════════════════════════════ */

function StealthJet({ meshRef }) {
  const planeGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    const vertices = new Float32Array([
      // Nose tip
      0, 0, -2.3,
      // Fuselage spine
      0, 0.22, -1.3,
      0, 0.26, -0.3,
      0, 0.32,  0.7,
      0, 0.40,  1.3,
      // Fuselage belly
      0, -0.08, -1.3,
      0, -0.10, -0.3,
      0, -0.08,  0.7,
      0,  0.0,   1.3,
      // Left wing
      -0.38, 0.08, -0.8,
      -2.0,  0.12,  0.2,
      -1.7,  0.10,  0.7,
      -0.32, 0.08,  0.6,
      // Right wing
      0.38,  0.08, -0.8,
      2.0,   0.12,  0.2,
      1.7,   0.10,  0.7,
      0.32,  0.08,  0.6,
      // Vertical stabilizer
      0,     0.32,  0.7,
      0,     0.85,  1.0,
      0,     0.40,  1.3,
      // Left h-tail
      -0.18, 0.22,  0.8,
      -0.78, 0.24,  1.1,
      -0.18, 0.24,  1.2,
      // Right h-tail
      0.18,  0.22,  0.8,
      0.78,  0.24,  1.1,
      0.18,  0.24,  1.2,
    ]);

    const indices = [
      // Fuselage
      0, 1, 9,    1, 2, 12,   1, 12, 9,   2, 3, 12,
      0, 13, 1,   1, 13, 16,  1, 16, 2,   2, 16, 3,
      0, 9, 5,    5, 9, 12,   5, 12, 6,   6, 12, 7,
      0, 5, 13,   5, 16, 13,  5, 6, 16,   6, 7, 16,
      // Wings
      9, 10, 11,  9, 11, 12,
      9, 11, 10,  9, 12, 11,
      13, 15, 14, 13, 16, 15,
      13, 14, 15, 13, 15, 16,
      // Tail
      17, 18, 19, 19, 18, 17,
      3, 4, 7,    4, 8, 7,
      20, 21, 22, 22, 21, 20,
      23, 24, 25, 25, 24, 23,
    ];

    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    const nonIndexed = geo.toNonIndexed();
    nonIndexed.computeVertexNormals();
    return nonIndexed;
  }, []);

  return (
    <group ref={meshRef} scale={[0.92, 0.92, 0.92]}>
      <group rotation={[0, Math.PI, 0]}>
        {/* Stealth Obsidian Main Fuselage */}
        <mesh geometry={planeGeo}>
          <meshStandardMaterial
            color="#141418"
            roughness={0.2}
            metalness={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Titanium Center Spine Ridge */}
        <mesh position={[0, 0.26, -0.2]}>
          <boxGeometry args={[0.04, 0.015, 2.1]} />
          <meshStandardMaterial color="#f0f0f5" roughness={0.12} metalness={0.92} />
        </mesh>

        {/* Cockpit Canopy with Cyan Specular Glaze */}
        <mesh position={[0, 0.20, -1.35]} rotation={[0.26, 0, 0]}>
          <boxGeometry args={[0.13, 0.07, 0.44]} />
          <meshStandardMaterial
            color="#081016"
            emissive="#00b4d8"
            emissiveIntensity={0.35}
            roughness={0.06}
            metalness={0.96}
          />
        </mesh>

        {/* Twin Jet Afterburner Exhausts */}
        <mesh position={[-0.14, 0.08, 1.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.065, 0.075, 0.12, 16]} />
          <meshStandardMaterial color="#ff3b30" emissive="#ff3b30" emissiveIntensity={2.0} />
        </mesh>
        <mesh position={[0.14, 0.08, 1.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.065, 0.075, 0.12, 16]} />
          <meshStandardMaterial color="#ff3b30" emissive="#ff3b30" emissiveIntensity={2.0} />
        </mesh>

        {/* Thruster Dynamic Glow */}
        <pointLight position={[0, 0.08, 1.5]} intensity={2.5} distance={5} color="#ff3b30" />
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   RADAR GLOW RING AT WAYPOINTS
   ═══════════════════════════════════════════════════ */

function GlowRing({ color, active }) {
  const ringRef = useRef();
  
  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x = state.clock.elapsedTime * 0.4;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.25;
    const s = active ? 1.3 + Math.sin(state.clock.elapsedTime * 3) * 0.08 : 0.85;
    ringRef.current.scale.set(s, s, s);
  });
  
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[1.3, 0.035, 16, 64]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={active ? 0.65 : 0.18} 
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════
   ANIMATED RUNWAY DASHED PATH
   ═══════════════════════════════════════════════════ */

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
      matRef.current.dashOffset = -state.clock.elapsedTime * 2.0;
    }
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineDashedMaterial
        ref={matRef}
        color="#2b2b36"
        dashSize={1.1}
        gapSize={0.55}
        linewidth={1.5}
      />
    </line>
  );
}

/* ═══════════════════════════════════════════════════
   3D SCENE COMPONENT
   ═══════════════════════════════════════════════════ */

function Scene({ progressRef, activeIndex, setActiveIndex }) {
  const { camera } = useThree();
  const planeRef = useRef();
  
  // Catmull-Rom flight corridor
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 3, 0),
      new THREE.Vector3(-6, 1, -14),
      new THREE.Vector3(6, -2, -28),
      new THREE.Vector3(-5, -5, -42),
      new THREE.Vector3(0, -8, -56),
      new THREE.Vector3(4, -12, -78),
    ], false, 'catmullrom', 0.5);
  }, []);

  // Milestones with smart side offsets to eliminate card collisions
  const milestones = useMemo(() => {
    const fractions = [0.10, 0.36, 0.63, 0.88];
    return fractions.map((f, i) => {
      const pos = curve.getPointAt(f);
      const tan = curve.getTangentAt(f);
      const normal = new THREE.Vector3(-tan.z, 0, tan.x).normalize();
      const side = i % 2 === 0 ? 1 : -1;
      const cardOffset = normal.clone().multiplyScalar(side * 3.8).add(new THREE.Vector3(0, 1.6, 0));
      return {
        beaconPosition: pos,
        cardPosition: pos.clone().add(cardOffset),
        side,
        fraction: f
      };
    });
  }, [curve]);

  const dashedLineGeo = useMemo(() => {
    const points = curve.getPoints(300);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    geo.computeBoundingSphere();
    return geo;
  }, [curve]);

  useFrame((state) => {
    const p = progressRef.current?.value ?? 0;
    
    // Determine active milestone index
    let newIndex = 0;
    if (p > 0.75) newIndex = 3;
    else if (p > 0.50) newIndex = 2;
    else if (p > 0.25) newIndex = 1;
    if (newIndex !== activeIndex) setActiveIndex(newIndex);

    const t = Math.min(p, 0.99);
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);
    
    // Position and orient stealth craft
    if (planeRef.current) {
      planeRef.current.position.copy(point);
      const lookTarget = point.clone().add(tangent);
      planeRef.current.lookAt(lookTarget);
      
      // Dynamic aerodynamic bank into turns
      const bankAngle = -tangent.x * 0.45;
      planeRef.current.rotation.z += bankAngle;
    }

    // 45-degree cinematic isometric chase perspective
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const cameraOffset = new THREE.Vector3()
      .copy(normal).multiplyScalar(1.2)
      .add(new THREE.Vector3(0, 6.5, 7.5));

    const targetCamPos = point.clone().add(cameraOffset);
    camera.position.lerp(targetCamPos, 0.07);

    // Look ahead smoothly along flight path
    const lookAheadPoint = curve.getPointAt(Math.min(p + 0.07, 0.99));
    camera.lookAt(lookAheadPoint);
  });

  return (
    <>
      {/* Studio Cyclorama Lighting */}
      <ambientLight intensity={1.4} />
      <directionalLight position={[12, 18, 10]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-8, 6, -10]} intensity={0.5} color="#e0e8f5" />
      <pointLight position={[0, 10, 0]} intensity={0.6} color="#ffffff" />

      {/* Kinetic Ambient Dust Sparks */}
      <Sparkles count={100} scale={70} size={1.4} speed={0.3} opacity={0.12} color="#181824" />

      {/* The Animated Dashed Flight Corridor */}
      <DashedPath geometry={dashedLineGeo} />

      {/* The 4 Journey Milestones */}
      {milestones.map((m, i) => {
        const isActive = activeIndex === i;
        const step = WORKFLOW_STEPS[i];
        
        return (
          <group key={i}>
            {/* Ground Waypoint Beacon */}
            <group position={m.beaconPosition}>
              {/* Radar Wave Ring */}
              <GlowRing color={isActive ? '#ff3b30' : '#888899'} active={isActive} />

              {/* Waypoint Core Orb */}
              <Float speed={2.5} floatIntensity={0.25}>
                <mesh position={[0, 0.35, 0]}>
                  <sphereGeometry args={[isActive ? 0.38 : 0.24, 32, 32]} />
                  <meshStandardMaterial 
                    color={isActive ? "#141418" : "#2a2a35"}
                    emissive={isActive ? "#ff3b30" : "#111116"}
                    emissiveIntensity={isActive ? 0.75 : 0.15}
                    roughness={0.15}
                    metalness={0.92}
                  />
                </mesh>
              </Float>

              {/* Waypoint Coordinate Halo */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
                <ringGeometry args={[0.75, 1.35, 32]} />
                <meshBasicMaterial 
                  color={isActive ? "#ff3b30" : "#555566"} 
                  transparent 
                  opacity={isActive ? 0.45 : 0.14} 
                  side={THREE.DoubleSide} 
                />
              </mesh>
            </group>

            {/* Floating Glassmorphic Milestone Card */}
            <group position={m.cardPosition}>
              <Html 
                distanceFactor={13.5}
                style={{ pointerEvents: 'auto' }}
              >
                <div 
                  className={`milestone-card ${isActive ? 'milestone-card--active' : ''} ${
                    m.side > 0 ? 'milestone-card--right' : 'milestone-card--left'
                  }`}
                >
                  <div className="milestone-card__glass">
                    <div className="milestone-card__header">
                      <span className="milestone-card__tag">
                        PHASE {step.num} // {step.tag}
                      </span>
                      <span className="milestone-card__indicator">
                        <span className="milestone-card__indicator-dot" />
                        {isActive ? 'ACTIVE STAGE' : 'WAYPOINT'}
                      </span>
                    </div>

                    <h3 className="milestone-card__title">{step.title}</h3>
                    <p className="milestone-card__desc">{step.desc}</p>

                    <div className="milestone-card__footer">
                      <span className="milestone-card__deliverable-label">CORE DELIVERABLE</span>
                      <span className="milestone-card__deliverable">{step.deliverable}</span>
                    </div>
                  </div>
                </div>
              </Html>
            </group>
          </group>
        );
      })}

      {/* The Stealth Aircraft */}
      <StealthJet meshRef={planeRef} />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN WORKFLOW SECTION EXPORT
   ═══════════════════════════════════════════════════ */

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
          end: "+=320%",
          pin: true,
          scrub: 1.2
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Jump to specific milestone when clicked on right indicator
  const handleStepClick = (index) => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollTrigger = ScrollTrigger.getById('workflow-trigger') || ScrollTrigger.getAll().find(st => st.trigger === section);
    if (scrollTrigger) {
      const targetFractions = [0.10, 0.36, 0.63, 0.88];
      const target = scrollTrigger.start + targetFractions[index] * (scrollTrigger.end - scrollTrigger.start);
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  return (
    <section className="workflow-section" id="workflow" ref={sectionRef}>
      {/* 2D UI Overlay */}
      <div className="workflow-ui">
        {/* Header with Panchang ExtraBold */}
        <div className="workflow-header">
          <span className="workflow-label">
            <span className="workflow-label-pulse" />
            CREATIVE METHODOLOGY
          </span>
          <h2 className="workflow-title">The Journey</h2>
          <p className="workflow-desc">
            How Flo Studios architects cinematic motion and procedural 3D from concept to global launch.
          </p>
        </div>

        {/* Step indicators (Clickable Timeline Navigation) */}
        <div className="workflow-steps-indicator" role="navigation" aria-label="Workflow Phases">
          {WORKFLOW_STEPS.map((step, i) => (
            <button 
              key={i} 
              type="button"
              onClick={() => handleStepClick(i)}
              className={`workflow-step-dot ${activeIndex === i ? 'active' : ''} ${activeIndex > i ? 'completed' : ''}`}
            >
              <span className="workflow-step-dot-num">{step.num}</span>
              <div className="workflow-step-dot-text">
                <span className="workflow-step-dot-tag">{step.tag}</span>
                <span className="workflow-step-dot-title">{step.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Progress Bar */}
        <div className="workflow-footer-bar">
          <div className="workflow-progress-info">
            <span className="workflow-progress-step">PHASE {WORKFLOW_STEPS[activeIndex].num} OF 04</span>
            <span className="workflow-progress-hint">SCROLL TO FLY THROUGH PIPELINE ↓</span>
          </div>
          <div className="workflow-progress-bar">
            <div 
              className="workflow-progress-fill" 
              style={{ width: `${((activeIndex + 1) / WORKFLOW_STEPS.length) * 100}%` }} 
            />
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="workflow-canvas-container">
        <Canvas camera={{ position: [0, 6, 8], fov: 52 }}>
          <fog attach="fog" args={['#eef0f5', 18, 65]} />
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
