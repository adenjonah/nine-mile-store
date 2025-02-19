import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import salesData from '../content/sales.json';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 1,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

const OnSaleSection = () => {
  return (
    <section className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-4">ON SALE</h1>
      <h2 className="text-2xl mb-4">THIS WEEK'S SPECIALS</h2>
      <div className="w-full h-64 bg-gray-200 mb-4 flex items-center justify-center">
        <span className="text-gray-500">Banner Image Placeholder</span>
      </div>
      <Carousel
        arrows={false}
        swipeable={true}
        draggable={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="px-4 py-4"
      >
        {salesData.map((item, index) => (
          <div key={index} className="w-full h-64 bg-gray-200 flex items-center justify-center relative">
            <img src={item.ImagePath} alt={item.Name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-xl font-bold">{item.Name}</h3>
              <p>{item.Description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default OnSaleSection;