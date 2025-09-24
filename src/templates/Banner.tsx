import Link from 'next/link';

import { Button } from '../button/Button';
import { CTABanner } from '../cta/CTABanner';
import { Section } from '../layout/Section';

const Banner = () => (
  <Section>
    <CTABanner
      title="¿Listo para dominar el mundo digital?"
      subtitle="Obtén una cotización gratuita y descubre cómo podemos transformar tu presencia online."
      button={
        <Link href="#contacto">
          <Button>Solicitar Cotización Gratis</Button>
        </Link>
      }
    />
  </Section>
);

export { Banner };
