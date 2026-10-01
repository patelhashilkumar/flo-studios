import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WorkflowSection.css';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   AUTHENTIC FLO STUDIOS METHODOLOGY (Minimal)
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
   PREMIUM RED SUPERSONIC JET
   Precision aerodynamic delta-wing craft with high-gloss
   studio red finish, smoked obsidian canopy, twin canted
   stabilizers, winglets, and glowing afterburners.
   ═══════════════════════════════════════════════════ */

function LuxurySupersonicCraft({ meshRef, bankRef }) {
  // 1. Sleek Delta Wings with Airfoil Profile & Canted Winglets
  const wingsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = [
      // Right Wing (Upper & Lower)
      0.38, 0.05, 0.85,    // 0: Root leading top
      2.35, 0.02, -1.05,   // 1: Tip leading top
      2.30, 0.02, -1.45,   // 2: Tip trailing top
      0.38, 0.05, -1.55,   // 3: Root trailing top
      0.38, -0.05, 0.85,   // 4: Root leading bottom
      2.35, -0.02, -1.05,  // 5: Tip leading bottom
      2.30, -0.02, -1.45,  // 6: Tip trailing bottom
      0.38, -0.05, -1.55,  // 7: Root trailing bottom

      // Left Wing (Upper & Lower)
      -0.38, 0.05, 0.85,   // 8: Root leading top
      -2.35, 0.02, -1.05,  // 9: Tip leading top
      -2.30, 0.02, -1.45,  // 10: Tip trailing top
      -0.38, 0.05, -1.55,  // 11: Root trailing top
      -0.38, -0.05, 0.85,  // 12: Root leading bottom
      -2.35, -0.02, -1.05, // 13: Tip leading bottom
      -2.30, -0.02, -1.45, // 14: Tip trailing bottom
      -0.38, -0.05, -1.55, // 15: Root trailing bottom

      // Right Winglet (Canted Upward Tip)
      2.35, 0.02, -1.05,   // 16
      2.42, 0.38, -1.25,   // 17: Winglet peak leading
      2.38, 0.35, -1.45,   // 18: Winglet peak trailing
      2.30, 0.02, -1.45,   // 19

      // Left Winglet (Canted Upward Tip)
      -2.35, 0.02, -1.05,  // 20
      -2.42, 0.38, -1.25,  // 21: Winglet peak leading
      -2.38, 0.35, -1.45,  // 22: Winglet peak trailing
      -2.30, 0.02, -1.45,  // 23
    ];

    const indices = [
      // Right Wing
      0, 1, 2,  0, 2, 3,
      4, 6, 5,  4, 7, 6,
      0, 5, 1,  0, 4, 5,
      3, 2, 6,  3, 6, 7,
      1, 5, 6,  1, 6, 2,

      // Left Wing
      8, 10, 9,   8, 11, 10,
      12, 13, 14, 12, 14, 15,
      8, 9, 13,   8, 13, 12,
      11, 14, 10, 11, 15, 14,
      9, 10, 14,  9, 14, 13,

      // Right Winglet (double-sided)
      16, 17, 18, 16, 18, 19,
      16, 18, 17, 16, 19, 18,

      // Left Winglet (double-sided)
      20, 22, 21, 20, 23, 22,
      20, 21, 22, 20, 22, 23,
    ];

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, []);

  // 2. Twin Canted Vertical Stabilizers (F-22 Style Stealth Fins)
  const finGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = [
      // Right Fin (canted outward)
      0.38, 0.06, -0.65,  // 0: Root leading
      0.54, 0.78, -1.35,  // 1: Tip leading
      0.50, 0.74, -1.65,  // 2: Tip trailing
      0.36, 0.06, -1.55,  // 3: Root trailing
      // Left Fin (canted outward)
      -0.38, 0.06, -0.65, // 4: Root leading
      -0.54, 0.78, -1.35, // 5: Tip leading
      -0.50, 0.74, -1.65, // 6: Tip trailing
      -0.36, 0.06, -1.55, // 7: Root trailing
    ];
    const indices = [
      0, 1, 2,  0, 2, 3,
      0, 2, 1,  0, 3, 2,
      4, 6, 5,  4, 7, 6,
      4, 5, 6,  4, 6, 7,
    ];
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, []);

  // 3. Nose Blended Strakes (SR-71 Style Lifting Chines)
  const strakesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = [
      0, 0.02, 2.7,        // 0: Needle nose blend
      0.38, 0.04, 0.85,    // 1: Right strake meets wing
      0.16, 0.02, 0.85,    // 2
      -0.16, 0.02, 0.85,   // 3
      -0.38, 0.04, 0.85,   // 4: Left strake meets wing
    ];
    const indices = [
      0, 1, 2,  0, 2, 1,
      0, 3, 4,  0, 4, 3,
      0, 2, 3,  0, 3, 2,
    ];
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group ref={meshRef} scale={[1.15, 1.15, 1.15]}>
      <group ref={bankRef}>
        {/* High-Gloss Vibrant Studio Red Finish */}
        <mesh geometry={wingsGeo}>
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.2}
            metalness={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Twin Canted Vertical Fins */}
        <mesh geometry={finGeo}>
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.2}
            metalness={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Aerodynamic Forward Chines */}
        <mesh geometry={strakesGeo}>
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.2}
            metalness={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Sculpted Radome Nose Cone */}
        <mesh position={[0, 0.02, 1.65]} rotation={[Math.PI / 2, 0, 0]} scale={[1.15, 0.65, 1.0]}>
          <coneGeometry args={[0.34, 2.1, 32]} />
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.18}
            metalness={0.15}
          />
        </mesh>

        {/* Supersonic Titanium Pitot Needle */}
        <mesh position={[0, 0.02, 2.95]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.022, 0.55, 16]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>

        {/* Blended Center Fuselage Spine */}
        <mesh position={[0, 0.04, -0.35]} rotation={[Math.PI / 2, 0, 0]} scale={[1.28, 0.62, 1.0]}>
          <cylinderGeometry args={[0.35, 0.42, 2.0, 32]} />
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.18}
            metalness={0.15}
          />
        </mesh>

        {/* Rear Engine Cowling Section */}
        <mesh position={[0, 0.04, -1.55]} rotation={[Math.PI / 2, 0, 0]} scale={[1.38, 0.52, 1.0]}>
          <cylinderGeometry args={[0.42, 0.38, 0.8, 32]} />
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.18}
            metalness={0.15}
          />
        </mesh>

        {/* Smoked Obsidian Teardrop Bubble Canopy */}
        <mesh position={[0, 0.22, 0.55]} scale={[0.22, 0.20, 1.25]}>
          <sphereGeometry args={[1, 32, 16]} />
          <meshStandardMaterial
            color="#09090e"
            roughness={0.04}
            metalness={0.95}
          />
        </mesh>

        {/* Subtle Titanium Canopy Base Ridge */}
        <mesh position={[0, 0.14, 0.55]} scale={[0.24, 0.08, 1.28]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#18181b"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Twin Jet Exhausts with Glowing Afterburner Cores */}
        {/* Right Exhaust */}
        <group position={[0.26, 0.02, -1.98]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.15, 0.32, 24, 1, true]} />
            <meshStandardMaterial
              color="#27272a"
              roughness={0.25}
              metalness={0.88}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0, 0.04]} rotation={[0, Math.PI, 0]}>
            <circleGeometry args={[0.11, 24]} />
            <meshBasicMaterial color="#ff3828" />
          </mesh>
        </group>

        {/* Left Exhaust */}
        <group position={[-0.26, 0.02, -1.98]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.15, 0.32, 24, 1, true]} />
            <meshStandardMaterial
              color="#27272a"
              roughness={0.25}
              metalness={0.88}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0, 0.04]} rotation={[0, Math.PI, 0]}>
            <circleGeometry args={[0.11, 24]} />
            <meshBasicMaterial color="#ff3828" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   DYNAMIC SOFT CONTACT SHADOW (Floor Anchor)
   ═══════════════════════════════════════════════════ */

function PlaneContactShadow({ shadowRef }) {
  const shadowTex = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.32)');
    grad.addColorStop(0.35, 'rgba(15, 23, 42, 0.14)');
    grad.addColorStop(0.7, 'rgba(15, 23, 42, 0.04)');
    grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2.8, 3.6]} />
      <meshBasicMaterial map={shadowTex} transparent opacity={0.65} depthWrite={false} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════
   MINIMALIST ARCHITECTURAL WAYPOINT (Pure & Clean)
   Hairline coordinate ring with subtle sonar ripple
   ═══════════════════════════════════════════════════ */

function MinimalWaypoint({ position, isActive }) {
  const pulseRef = useRef();

  useFrame((state) => {
    if (pulseRef.current && isActive) {
      const t = (state.clock.elapsedTime * 1.1) % 1.6;
      const s = 1 + t * 0.7;
      pulseRef.current.scale.set(s, s, 1);
      pulseRef.current.material.opacity = Math.max(0, 0.35 * (1 - t / 1.6));
    }
  });

  return (
    <group position={position}>
      {/* Flat Floor Marker Right on the Flight Path */}
      <group position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Subtle Outer Hairline Ring */}
        <mesh>
          <ringGeometry args={[0.45, 0.50, 48]} />
          <meshBasicMaterial
            color={isActive ? "#18181b" : "#cbd5e1"}
            transparent
            opacity={isActive ? 0.85 : 0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Center Node Ring */}
        <mesh>
          <ringGeometry args={[0.1, 0.18, 32]} />
          <meshBasicMaterial
            color={isActive ? "#18181b" : "#94a3b8"}
            transparent
            opacity={isActive ? 0.9 : 0.45}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Faint Concentric Pulse when Active */}
        {isActive && (
          <mesh ref={pulseRef}>
            <ringGeometry args={[0.5, 0.54, 48]} />
            <meshBasicMaterial
              color="#71717a"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
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
      matRef.current.dashOffset = -state.clock.elapsedTime * 1.5;
    }
  });

  return (
    <group>
      {/* Subtle Continuous Guide Ribbon in Pure Grey */}
      <line geometry={geometry}>
        <lineBasicMaterial color="#e2e8f0" transparent opacity={0.6} />
      </line>

      {/* Animated Precision Dashed Line in Pure Grey */}
      <line ref={lineRef} geometry={geometry}>
        <lineDashedMaterial
          ref={matRef}
          color="#94a3b8"
          dashSize={1.1}
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
  const bankRef = useRef();
  const shadowRef = useRef();
  const currentLookAt = useRef(new THREE.Vector3());
  
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
      const cardOffset = normal.clone().multiplyScalar(side * 4.2).add(new THREE.Vector3(0, 1.6, 0));
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
      
      // Dynamic aerodynamic roll into curves and authentic pitch
      const bankAngle = THREE.MathUtils.clamp(-tangent.x * 0.55, -0.45, 0.45);
      const pitchAngle = THREE.MathUtils.clamp(-tangent.y * 0.35, -0.25, 0.25);
      if (bankRef.current) {
        bankRef.current.rotation.z = bankAngle;
        bankRef.current.rotation.x = pitchAngle;
      }

      // Update soft contact shadow directly below the craft
      if (shadowRef.current) {
        shadowRef.current.position.set(point.x, point.y - 1.4, point.z);
        const bankScale = Math.max(0.65, Math.cos(bankAngle));
        shadowRef.current.scale.set(1.25 * bankScale, 1.55, 1);
        shadowRef.current.rotation.z = -Math.atan2(tangent.x, -tangent.z);
      }
    }

    // Dynamic 3/4 Isometric camera placed at a comfortable, clear viewing distance
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const distBehind = 9.2;
    const distAbove = 6.0;
    const distSide = 3.8;

    const cameraOffset = new THREE.Vector3()
      .copy(tangent).multiplyScalar(-distBehind)
      .add(new THREE.Vector3(0, distAbove, 0))
      .add(normal.clone().multiplyScalar(distSide));

    const targetCamPos = point.clone().add(cameraOffset);
    camera.position.lerp(targetCamPos, 0.07);

    // Frame the plane comfortably in view with path ahead
    const targetLookAt = point.clone()
      .add(tangent.clone().multiplyScalar(1.8))
      .add(new THREE.Vector3(0, 0.4, 0));

    if (currentLookAt.current.lengthSq() === 0) {
      currentLookAt.current.copy(targetLookAt);
    } else {
      currentLookAt.current.lerp(targetLookAt, 0.08);
    }
    camera.lookAt(currentLookAt.current);
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

      {/* The 4 Milestones */}
      {milestones.map((m, i) => {
        const isActive = activeIndex === i;
        const step = WORKFLOW_STEPS[i];
        
        return (
          <group key={i}>
            {/* Minimalist Architectural Hairline Waypoint */}
            <MinimalWaypoint
              position={m.beaconPosition}
              isActive={isActive}
            />

            {/* Current Active Milestone Card (Only active card shown to eliminate clutter) */}
            {isActive && (
              <group position={m.cardPosition}>
                <Html 
                  distanceFactor={13.5}
                  center
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="milestone-card milestone-card--active">
                    <div className="milestone-card__glass">
                      <div className="milestone-card__phase">
                        PHASE {step.num} — {step.tag}
                      </div>

                      <h3 className="milestone-card__title">{step.title}</h3>
                      <p className="milestone-card__desc">{step.desc}</p>

                      <div className="milestone-card__deliverable">
                        <span className="milestone-card__deliverable-dot" />
                        <span>Deliverable: {step.deliverable}</span>
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
      <LuxurySupersonicCraft meshRef={planeRef} bankRef={bankRef} />
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
              <span className="workflow-step-dot-title">{step.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="workflow-canvas-container">
        <Canvas camera={{ position: [7.2, 9.6, 7.5], fov: 46 }}>
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
