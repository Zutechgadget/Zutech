"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Slide from '../assets/images/Rectangle_31.png';
import Slidetwo from '../assets/images/Rectangle_32.png';
import Slidethree from '../assets/images/Rectangle_33.png';
import Slidefour from '../assets/images/Rectangle_34.png';
import Slidefive from '../assets/images/Rectangle_35.png';
import Slidesix from '../assets/images/Rectangle_30.png';
import Polygon from '../assets/images/Polygon_4.png';
import PolygonTwo from '../assets/images/Polygon_5.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Coursel = () => {
  const products = [
    { id: 1, image: Slide, price: "$120", name: 'iphone' },
    { id: 2, image: Slidetwo, price: "$250", name: 'ipod' },
    { id: 3, image: Slidethree, price: "$520", name: 'case' },
    { id: 4, image: Slidefour, price: "$720", name: 'iwatch' },
    { id: 5, image: Slidefive, price: "$310", name: 'ipad' },
    { id: 6, image: Slidesix, price: "$1020", name: 'iphone' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProducts = products.slice(currentIndex, currentIndex + 4);

  const goToNext = () => {
    if (currentIndex + 4 < products.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const goToPrev = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  return (
    <div>
      <div className='container text-center d-flex slide-flex px-5 py-5'>
        {currentProducts.map((product) => (
          <div key={product.id} className='w-25 px-5'>
 <Image 
            src={product.image} 
            alt={product.name} 
         
            className="carousel-image"
          />
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      <div className='slide-mars'>
        <Image src={PolygonTwo} alt='polygon' onClick={goToPrev} className='mx-5 my-5' />
        <Image src={Polygon} alt='polygon' onClick={goToNext} className='mx-5 my-5' />
      </div>
    </div>
  );
};

export default Coursel;