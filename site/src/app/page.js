import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import ServicesSection from './components/ServicesSection';
import OnSaleSection from './components/OnSaleSection';
import AboutSection from './components/AboutSection';
import FeedbackForm from './components/FeedbackForm';
import FooterSection from './components/FooterSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeSection />
      <ServicesSection />
      <OnSaleSection />
      <AboutSection />
      <FeedbackForm />
      <FooterSection />
    </>
  );
}
