"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
};

export default function BackgroundFX({ className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
    camera.position.set(0, 0.5, 16);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
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

    // Lights (subtle)
    scene.add(new THREE.AmbientLight(new THREE.Color("#ffb3a3"), 0.22));
    const key = new THREE.DirectionalLight(new THREE.Color("#FF6B35"), 0.55);
    key.position.set(6, 8, 6);
    scene.add(key);

    // Futuristic wire grid plane
    const gridGeo = new THREE.PlaneGeometry(70, 70, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x6b3b1b,
      wireframe: true,
      transparent: true,
      opacity: 0.10,
      depthWrite: false,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -3.3;
    grid.position.z = -4;
    scene.add(grid);

    // Background particles (whole page)
    const count = 1600;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 52; // x
      positions[i3 + 1] = (Math.random() - 0.15) * 18; // y
      positions[i3 + 2] = (Math.random() - 0.5) * 36 - 6; // z
      speeds[i] = 0.4 + Math.random() * 0.8;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.028,
      color: 0xFF6B35,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    particles.position.y = -0.2;
    scene.add(particles);

    // Glowing "bridge" arc line (subtle, behind sections)
    const arcCurve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-7.0, -1.2, -2.5),
        new THREE.Vector3(-3.2, 1.3, -4.5),
        new THREE.Vector3(3.2, 1.3, -4.5),
        new THREE.Vector3(7.0, -1.2, -2.5),
      ],
      false,
      "catmullrom",
      0.6
    );
    const arcPoints = arcCurve.getPoints(180);
    const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
    const arcMat = new THREE.LineBasicMaterial({
      color: 0xFF5722,
      transparent: true,
      opacity: 0.35,
    });
    const arcLine = new THREE.Line(arcGeo, arcMat);
    scene.add(arcLine);

    // Floating cubes (very subtle)
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    const cubeGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const cubeMatA = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#120a07"),
      roughness: 0.25,
      metalness: 0.9,
      emissive: new THREE.Color("#FF5722"),
      emissiveIntensity: 0.55,
      transparent: true,
      opacity: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
    });
    const cubeMatB = cubeMatA.clone();
    cubeMatB.emissive = new THREE.Color("#FF6B35");
    cubeMatB.emissiveIntensity = 0.45;

    const cubes: Array<{ mesh: THREE.Mesh; seed: number }> = [];
    const cubeSpots: Array<[number, number, number]> = [
      [-10, 2.2, -8],
      [9.5, 1.0, -9],
      [-6.5, -0.4, -11],
      [6.8, -1.2, -10],
    ];

    cubeSpots.forEach((p, i) => {
      const mesh = new THREE.Mesh(cubeGeo, i % 2 ? cubeMatA : cubeMatB);
      mesh.position.set(p[0], p[1], p[2]);
      mesh.rotation.set(0.2, i * 0.7, 0.1);
      cubeGroup.add(mesh);
      cubes.push({ mesh, seed: 50 + i * 19 });
    });

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const ny = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
      target.x = nx;
      target.y = ny;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;

    const tick = () => {
      raf = window.requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      pointer.x += (target.x - pointer.x) * 0.05;
      pointer.y += (target.y - pointer.y) * 0.05;

      // Camera/parallax (subtle)
      camera.position.x = pointer.x * 0.55;
      camera.position.y = 0.5 + -pointer.y * 0.35;
      camera.lookAt(0, 0.2, -6);

      // Grid drift
      grid.material.opacity = 0.09 + Math.sin(t * 0.6) * 0.01;
      grid.position.z = -4 + ((t * 0.28) % 1.25);

      // Arc pulse
      arcMat.opacity = 0.22 + (Math.sin(t * 1.1) * 0.08 + 0.08);

      // Particle drift (move forward and wrap)
      const attr = particlesGeo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < count; i++) {
        const z = attr.getZ(i) + 0.015 * speeds[i];
        attr.setZ(i, z > 10 ? -30 : z);
      }
      attr.needsUpdate = true;

      // Cube float/rotate
      cubeGroup.rotation.y = t * 0.03;
      for (const c of cubes) {
        const phase = t * 0.7 + c.seed * 0.02;
        c.mesh.position.y += Math.sin(phase) * 0.002;
        c.mesh.rotation.x += 0.0015;
        c.mesh.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };

    tick();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
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
        if (obj instanceof THREE.Line) {
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
      className={["fixed inset-0 -z-10", className ?? ""].join(" ")}
      aria-hidden="true"
    />
  );
}
