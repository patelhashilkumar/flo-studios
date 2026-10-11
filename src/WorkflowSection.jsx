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
    desc: "Defining narrative principles, kinetic tone, and technical architecture.",
    deliverable: "Motion Brand Bible"
  },
  {
    num: "02",
    tag: "PROTOTYPING",
    title: "Motion & 3D R&D",
    desc: "Kinetic storyboarding, procedural geometry, and shader exploration.",
    deliverable: "3D Pre-Vis & Shaders"
  },
  {
    num: "03",
    tag: "PRODUCTION",
    title: "Cinema & Craft",
    desc: "GPU raytracing, physical simulation, and typographic motion.",
    deliverable: "Raytraced CGI & Sound"
  },
  {
    num: "04",
    tag: "DEPLOYMENT",
    title: "Master Delivery",
    desc: "Multi-format rendering and interactive asset deployment.",
    deliverable: "Master 8K Interactive"
  }
];

/* ═══════════════════════════════════════════════════
   MINIMALIST RED AERODYNAMIC DART
   Small, pure, understated geometric craft gliding
   elegantly along the grey flight corridor.
   ═══════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════
   ORIGAMI PAPER AIRPLANE (Classic Studio Red Dart)
   Clean geometric folds: sharp needle nose, aerodynamic
   wings with positive dihedral V-lift, center folded keel
   grip, and subtle crisp crease lines.
   ═══════════════════════════════════════════════════ */

function PaperAirplane({ meshRef, bankRef }) {
  const { planeGeo, innerGeo, edgesGeo } = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    const positions = new Float32Array([
      // 0: Needle nose tip (front)
      0.0, 0.0, 2.75,
      // 1: Center spine fold (top center fold)
      0.0, 0.06, -1.95,
      // 2: Right wing tip (swept back with realistic positive dihedral)
      2.05, 0.35, -1.95,
      // 3: Left wing tip
      -2.05, 0.35, -1.95,
      // 4: Right inner fold crease
      0.55, 0.12, -1.95,
      // 5: Left inner fold crease
      -0.55, 0.12, -1.95,
      // 6: Keel bottom rear (fold under)
      0.0, -0.42, -1.95,
      // 7: Keel bottom mid (deepest grip)
      0.0, -0.46, -0.25,
      // 8: Keel front blend
      0.0, -0.12, 1.85,
    ]);

    const indices = [
      // Right Wing Outer
      0, 2, 4,
      // Right Wing Inner Flap
      0, 4, 1,
      // Left Wing Outer
      0, 5, 3,
      // Left Wing Inner Flap
      0, 1, 5,

      // Keel Right Face
      0, 1, 6,
      0, 6, 7,
      0, 7, 8,

      // Keel Left Face
      0, 6, 1,
      0, 7, 6,
      0, 8, 7,
    ];

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    // Inner fold flaps (crisp origami paper layers)
    const inGeo = new THREE.BufferGeometry();
    const inPositions = new Float32Array([
      0.0, 0.018, 2.72,
      0.0, 0.075, -1.93,
      0.54, 0.14, -1.93,
      -0.54, 0.14, -1.93,
    ]);
    const inIndices = [
      0, 2, 1,
      0, 1, 3,
    ];
    inGeo.setAttribute('position', new THREE.BufferAttribute(inPositions, 3));
    inGeo.setIndex(inIndices);
    inGeo.computeVertexNormals();

    // Delicate origami crease lines
    const edGeo = new THREE.EdgesGeometry(geo, 10);

    return { planeGeo: geo, innerGeo: inGeo, edgesGeo: edGeo };
  }, []);

  return (
    <group ref={meshRef} scale={[0.74, 0.74, 0.74]}>
      <group ref={bankRef}>
        {/* Main Origami Paper Wings & Keel */}
        <mesh geometry={planeGeo}>
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.28}
            metalness={0.03}
            flatShading={true}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Folded Flaps — Rich Layered Contrast */}
        <mesh geometry={innerGeo}>
          <meshStandardMaterial
            color="#f43f5e"
            roughness={0.25}
            metalness={0.03}
            flatShading={true}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Delicate Origami Crease Lines */}
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color="#881337" transparent opacity={0.75} />
        </lineSegments>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   DYNAMIC SOFT CONTACT SHADOW (Floor Anchor)
   ═══════════════════════════════════════════════════ */

function PlaneContactShadow({ shadowRef }) {
  const shadowTex = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.32)');
      grad.addColorStop(0.35, 'rgba(15, 23, 42, 0.14)');
      grad.addColorStop(0.7, 'rgba(15, 23, 42, 0.04)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(canvas);
    } catch {
      return null;
    }
  }, []);

  if (!shadowTex) return null;

  return (
    <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2.2, 2.8]} />
      <meshBasicMaterial map={shadowTex} transparent opacity={0.6} depthWrite={false} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════
   AIR TRAFFIC CONTROL TOWER (Architectural 3D Model)
   Sleek tapered composite shaft, cantilever collar, 
   panoramic 360° outward-angled smoked glass control cab 
   with architectural mullions, radome dome, communications 
   mast, and pulsing red beacon.
   ═══════════════════════════════════════════════════ */

function AirTrafficControlTower({ position, isActive, scale = 0.38 }) {
  const beaconRef = useRef();
  const haloRef = useRef();

  useFrame((state) => {
    if (beaconRef.current) {
      // High-visibility pulsing aviation strobe
      const t = state.clock.elapsedTime * 4.0;
      const pulse = isActive ? Math.sin(t) * 0.5 + 0.5 : 0.25;
      beaconRef.current.material.opacity = Math.max(0.2, pulse);
      if (haloRef.current) {
        haloRef.current.material.opacity = Math.max(0.05, pulse * 0.35);
        haloRef.current.scale.setScalar(0.85 + pulse * 0.35);
      }
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* 1. Ground Apron Pad & Marking Ring */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.08, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Runway / Apron Marking Rings */}
      <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.25, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.45} />
      </mesh>

      {/* 2. Concrete Architectural Foundation Base */}
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.72, 0.95, 0.36, 32]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.54, 0.72, 0.12, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.25} metalness={0.35} />
      </mesh>

      {/* 3. Sleek Architectural Tower Shaft (Elegant Taper) */}
      <mesh position={[0, 2.15, 0]}>
        <cylinderGeometry args={[0.36, 0.48, 3.3, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.08} />
      </mesh>

      {/* 4. Flo Red Vertical Architectural Fin / Pinstripe */}
      <mesh position={[0, 2.15, 0]}>
        <boxGeometry args={[0.06, 3.25, 0.52]} />
        <meshStandardMaterial color="#e11d48" roughness={0.25} metalness={0.1} />
      </mesh>

      {/* 5. Mid-level Technical Ring Collar */}
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[0.44, 0.44, 0.08, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* 6. Cantilever Under-Cab Support Bowl */}
      <mesh position={[0, 3.95, 0]}>
        <cylinderGeometry args={[1.05, 0.36, 0.65, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.25} metalness={0.4} />
      </mesh>

      {/* 7. Observation Walkway / Catwalk Gallery Deck */}
      <mesh position={[0, 4.3, 0]}>
        <cylinderGeometry args={[1.22, 1.05, 0.1, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.5} />
      </mesh>
      {/* Delicate Catwalk Railing Ring */}
      <mesh position={[0, 4.42, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.16, 32, 1, true]} />
        <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.6} wireframe />
      </mesh>

      {/* 8. Modern 360° Panoramic Control Cab Glass (Angled Outward) */}
      <mesh position={[0, 4.75, 0]}>
        <cylinderGeometry args={[1.18, 0.96, 0.78, 32]} />
        <meshStandardMaterial
          color="#0b132b"
          roughness={0.05}
          metalness={0.92}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* 9. Architectural Window Mullions (8 Structural Pillars) */}
      {Array.from({ length: 8 }).map((_, idx) => {
        const angle = (idx / 8) * Math.PI * 2;
        const rTop = 1.18;
        const rBot = 0.96;
        const xTop = Math.cos(angle) * rTop;
        const zTop = Math.sin(angle) * rTop;
        const xBot = Math.cos(angle) * rBot;
        const zBot = Math.sin(angle) * rBot;
        const xMid = (xTop + xBot) / 2;
        const zMid = (zTop + zBot) / 2;
        return (
          <mesh key={idx} position={[xMid, 4.75, zMid]}>
            <boxGeometry args={[0.045, 0.79, 0.045]} />
            <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.5} />
          </mesh>
        );
      })}

      {/* 10. Internal Glowing Console / Radar Core */}
      <mesh position={[0, 4.65, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.35, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
      </mesh>

      {/* 11. Overhanging Architectural Sunshade Roof Canopy */}
      <mesh position={[0, 5.2, 0]}>
        <cylinderGeometry args={[1.34, 1.18, 0.16, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.08} />
      </mesh>
      {/* Flo Red Canopy Trim Accent */}
      <mesh position={[0, 5.14, 0]}>
        <cylinderGeometry args={[1.28, 1.28, 0.04, 32]} />
        <meshStandardMaterial color="#e11d48" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* 12. Upper Communications & Equipment Deck */}
      <mesh position={[0, 5.38, 0]}>
        <cylinderGeometry args={[0.88, 1.05, 0.22, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.4} />
      </mesh>

      {/* 13. Radar Radome (Weather Doppler Sphere) */}
      <mesh position={[0, 5.62, 0]}>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.05} />
      </mesh>

      {/* 14. Primary Communications Mast */}
      <mesh position={[0, 6.05, 0]}>
        <cylinderGeometry args={[0.02, 0.035, 0.75, 12]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.15} metalness={0.8} />
      </mesh>

      {/* 15. Pulsing Red Aviation Warning Beacon at Highest Peak */}
      <mesh ref={beaconRef} position={[0, 6.46, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.95} />
      </mesh>
      {/* Soft Beacon Flare Halo */}
      <mesh ref={haloRef} position={[0, 6.46, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#f43f5e" transparent opacity={0.2} />
      </mesh>

      {/* 16. Soft Ground Contact Shadow */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 1.8, 32]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.14} />
      </mesh>
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
    return fractions.map((f) => {
      const pos = curve.getPointAt(f);
      const tan = curve.getTangentAt(f).normalize();
      // Vector pointing to the RIGHT side of the plane's flight path
      const rightDir = new THREE.Vector3(-tan.z, 0, tan.x).normalize();

      // Scaled architectural ATC Tower brought close to the plane (1.95 units)
      // for a dramatic, cinematic flyby without collision
      const towerPos = pos.clone()
        .add(rightDir.clone().multiplyScalar(1.95))
        .add(new THREE.Vector3(0, -1.2, 0));

      // Milestone Card positioned directly ABOVE the tower with clean vertical clearance
      // Tower height at scale 0.38 is ~2.45 units.
      // Elevated 4.6 units places the card hovering cleanly above the antenna beacon
      // with a lateral offset in rightDir so the card never overlaps the plane
      const cardPos = towerPos.clone()
        .add(new THREE.Vector3(0, 4.6, 0))
        .add(rightDir.clone().multiplyScalar(0.72));

      return {
        towerPosition: towerPos,
        tangent: tan,
        cardPosition: cardPos,
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
        shadowRef.current.position.set(point.x, point.y - 0.95, point.z);
        const bankScale = Math.max(0.65, Math.cos(bankAngle));
        shadowRef.current.scale.set(0.95 * bankScale, 1.25, 1);
        shadowRef.current.rotation.z = -Math.atan2(tangent.x, -tangent.z);
      }
    }

    // Dynamic 3/4 Isometric camera framed to capture plane and tower together
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const distBehind = 8.6;
    const distAbove = 5.4;
    const distSide = 2.8;

    const cameraOffset = new THREE.Vector3()
      .copy(tangent).multiplyScalar(-distBehind)
      .add(new THREE.Vector3(0, distAbove, 0))
      .add(normal.clone().multiplyScalar(distSide));

    const targetCamPos = point.clone().add(cameraOffset);
    camera.position.lerp(targetCamPos, 0.07);

    // Frame the plane and tower together comfortably in view
    const targetLookAt = point.clone()
      .add(tangent.clone().multiplyScalar(1.5))
      .add(normal.clone().multiplyScalar(0.75))
      .add(new THREE.Vector3(0, 0.5, 0));

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
      <directionalLight position={[-10, 8, -10]} intensity={0.6} color="#ffffff" />

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
            {/* Air Traffic Control Tower Safely on the Right Side */}
            <AirTrafficControlTower
              position={m.towerPosition}
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

      {/* Refined Origami Paper Airplane */}
      <PaperAirplane meshRef={planeRef} bankRef={bankRef} />
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

  return (
    <section className="workflow-section" id="workflow" ref={sectionRef}>
      {/* 2D UI Overlay */}
      <div className="workflow-ui">
        {/* Simple & Clean Header (Inter font, no Panchang) */}
        <div className="workflow-header">
          <h2 className="workflow-title">The Journey</h2>
          <p className="workflow-desc">
            How Flo Studios brings cinematic motion and 3D from concept to global launch.
          </p>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="workflow-canvas-container">
        <Canvas camera={{ position: [7.2, 9.6, 7.5], fov: 46 }}>
          <color attach="background" args={['#ffffff']} />
          <fog attach="fog" args={['#ffffff', 20, 80]} />
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
