import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WorkflowSection.css';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   AUTHENTIC FLO STUDIOS METHODOLOGY (Simplified)
   ═══════════════════════════════════════════════════ */

const WORKFLOW_STEPS = [
  {
    num: "01",
    tag: "DISCOVERY",
    title: "Vision & Direction",
    desc: "Unearthing brand narrative, kinetic principles, and technical requirements through intensive exploration.",
    deliverable: "Motion Brand Bible"
  },
  {
    num: "02",
    tag: "PROTOTYPING",
    title: "Motion & 3D R&D",
    desc: "Kinetic storyboarding, procedural geometry sculpture, and lighting studies to establish the visual universe.",
    deliverable: "3D Pre-Vis & Shaders"
  },
  {
    num: "03",
    tag: "PRODUCTION",
    title: "Cinema & Craft",
    desc: "High-fidelity physics simulations, raytraced GPU rendering, typographic micro-interactions, and sound design.",
    deliverable: "Raytraced CGI & Sound"
  },
  {
    num: "04",
    tag: "DEPLOYMENT",
    title: "Master Delivery",
    desc: "Multi-platform 4K/8K rendering and interactive asset packaging engineered for global reveals.",
    deliverable: "Master 8K Interactive"
  }
];

/* ═══════════════════════════════════════════════════
   RED SUPERSONIC PLANE
   Striking Flo Studios Red craft with smoked canopy
   ═══════════════════════════════════════════════════ */

function RedSupersonicPlane({ meshRef }) {
  const planeGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    const vertices = new Float32Array([
      // Nose tip
      0, 0, -2.4,
      // Fuselage spine
      0, 0.22, -1.3,
      0, 0.26, -0.3,
      0, 0.32,  0.7,
      0, 0.38,  1.3,
      // Fuselage belly
      0, -0.08, -1.3,
      0, -0.10, -0.3,
      0, -0.08,  0.7,
      0,  0.0,   1.3,
      // Left wing
      -0.38, 0.08, -0.8,
      -2.1,  0.12,  0.2,
      -1.75, 0.10,  0.7,
      -0.32, 0.08,  0.6,
      // Right wing
      0.38,  0.08, -0.8,
      2.1,   0.12,  0.2,
      1.75,  0.10,  0.7,
      0.32,  0.08,  0.6,
      // Vertical stabilizer
      0,     0.32,  0.7,
      0,     0.85,  1.05,
      0,     0.38,  1.3,
      // Left h-tail
      -0.18, 0.22,  0.8,
      -0.82, 0.24,  1.15,
      -0.18, 0.24,  1.25,
      // Right h-tail
      0.18,  0.22,  0.8,
      0.82,  0.24,  1.15,
      0.18,  0.24,  1.25,
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
    <group ref={meshRef} scale={[0.95, 0.95, 0.95]}>
      <group rotation={[0, Math.PI, 0]}>
        {/* Vibrant Glossy Red Fuselage */}
        <mesh geometry={planeGeo}>
          <meshStandardMaterial
            color="#ff2828"
            roughness={0.24}
            metalness={0.16}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Smoked Tint Cockpit Canopy */}
        <mesh position={[0, 0.20, -1.35]} rotation={[0.26, 0, 0]}>
          <boxGeometry args={[0.13, 0.07, 0.44]} />
          <meshStandardMaterial
            color="#0f0f14"
            roughness={0.08}
            metalness={0.92}
          />
        </mesh>

        {/* Clean Graphite Twin Exhaust Nozzles */}
        <mesh position={[-0.14, 0.08, 1.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.065, 0.075, 0.12, 16]} />
          <meshStandardMaterial color="#26262e" roughness={0.35} metalness={0.7} />
        </mesh>
        <mesh position={[0.14, 0.08, 1.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.065, 0.075, 0.12, 16]} />
          <meshStandardMaterial color="#26262e" roughness={0.35} metalness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   CLEAN GREY FLIGHT PATH (Trajectory Corridor)
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
      matRef.current.dashOffset = -state.clock.elapsedTime * 1.6;
    }
  });

  return (
    <group>
      {/* Subtle Continuous Base Track in Grey */}
      <line geometry={geometry}>
        <lineBasicMaterial color="#d4d7dd" transparent opacity={0.65} />
      </line>

      {/* Animated Precision Dashed Line in Grey */}
      <line ref={lineRef} geometry={geometry}>
        <lineDashedMaterial
          ref={matRef}
          color="#8b949e"
          dashSize={1.2}
          gapSize={0.65}
          linewidth={1.5}
        />
      </line>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   3D SCENE COMPONENT
   ═══════════════════════════════════════════════════ */

function Scene({ progressRef, activeIndex, setActiveIndex }) {
  const { camera } = useThree();
  const planeRef = useRef();
  
  // Smooth Catmull-Rom flight corridor
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

  // Milestones positioned along the path
  const milestones = useMemo(() => {
    const fractions = [0.10, 0.36, 0.63, 0.88];
    return fractions.map((f, i) => {
      const pos = curve.getPointAt(f);
      const tan = curve.getTangentAt(f);
      const normal = new THREE.Vector3(-tan.z, 0, tan.x).normalize();
      const side = i % 2 === 0 ? 1 : -1;
      const cardOffset = normal.clone().multiplyScalar(side * 3.6).add(new THREE.Vector3(0, 1.4, 0));
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

  useFrame(() => {
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
    
    // Position and orient the red plane
    if (planeRef.current) {
      planeRef.current.position.copy(point);
      const lookTarget = point.clone().add(tangent);
      planeRef.current.lookAt(lookTarget);
      
      // Aerodynamic roll into turns
      const bankAngle = -tangent.x * 0.45;
      planeRef.current.rotation.z += bankAngle;
    }

    // Smooth cinematic chase camera
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const cameraOffset = new THREE.Vector3()
      .copy(normal).multiplyScalar(1.1)
      .add(new THREE.Vector3(0, 6.2, 7.5));

    const targetCamPos = point.clone().add(cameraOffset);
    camera.position.lerp(targetCamPos, 0.08);

    // Look ahead along flight path
    const lookAheadPoint = curve.getPointAt(Math.min(p + 0.07, 0.99));
    camera.lookAt(lookAheadPoint);
  });

  return (
    <>
      {/* Crisp Studio Cyclorama Lighting */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[12, 20, 10]} intensity={1.3} color="#ffffff" />
      <directionalLight position={[-10, 8, -10]} intensity={0.5} color="#eef2f8" />

      {/* Flight Corridor Path — In Pure Refined Grey */}
      <DashedPath geometry={dashedLineGeo} />

      {/* The 4 Milestones Along the Path */}
      {milestones.map((m, i) => {
        const isActive = activeIndex === i;
        const step = WORKFLOW_STEPS[i];
        
        return (
          <group key={i}>
            {/* Minimal Grey Waypoint Node On The Path */}
            <group position={m.beaconPosition}>
              {/* Outer Flat Grey Waypoint Ring */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <ringGeometry args={[0.75, 0.92, 36]} />
                <meshBasicMaterial 
                  color={isActive ? "#4b5563" : "#cbd5e1"} 
                  transparent 
                  opacity={isActive ? 0.8 : 0.3} 
                  side={THREE.DoubleSide} 
                />
              </mesh>

              {/* Inner Flat Grey Disc */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
                <ringGeometry args={[0.26, 0.4, 32]} />
                <meshBasicMaterial 
                  color={isActive ? "#6b7280" : "#d1d5db"} 
                  transparent 
                  opacity={isActive ? 0.7 : 0.25} 
                  side={THREE.DoubleSide} 
                />
              </mesh>

              {/* Waypoint Center Node Dot */}
              <mesh position={[0, 0.08, 0]}>
                <sphereGeometry args={[isActive ? 0.18 : 0.12, 24, 24]} />
                <meshStandardMaterial 
                  color={isActive ? "#374151" : "#9ca3af"} 
                  roughness={0.35} 
                  metalness={0.25} 
                />
              </mesh>
            </group>

            {/* Clean Minimal Milestone Card */}
            <group position={m.cardPosition}>
              <Html 
                distanceFactor={14}
                style={{ pointerEvents: 'auto' }}
              >
                <div 
                  className={`milestone-card ${isActive ? 'milestone-card--active' : ''} ${
                    m.side > 0 ? 'milestone-card--right' : 'milestone-card--left'
                  }`}
                >
                  <div className="milestone-card__glass">
                    <div className="milestone-card__phase">
                      PHASE {step.num} // {step.tag}
                    </div>

                    <h3 className="milestone-card__title">{step.title}</h3>
                    <p className="milestone-card__desc">{step.desc}</p>

                    <div className="milestone-card__deliverable">
                      <span className="milestone-card__deliverable-dot" />
                      <span>{step.deliverable}</span>
                    </div>
                  </div>
                </div>
              </Html>
            </group>
          </group>
        );
      })}

      {/* The Red Supersonic Plane */}
      <RedSupersonicPlane meshRef={planeRef} />
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
          end: "+=300%",
          pin: true,
          scrub: 1.2
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Jump to specific milestone when clicked on timeline
  const handleStepClick = (index) => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollTrigger = ScrollTrigger.getAll().find(st => st.trigger === section);
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
        {/* Simple & Clean Header */}
        <div className="workflow-header">
          <span className="workflow-label">CREATIVE PROCESS</span>
          <h2 className="workflow-title">The Journey</h2>
          <p className="workflow-desc">
            How Flo Studios brings cinematic motion and 3D from concept to global launch.
          </p>
        </div>

        {/* Clean Timeline Navigation (Right Sidebar) */}
        <div className="workflow-steps-indicator" role="navigation" aria-label="Workflow Phases">
          {WORKFLOW_STEPS.map((step, i) => (
            <button 
              key={i} 
              type="button"
              onClick={() => handleStepClick(i)}
              className={`workflow-step-dot ${activeIndex === i ? 'active' : ''}`}
            >
              <span className="workflow-step-dot-num">{step.num}</span>
              <div className="workflow-step-dot-text">
                <span className="workflow-step-dot-tag">{step.tag}</span>
                <span className="workflow-step-dot-title">{step.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Minimal Progress Footer Bar */}
        <div className="workflow-footer-bar">
          <div className="workflow-progress-info">
            <span className="workflow-progress-step">PHASE {WORKFLOW_STEPS[activeIndex].num} OF 04</span>
            <span className="workflow-progress-hint">SCROLL TO FLY ↓</span>
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
          <fog attach="fog" args={['#edf0f5', 20, 75]} />
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
