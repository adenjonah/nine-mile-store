import React from 'react';

const ServicesSection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold mb-4">SERVICES</h2>
      <h3 className="text-2xl mb-2">Landscaping and Delivery</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Gravel</li>
        <li>Soil</li>
        <li>Trees</li>
        <li>Bark</li>
        <li>Rock</li>
        <li>Retaining walls, decorative landscape designs and more</li>
      </ul>
      <h3 className="text-2xl mb-2">Feed Delivery Service</h3>
      <p className="mb-4">Need help! We got you! Just get on our delivery schedule by dropping by the store. (no appointments over the phone)</p>
      <h3 className="text-2xl mb-2">Nursery Services</h3>
      <p className="mb-4">Need help planting your new tree or bushes? We can help! Call for a quote today.</p>
      <h3 className="text-2xl mb-2">Small Home Improvement</h3>
      <p>If we can't help you fix it, stop in and get a name of a trusted local contractor.</p>
    </section>
  );
};

export default ServicesSection; 