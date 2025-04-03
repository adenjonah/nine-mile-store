import Header from './components/Header';
import HomeSection from './components/HomeSection';
import OnSaleSection from './components/OnSaleSection';
import ServicesSection from './components/ServicesSection';
import FeedbackForm from './components/FeedbackForm';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HomeSection />
        <OnSaleSection />
        <ServicesSection />
        <FeedbackForm />
      </main>
      <Footer />
    </div>
  );
}
