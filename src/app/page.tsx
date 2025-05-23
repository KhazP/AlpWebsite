import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Translations from '@/components/Translations';
import WebDevProjects from '@/components/WebDevProjects';
import SoftwareProjects from '@/components/SoftwareProjects';
import Methodology from '@/components/Methodology';
import ContactForm from '@/components/ContactForm'; // Import ContactForm

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Translations />
      <WebDevProjects />
      <SoftwareProjects />
      <Methodology />
      <ContactForm /> {/* Add ContactForm component here */}
    </>
  );
}
