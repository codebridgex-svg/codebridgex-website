"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

type Props = {
  className?: string;
};

export default function Hero3D({ className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const quality: "low" | "high" =
      typeof window !== "undefined" && window.innerWidth < 640 ? "low" : "high";

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(new THREE.Color("#05060a"), 10, 34);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
    camera.position.set(0.25, 0.9, 10.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: quality === "high",
      alpha: true,
      powerPreference: "high-performance",
    });
    const dprCap = quality === "low" ? 1.25 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    // Lights
    scene.add(new THREE.AmbientLight(new THREE.Color("#aab2ff"), 0.38));

    const key = new THREE.DirectionalLight(new THREE.Color("#79e7ff"), 1.05);
    key.position.set(6, 7, 4);
    scene.add(key);

    const rim = new THREE.DirectionalLight(new THREE.Color("#b34dff"), 0.85);
    rim.position.set(-7, 2.5, -2);
    scene.add(rim);

    // Ground grid (keep subtle)
    const grid = new THREE.GridHelper(
      44,
      quality === "low" ? 40 : 70,
      0x4f7cff,
      0x182244
    );
    grid.position.y = -2.35;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.18;
    scene.add(grid);

    // --- TECH MODULE HERO (replaces the old bridge model) ---
    const group = new THREE.Group();
    group.position.y = 0.05;
    scene.add(group);

    // "Circuit board" platform
    const boardGeo = new THREE.BoxGeometry(5.6, 0.2, 3.0);
    const boardMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#070a12"),
      roughness: 0.38,
      metalness: 0.85,
      clearcoat: 1,
      clearcoatRoughness: 0.25,
      emissive: new THREE.Color("#071225"),
      emissiveIntensity: 1.1,
      transparent: true,
      opacity: 0.98,
    });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.set(0, -0.9, 0.2);
    board.rotation.set(-0.18, 0.35, 0.0);
    group.add(board);

    // Board edges glow
    const boardEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(boardGeo, 8),
      new THREE.LineBasicMaterial({
        color: 0x39d5ff,
        transparent: true,
        opacity: 0.4,
      })
    );
    boardEdges.position.copy(board.position);
    boardEdges.rotation.copy(board.rotation);
    group.add(boardEdges);

    // Neon circuit traces (dashed)
    const traceMatA = new THREE.LineDashedMaterial({
      color: 0x39d5ff,
      transparent: true,
      opacity: 0.55,
      dashSize: 0.22,
      gapSize: 0.18,
      linewidth: 1,
    });
    const traceMatB = new THREE.LineDashedMaterial({
      color: 0x8b5dff,
      transparent: true,
      opacity: 0.45,
      dashSize: 0.18,
      gapSize: 0.2,
      linewidth: 1,
    });

    const traces: Array<THREE.Line> = [];
    const traceCount = quality === "low" ? 6 : 10;
    for (let i = 0; i < traceCount; i++) {
      const z = -1.2 + (i / Math.max(traceCount - 1, 1)) * 2.4;
      const y = -0.78 + (Math.random() - 0.5) * 0.12;

      const pts = [
        new THREE.Vector3(-2.5, y, z),
        new THREE.Vector3(-1.2 + Math.random() * 0.6, y + 0.15, z * 0.7),
        new THREE.Vector3(0.5 + Math.random() * 0.6, y - 0.1, z * 0.4),
        new THREE.Vector3(2.4, y, z),
      ];

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, i % 2 ? traceMatA : traceMatB);
      line.computeLineDistances();
      line.position.copy(board.position);
      line.rotation.copy(board.rotation);
      group.add(line);
      traces.push(line);
    }

    // Core "hologram" orb
    const coreGeo = new THREE.IcosahedronGeometry(1.1, quality === "low" ? 1 : 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0a1020"),
      roughness: 0.18,
      metalness: 0.75,
      transmission: 0.18,
      thickness: 0.6,
      emissive: new THREE.Color("#79e7ff"),
      emissiveIntensity: 1.05,
      transparent: true,
      opacity: 0.96,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(0, 0.55, 0.1);
    group.add(core);

    // Wireframe shell around core
    const shellGeo = new THREE.IcosahedronGeometry(
      1.65,
      quality === "low" ? 1 : 2
    );
    const shell = new THREE.LineSegments(
      new THREE.EdgesGeometry(shellGeo, 18),
      new THREE.LineBasicMaterial({
        color: 0x8b5dff,
        transparent: true,
        opacity: 0.28,
      })
    );
    shell.position.copy(core.position);
    group.add(shell);

    // Orbit rings
    const ringGeo = new THREE.TorusGeometry(2.2, 0.03, 10, quality === "low" ? 120 : 200);
    const ringMatA = new THREE.MeshBasicMaterial({
      color: 0x79e7ff,
      transparent: true,
      opacity: 0.28,
    });
    const ringMatB = new THREE.MeshBasicMaterial({
      color: 0x8b5dff,
      transparent: true,
      opacity: 0.22,
    });

    const ringA = new THREE.Mesh(ringGeo, ringMatA);
    ringA.position.copy(core.position);
    ringA.rotation.set(Math.PI / 2.6, 0.25, 0.05);
    group.add(ringA);

    const ringB = new THREE.Mesh(ringGeo, ringMatB);
    ringB.position.copy(core.position);
    ringB.rotation.set(Math.PI / 1.9, -0.2, 0.35);
    group.add(ringB);

    // Floating hex tiles (tech panels)
    const hexGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.12, 6, 1);
    const hexMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#070a12"),
      roughness: 0.35,
      metalness: 0.9,
      emissive: new THREE.Color("#10233d"),
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0.95,
      clearcoat: 1,
      clearcoatRoughness: 0.25,
    });

    const hexCount = quality === "low" ? 8 : 14;
    const hexes: Array<{ mesh: THREE.Mesh; seed: number }> = [];
    for (let i = 0; i < hexCount; i++) {
      const mesh = new THREE.Mesh(hexGeo, hexMat);
      mesh.position.set(
        (Math.random() - 0.5) * 6.4,
        0.15 + (Math.random() - 0.5) * 2.3,
        (Math.random() - 0.5) * 2.4
      );
      mesh.rotation.set(
        Math.random() * 0.6,
        Math.random() * Math.PI,
        Math.random() * 0.4
      );
      group.add(mesh);
      hexes.push({ mesh, seed: 70 + i * 13 });
    }

    // Particles (depth)
    const particlesCount = quality === "low" ? 520 : 900;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 18;
      positions[i3 + 1] = (Math.random() - 0.2) * 9;
      positions[i3 + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: quality === "low" ? 0.026 : 0.03,
      color: 0x79e7ff,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    particles.position.y = -0.2;
    scene.add(particles);

    // Mouse/parallax
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const ny = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
      target.x = nx;
      target.y = ny;
    };
    if (!prefersReducedMotion) {
      container.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    // Intro animation
    if (!prefersReducedMotion) {
      group.scale.set(0.92, 0.92, 0.92);
      group.rotation.y = -0.32;

      gsap.fromTo(
        group.position,
        { y: 0.38 },
        { y: 0.05, duration: 1.25, ease: "power3.out" }
      );
      gsap.to(group.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.35,
        ease: "power3.out",
      });
      gsap.to(camera.position, {
        z: 9.4,
        duration: 1.35,
        ease: "power3.out",
      });
    }

    // Pause rendering when offscreen / tab hidden
    let raf = 0;
    let running = false;
    let isVisible = true;
    let isTabVisible = true;

    const clock = new THREE.Clock();

    const tick = () => {
      if (!running) return;
      raf = window.requestAnimationFrame(tick);

      const t = clock.getElapsedTime();

      pointer.x += (target.x - pointer.x) * 0.06;
      pointer.y += (target.y - pointer.y) * 0.06;

      group.rotation.y = -0.2 + pointer.x * 0.22;
      group.rotation.x = 0.06 + -pointer.y * 0.16;

      // Core + shell motion
      core.rotation.y += 0.006;
      core.rotation.x += 0.0025;
      shell.rotation.y -= 0.004;

      // Rings
      ringA.rotation.z += 0.007;
      ringB.rotation.z -= 0.006;

      // Trace "data flow"
      for (const tr of traces) {
        const mat = tr.material;
        if (mat instanceof THREE.LineDashedMaterial) {
          mat.dashOffset = -t * 0.55;
        }
      }
      // subtle glow pulse
      (boardEdges.material as THREE.LineBasicMaterial).opacity =
        0.32 + (Math.sin(t * 1.4) * 0.06 + 0.06);

      // Hex float
      for (const h of hexes) {
        const phase = t * 0.85 + h.seed * 0.02;
        h.mesh.position.y += Math.sin(phase) * 0.0018;
        h.mesh.rotation.y += 0.0022;
      }

      // Particles drift
      particles.rotation.y = t * 0.05;
      grid.position.z = (t * 0.22) % 1;

      renderer.render(scene, camera);
    };

    const start = () => {
      if (running) return;
      running = true;
      clock.start();
      tick();
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isVisible = entry.isIntersecting;

        if (!prefersReducedMotion && isVisible && isTabVisible) start();
        else stop();

        if (isVisible) renderer.render(scene, camera);
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const onVis = () => {
      isTabVisible = !document.hidden;
      if (!prefersReducedMotion && isVisible && isTabVisible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVis);

    if (!prefersReducedMotion) start();
    else renderer.render(scene, camera);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();

      if (!prefersReducedMotion) {
        container.removeEventListener("pointermove", onPointerMove);
      }
      ro.disconnect();

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose?.();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose?.();
        }
        if (obj instanceof THREE.Points) {
          obj.geometry?.dispose?.();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose?.();
        }
        if (obj instanceof THREE.LineSegments || obj instanceof THREE.Line) {
          obj.geometry?.dispose?.();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose?.();
        }
      });

      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={[
        "relative w-full overflow-hidden rounded-3xl",
        "border border-white/10 bg-white/[0.03]",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_80px_rgba(0,0,0,0.55)]",
        "backdrop-blur-xl",
        className ?? "",
      ].join(" ")}
      aria-label="3D futuristic tech visualization"
    />
  );
}
