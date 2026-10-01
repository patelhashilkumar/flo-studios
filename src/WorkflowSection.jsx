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
    desc: "Unearthing brand narrative, kinetic principles, and technical requirements through intensive creative exploration.",
    deliverable: "Motion Brand Bible"
  },
  {
    num: "02",
    tag: "PROTOTYPING",
    title: "Motion & 3D R&D",
    desc: "Kinetic storyboarding, procedural geometry sculpture, and lighting studies to establish the signature visual universe.",
    deliverable: "3D Pre-Vis & Shaders"
  },
  {
    num: "03",
    tag: "PRODUCTION",
    title: "Cinema & Craft",
    desc: "High-fidelity physics simulations, raytraced GPU rendering, typographic micro-interactions, and bespoke sound design.",
    deliverable: "Raytraced CGI & Sound"
  },
  {
    num: "04",
    tag: "DEPLOYMENT",
    title: "Master Delivery",
    desc: "Multi-platform 4K/8K rendering and interactive asset packaging engineered for iconic global reveals.",
    deliverable: "Master 8K Interactive"
  }
];

/* ═══════════════════════════════════════════════════
   SCULPTED RED SUPERSONIC CRAFT
   Aerodynamic delta-wing jet in glossy Flo Red
   ═══════════════════════════════════════════════════ */

function RedDeltaCraft({ meshRef, bankRef }) {
  const planeGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    const vertices = new Float32Array([
      // 0: Needle nose tip
      0, 0, -2.6,
      // Fuselage top spine
      0, 0.22, -1.4,   // 1
      0, 0.26, -0.4,   // 2
      0, 0.28,  0.6,   // 3
      0, 0.22,  1.4,   // 4: Tail tip top
      // Fuselage bottom belly
      0, -0.10, -1.4,  // 5
      0, -0.12, -0.4,  // 6
      0, -0.10,  0.6,  // 7
      0, -0.06,  1.4,  // 8: Tail tip bottom
      // Left Delta Wing
      -0.35, 0.06, -0.9, // 9: Left root leading
      -2.2,  0.08,  0.4, // 10: Left wing tip leading
      -1.85, 0.07,  0.9, // 11: Left wing tip trailing
      -0.32, 0.06,  0.8, // 12: Left root trailing
      // Right Delta Wing
      0.35,  0.06, -0.9, // 13: Right root leading
      2.2,   0.08,  0.4, // 14: Right wing tip leading
      1.85,  0.07,  0.9, // 15: Right wing tip trailing
      0.32,  0.06,  0.8, // 16: Right root trailing
      // Canted Left Fin
      -0.36, 0.24,  0.75, // 17
      -0.52, 0.78,  1.15, // 18
      -0.34, 0.22,  1.35, // 19
      // Canted Right Fin
      0.36,  0.24,  0.75, // 20
      0.52,  0.78,  1.15, // 21
      0.34,  0.22,  1.35, // 22
    ]);

    const indices = [
      // Top fuselage left
      0, 1, 9,
      1, 2, 9,
      2, 12, 9,
      2, 3, 12,
      3, 4, 12,
      // Top fuselage right
      0, 13, 1,
      1, 13, 2,
      2, 13, 16,
      2, 16, 3,
      3, 16, 4,
      // Bottom fuselage left
      0, 9, 5,
      5, 9, 6,
      6, 9, 12,
      6, 12, 7,
      7, 12, 8,
      // Bottom fuselage right
      0, 5, 13,
      5, 6, 13,
      6, 16, 13,
      6, 7, 16,
      7, 8, 16,
      // Left Wing
      9, 10, 11,
      9, 11, 12,
      9, 11, 10,
      9, 12, 11,
      // Right Wing
      13, 15, 14,
      13, 16, 15,
      13, 14, 15,
      13, 15, 16,
      // Canted Left Fin (double-sided)
      17, 18, 19,
      19, 18, 17,
      // Canted Right Fin (double-sided)
      20, 21, 22,
      22, 21, 20,
      // Tail rear closure
      4, 12, 8,
      4, 8, 16,
    ];

    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    const nonIndexed = geo.toNonIndexed();
    nonIndexed.computeVertexNormals();
    return nonIndexed;
  }, []);

  return (
    <group ref={meshRef} scale={[0.95, 0.95, 0.95]}>
      {/* 180 deg Y rotation ensures the aerodynamic needle nose points forward along flight heading */}
      <group rotation={[0, Math.PI, 0]}>
        <group ref={bankRef}>
          {/* High-Gloss Vibrant Red Fuselage */}
          <mesh geometry={planeGeo}>
            <meshPhysicalMaterial
              color="#e62020"
              roughness={0.2}
              metalness={0.15}
              clearcoat={0.65}
              clearcoatRoughness={0.12}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Aerodynamic Smoked Obsidian Canopy */}
          <mesh position={[0, 0.22, -0.65]} rotation={[-0.12, 0, 0]}>
            <boxGeometry args={[0.15, 0.09, 0.72]} />
            <meshStandardMaterial
              color="#0b0f14"
              roughness={0.06}
              metalness={0.92}
            />
          </mesh>

          {/* Flush Titanium Exhaust Ports */}
          <mesh position={[-0.15, 0.08, 1.38]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.07, 0.08, 16]} />
            <meshStandardMaterial color="#222228" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0.15, 0.08, 1.38]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.07, 0.08, 16]} />
            <meshStandardMaterial color="#222228" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   DYNAMIC SOFT AMBIENT CONTACT SHADOW
   Projects beneath the plane on the cyclorama floor
   ═══════════════════════════════════════════════════ */

function PlaneContactShadow({ shadowRef }) {
  const shadowTex = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.38)');
    grad.addColorStop(0.35, 'rgba(15, 23, 42, 0.18)');
    grad.addColorStop(0.7, 'rgba(15, 23, 42, 0.05)');
    grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3.2, 4.0]} />
      <meshBasicMaterial map={shadowTex} transparent opacity={0.7} depthWrite={false} />
    </mesh>
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
      matRef.current.dashOffset = -state.clock.elapsedTime * 1.5;
    }
  });

  return (
    <group>
      {/* Subtle Continuous Guide Ribbon in Pure Grey */}
      <line geometry={geometry}>
        <lineBasicMaterial color="#d4d7dd" transparent opacity={0.6} />
      </line>

      {/* Animated Precision Dashed Line in Pure Grey */}
      <line ref={lineRef} geometry={geometry}>
        <lineDashedMaterial
          ref={matRef}
          color="#788290"
          dashSize={1.2}
          gapSize={0.65}
          linewidth={1.5}
        />
      </line>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   ARCHITECTURAL FLIGHT GATEWAY (Replaces clunky black ball)
   Perpendicular supersonic halo with precision HUD reticle
   ═══════════════════════════════════════════════════ */

function WaypointGate({ position, tangent, isActive }) {
  const pulseRef = useRef();

  // Compute orientation so the ring stands perpendicular to the flight trajectory
  const gateQuaternion = useMemo(() => {
    const dummy = new THREE.Object3D();
    dummy.position.copy(position);
    dummy.lookAt(position.clone().add(tangent));
    return dummy.quaternion;
  }, [position, tangent]);

  useFrame((state) => {
    if (pulseRef.current && isActive) {
      const t = (state.clock.elapsedTime * 0.9) % 2;
      const s = 1 + t * 0.35;
      pulseRef.current.scale.set(s, s, 1);
      pulseRef.current.material.opacity = Math.max(0, 0.35 * (1 - t / 2));
    }
  });

  return (
    <group position={position}>
      {/* 3D Vertical Flight Ring — Plane glides right through it */}
      <group quaternion={gateQuaternion}>
        {/* Primary Slender Halo Ring */}
        <mesh>
          <torusGeometry args={[2.25, 0.022, 16, 80]} />
          <meshStandardMaterial
            color={isActive ? "#1e242b" : "#8b949e"}
            roughness={0.25}
            metalness={0.75}
            transparent
            opacity={isActive ? 0.95 : 0.32}
          />
        </mesh>

        {/* Secondary Hairline Concentric Ring */}
        <mesh>
          <torusGeometry args={[2.42, 0.012, 16, 80]} />
          <meshBasicMaterial
            color={isActive ? "#475569" : "#cbd5e1"}
            transparent
            opacity={isActive ? 0.65 : 0.18}
          />
        </mesh>

        {/* 4 Precision Aviation Reticle Ticks */}
        {[-Math.PI / 2, 0, Math.PI / 2, Math.PI].map((ang, idx) => (
          <mesh
            key={idx}
            position={[Math.cos(ang) * 2.25, Math.sin(ang) * 2.25, 0]}
            rotation={[0, 0, ang]}
          >
            <boxGeometry args={[0.12, 0.022, 0.022]} />
            <meshBasicMaterial
              color={isActive ? "#0f172a" : "#94a3b8"}
              transparent
              opacity={isActive ? 0.95 : 0.35}
            />
          </mesh>
        ))}

        {/* Animated Sonar Pulse Ring When Active */}
        {isActive && (
          <mesh ref={pulseRef}>
            <ringGeometry args={[2.18, 2.32, 64]} />
            <meshBasicMaterial
              color="#64748b"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>

      {/* Ground Navigation Floor Reticle */}
      <group position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[0.75, 0.82, 48]} />
          <meshBasicMaterial
            color={isActive ? "#475569" : "#d4d7dd"}
            transparent
            opacity={isActive ? 0.6 : 0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[0.2, 0.24, 32]} />
          <meshBasicMaterial
            color={isActive ? "#64748b" : "#e2e5e9"}
            transparent
            opacity={isActive ? 0.5 : 0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

function Scene({ progressRef, activeIndex, setActiveIndex }) {
  const { camera } = useThree();
  const planeRef = useRef();
  const bankRef = useRef();
  const shadowRef = useRef();
  
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
      const cardOffset = normal.clone().multiplyScalar(side * 3.6).add(new THREE.Vector3(0, 1.2, 0));
      return {
        beaconPosition: pos,
        tangent: tan,
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
      
      // Dynamic aerodynamic roll into curves
      const bankAngle = -tangent.x * 0.45;
      if (bankRef.current) {
        bankRef.current.rotation.z = bankAngle;
      }

      // Update soft contact shadow directly below the craft
      if (shadowRef.current) {
        shadowRef.current.position.set(point.x, point.y - 1.35, point.z);
        const bankScale = Math.max(0.65, Math.cos(bankAngle));
        shadowRef.current.scale.set(1.1 * bankScale, 1.4, 1);
        shadowRef.current.rotation.z = -Math.atan2(tangent.x, -tangent.z);
      }
    }

    // 3/4 Isometric cinematic chase camera
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const cameraOffset = new THREE.Vector3()
      .copy(normal).multiplyScalar(2.0)
      .add(new THREE.Vector3(0, 4.8, 6.2));

    const targetCamPos = point.clone().add(cameraOffset);
    camera.position.lerp(targetCamPos, 0.08);

    // Look ahead smoothly along flight path
    const lookAheadPoint = curve.getPointAt(Math.min(p + 0.08, 0.99));
    camera.lookAt(lookAheadPoint);
  });

  return (
    <>
      {/* Studio Cyclorama Lighting */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[12, 20, 10]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-10, 8, -10]} intensity={0.6} color="#eef2f8" />

      {/* Flight Corridor Path — In Pure Refined Grey */}
      <DashedPath geometry={dashedLineGeo} />

      {/* Ground Contact Shadow Beneath The Red Craft */}
      <PlaneContactShadow shadowRef={shadowRef} />

      {/* The 4 Milestones (Only the current milestone card is rendered to eliminate background clutter) */}
      {milestones.map((m, i) => {
        const isActive = activeIndex === i;
        const step = WORKFLOW_STEPS[i];
        
        return (
          <group key={i}>
            {/* Architectural Supersonic Halo Gateway — The plane flies right through */}
            <WaypointGate
              position={m.beaconPosition}
              tangent={m.tangent}
              isActive={isActive}
            />

            {/* Current Active Milestone Liquid Glass Card (No background overlapping!) */}
            {isActive && (
              <group position={m.cardPosition}>
                <Html 
                  distanceFactor={13.5}
                  center
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="milestone-card milestone-card--active">
                    <div className="milestone-card__glass">
                      <div className="milestone-card__top">
                        <span className="milestone-card__phase">PHASE {step.num} // {step.tag}</span>
                        <span className="milestone-card__badge">ACTIVE STAGE</span>
                      </div>

                      <h3 className="milestone-card__title">{step.title}</h3>
                      <p className="milestone-card__desc">{step.desc}</p>

                      <div className="milestone-card__deliverable">
                        <span className="milestone-card__deliverable-dot" />
                        <span className="milestone-card__deliverable-label">DELIVERABLE:</span>
                        <span className="milestone-card__deliverable-text">{step.deliverable}</span>
                      </div>
                    </div>
                  </div>
                </Html>
              </group>
            )}
          </group>
        );
      })}

      {/* The Sculpted Red Supersonic Delta Craft */}
      <RedDeltaCraft meshRef={planeRef} bankRef={bankRef} />
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
        {/* Simple & Clean Header (Inter font, no Panchang) */}
        <div className="workflow-header">
          <span className="workflow-label">CREATIVE PROCESS</span>
          <h2 className="workflow-title">The Journey</h2>
          <p className="workflow-desc">
            How Flo Studios brings cinematic motion and procedural 3D from concept to global launch.
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
        <Canvas camera={{ position: [0, 6, 8], fov: 50 }}>
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
