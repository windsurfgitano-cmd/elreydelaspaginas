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
  "20% OFF páginas web premium",
  "Videos 10% OFF",
  "Contenido social 15% OFF",
  "Packs completos 25% OFF",
  "Automatizaciones + IA",
  "Experiencias mobile-first"
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
    title: "Pack Web + Funnel",
    price: "Desde $49.990",
    desc:
      "Sitios SSR ultra rápidos, SEO técnico, analytics y funnels conectados a CRM.",
  },
  {
    title: "Pack Social Reactor",
    price: "Desde $29.990",
    desc:
      "Calendarios, motion vertical, copywriting y automatización de respuestas en WhatsApp.",
  },
  {
    title: "Pack Video / GSAP",
    price: "Desde $39.990",
    desc:
      "Video vertical + animaciones GSAP/Three.js para campañas con retención brutal.",
  },
  {
    title: "Pack Apps & No-Code",
    price: "Desde $89.990",
    desc:
      "Dashboards, portals y apps que automatizan procesos y liberan a tu equipo.",
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

function HeroAurora() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight / 1.5);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / (window.innerHeight / 1.5),
      1,
      1000
    );
    camera.position.z = 200;

    const geometry = new THREE.BufferGeometry();
    const particles = 400;
    const positions = new Float32Array(particles * 3);
    for (let i = 0; i < particles * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 400;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 2,
      transparent: true,
      opacity: 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animationFrame: number;
    const animate = () => {
      points.rotation.y += 0.0008;
      points.rotation.x += 0.0003;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight / 1.5;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 opacity-60"
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

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-pill", { opacity: 0, y: -20, duration: 0.6 });
      gsap.from(".hero-title", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.2,
      });
      gsap.from(".hero-cta", { opacity: 0, y: 10, duration: 0.6, delay: 0.4 });
      gsap.to(".ticker-track", {
        xPercent: -50,
        duration: 40,
        repeat: -1,
        ease: "linear",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".card-fade");
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      className="relative min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.15),_transparent_55%)]"
    >
      <div className="grain-overlay" aria-hidden="true" />

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

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
      >
        <HeroAurora />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="flex flex-col gap-6 text-center sm:text-left">
            <div className="hero-pill inline-flex items-center justify-center gap-2 self-center rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:self-start">
              Mobile First · WCAG 2.2 · Experiencias 2025
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                El Rey de las Páginas
              </p>
              <h1 className="hero-title text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
                Diseño brutal, motion GSAP y tecnología que convierte <span className="text-gold">24/7</span>
              </h1>
              <p className="hero-title text-balance text-base text-white/70 sm:max-w-xl">
                Creamos experiencias digitales móviles, accesibles y obsesionadas con performance. Landing + ecommerce + contenido + automatización, todo conectado en dashboards reales.
              </p>
            </div>
          </div>

          <div className="hero-cta flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="https://wa.me/56981330217?text=QUIERO%20DOMINAR%20MI%20MERCADO"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black shadow-[0_20px_45px_rgba(212,175,55,0.35)] transition hover:-translate-y-0.5 hover:bg-[#f7c948]"
            >
              Hablar por WhatsApp
            </Link>
            <Link
              href="#portfolio"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              Ver casos reales
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-full border border-white/10 bg-white/5">
            <div className="ticker-track flex min-w-full gap-10 whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              {tickerItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
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
      <section className="px-4 py-16" id="problem">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              ¿Te suena familiar?
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Los dolores que vemos cada día en marcas como la tuya
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {pains.map((pain) => (
              <article key={pain.title} className="card-fade glass-card p-6">
                <h3 className="text-lg font-semibold text-white">{pain.title}</h3>
                <p className="mt-2 text-sm text-white/70">{pain.copy}</p>
              </article>
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
              Packs diseñados para destrabar cada etapa del funnel
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
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
  );
}

