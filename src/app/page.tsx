"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Problema", href: "#problem" },
  { label: "Packs", href: "#services" },
  { label: "Casos", href: "#portfolio" },
  { label: "Concurso", href: "/concurso-shopify" },
  { label: "Garantías", href: "#guarantees" },
  { label: "Contacto", href: "#contact" },
];

const faqs = [
  {
    question: "¿Cuánto tarda un proyecto completo?",
    answer:
      "Sprint inicial de 2 semanas para la landing/branding + 2 semanas para automatizaciones. Ajustamos según complejidad.",
  },
  {
    question: "¿Trabajan solo en Chile?",
    answer:
      "No. Operamos remoto con marcas en LATAM, USA y Europa. Coordinamos horarios y facturación internacional.",
  },
  {
    question: "¿Puedo traer mi diseño o equipo?",
    answer:
      "Sí. Podemos ser tu squad de implementación o integrarnos a tu equipo actual (agencia, product, etc.).",
  },
  {
    question: "¿Cómo miden resultados?",
    answer:
      "Implementamos GA4, Meta Pixel y dashboards (Looker/Databox) con KPIs acordados antes del kickoff.",
  },
];

const tickerItems = [
  "Shopify 2.0 desde $649.990",
  "WooCommerce desde $749.990",
  "Apps PWA desde $489.990",
  "Contenido UGC · Cotizar",
  "Branding desde $239.990",
  "Marketing Digital desde $149.990"
];

const guarantees = [
  {
    title: "Resultados garantizados",
    copy: "Si no ves métricas medibles en 60 días, ajustamos sin costo o devolvemos tu inversión.",
  },
  {
    title: "Revisiones ilimitadas",
    copy: "Pulimos hasta que quede perfecto. Proceso colaborativo en Notion + Figma.",
  },
  {
    title: "Soporte prioritario",
    copy: "Canal directo por Slack/WhatsApp. Respuesta máxima en 4h laborales.",
  },
  {
    title: "Confidencialidad total",
    copy: "Firmamos NDA y protegemos data sensible, accesos y estrategias.",
  },
];

const certifications = [
  {
    title: "Google Partner",
    copy: "Ads, Analytics, Performance Max y acceso anticipado a betas.",
  },
  {
    title: "Microsoft Partner",
    copy: "Cloud, productividad y copilots para automatizar operaciones.",
  },
  {
    title: "Shopify Partner",
    copy: "Ecommerce, headless storefronts y descuentos preferenciales.",
  },
  {
    title: "MercadoPago Partner",
    copy: "Integraciones de pago con comisiones reducidas y soporte directo.",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Brief express",
    copy: "Nos das contexto vía formulario o audio de WhatsApp.",
  },
  {
    number: "2",
    title: "Workshop 24h",
    copy: "Definimos KPIs, arquitectura y tareas por sprint.",
  },
  {
    number: "3",
    title: "Sprint + dashboards",
    copy: "Implementamos y medimos en GA4/Looker con reportes diarios.",
  },
];

const pains = [
  {
    title: "Tu competencia vende 24/7",
    copy:
      "Mientras dependes del boca a boca, otros capturan leads con funnels automatizados.",
  },
  {
    title: "Contenido invisible",
    copy:
      "Tus posts no generan engagement porque no siguen las reglas de los algoritmos 2025.",
  },
  {
    title: "Ads sin retorno",
    copy:
      "Inviertes en campañas sin dashboard ni optimización. Dinero quemado a diario.",
  },
  {
    title: "Sin tiempo para nada",
    copy:
      "La operación te come y no puedes producir contenido, landing o secuencias de venta.",
  },
];

const packs = [
  {
    title: "Shopify 2.0",
    price: "Desde $649.990 + IVA",
    desc:
      "E-commerce profesional con Shopify 2.0: theme custom, checkout optimizado, integraciones de pago y logística.",
  },
  {
    title: "WooCommerce Pro",
    price: "Desde $749.990 + IVA",
    desc:
      "Tienda WordPress con WooCommerce: personalización total, SEO, pasarelas de pago y automatizaciones.",
  },
  {
    title: "Apps PWA",
    price: "Desde $489.990 + IVA",
    desc:
      "Aplicaciones web progresivas: experiencia nativa, notificaciones push, modo offline y alto rendimiento.",
  },
  {
    title: "Contenido UGC",
    price: "Cotizar",
    desc:
      "Generación de contenido UGC (videos y fotos). Todos los modelos, todas las locaciones. Producción premium.",
  },
  {
    title: "Branding & Marca",
    price: "Desde $490.000 + IVA",
    desc:
      "Diseño de marca completo: logo, identidad visual, manual de marca y aplicaciones gráficas.",
  },
  {
    title: "Marketing Digital & RRSS",
    price: "Desde $300.000 + IVA",
    desc:
      "Gestión de redes sociales, campañas pagadas, contenido estratégico y reportes mensuales.",
  },
];

const portfolio = [
  {
    name: "BANANA COMPANY",
    img: "/banana.png",
    badge: "E-commerce",
    quote:
      "+340% ventas en 3 meses tras e-commerce omnicanal con CRM y fulfillment integrado.",
    metrics: ["+340% ventas", "+180% tráfico", "100% automatizado"],
    href: "https://www.banana-company.com",
  },
  {
    name: "TITAN SOUL",
    img: "/titan.png",
    badge: "Retail",
    quote:
      "Branding + Shopify + campañas UGC: 500 ventas mensuales, app de fidelización.",
    metrics: ["500 ventas/mes", "+2.5K seguidores", "+85% mobile"],
    href: "https://www-titansoul.cl",
  },
  {
    name: "Beauty Nails Studio",
    img: "/unas.png",
    badge: "Social/Video",
    quote:
      "Videos cinematográficos que reventaron TikTok/IG: agenda llena +50K views/mes.",
    metrics: ["+400% reservas", "+50K views", "+15K followers"],
  },
  {
    name: "Fashion Forward",
    img: "/moda.png",
    badge: "Mobile App",
    quote:
      "App de fidelización con notificaciones y AR previews. Retención +250%.",
    metrics: ["+10K descargas", "+250% retención", "+180% ventas"],
  },
];

// Custom Cursor Component
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX - 3}px`;
      dot.style.top = `${mouseY - 3}px`;
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = `${cursorX - 10}px`;
      cursor.style.top = `${cursorY - 10}px`;
      requestAnimationFrame(animateCursor);
    };

    const handleHover = () => cursor.classList.add("hover");
    const handleLeave = () => cursor.classList.remove("hover");

    document.addEventListener("mousemove", moveCursor);
    animateCursor();

    const interactives = document.querySelectorAll("a, button, .tilt-card");
    interactives.forEach(el => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={dotRef} className="cursor-dot hidden md:block" />
    </>
  );
}

// COSMIC JOURNEY - Camera travels through space on scroll
function HeroAurora() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ============ DEVICE-SPECIFIC CONFIGURATION ============
    const width = window.innerWidth;
    const isTouch = 'ontouchstart' in window;
    
    // Three tiers: mobile (<768), tablet (768-1024), desktop (>1024)
    const deviceType = width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop';
    
    const config = {
      mobile: {
        particles: 1200,
        spreadX: 120,      // Much narrower for portrait screens
        spreadY: 200,      // Taller to fill vertical space
        spreadZ: 400,
        cameraZ: 150,
        cameraFOV: 70,     // Wider FOV to see more
        orbSize: 5,
        horizonSize: 10,
        ringScale: 0.7,
        cometCount: 3,
        cloudCount: 6,
        nebulaCount: 12,
        particleSize: 4,
        antialias: false,
        pixelRatio: 1.5,
      },
      tablet: {
        particles: 2500,
        spreadX: 200,
        spreadY: 250,
        spreadZ: 450,
        cameraZ: 200,
        cameraFOV: 70,
        orbSize: 8,
        horizonSize: 12,
        ringScale: 0.85,
        cometCount: 5,
        cloudCount: 10,
        nebulaCount: 20,
        particleSize: 3,
        antialias: true,
        pixelRatio: 1.5,
      },
      desktop: {
        particles: 4000,
        spreadX: 400,
        spreadY: 400,
        spreadZ: 500,
        cameraZ: 250,
        cameraFOV: 75,
        orbSize: 12,
        horizonSize: 15,
        ringScale: 1,
        cometCount: 6,
        cloudCount: 15,
        nebulaCount: 30,
        particleSize: 2,
        antialias: true,
        pixelRatio: 2,
      }
    };
    
    const cfg = config[deviceType];

    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: cfg.antialias,
      powerPreference: deviceType === 'mobile' ? "low-power" : "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, cfg.pixelRatio));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    
    // Camera starts FAR (macro cosmos view)
    const camera = new THREE.PerspectiveCamera(
      cfg.cameraFOV,
      window.innerWidth / window.innerHeight, 
      0.1, 
      2000
    );
    camera.position.set(0, 15, cfg.cameraZ);
    camera.lookAt(0, 0, 0);

    // ============ COSMIC DUST (far stars) ============
    const dustCount = cfg.particles;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustSizes = new Float32Array(dustCount);

    for (let i = 0; i < dustCount; i++) {
      // Device-specific spread - narrower on mobile to keep stars visible
      dustPositions[i * 3] = (Math.random() - 0.5) * cfg.spreadX;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * cfg.spreadY;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * cfg.spreadZ - 100;
      
      const t = Math.random();
      // Mix of gold, white, and subtle blue stars
      if (t < 0.6) {
        dustColors[i * 3] = 0.9 + Math.random() * 0.1;
        dustColors[i * 3 + 1] = 0.85 + Math.random() * 0.15;
        dustColors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
      } else if (t < 0.85) {
        dustColors[i * 3] = 1; dustColors[i * 3 + 1] = 1; dustColors[i * 3 + 2] = 1;
      } else {
        dustColors[i * 3] = 0.6; dustColors[i * 3 + 1] = 0.7; dustColors[i * 3 + 2] = 1;
      }
      
      dustSizes[i] = Math.random() * cfg.particleSize + 0.5;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));
    dustGeometry.setAttribute("size", new THREE.BufferAttribute(dustSizes, 1));

    const dustMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.x += sin(uTime * 0.5 + position.z * 0.01) * 0.5;
          pos.y += cos(uTime * 0.3 + position.x * 0.01) * 0.5;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (100.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.2, 0.5, d);
          float glow = exp(-d * 3.0) * 0.5;
          gl_FragColor = vec4(vColor, (alpha + glow) * 0.9);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    // ============ NEBULA CLOUDS ============
    const nebulaCount = cfg.nebulaCount;
    const nebulae: THREE.Mesh[] = [];
    for (let i = 0; i < nebulaCount; i++) {
      const size = Math.random() * 25 + 8;
      const nebulaGeo = new THREE.SphereGeometry(size, 8, 8);
      const nebulaMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.1 + Math.random() * 0.1, 0.5, 0.3),
        transparent: true,
        opacity: 0.03 + Math.random() * 0.03,
      });
      const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
      // Keep nebulae within visible range based on device
      nebula.position.set(
        (Math.random() - 0.5) * cfg.spreadX * 0.8,
        (Math.random() - 0.5) * cfg.spreadY * 0.6,
        Math.random() * -300
      );
      nebulae.push(nebula);
      scene.add(nebula);
    }

    // ============ GARGANTUA - Interstellar Style Black Hole ============
    const blackHoleGroup = new THREE.Group();
    const bhSize = cfg.horizonSize;
    
    // 1. THE VOID - Absolute darkness, the event horizon
    const voidGeo = new THREE.SphereGeometry(bhSize, 64, 64);
    const voidMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          // Pure black with subtle edge darkening
          float edge = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
      `,
    });
    const voidMesh = new THREE.Mesh(voidGeo, voidMat);
    blackHoleGroup.add(voidMesh);

    // 2. ACCRETION DISK - Tilted, with Doppler shift (blue approaching, red receding)
    const diskParticleCount = deviceType === 'mobile' ? 2000 : 4000;
    const diskPositions = new Float32Array(diskParticleCount * 3);
    const diskColors = new Float32Array(diskParticleCount * 3);
    const diskSizes = new Float32Array(diskParticleCount);

    for (let i = 0; i < diskParticleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Disk extends from just outside event horizon
      const radius = bhSize * 1.3 + Math.pow(Math.random(), 0.7) * bhSize * 3;
      // Thinner disk, more concentrated
      const thickness = (Math.random() - 0.5) * 0.8 * Math.exp(-radius / (bhSize * 2));
      
      diskPositions[i * 3] = Math.cos(angle) * radius;
      diskPositions[i * 3 + 1] = thickness;
      diskPositions[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Temperature gradient + Doppler effect simulation
      const heat = Math.exp(-(radius - bhSize * 1.3) / (bhSize * 1.5));
      // Left side blueshifted (approaching), right side redshifted (receding)
      const doppler = Math.cos(angle);
      
      if (doppler > 0) {
        // Blueshifted - brighter, whiter
        diskColors[i * 3] = 0.8 + heat * 0.2;
        diskColors[i * 3 + 1] = 0.85 + heat * 0.15;
        diskColors[i * 3 + 2] = 1.0;
      } else {
        // Redshifted - orange/red
        diskColors[i * 3] = 1.0;
        diskColors[i * 3 + 1] = 0.4 + heat * 0.4;
        diskColors[i * 3 + 2] = heat * 0.2;
      }
      
      diskSizes[i] = (0.3 + heat * 2) * (deviceType === 'mobile' ? 1.8 : 1.2);
    }

    const diskGeo = new THREE.BufferGeometry();
    diskGeo.setAttribute("position", new THREE.BufferAttribute(diskPositions, 3));
    diskGeo.setAttribute("color", new THREE.BufferAttribute(diskColors, 3));
    diskGeo.setAttribute("size", new THREE.BufferAttribute(diskSizes, 1));

    const diskMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        void main() {
          vColor = color;
          vec3 pos = position;
          float dist = length(pos.xz);
          // Keplerian rotation: inner orbits faster (v ∝ 1/√r)
          float speed = 0.5 / sqrt(dist * 0.15 + 0.3);
          float angle = atan(pos.z, pos.x) + uTime * speed;
          pos.x = cos(angle) * dist;
          pos.z = sin(angle) * dist;
          // Subtle vertical oscillation
          pos.y += sin(uTime * 3.0 + angle * 2.0) * 0.1;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (80.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = (1.0 - smoothstep(0.0, 0.5, d)) * 0.9;
          // Add glow
          float glow = exp(-d * 4.0) * 0.5;
          gl_FragColor = vec4(vColor * (1.0 + glow), alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const disk = new THREE.Points(diskGeo, diskMat);
    disk.rotation.x = 0.3; // Tilt the disk for that Interstellar look
    blackHoleGroup.add(disk);

    // 4. PHOTON SPHERE GLOW - Eerie halo around the void
    const photonSphereGeo = new THREE.SphereGeometry(bhSize * 1.08, 64, 64);
    const photonSphereMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 4.0);
          // Shimmering effect
          float shimmer = sin(vPosition.y * 10.0 + uTime * 2.0) * 0.5 + 0.5;
          vec3 color = mix(vec3(1.0, 0.8, 0.5), vec3(1.0, 0.6, 0.2), shimmer);
          float alpha = fresnel * 0.4 * (0.8 + shimmer * 0.2);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const photonSphere = new THREE.Mesh(photonSphereGeo, photonSphereMat);
    blackHoleGroup.add(photonSphere);

    blackHoleGroup.position.set(0, 0, -50);
    scene.add(blackHoleGroup);

    // ============ WAYPOINT STARS - Real bloom effect ============
    const waypointStars: THREE.Group[] = [];
    const posScale = deviceType === 'mobile' ? 0.4 : deviceType === 'tablet' ? 0.6 : 1;
    const waypointPositions = [
      { x: -30 * posScale, y: 10, z: 80 },
      { x: 35 * posScale, y: -12, z: 40 },
      { x: -18 * posScale, y: 5, z: 0 },
      { x: 22 * posScale, y: -6, z: -25 },
    ];
    const coreSize = deviceType === 'mobile' ? 0.8 : 1;
    
    waypointPositions.forEach((pos) => {
      const starGroup = new THREE.Group();
      starGroup.position.set(pos.x, pos.y, pos.z);
      
      // Core - bright white center
      const coreGeo = new THREE.SphereGeometry(coreSize, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      starGroup.add(core);
      
      // Bloom layers - multiple spheres with decreasing opacity
      const bloomLayers = [
        { scale: 2, opacity: 0.5, color: 0xfffaf0 },
        { scale: 3.5, opacity: 0.25, color: 0xffd700 },
        { scale: 6, opacity: 0.12, color: 0xd4af37 },
        { scale: 10, opacity: 0.05, color: 0xb8860b },
      ];
      
      bloomLayers.forEach(layer => {
        const bloomGeo = new THREE.SphereGeometry(coreSize * layer.scale, 16, 16);
        const bloomMat = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          depthWrite: false,
        });
        const bloom = new THREE.Mesh(bloomGeo, bloomMat);
        starGroup.add(bloom);
      });
      
      // Light rays (subtle cross flare)
      const rayMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
      });
      
      // Horizontal ray
      const rayH = new THREE.Mesh(
        new THREE.PlaneGeometry(coreSize * 20, coreSize * 0.3),
        rayMat
      );
      starGroup.add(rayH);
      
      // Vertical ray
      const rayV = new THREE.Mesh(
        new THREE.PlaneGeometry(coreSize * 0.3, coreSize * 15),
        rayMat
      );
      starGroup.add(rayV);
      
      waypointStars.push(starGroup);
      scene.add(starGroup);
    });

    // ============ COMETS (shooting stars) ============
    interface Comet {
      mesh: THREE.Mesh;
      trail: THREE.Line;
      velocity: THREE.Vector3;
      life: number;
      maxLife: number;
    }
    const comets: Comet[] = [];
    const cometCount = cfg.cometCount;
    const cometSpeed = deviceType === 'mobile' ? 1.2 : deviceType === 'tablet' ? 1.5 : 2;

    const createComet = () => {
      // Spawn within visible range based on device
      const startX = (Math.random() - 0.5) * cfg.spreadX * 0.8;
      const startY = Math.random() * 80 + 40;
      const startZ = Math.random() * 150 - 50;
      
      // Comet head
      const cometGeo = new THREE.SphereGeometry(0.6, 8, 8);
      const cometMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
      });
      const cometMesh = new THREE.Mesh(cometGeo, cometMat);
      cometMesh.position.set(startX, startY, startZ);
      scene.add(cometMesh);

      // Comet trail
      const trailPoints = [];
      for (let i = 0; i < 20; i++) {
        trailPoints.push(new THREE.Vector3(startX, startY, startZ));
      }
      const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
      const trailMat = new THREE.LineBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.5,
      });
      const trail = new THREE.Line(trailGeo, trailMat);
      scene.add(trail);

      // Direction towards center/black hole
      const direction = new THREE.Vector3(
        -startX * 0.015 + (Math.random() - 0.5) * 0.3,
        -0.4 - Math.random() * 0.2,
        -0.6 - Math.random() * 0.3
      ).normalize();

      comets.push({
        mesh: cometMesh,
        trail: trail,
        velocity: direction.multiplyScalar(cometSpeed),
        life: 0,
        maxLife: 180 + Math.random() * 80,
      });
    };

    // Initialize some comets
    for (let i = 0; i < cometCount; i++) {
      setTimeout(() => createComet(), i * 2500);
    }

    // ============ PARTICLE CLOUDS (drifting gas) ============
    const cloudCount = cfg.cloudCount;
    const clouds: THREE.Points[] = [];
    
    for (let i = 0; i < cloudCount; i++) {
      const cloudParticles = deviceType === 'mobile' ? 30 : 50;
      const cloudPositions = new Float32Array(cloudParticles * 3);
      // Keep clouds within visible range
      const centerX = (Math.random() - 0.5) * cfg.spreadX * 0.7;
      const centerY = (Math.random() - 0.5) * cfg.spreadY * 0.5;
      const centerZ = Math.random() * -250;
      
      for (let j = 0; j < cloudParticles; j++) {
        cloudPositions[j * 3] = centerX + (Math.random() - 0.5) * 18;
        cloudPositions[j * 3 + 1] = centerY + (Math.random() - 0.5) * 18;
        cloudPositions[j * 3 + 2] = centerZ + (Math.random() - 0.5) * 18;
      }

      const cloudGeo = new THREE.BufferGeometry();
      cloudGeo.setAttribute("position", new THREE.BufferAttribute(cloudPositions, 3));
      
      const cloudMat = new THREE.PointsMaterial({
        color: new THREE.Color().setHSL(0.08 + Math.random() * 0.05, 0.6, 0.5),
        size: deviceType === 'mobile' ? 1.8 : 1.2,
        transparent: true,
        opacity: 0.18 + Math.random() * 0.1,
        blending: THREE.AdditiveBlending,
      });
      
      const cloud = new THREE.Points(cloudGeo, cloudMat);
      clouds.push(cloud);
      scene.add(cloud);
    }

    let time = 0;
    let animationFrame: number;
    let currentScroll = 0;
    let lastCometTime = 0;
    const animSpeed = deviceType === 'mobile' ? 0.005 : 0.008;

    const animate = () => {
      time += animSpeed;
      dustMaterial.uniforms.uTime.value = time;

      // Smooth scroll interpolation
      currentScroll += (scrollRef.current - currentScroll) * 0.05;
      
      // ============ CAMERA JOURNEY ============
      const progress = Math.min(currentScroll, 1);
      
      // Camera journey based on device - travels from start to event horizon
      const startZ = cfg.cameraZ;
      const endZ = deviceType === 'mobile' ? -15 : -25;
      camera.position.z = startZ - progress * (startZ - endZ);
      
      // Camera Y: slight arc movement
      camera.position.y = 15 * Math.cos(progress * Math.PI * 0.5);
      
      // Camera X: sway based on device (tighter on mobile)
      const swayAmount = deviceType === 'mobile' ? 5 : deviceType === 'tablet' ? 10 : 15;
      camera.position.x = Math.sin(progress * Math.PI * 2) * swayAmount;
      
      // Look ahead with slight offset based on mouse
      camera.lookAt(
        mouseRef.current.x * 5,
        mouseRef.current.y * 3,
        camera.position.z - 50
      );

      // Rotate dust field slowly
      dust.rotation.y = time * 0.02;
      dust.rotation.x = Math.sin(time * 0.1) * 0.05;

      // ============ BLACK HOLE ANIMATIONS ============
      
      // Update shader uniforms
      diskMat.uniforms.uTime.value = time;
      photonSphereMat.uniforms.uTime.value = time;
      
      // Slow, ominous rotation
      blackHoleGroup.rotation.y = time * 0.015;
      blackHoleGroup.rotation.x = Math.sin(time * 0.2) * 0.02;

      // ============ BLOOM STARS ANIMATION ============
      waypointStars.forEach((starGroup, i) => {
        // Gentle rotation
        starGroup.rotation.y = time * 0.3;
        
        // Pulsing bloom effect
        const pulse = 1 + Math.sin(time * 1.5 + i * 1.2) * 0.15;
        starGroup.scale.setScalar(pulse);
        
        // Light rays always face camera (billboard effect approximation)
        starGroup.children.forEach((child, j) => {
          if (j >= 5) { // The ray planes
            child.lookAt(camera.position);
          }
        });
      });

      // Nebulae drift
      nebulae.forEach((nebula, i) => {
        nebula.position.x += Math.sin(time * 0.2 + i) * 0.02;
        nebula.position.y += Math.cos(time * 0.15 + i) * 0.02;
      });

      // Animate comets
      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i];
        comet.life++;
        
        // Move comet
        comet.mesh.position.add(comet.velocity);
        
        // Update trail
        const positions = comet.trail.geometry.attributes.position.array as Float32Array;
        for (let j = positions.length - 3; j >= 3; j -= 3) {
          positions[j] = positions[j - 3];
          positions[j + 1] = positions[j - 2];
          positions[j + 2] = positions[j - 1];
        }
        positions[0] = comet.mesh.position.x;
        positions[1] = comet.mesh.position.y;
        positions[2] = comet.mesh.position.z;
        comet.trail.geometry.attributes.position.needsUpdate = true;
        
        // Fade out near end of life
        const fadeStart = comet.maxLife * 0.7;
        if (comet.life > fadeStart) {
          const fade = 1 - (comet.life - fadeStart) / (comet.maxLife - fadeStart);
          (comet.mesh.material as THREE.MeshBasicMaterial).opacity = 0.9 * fade;
          (comet.trail.material as THREE.LineBasicMaterial).opacity = 0.4 * fade;
        }
        
        // Remove dead comets and spawn new ones
        if (comet.life > comet.maxLife) {
          scene.remove(comet.mesh);
          scene.remove(comet.trail);
          comet.mesh.geometry.dispose();
          comet.trail.geometry.dispose();
          comets.splice(i, 1);
        }
      }
      
      // Spawn new comets periodically
      const cometInterval = deviceType === 'mobile' ? 10 : 6;
      if (time - lastCometTime > cometInterval) {
        lastCometTime = time;
        if (comets.length < cometCount) {
          createComet();
        }
      }

      // Animate particle clouds (gentle rotation and drift)
      clouds.forEach((cloud, i) => {
        cloud.rotation.y += 0.001;
        cloud.rotation.x += 0.0005;
        cloud.position.x += Math.sin(time * 0.1 + i) * 0.01;
        cloud.position.y += Math.cos(time * 0.08 + i) * 0.01;
      });

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    // ============ SCROLL TRACKING ============
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = window.scrollY / scrollHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        mouseRef.current.x = (e.gamma / 45) * 0.3;
        mouseRef.current.y = ((e.beta - 45) / 45) * 0.3;
      }
    };

    const handleResize = () => {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, cfg.pixelRatio));
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    // Event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    
    if (isTouch) {
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
        document.addEventListener('click', () => {
          (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission()
            .then(response => {
              if (response === 'granted') {
                window.addEventListener("deviceorientation", handleOrientation);
              }
            }).catch(console.error);
        }, { once: true });
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    } else {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Initial scroll position
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("deviceorientation", handleOrientation);
      renderer.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-aurora-canvas pointer-events-none fixed inset-0 z-0 opacity-70 md:opacity-80"
      aria-hidden
    />
  );
}

function MotionShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: isMobile ? "low-power" : "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    const torus = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.5, 0.45, isMobile ? 140 : 220, isMobile ? 12 : 20),
      new THREE.MeshPhysicalMaterial({
        color: 0xffd54f,
        emissive: 0x1c1202,
        emissiveIntensity: 0.35,
        metalness: 1,
        roughness: 0.08,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        sheen: 0.8,
        sheenColor: new THREE.Color(0xfff2c1),
        reflectivity: 1,
        envMapIntensity: 1.4,
      })
    );
    scene.add(torus);

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(2.3, 2.7, 64),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.12,
      })
    );
    halo.rotation.x = Math.PI / 2;
    scene.add(halo);

    const ambient = new THREE.AmbientLight(0xfff1c0, 0.5);
    const keyLight = new THREE.DirectionalLight(0xfff7d6, 1.5);
    keyLight.position.set(6, 8, 5);
    const rimLight = new THREE.PointLight(0xffc94c, 1.4, 20);
    rimLight.position.set(-4, -3, 3);
    const fillLight = new THREE.SpotLight(0xffffff, 0.8, 15, Math.PI / 4, 0.5, 1.2);
    fillLight.position.set(0, 3, 6);
    fillLight.target = torus;
    scene.add(ambient, keyLight, rimLight, fillLight, fillLight.target);

    let raf = 0;
    const renderScene = () => {
      torus.rotation.y += 0.01;
      torus.rotation.x += 0.004;
      halo.rotation.z += 0.002;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(renderScene);
    };
    renderScene();

    const resize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2));
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
      },
    });
    tl.fromTo(
      torus.scale,
      { x: 0.6, y: 0.6, z: 0.6 },
      { x: 1, y: 1, z: 1, duration: 1.2, ease: "power3.out" }
    );
    tl.fromTo(
      halo.material,
      { opacity: 0 },
      { opacity: 0.15, duration: 1, ease: "power2.out" },
      "<-0.6"
    );

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      torus.geometry.dispose();
      (torus.material as THREE.Material).dispose();
      halo.geometry.dispose();
      (halo.material as THREE.Material).dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="relative h-[360px] w-full" aria-hidden />;
}

// Tilt Card Component - Desktop: 3D tilt, Mobile: scale on touch
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const isTouch = 'ontouchstart' in window;

    if (!isTouch) {
      // Desktop: 3D tilt effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 12;
        const rotateY = (centerX - x) / 12;
        
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    } else {
      // Mobile: simple scale effect on touch
      const handleTouchStart = () => {
        gsap.to(card, {
          scale: 0.98,
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const handleTouchEnd = () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      };

      card.addEventListener("touchstart", handleTouchStart, { passive: true });
      card.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        card.removeEventListener("touchstart", handleTouchStart);
        card.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, []);

  return (
    <div ref={cardRef} className={`tilt-card ${className}`} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Epic GSAP animations
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      // Dramatic hero entrance
      const tl = gsap.timeline();
      
      tl.from(".hero-pill", { 
        opacity: 0, 
        y: -50, 
        scale: 0.8,
        duration: 0.8, 
        ease: "back.out(1.7)" 
      })
      .from(".hero-title", {
        opacity: 0,
        y: 100,
        rotationX: -45,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      }, "-=0.4")
      .from(".hero-cta", { 
        opacity: 0, 
        y: 50, 
        scale: 0.9,
        duration: 0.8, 
        ease: "back.out(1.7)" 
      }, "-=0.6")
      .from(".hero-glow-element", {
        opacity: 0,
        scale: 0,
        duration: 1.5,
        ease: "power2.out",
      }, "-=1");

      // Infinite ticker
      gsap.to(".ticker-track", {
        xPercent: -50,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Scroll-triggered animations with parallax
  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      // Parallax sections
      gsap.utils.toArray<HTMLElement>(".parallax-section").forEach((section) => {
        gsap.to(section, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Cards with stagger and 3D effect
      const cards = gsap.utils.toArray<HTMLElement>(".card-fade");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          rotationY: i % 2 === 0 ? -15 : 15,
          scale: 0.9,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });

      // Section titles with split effect
      gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
        gsap.from(title, {
          opacity: 0,
          y: 60,
          skewY: 3,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
          },
        });
      });

      // Floating elements
      gsap.utils.toArray<HTMLElement>(".float-element").forEach((el, i) => {
        gsap.to(el, {
          y: "random(-20, 20)",
          x: "random(-10, 10)",
          rotation: "random(-5, 5)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
    <CustomCursor />
    <HeroAurora />
    <main
      ref={rootRef}
      className="relative z-10 min-h-screen"
    >
      <div className="grain-overlay" aria-hidden="true" />
      
      {/* Floating glow orbs */}
      <div className="hero-glow-element float-element fixed left-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-gold/10 blur-[100px]" aria-hidden="true" />
      <div className="hero-glow-element float-element fixed right-1/4 top-1/2 -z-10 h-64 w-64 rounded-full bg-purple-500/10 blur-[80px]" aria-hidden="true" />
      <div className="hero-glow-element float-element fixed bottom-1/4 left-1/3 -z-10 h-80 w-80 rounded-full bg-cyan-500/5 blur-[90px]" aria-hidden="true" />

      <header className="sticky top-0 z-30 border-b border-white/5 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <Link href="#" className="text-sm font-semibold tracking-[0.3em] text-gold">
            EL REY
          </Link>
          <nav className="hidden gap-6 text-xs uppercase tracking-[0.2em] text-white/70 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
              className="hidden rounded-full bg-gold px-4 py-2 text-xs font-semibold text-black sm:inline-flex"
            >
              WhatsApp
            </Link>
            <button
              type="button"
              className="rounded-full border border-white/30 p-2 text-white md:hidden"
              aria-label="Abrir menú"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-white/10 bg-black/80 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.3em] text-white/80">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
                className="rounded-full bg-gold px-4 py-2 text-center text-xs font-semibold text-black"
                onClick={() => setMenuOpen(false)}
              >
                WhatsApp
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Hero - Epic Entrance */}
      <section
        ref={heroRef}
        className="relative isolate min-h-screen overflow-hidden px-4 py-20 sm:py-28 lg:py-32"
      >
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="flex flex-col gap-8 text-center sm:text-left">
            <div className="hero-pill inline-flex items-center justify-center gap-3 self-center rounded-full border border-gold/30 bg-gold/5 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold shadow-[0_0_30px_rgba(212,175,55,0.2)] sm:self-start">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
              </span>
              Mobile First · WCAG 2.2 · Experiencias 2025
            </div>
            <div className="flex flex-col gap-6">
              <p className="hero-title text-sm font-bold uppercase tracking-[0.4em] text-gold glow-text">
                El Rey de las Páginas
              </p>
              <h1 className="hero-title text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                Diseño <span className="text-shimmer">brutal</span>,<br />
                motion que <span className="text-gold glow-text">hipnotiza</span>
              </h1>
              <p className="hero-title text-balance text-lg text-white/60 sm:max-w-2xl sm:text-xl">
                Experiencias digitales que convierten 24/7. Diseño + animación + estrategia = 
                <span className="font-semibold text-white"> resultados medibles.</span>
              </p>
            </div>
          </div>

          <div className="hero-cta flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
              className="magnetic-btn group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_60px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_80px_rgba(212,175,55,0.6)]"
            >
              <span className="relative z-10">Dominar mi mercado</span>
              <svg className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-gold via-yellow-300 to-gold bg-[length:200%_100%] opacity-0 transition-opacity group-hover:opacity-100" style={{animation: "shimmer 2s linear infinite"}} />
            </Link>
            <Link
              href="#portfolio"
              className="magnetic-btn inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold"
            >
              Ver casos reales
              <span className="text-lg">→</span>
            </Link>
          </div>

          {/* Animated ticker */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
            <div className="ticker-track flex gap-12 whitespace-nowrap px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white/50">
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="hero-cta absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="h-12 w-6 rounded-full border border-white/20 p-1">
              <div className="h-2 w-full animate-bounce rounded-full bg-gold" />
            </div>
          </div>
        </div>
      </section>

      {/* Motion Lab */}
      <section className="px-4 pb-24" id="motion">
        <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Motion Lab
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Animaciones que capturan y convierten
            </h2>
            <p className="text-sm text-white/75">
              Creamos experiencias visuales inmersivas en cuestión de horas: fondos interactivos, efectos 3D, productos holográficos.
              Todo optimizado para cargar rápido en cualquier dispositivo.
            </p>
            <ul className="space-y-3 text-sm text-white/80">
              <li>• Heroes cinematográficos con partículas y efectos de profundidad.</li>
              <li>• Portafolios interactivos que responden al movimiento del usuario.</li>
              <li>• Visualizadores de producto en realidad aumentada para e-commerce.</li>
            </ul>
          </div>
          <div className="card-fade overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-4">
            <MotionShowcase />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-24" id="faq">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Preguntas frecuentes
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Preguntas que siempre nos hacen
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="card-fade rounded-2xl border border-white/10 bg-black/30 px-6 py-4"
              >
                <summary className="flex cursor-pointer items-center justify-between text-left text-base font-semibold text-white">
                  {faq.question}
                  <span aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-sm text-white/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Problemas */}
      <section className="parallax-section px-4 py-20" id="problem">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-gold">
              ¿Te suena familiar?
            </p>
            <h2 className="section-title mt-4 text-4xl font-black text-white sm:text-5xl">
              Los dolores que vemos<br />
              <span className="text-white/50">cada día en marcas como la tuya</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {pains.map((pain) => (
              <TiltCard key={pain.title} className="card-fade glass-card p-8 hover:border-gold/30">
                <h3 className="text-xl font-bold text-white">{pain.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{pain.copy}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Brutal reality */}
      <section className="px-4 py-16" aria-labelledby="brutal-title">
        <div className="mx-auto w-full max-w-6xl space-y-10 rounded-3xl border border-danger/40 bg-danger/10 p-8 text-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-danger/80">
              alerta máxima
            </p>
            <h2 id="brutal-title" className="mt-3 text-3xl font-black text-danger">
              Mientras lees esto… tu competencia crece
            </h2>
            <p className="text-sm text-white/75">
              Cada día sin presencia digital móvil es dinero que no vuelve.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["-73% leads", "+$50K perdidos", "365 días de ventaja"].map((stat) => (
              <div key={stat} className="card-fade rounded-2xl border border-danger/50 bg-black/40 p-6 text-center">
                <p className="text-2xl font-black text-danger">{stat}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/60">
                  datos duros
                </p>
              </div>
            ))}
          </div>
          {/* Urgency CTA */}
          <Link
            href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
            className="mx-auto inline-flex items-center gap-2 rounded-full border-2 border-danger bg-danger/20 px-8 py-4 font-bold text-white transition-all hover:bg-danger hover:text-white"
          >
            Solucionar esto AHORA →
          </Link>
        </div>
      </section>

      {/* Packs */}
      <section className="px-4 py-16" id="services">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Soluciones
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Servicios premium para marcas que quieren dominar
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packs.map((pack) => (
              <article key={pack.title} className="card-fade glass-card flex flex-col gap-4 p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">{pack.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{pack.desc}</p>
                </div>
                <span className="inline-flex w-fit rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  {pack.price}
                </span>
              </article>
            ))}
          </div>
          
          {/* CTA after services */}
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-gold/20 bg-gold/5 p-8 text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-gold">¿No sabes cuál elegir?</p>
            <p className="text-white/70">Te asesoramos gratis en 5 minutos</p>
            <Link
              href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Asesoría gratis por WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* Portafolio */}
      <section className="px-4 py-16" id="portfolio">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Resultados reales
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Marcas que ya dominan su mercado
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {portfolio.map((project) => (
              <article key={project.name} className="card-fade glass-card flex flex-col overflow-hidden">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={project.img}
                    alt={`Proyecto ${project.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                    {project.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                  <p className="text-sm text-white/70">{project.quote}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.metrics.map((metric) => (
                      <span key={metric} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                        {metric}
                      </span>
                    ))}
                  </div>
                  {project.href && (
                    <Link
                      href={project.href}
                      target="_blank"
                      className="mt-auto inline-flex items-center text-sm font-semibold text-gold hover:text-white"
                    >
                      Ver sitio ↗
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Preguntas serias
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              ¿Listo para dominar tu mercado?
            </h2>
            <p className="mt-4 text-sm text-white/70">
              Integramos GA4, Meta Pixel, CRM y WhatsApp Business API. Sin humo: dashboards, KPIs y accountability.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] px-6 py-3 text-sm font-semibold text-black shadow-[0_20px_45px_rgba(255,107,53,0.35)]"
              >
                Proyecto técnico urgente
              </Link>
              <Link
                href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white"
              >
                Quiero mi promo hoy
              </Link>
            </div>
          </div>
          <div className="card-fade glass-card p-6">
            <h3 className="text-lg font-semibold text-white">Proceso rápido</h3>
            <ol className="mt-4 space-y-4 text-sm text-white/75">
              <li>
                <span className="font-semibold text-gold">1.</span> Completa el brief exprés o mándanos un audio.
              </li>
              <li>
                <span className="font-semibold text-gold">2.</span> Workshop remoto en 24h con roadmap y quote.
              </li>
              <li>
                <span className="font-semibold text-gold">3.</span> Sprint de implementación con updates diarios.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Garantías */}
      <section className="px-4 py-16" id="guarantees">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Riesgo cero
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Garantías y soporte real
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {guarantees.map((item) => (
              <article key={item.title} className="card-fade glass-card p-6">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="px-4 py-16" id="certifications">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Respaldo
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Partners oficiales
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((cert) => (
              <article key={cert.title} className="card-fade glass-card p-6">
                <h3 className="text-lg font-semibold text-white">{cert.title}</h3>
                <p className="mt-2 text-sm text-white/70">{cert.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Promesa premium */}
      <section className="px-4 py-16" id="premium">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-3xl border border-gold/40 bg-gradient-to-br from-white/10 to-transparent p-8 text-center">
          <h2 className="text-3xl font-semibold text-white">Garantía de satisfacción</h2>
          <p className="text-sm text-white/80">
            Si después de 30 días no estás 100% satisfecho, devolvemos tu inversión sin preguntas ni condiciones.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-gold">
            <span>Sin letra chica</span>
            <span>·</span>
            <span>Reembolso inmediato</span>
            <span>·</span>
            <span>Proceso documentado</span>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="px-4 py-16" id="process">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Método
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Cómo trabajamos contigo
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {processSteps.map((step) => (
              <article key={step.number} className="card-fade glass-card flex flex-col gap-3 p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-semibold">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-white/70">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="px-4 pb-16" id="contact">
        <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Funnel de contacto
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              ¿Prefieres que te llamemos?
            </h2>
            <p className="mt-4 text-sm text-white/70">
              Llena el formulario y te contactamos en menos de 24h. Integramos esta data directo en HubSpot/Close, sin dependencias manuales.
            </p>
            <form
              className="mt-6 space-y-4"
              action="https://formspree.io/f/xpznqjpn"
              method="POST"
            >
              <label className="flex flex-col gap-2 text-sm">
                <span>Nombre completo *</span>
                <input
                  required
                  name="name"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
                  placeholder="Tu nombre"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span>Email *</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
                  placeholder="tu@email.com"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span>Teléfono *</span>
                <input
                  required
                  name="phone"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
                  placeholder="+56 9 1234 5678"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span>Servicio</span>
                <select
                  name="service"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
                >
                  <option value="web">Página Web Completa</option>
                  <option value="social">Redes Sociales Pro</option>
                  <option value="video">Video Marketing</option>
                  <option value="app">Desarrollo de Apps</option>
                  <option value="analysis">Análisis & Optimización</option>
                  <option value="management">Manejo Completo</option>
                  <option value="specialized">Pack Especializado</option>
                  <option value="other">Otro / No estoy seguro</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span>Cuéntanos sobre tu proyecto</span>
                <textarea
                  name="message"
                  rows={4}
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
                  placeholder="Objetivos, plazos, links…"
                />
              </label>
              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black"
              >
                Quiero que me contacten
              </button>
              <p className="text-center text-xs text-white/60">
                Respuesta en 24h. Protegemos tus datos y firmamos NDA.
              </p>
            </form>
          </div>
          <div className="card-fade glass-card h-fit p-6">
            <h3 className="text-lg font-semibold text-white">Checklist de entrega</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>• Setup de GA4 + Meta Pixel + conversiones WhatsApp</li>
              <li>• Integración CRM (HubSpot / Close / Notion)</li>
              <li>• Dashboards en Looker / Databox</li>
              <li>• Documentación en Notion y Loom</li>
            </ul>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm">
              <p className="font-semibold text-white">Atención Alto Valor</p>
              <p className="mt-2 text-white/70">
                +56981734039 · soporte@elreydelaspaginas.com
              </p>
              <p className="mt-2 text-xs text-white/60">
                Respuesta en menos de 2h hábiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Last chance */}
      <section className="px-4 py-20">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
            </span>
            Cupos limitados este mes
          </div>
          <h2 className="text-4xl font-black text-white sm:text-5xl md:text-6xl">
            ¿Listo para <span className="text-gold">comenzar</span>?
          </h2>
          <p className="max-w-2xl text-lg text-white/60">
            Cada día que pasa es una oportunidad perdida. Tu competencia ya está invirtiendo en experiencias digitales que convierten.
          </p>
          <Link
            href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-10 py-5 text-lg font-black uppercase tracking-wider text-black shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_80px_rgba(212,175,55,0.7)]"
          >
            <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Contáctanos ahora</span>
            <span className="text-2xl">→</span>
          </Link>
          <p className="text-sm text-white/40">
            Respuesta inmediata · Sin compromiso · Asesoría gratuita
          </p>
        </div>
      </section>

      <footer className="px-4 pb-32 md:pb-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-white">EL REY DE LAS PÁGINAS</p>
            <p>Desde 2005 — Underground & Premium</p>
          </div>
          <p>Contacto: hola@elreydelaspaginas.com</p>
        </div>
      </footer>
    </main>

    {/* FLOATING WHATSAPP BUTTON - Always visible */}
    <Link
      href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 font-bold text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_40px_rgba(37,211,102,0.6)] md:bottom-8 md:right-8"
      aria-label="Contactar por WhatsApp"
    >
      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="hidden sm:inline">Hablemos</span>
    </Link>
    </>
  );
}

