import React from 'react';

const CharitiesSection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold mb-4">Charities We Support</h2>
      <div className="flex flex-col md:flex-row items-center justify-around">
        <div className="text-center mb-4 md:mb-0">
          <a href="https://cccnw.org/" target="_blank" rel="noopener noreferrer">
            <div className="w-32 h-32 bg-gray-200 mx-auto mb-2 flex items-center justify-center">
              <span className="text-gray-500">Charity Logo Placeholder</span>
            </div>
            <p>Childhood Cancer Collation</p>
          </a>
        </div>
        <div className="text-center">
          <a href="https://cccnw.org/" target="_blank" rel="noopener noreferrer">
            <div className="w-32 h-32 bg-gray-200 mx-auto mb-2 flex items-center justify-center">
              <span className="text-gray-500">Charity Logo Placeholder</span>
            </div>
            <p>Dignified Workday</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CharitiesSection; 