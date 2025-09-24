import { Toaster } from 'react-hot-toast';

import ContactForm from '../components/ContactForm';
import CustomizationPlugin from '../components/CustomizationPlugin';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Sponsors } from './Sponsors';
import { VerticalFeatures } from './VerticalFeatures';

const Base = () => (
  <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    <Sponsors />
    <VerticalFeatures />
    <Services />
    <Portfolio />
    <Testimonials />
    <ContactForm />
    <Banner />
    <Footer />
    <CustomizationPlugin />
    <Toaster position="top-right" />
  </div>
);

export { Base };
