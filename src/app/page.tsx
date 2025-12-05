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
  "Shopify 2.0 desde $1.300.000",
  "WooCommerce desde $1.500.000",
  "Apps PWA desde $990.000",
  "Contenido UGC premium",
  "Branding desde $490.000",
  "Marketing Digital desde $300.000"
];

const guarantees = [
  {
    icon: "🎯",
    title: "Resultados garantizados",
    copy: "Si no ves métricas medibles en 60 días, ajustamos sin costo o devolvemos tu inversión.",
  },
  {
    icon: "🔄",
    title: "Revisiones ilimitadas",
    copy: "Pulimos hasta que quede perfecto. Proceso colaborativo en Notion + Figma.",
  },
  {
    icon: "⚡",
    title: "Soporte prioritario",
    copy: "Canal directo por Slack/WhatsApp. Respuesta máxima en 4h laborales.",
  },
  {
    icon: "🔒",
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
    price: "$1.300.000 + IVA",
    desc:
      "E-commerce profesional con Shopify 2.0: theme custom, checkout optimizado, integraciones de pago y logística.",
  },
  {
    title: "WooCommerce Pro",
    price: "$1.500.000 + IVA",
    desc:
      "Tienda WordPress con WooCommerce: personalización total, SEO, pasarelas de pago y automatizaciones.",
  },
  {
    title: "Apps PWA",
    price: "Desde $990.000 + IVA",
    desc:
      "Aplicaciones web progresivas: experiencia nativa, notificaciones push, modo offline y velocidad brutal.",
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
      "Videos GSAP style que reventaron TikTok/IG: agenda llena +50K views/mes.",
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

// Epic 3D Hero with Interactive Particles
function HeroAurora() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Massive particle system
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      // Gold to white gradient
      const t = Math.random();
      colors[i * 3] = 0.83 + t * 0.17;     // R
      colors[i * 3 + 1] = 0.69 + t * 0.31; // G
      colors[i * 3 + 2] = 0.22 + t * 0.78; // B
      
      sizes[i] = Math.random() * 3 + 0.5;
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ));
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        uniform vec2 uMouse;
        void main() {
          vColor = color;
          vec3 pos = position;
          float dist = distance(pos.xy, uMouse * 30.0);
          pos.z += sin(uTime + position.x * 0.1) * 2.0;
          pos.xy += normalize(pos.xy - uMouse * 30.0) * max(0.0, 10.0 - dist) * 0.5;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (50.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.3, 0.5, d);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Central glowing orb
    const orbGeometry = new THREE.IcosahedronGeometry(5, 4);
    const orbMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    scene.add(orb);

    // Outer ring
    const ringGeometry = new THREE.TorusGeometry(15, 0.1, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    // Second ring
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(20, 0.05, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 })
    );
    ring2.rotation.x = Math.PI / 3;
    scene.add(ring2);

    let time = 0;
    let animationFrame: number;

    const animate = () => {
      time += 0.01;
      material.uniforms.uTime.value = time;
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      particles.rotation.y = time * 0.05;
      particles.rotation.x = Math.sin(time * 0.1) * 0.1;

      orb.rotation.x = time * 0.3;
      orb.rotation.y = time * 0.2;
      orb.scale.setScalar(1 + Math.sin(time * 2) * 0.1);

      ring.rotation.z = time * 0.2;
      ring2.rotation.z = -time * 0.15;
      ring2.rotation.y = time * 0.1;

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      orbGeometry.dispose();
      orbMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      aria-hidden
    />
  );
}

function MotionShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
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
      new THREE.TorusKnotGeometry(1.5, 0.45, 220, 20),
      new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.65,
        roughness: 0.25,
        emissive: 0x080808,
        emissiveIntensity: 0.6,
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

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const point = new THREE.PointLight(0xffde8a, 1.2);
    point.position.set(5, 6, 4);
    scene.add(ambient, point);

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

// Tilt Card Component
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
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
              href="https://wa.me/56981330217?text=QUIERO%20DOMINAR%20MI%20MERCADO"
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
                href="https://wa.me/56981330217?text=QUIERO%20DOMINAR%20MI%20MERCADO"
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
                Experiencias digitales que convierten 24/7. Three.js + GSAP + estrategia = 
                <span className="font-semibold text-white"> resultados medibles.</span>
              </p>
            </div>
          </div>

          <div className="hero-cta flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="https://wa.me/56981330217?text=QUIERO%20DOMINAR%20MI%20MERCADO"
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
              Escenas GSAP + Three.js listas para cautivar
            </h2>
            <p className="text-sm text-white/75">
              Prototipamos efectos 3D en cuestión de horas: hero con partículas, fondos interactivos, productos holográficos.
              Todo optimizado para mobile con `prefers-reduced-motion` y lazy hydration.
            </p>
            <ul className="space-y-3 text-sm text-white/80">
              <li>• Hero con partículas físicas sincronizadas a GSAP timelines.</li>
              <li>• Portafolios volumétricos (Three.js + regl + webgl2) con hover states.</li>
              <li>• Visualizadores de producto en XR/AR listas para Shopify, Woo o headless.</li>
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
              FAQ brutalmente honesto
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
                href="https://wa.me/56981734039?text=PROYECTO%20ALTO%20VALOR"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] px-6 py-3 text-sm font-semibold text-black shadow-[0_20px_45px_rgba(255,107,53,0.35)]"
              >
                Proyecto técnico urgente
              </Link>
              <Link
                href="https://wa.me/56981330217?text=QUIERO%20MI%20PROMO"
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
              <article key={item.title} className="card-fade glass-card flex gap-4 p-6">
                <span className="text-3xl" aria-hidden>
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{item.copy}</p>
                </div>
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
          <h2 className="text-3xl font-semibold text-white">💎 Garantía premium</h2>
          <p className="text-sm text-white/80">
            Si después de 30 días no estás 100% satisfecho, devolvemos el 100% de tu inversión sin preguntas. Zero bullshit.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold text-gold">
            <span>✓ Sin letra chica</span>
            <span>✓ Reembolso inmediato</span>
            <span>✓ Proceso documentado</span>
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
                +56 9 8173 4039 · soporte@elreydelaspaginas.com
              </p>
              <p className="mt-2 text-xs text-white/60">
                Respuesta en menos de 2h hábiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-4 pb-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-white">EL REY DE LAS PÁGINAS</p>
            <p>Desde 2005 — Underground & Premium</p>
          </div>
          <p>Contacto: hola@elreydelaspaginas.com</p>
        </div>
      </footer>
    </main>
    </>
  );
}

