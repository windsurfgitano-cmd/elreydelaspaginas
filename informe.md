# Informe de oportunidades y mejoras

## 1. Resumen ejecutivo

El sitio actual (`index.html`) entrega una narrativa potente y emocional, pero depende de un único archivo estático, sin modularización ni automatización, lo que limita la escalabilidad y complica la evolución. La prioridad debe ser transformar esta landing en una experiencia productiva, medible y adaptable a campañas 2025, manteniendo el tono agresivo/premium pero con mayor claridad visual, pruebas sociales verificables y un funnel medible.

## 2. Oportunidades perdidas críticas

| Área | Qué ocurre hoy | Impacto | Acción recomendada |
| --- | --- | --- | --- |
| Arquitectura | Todo el sitio está embebido en `index.html` con estilos inline y assets pesados locales (@index.html#1-1447). | Dificulta el versionamiento, bloquea reutilización y empeora el rendimiento inicial. | Migrar a un framework moderno (Next.js 15 / Astro) con componentes reutilizables, optimización automática de imágenes y deployment continuo. |
| Performance | Se cargan imágenes grandes (`unas.png` 2.8 MB, `moda.png` 3 MB, etc.) sin versiones responsivas. | CLS y LCP altos, penalización SEO/Core Web Vitals. | Implementar `<picture>` + optimización en build (Sharp/Cloudinary) y lazy-loading inteligente. |
| Conversión | Solo existen CTAs a WhatsApp/Formspree; no hay tracking ni A/B testing. | No se miden conversiones ni se optimiza el funnel. | Integrar analítica (GA4 + Meta Pixel + conversión de WhatsApp) y experimentar con variaciones de hero/pricing. |
| Credibilidad | Testimonios y logos están estáticos, sin prueba verificable o enlaces a casos reales. | Usuarios desconfiados abandonan antes del contacto. | Añadir enlaces a estudios de caso reales, video-testimonios y badges verificables (Clutch, Goodfirms, Shopify Experts, etc.). |
| Accesibilidad | Contrastes extremos, animaciones agresivas y ausencia de etiquetas aria en elementos personalizados. | Posibles rechazos regulatorios, peor UX en mobile. | Ajustar contraste, añadir `prefers-reduced-motion`, roles/labels y validación WCAG 2.2 AA. |
| SEO | No hay contenido indexable más allá de la landing; falta blog/recursos, schema, hreflang y microdatos. | Poca autoridad temática y menor ranking orgánico. | Integrar CMS ligero con secciones dinámicas, publicar estudios/artículos y añadir `FAQPage`, `Service`, `Review` schema. |

## 3. Mejoras de diseño y narrativa

1. **Hero más claro**: dividir el titular actual en propuesta de valor + subcopy con beneficio cuantificable y CTA dual («Agendar demo / Ver portafolio») con microcopys distintos.
2. **Navegación flotante**: agregar barra fija con enlaces a secciones clave y botón constante de WhatsApp → mejora la orientación en scroll largo.
3. **Storytelling en bloques**: usar layouts de “problema → solución → prueba” repetibles con numeración, iconografía consistente y espacios respirables (grid 12 columnas + spacing tokens).
4. **Tipografía 2025**: combinar fuentes display (Space Grotesk / Clash Display) con Sans variable optimizada y ajustar tracking para mejorar legibilidad en mobile.
5. **Microinteracciones suaves**: reemplazar animaciones pulsantes intensas por efectos dirigidos por cursor + parallax ligero controlado por `prefers-reduced-motion`.
6. **Paleta neón/glassmorphism controlado**: mantener gold signature pero sumarle acentos «electric teal / magenta» para módulos específicos (pricing, CTA urgente) y así separar jerarquías.

## 4. Contenido y propuestas de valor

- **Claridad de precios**: las etiquetas “Desde $XX.XXX” necesitan contexto (alcance, plazos, entregables). Crear tablas comparativas y un calculador interactivo básico.
- **Casos recientes**: destacar métricas 2023-2025; hoy las cifras parecen genéricas. Producir cápsulas en video vertical integradas (Reels/TikTok embed) para mostrar evidencia.
- **Oferta limitada y social proof dinámico**: integrar contador de cupos reales (usando CMS) + carrusel de reseñas en tiempo real (Google Reviews / Clutch API).
- **Idiomas y segmentación**: habilitar versión EN/PT para captar clientes nearshore que buscan talento creativo en LATAM.

## 5. Tecnología recomendada (stack 2025)

- **Frontend**: Next.js 15 (App Router) con React Server Components, Turbopack y soporte nativo para imágenes/SEO. Alternativa liviana: Astro + partial hydration.
- **Estilos**: Design tokens + Tailwind CSS con preset personalizado o Vanilla Extract; soportar `prefers-color-scheme` y theming editable.
- **CMS / Contenido**: Sanity, Contentful o Strapi para publicar casos, blog y tablas de precios sin tocar código. Permite que marketing actualice campañas.
- **Automations**: Integrar workflows de WhatsApp Business API (Twilio/Meta), CRM (HubSpot/Close) y Zaps para seguimiento de leads.
- **Analítica & Experimentación**: GA4, Plausible para privacidad, y herramientas de testing (VWO/Convert). Añadir Heatmaps (Hotjar/Clarity) para insights rápidos.
- **Infraestructura**: Seguir en Vercel, pero configurar Preview Deployments, dominios personalizados y monitoreo de Core Web Vitals.

## 6. Roadmap sugerido

1. **Sprint 0 (1 semana)**: Auditoría técnica/UX detallada, definición de KPIs y arquitectura de información. Crear backlog priorizado.
2. **Sprint 1 (2 semanas)**: Migración a Next.js, maquetar hero + secciones problema/solución con componentes reutilizables, optimizar assets y añadir navegación sticky.
3. **Sprint 2 (2 semanas)**: Integrar CMS, casos dinámicos, testimonios verificados y formularios con automatización CRM. Implementar tracking y schema.
4. **Sprint 3 (1 semana)**: Ajustes de accesibilidad, internacionalización y pruebas A/B iniciales (CTA / hero copy).
5. **Continuo**: Publicar contenido mensual (guías, estudios), lanzar campañas temáticas y medir resultados para iterar el funnel.

## 7. Próximos pasos inmediatos

1. Definir métricas de conversión objetivo (leads/semana, tasa de cierre) y establecer baseline con data actual.
2. Seleccionar stack definitivo (Next.js + CMS) y crear diseño en Figma con sistema de componentes.
3. Montar pipeline de deploy (Vercel + GitHub) con revisiones por PR y pruebas visuales automáticas.

Con este plan se preserva la identidad «under + premium», pero se moderniza la experiencia hacia estándares 2025: rendimiento sólido, narrativa verificada, personalización y medición continua.
