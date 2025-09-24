import { VerticalFeatureRow } from '../feature/VerticalFeatureRow';
import { Section } from '../layout/Section';

const VerticalFeatures = () => (
  <Section
    title="Nuestros Servicios Profesionales"
    description="Ofrecemos soluciones completas de diseño web que impulsan tu negocio hacia el éxito digital."
  >
    <VerticalFeatureRow
      title="Diseño Web Responsivo"
      description="Creamos páginas web que se adaptan perfectamente a cualquier dispositivo. Tu sitio se verá increíble en móviles, tablets y computadoras, garantizando la mejor experiencia para todos tus visitantes."
      image="/assets/images/feature.svg"
      imageAlt="Diseño web responsivo"
    />
    <VerticalFeatureRow
      title="Optimización SEO Avanzada"
      description="Posicionamos tu sitio web en los primeros resultados de Google. Utilizamos las mejores técnicas de SEO para que tus clientes potenciales te encuentren fácilmente cuando busquen tus servicios."
      image="/assets/images/feature2.svg"
      imageAlt="Optimización SEO"
      reverse
    />
    <VerticalFeatureRow
      title="Conversión y Resultados"
      description="Diseñamos cada elemento pensando en convertir visitantes en clientes. Desde llamadas a la acción estratégicas hasta formularios optimizados, todo está diseñado para maximizar tus ventas."
      image="/assets/images/feature3.svg"
      imageAlt="Conversión y resultados"
    />
  </Section>
);

export { VerticalFeatures };
