import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <Link href="#servicios">Servicios</Link>
        </li>
        <li>
          <Link href="#portfolio">Portfolio</Link>
        </li>
        <li>
          <Link href="#contacto">Contacto</Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            {'Páginas web que convierten\n'}
            <span className="text-primary-500">visitantes en clientes</span>
          </>
        }
        description="Diseño profesional, optimización SEO y resultados garantizados. Tu éxito digital comienza aquí."
        button={
          <Link href="#contacto">
            <Button xl>Solicita tu Cotización Gratis</Button>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
