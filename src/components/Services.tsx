import React from 'react';

interface Service {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  features: string[];
  isPopular?: boolean;
  category: 'editing' | 'web' | 'premium';
  ctaText: string;
  whatsappLink: string;
}

const services: Service[] = [
  // Servicios de Edición
  {
    id: 'edit-1-photo',
    title: 'Edición 1 Foto',
    price: '$4.990',
    features: [
      'Retoque profesional',
      'Corrección de color',
      'Entrega en 24hrs',
      'Formato alta resolución',
    ],
    category: 'editing',
    ctaText: 'Solicitar',
    whatsappLink:
      'https://wa.me/56981330217?text=QUIERO%20EDICIÓN%201%20FOTO%20-%20$4,990',
  },
  {
    id: 'edit-5-photos',
    title: 'Edición 5 Fotos',
    price: '$19.990',
    originalPrice: '$24.950',
    savings: '¡Ahorro $4.960!',
    features: [
      '5 fotos editadas',
      'Estilo unificado',
      'Entrega en 48hrs',
      'Revisiones incluidas',
      'Múltiples formatos',
    ],
    category: 'editing',
    ctaText: 'Solicitar',
    whatsappLink:
      'https://wa.me/56981330217?text=QUIERO%20EDICIÓN%205%20FOTOS%20-%20$19,990',
  },
  {
    id: 'complete-pack',
    title: 'Pack Completo',
    price: '$79.990',
    savings: '¡Súper ahorro!',
    features: [
      '10 fotos editadas',
      '2 videos cortos',
      'Estilo unificado',
      'Entrega en 5 días',
      'Revisiones ilimitadas',
    ],
    category: 'editing',
    ctaText: 'Solicitar',
    whatsappLink:
      'https://wa.me/56981330217?text=QUIERO%20PACK%20COMPLETO%20-%20$79,990',
  },
  // Servicios Web
  {
    id: 'info-page',
    title: 'Página Informativa',
    price: 'Desde $99.990',
    features: [
      'Diseño profesional',
      'Responsive (móvil)',
      'Formulario contacto',
      'SEO básico',
      'Hosting 1 año',
    ],
    category: 'web',
    ctaText: 'Consultar',
    whatsappLink:
      'https://wa.me/56981330217?text=QUIERO%20PÁGINA%20INFORMATIVA%20-%20$99,990',
  },
  {
    id: 'shopify-store',
    title: 'Tienda Shopify',
    price: 'Desde $299.990',
    features: [
      'Tienda completa',
      'Productos ilimitados',
      'Pagos integrados',
      'Inventario automático',
      'Capacitación incluida',
    ],
    category: 'web',
    isPopular: true,
    ctaText: 'Quiero Shopify Express',
    whatsappLink:
      'https://wa.me/56981330217?text=QUIERO%20TIENDA%20SHOPIFY%20-%20$299,990',
  },
  {
    id: 'woocommerce',
    title: 'WooCommerce Pro',
    price: 'Desde $349.990',
    features: [
      'E-commerce personalizado',
      'CRM integrado',
      'Marketing automatizado',
      'Reportes avanzados',
      'Soporte 24/7',
    ],
    category: 'web',
    ctaText: 'Quiero WooCommerce',
    whatsappLink:
      'https://wa.me/56981330217?text=QUIERO%20WOOCOMMERCE%20PRO%20-%20$349,990',
  },
];

const Services: React.FC = () => {
  const editingServices = services.filter(
    (service) => service.category === 'editing',
  );
  const webServices = services.filter((service) => service.category === 'web');

  const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div
      className={`relative rounded-2xl bg-white p-8 shadow-xl ${service.isPopular ? 'scale-105 ring-2 ring-blue-500' : ''}`}
    >
      {service.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-bold text-white">
            ⭐ MÁS ELEGIDO
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          {service.title}
        </h3>

        <div className="mb-6">
          <div className="mb-2 text-3xl font-bold text-blue-600">
            {service.price}
          </div>
          {service.originalPrice && (
            <div className="text-sm text-gray-500">
              <span className="line-through">{service.originalPrice}</span>
              {service.savings && (
                <span className="ml-2 font-semibold text-red-500">
                  {service.savings}
                </span>
              )}
            </div>
          )}
          {service.savings && !service.originalPrice && (
            <div className="text-sm font-semibold text-red-500">
              {service.savings}
            </div>
          )}
        </div>

        <ul className="mb-8 space-y-3 text-left">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="mr-3 size-5 shrink-0 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={service.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block w-full rounded-lg px-6 py-3 text-center font-semibold transition-all duration-300 ${
            service.isPopular
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105 hover:from-blue-600 hover:to-purple-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {service.ctaText}
        </a>
      </div>
    </div>
  );

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            💰 Nuestros Servicios
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Precios transparentes y accesibles para hacer crecer tu negocio
          </p>
        </div>

        {/* Servicios de Edición */}
        <div className="mb-20">
          <h3 className="mb-12 text-center text-3xl font-bold text-blue-600">
            📸 Servicios de Edición
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {editingServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Servicios Web */}
        <div>
          <h3 className="mb-12 text-center text-3xl font-bold text-blue-600">
            🌐 Desarrollo Web
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {webServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Garantía */}
        <div className="mt-20 text-center">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 p-8">
            <h3 className="mb-4 text-2xl font-bold text-white">
              💎 Nuestra Garantía Premium
            </h3>
            <p className="mb-6 text-lg text-white">
              Si después de 30 días no estás completamente satisfecho con
              nuestro trabajo,
              <strong> te devolvemos el 100% de tu inversión</strong> sin
              preguntas ni complicaciones.
            </p>
            <div className="flex justify-center space-x-8 text-white">
              <div className="flex items-center">
                <svg
                  className="mr-2 size-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Sin letra pequeña
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-2 size-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Proceso simple
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-2 size-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Reembolso inmediato
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
