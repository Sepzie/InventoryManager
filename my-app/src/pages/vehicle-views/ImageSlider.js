import React, { useState } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import './ImageSlider.css';
import NoImageAvaliable from "../../assets/no-image-avaliable.png";

// Slider responsible for the images of the vehicle on the details page

const ImageSlider = ({ slides }) => {

  const [current, setCurrent] = useState(0);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return (
      <section>
        <img src={NoImageAvaliable} className='image'></img>
      </section>

    )
  }



  const length = slides.length;


  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };


  return (
    <section className='slider'>
      <MdOutlineArrowBackIosNew className='left-arrow' onClick={prevSlide} />
      <MdOutlineArrowForwardIos className='right-arrow' onClick={nextSlide} />
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.downloadURL} alt='travel image' className='image' />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;