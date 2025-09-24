'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  results: {
    metric: string;
    value: string;
  }[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'BANANA COMPANY',
    category: 'E-commerce',
    description:
      'Implementamos un sistema de e-commerce completo con integración de inventario y CRM. En 3 meses aumentaron ventas 340% y automatizaron todo el proceso de venta.',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    technologies: ['E-commerce', 'CRM', 'Inventario', 'Automatización'],
    results: [
      { metric: 'Aumento en ventas', value: '+340%' },
      { metric: 'Tráfico web', value: '+180%' },
      { metric: 'Automatización', value: '100%' },
    ],
    link: 'http://www.banana-company.com',
  },
  {
    id: 2,
    title: 'TITAN SOUL',
    category: 'E-commerce',
    description:
      'Partieron de cero con una idea. Creamos toda la identidad visual, e-commerce y estrategia de redes. Ahora venden 500 productos al mes y tienen lista de espera.',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    technologies: [
      'Identidad Visual',
      'E-commerce',
      'Redes Sociales',
      'Branding',
    ],
    results: [
      { metric: 'Ventas mensuales', value: '500+' },
      { metric: 'Seguidores', value: '+2.5K' },
      { metric: 'Tráfico móvil', value: '+85%' },
    ],
    link: 'http://www-titansoul.cl',
  },
  {
    id: 3,
    title: 'BMS ASISTENCIA',
    category: 'Landing Page',
    description:
      'Optimizamos su landing page y campañas de Google Ads. El formulario de contacto ahora convierte 85% más y triplicaron las consultas calificadas en solo 2 meses.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    technologies: ['Landing Page', 'Google Ads', 'Optimización', 'SEO'],
    results: [
      { metric: 'Consultas', value: '+300%' },
      { metric: 'Conversión', value: '+85%' },
      { metric: 'Costo por lead', value: '-60%' },
    ],
    link: 'http://bmsasistencia.cl',
  },
  {
    id: 4,
    title: 'Beauty Nails Studio',
    category: 'Social Media',
    description:
      'Los videos que creamos se volvieron virales en TikTok e Instagram. Pasó de 200 seguidores a 15K en 4 meses. Ahora tiene agenda llena por 3 meses y lista de espera.',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
    technologies: ['Video Marketing', 'TikTok', 'Instagram', 'Contenido Viral'],
    results: [
      { metric: 'Reservas', value: '+400%' },
      { metric: 'Views mensuales', value: '+50K' },
      { metric: 'Seguidores', value: '+15K' },
    ],
    link: '#',
  },
  {
    id: 5,
    title: 'Fashion Forward',
    category: 'Mobile App',
    description:
      'La app móvil revolucionó cómo sus clientes compran. Las notificaciones push y el sistema de fidelización aumentaron la retención 250% y las ventas recurrentes.',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    technologies: ['App Móvil', 'Push Notifications', 'Fidelización', 'UX/UI'],
    results: [
      { metric: 'Descargas', value: '+10K' },
      { metric: 'Retención', value: '+250%' },
      { metric: 'Ventas recurrentes', value: '+180%' },
    ],
    link: '#',
  },
  {
    id: 6,
    title: 'FinTech Dashboard',
    category: 'FinTech',
    description:
      'Dashboard financiero con análisis de inversiones, gráficos interactivos y alertas personalizadas.',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    technologies: ['Angular', 'Chart.js', 'Node.js', 'Redis'],
    results: [
      { metric: 'Transacciones', value: '$2M+' },
      { metric: 'Usuarios activos', value: '15K+' },
      { metric: 'Uptime', value: '99.9%' },
    ],
    link: '#',
  },
];

const categories = [
  'Todos',
  'E-commerce',
  'SaaS',
  'Corporativo',
  'Mobile App',
  'Inmobiliaria',
  'FinTech',
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredProjects =
    selectedCategory === 'Todos'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-4 text-4xl font-bold text-gray-900"
          >
            Nuestro{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-12 max-w-3xl text-xl text-gray-600"
          >
            Proyectos que han transformado negocios y generado resultados
            excepcionales. Cada proyecto es una historia de éxito.
          </motion.p>

          {/* Category Filter */}
          <motion.div
            variants={itemVariants}
            className="mb-12 flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              variants={projectVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Overlay Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                    y: hoveredProject === project.id ? 0 : 20,
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <a
                    href={project.link}
                    className="rounded-full bg-white px-6 py-3 font-semibold text-purple-600 transition-colors duration-300 hover:bg-purple-600 hover:text-white"
                  >
                    Ver Proyecto
                  </a>
                </motion.div>

                {/* Category Badge */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-purple-600 px-3 py-1 text-sm font-medium text-white">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">
                  {project.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-gray-600">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                  {project.results.map((result, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-purple-600">
                        {result.value}
                      </div>
                      <div className="text-xs text-gray-500">
                        {result.metric}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
            <h3 className="mb-4 text-2xl font-bold">
              ¿Listo para ser nuestro próximo caso de éxito?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-purple-100">
              Únete a más de 500 empresas que han transformado su presencia
              digital con nosotros.
            </p>
            <button className="rounded-full bg-white px-8 py-4 font-semibold text-purple-600 transition-colors duration-300 hover:bg-gray-100">
              Iniciar Mi Proyecto
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
