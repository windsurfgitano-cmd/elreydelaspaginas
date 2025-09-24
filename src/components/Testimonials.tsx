'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'María González',
    company: 'Banana Company',
    position: 'Directora de Marketing',
    content:
      'Increíble trabajo en nuestra tienda online. Las ventas aumentaron un 340% en solo 3 meses. El equipo entendió perfectamente nuestra visión y la ejecutó de manera impecable.',
    avatar: '/banana.png',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    company: 'Titan Soul',
    position: 'CEO',
    content:
      'La página web que nos desarrollaron superó todas nuestras expectativas. El diseño es espectacular y la funcionalidad es perfecta. Nuestros clientes están encantados.',
    avatar: '/titan.png',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana Rodríguez',
    company: 'BMS Asistencia',
    position: 'Gerente General',
    content:
      'Profesionales de primer nivel. Nos ayudaron a digitalizar completamente nuestro negocio. El ROI ha sido excepcional y el soporte post-venta es excelente.',
    avatar: '/bms.png',
    rating: 5,
  },
  {
    id: 4,
    name: 'Valentina Torres',
    company: 'Moda Exclusiva',
    position: 'Directora Creativa',
    content:
      'El equipo capturó perfectamente la esencia de nuestra marca. La página web refleja exactamente lo que somos y nuestras ventas online se han triplicado.',
    avatar: '/moda.png',
    rating: 5,
  },
  {
    id: 5,
    name: 'Roberto Silva',
    company: 'Uñas & Belleza',
    position: 'Propietario',
    content:
      'La transformación de nuestro negocio ha sido increíble. Pasamos de tener cero presencia online a ser líderes en nuestro sector. Altamente recomendados.',
    avatar: '/unas.png',
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!isAutoPlaying) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
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

  const testimonialVariants = {
    enter: {
      x: 300,
      opacity: 0,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      x: -300,
      opacity: 0,
    },
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`size-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
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
            Lo Que Dicen Nuestros{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Clientes
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-3xl text-xl text-gray-600"
          >
            Más de 500 empresas han transformado su presencia digital con
            nosotros. Descubre por qué confían en El Rey de las Páginas.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative mx-auto max-w-4xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Testimonial Card */}
          <div className="relative h-96 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl"
              >
                <div className="flex h-full flex-col items-center justify-center text-center">
                  {/* Avatar */}
                  <div className="mb-6 size-20 overflow-hidden rounded-full ring-4 ring-purple-100">
                    <img
                      src={
                        testimonials[currentIndex]?.avatar ||
                        '/assets/images/default-avatar.png'
                      }
                      alt={testimonials[currentIndex]?.name || 'Cliente'}
                      className="size-full object-cover"
                    />
                  </div>

                  {/* Rating */}
                  <div className="mb-4 flex items-center">
                    {renderStars(testimonials[currentIndex]?.rating || 5)}
                  </div>

                  {/* Content */}
                  <blockquote className="mb-6 max-w-2xl text-lg italic leading-relaxed text-gray-700">
                    &ldquo;
                    {testimonials[currentIndex]?.content ||
                      'Excelente servicio'}
                    &rdquo;
                  </blockquote>

                  {/* Author Info */}
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {testimonials[currentIndex]?.name || 'Cliente Satisfecho'}
                    </h4>
                    <p className="font-medium text-purple-600">
                      {testimonials[currentIndex]?.position || 'Empresario'}
                    </p>
                    <p className="text-gray-500">
                      {testimonials[currentIndex]?.company || 'Empresa'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-all duration-300 hover:text-purple-600 hover:shadow-xl"
          >
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-all duration-300 hover:text-purple-600 hover:shadow-xl"
          >
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`size-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-purple-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 gap-8 text-center md:grid-cols-4"
        >
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-2 text-3xl font-bold text-purple-600">500+</div>
            <div className="text-gray-600">Clientes Satisfechos</div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-2 text-3xl font-bold text-purple-600">98%</div>
            <div className="text-gray-600">Tasa de Satisfacción</div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-2 text-3xl font-bold text-purple-600">
              5 años
            </div>
            <div className="text-gray-600">de Experiencia</div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-2 text-3xl font-bold text-purple-600">24/7</div>
            <div className="text-gray-600">Soporte Técnico</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
