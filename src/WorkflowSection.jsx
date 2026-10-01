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
   FIFTH-GEN STEALTH FIGHTER JET (F-22 / F-35 Silhouette)
   Aggressive faceted radar-deflecting fuselage, twin
   angular stealth air intakes, trapezoidal wings with
   tip rails, canted twin V-tails, all-moving tailerons,
   and glowing thrust-vectoring afterburners.
   ═══════════════════════════════════════════════════ */

function FighterJetCraft({ meshRef, bankRef }) {
  // 1. Trapezoidal Stealth Main Wings with Airfoil & Trailing Flaperons
  const wingsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = [
      // Right Wing (Upper & Lower surfaces)
      0.42, 0.05, 0.90,     // 0: Root leading top
      2.45, 0.02, -0.95,    // 1: Tip leading top
      2.40, 0.02, -1.35,    // 2: Tip trailing top
      0.48, 0.05, -1.65,    // 3: Root trailing top
      0.42, -0.05, 0.90,    // 4: Root leading bottom
      2.45, -0.02, -0.95,   // 5: Tip leading bottom
      2.40, -0.02, -1.35,   // 6: Tip trailing bottom
      0.48, -0.05, -1.65,   // 7: Root trailing bottom

      // Left Wing (Upper & Lower surfaces)
      -0.42, 0.05, 0.90,    // 8: Root leading top
      -2.45, 0.02, -0.95,   // 9: Tip leading top
      -2.40, 0.02, -1.35,   // 10: Tip trailing top
      -0.48, 0.05, -1.65,   // 11: Root trailing top
      -0.42, -0.05, 0.90,   // 12: Root leading bottom
      -2.45, -0.02, -0.95,  // 13: Tip leading bottom
      -2.40, -0.02, -1.35,  // 14: Tip trailing bottom
      -0.48, -0.05, -1.65,  // 15: Root trailing bottom
    ];

    const indices = [
      // Right Wing Top
      0, 1, 2,  0, 2, 3,
      // Right Wing Bottom
      4, 6, 5,  4, 7, 6,
      // Right Wing Leading Edge
      0, 5, 1,  0, 4, 5,
      // Right Wing Trailing Edge
      3, 2, 6,  3, 6, 7,
      // Right Wing Tip
      1, 5, 6,  1, 6, 2,

      // Left Wing Top
      8, 10, 9,   8, 11, 10,
      // Left Wing Bottom
      12, 13, 14, 12, 14, 15,
      // Left Wing Leading Edge
      8, 9, 13,   8, 13, 12,
      // Left Wing Trailing Edge
      11, 14, 10, 11, 15, 14,
      // Left Wing Tip
      9, 10, 14,  9, 14, 13,
    ];

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, []);

  // 2. Twin All-Moving Horizontal Stabilizers (Tailerons)
  const taileronsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = [
      // Right Taileron
      0.45, 0.02, -1.60,   // 0: Root leading
      1.35, 0.01, -2.15,   // 1: Tip leading
      1.25, 0.01, -2.45,   // 2: Tip trailing
      0.40, 0.02, -2.40,   // 3: Root trailing

      // Left Taileron
      -0.45, 0.02, -1.60,  // 4: Root leading
      -1.35, 0.01, -2.15,  // 5: Tip leading
      -1.25, 0.01, -2.45,  // 6: Tip trailing
      -0.40, 0.02, -2.40,  // 7: Root trailing
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

  // 3. Twin Canted Vertical Stabilizers (F-22 Style Stealth V-Tails)
  const verticalTailsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = [
      // Right Fin (Canted Outward at ~28 deg)
      0.42, 0.08, -0.80,   // 0: Root leading
      0.68, 0.95, -1.65,   // 1: Tip leading
      0.60, 0.90, -1.95,   // 2: Tip trailing
      0.38, 0.08, -1.85,   // 3: Root trailing

      // Left Fin (Canted Outward at ~28 deg)
      -0.42, 0.08, -0.80,  // 4: Root leading
      -0.68, 0.95, -1.65,  // 5: Tip leading
      -0.60, 0.90, -1.95,  // 6: Tip trailing
      -0.38, 0.08, -1.85,  // 7: Root trailing
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

  // 4. Forebody LERX Chines (Leading Edge Root Extensions)
  const chinesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = [
      0, 0.02, 2.75,       // 0: Needle nose junction
      0.42, 0.04, 0.90,    // 1: Right wing intersection
      0.20, 0.02, 0.90,    // 2
      -0.20, 0.02, 0.90,   // 3
      -0.42, 0.04, 0.90,   // 4: Left wing intersection
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
    <group ref={meshRef} scale={[1.2, 1.2, 1.2]}>
      <group ref={bankRef}>
        {/* ─── High-Gloss Studio Red Primary Airframe ─── */}
        <mesh geometry={wingsGeo}>
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.18}
            metalness={0.16}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh geometry={taileronsGeo}>
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.18}
            metalness={0.16}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh geometry={verticalTailsGeo}>
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.18}
            metalness={0.16}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh geometry={chinesGeo}>
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.18}
            metalness={0.16}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* ─── Stealth Faceted Radome Nose ─── */}
        <mesh position={[0, 0.02, 1.7]} rotation={[Math.PI / 2, 0, 0]} scale={[1.12, 0.62, 1.0]}>
          <cylinderGeometry args={[0.02, 0.38, 2.1, 8]} />
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.18}
            metalness={0.16}
          />
        </mesh>

        {/* Mach 2.5 Titanium Pitot Probe Needle */}
        <mesh position={[0, 0.02, 2.95]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.022, 0.55, 16]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.12}
            metalness={0.92}
          />
        </mesh>

        {/* ─── Main Lifting Fuselage Spine ─── */}
        <mesh position={[0, 0.04, -0.3]} rotation={[Math.PI / 2, 0, 0]} scale={[1.32, 0.58, 1.0]}>
          <cylinderGeometry args={[0.38, 0.46, 2.0, 8]} />
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.18}
            metalness={0.16}
          />
        </mesh>

        {/* ─── Twin Engine Hump Cowling ─── */}
        <mesh position={[0, 0.05, -1.55]} rotation={[Math.PI / 2, 0, 0]} scale={[1.42, 0.48, 1.0]}>
          <cylinderGeometry args={[0.46, 0.38, 0.85, 8]} />
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.18}
            metalness={0.16}
          />
        </mesh>

        {/* ─── Twin Stealth Air Intakes (Left & Right) ─── */}
        {/* Right Careened Intake */}
        <group position={[0.48, -0.04, 0.15]} rotation={[0, 0, -0.12]}>
          <mesh scale={[0.22, 0.22, 1.1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#b91c1c" roughness={0.25} metalness={0.18} />
          </mesh>
          <mesh position={[0, 0, 0.56]} scale={[0.18, 0.18, 0.02]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
        </group>

        {/* Left Careened Intake */}
        <group position={[-0.48, -0.04, 0.15]} rotation={[0, 0, 0.12]}>
          <mesh scale={[0.22, 0.22, 1.1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#b91c1c" roughness={0.25} metalness={0.18} />
          </mesh>
          <mesh position={[0, 0, 0.56]} scale={[0.18, 0.18, 0.02]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
        </group>

        {/* ─── Smoked Obsidian Fighter Jet Bubble Canopy ─── */}
        <mesh position={[0, 0.22, 0.52]} scale={[0.21, 0.20, 1.25]}>
          <sphereGeometry args={[1, 32, 16]} />
          <meshStandardMaterial
            color="#08080c"
            roughness={0.03}
            metalness={0.96}
          />
        </mesh>

        {/* Titanium Windshield Frame Bow Arch */}
        <mesh position={[0, 0.22, 0.8]} rotation={[0.2, 0, 0]} scale={[0.23, 0.22, 0.06]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.85} />
        </mesh>

        {/* Cockpit HUD (Heads-Up Display Glass) */}
        <mesh position={[0, 0.20, 1.05]} rotation={[-0.35, 0, 0]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>

        {/* ─── Wingtip Missile Launch Rails (AIM-9X Style) ─── */}
        {/* Right Wingtip Rail */}
        <group position={[2.42, 0.02, -1.15]}>
          <mesh scale={[0.04, 0.06, 0.7]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>

        {/* Left Wingtip Rail */}
        <group position={[-2.42, 0.02, -1.15]}>
          <mesh scale={[0.04, 0.06, 0.7]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>

        {/* ─── Twin Thrust-Vectoring Serrated Afterburners ─── */}
        {/* Right Exhaust */}
        <group position={[0.26, 0.03, -1.98]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.16, 0.36, 12, 1, true]} />
            <meshStandardMaterial
              color="#1e293b"
              roughness={0.25}
              metalness={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0, 0.05]} rotation={[0, Math.PI, 0]}>
            <circleGeometry args={[0.115, 24]} />
            <meshBasicMaterial color="#ff2a18" />
          </mesh>
        </group>

        {/* Left Exhaust */}
        <group position={[-0.26, 0.03, -1.98]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.16, 0.36, 12, 1, true]} />
            <meshStandardMaterial
              color="#1e293b"
              roughness={0.25}
              metalness={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0, 0.05]} rotation={[0, Math.PI, 0]}>
            <circleGeometry args={[0.115, 24]} />
            <meshBasicMaterial color="#ff2a18" />
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

      {/* Authentic Fifth-Gen Stealth Fighter Jet */}
      <FighterJetCraft meshRef={planeRef} bankRef={bankRef} />
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
