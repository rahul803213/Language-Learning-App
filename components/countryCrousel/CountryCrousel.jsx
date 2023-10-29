import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CountryCarousel = () => {
  const countries = [
    { name: 'USA' },
    { name: 'France' },
    { name: 'Spain' },
    { name: 'Germany' },
  ];

  return (
    <div className="w-4/5 mx-auto">
      <Carousel
        
      >
        {countries.map((country, index) => (
          <div key={index} className="h-20 flex items-center justify-center">
           
            <span className="text-xl">{country.name}</span>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CountryCarousel;
