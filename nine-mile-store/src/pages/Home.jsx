import React from 'react';
import OnSaleSection from '../components/OnSaleSection';
import ServicesSection from '../components/ServicesSection';
import HomeInfoSection from '../components/HomeInfoSection';
import CharitiesSection from '../components/CharitiesSection';

const Home = () => {
  return (
    <div className="container mx-auto p-4 bg-grey">
      <OnSaleSection />
      <ServicesSection />
      <HomeInfoSection />
      <CharitiesSection />
    </div>
  );
};

export default Home;
