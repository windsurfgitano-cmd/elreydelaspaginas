'use client';

import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Configurar EmailJS aquí con tus credenciales
      const result = await emailjs.send(
        'YOUR_SERVICE_ID', // Reemplazar con tu Service ID
        'YOUR_TEMPLATE_ID', // Reemplazar con tu Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY', // Reemplazar con tu Public Key
      );

      if (result.status === 200) {
        toast.success(
          '¡Mensaje enviado exitosamente! Te contactaremos pronto.',
        );
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: '',
        });
      }
    } catch (error) {
      // Error sending email
      toast.error(
        'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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

  return (
    <section
      id="contacto"
      className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-20"
    >
      <Toaster position="top-right" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
        >
          {/* Información de contacto */}
          <motion.div variants={itemVariants} className="text-white">
            <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent">
              ¿Listo para Dominar el Mundo Digital?
            </h2>
            <p className="mb-8 text-xl text-gray-300">
              Obtén una cotización gratuita y descubre cómo podemos transformar
              tu presencia online.
            </p>

            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-4"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-purple-600">
                  <svg
                    className="size-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-300">hola@elreydelaspaginas.com</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-4"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-purple-600">
                  <svg
                    className="size-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Teléfono</h3>
                  <p className="text-gray-300">+56 9 8133 0217</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-4"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-purple-600">
                  <svg
                    className="size-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Horario</h3>
                  <p className="text-gray-300">Lun - Vie: 9:00 AM - 6:00 PM</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-lg"
            >
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition-all duration-300 placeholder:text-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Tu nombre completo"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition-all duration-300 placeholder:text-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="tu@email.com"
                  />
                </motion.div>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="company"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition-all duration-300 placeholder:text-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nombre de tu empresa"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition-all duration-300 placeholder:text-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="mb-6">
                <label
                  htmlFor="service"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Servicio de Interés
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" className="text-gray-900">
                    Selecciona un servicio
                  </option>
                  <option value="desarrollo-web" className="text-gray-900">
                    Desarrollo Web
                  </option>
                  <option value="ecommerce" className="text-gray-900">
                    E-commerce
                  </option>
                  <option value="marketing-digital" className="text-gray-900">
                    Marketing Digital
                  </option>
                  <option value="seo" className="text-gray-900">
                    SEO
                  </option>
                  <option value="consultoria" className="text-gray-900">
                    Consultoría
                  </option>
                  <option value="otro" className="text-gray-900">
                    Otro
                  </option>
                </select>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition-all duration-300 placeholder:text-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="-ml-1 mr-3 size-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </div>
                ) : (
                  'Solicitar Cotización Gratis'
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
