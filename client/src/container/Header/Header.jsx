import React, { useEffect, useState } from 'react';
import { SubHeading } from '../../components';
import './Header.css';
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const imgs = ["farm.jpg", "farm2.jpg", "redwine.jpg", 'four-wines.jpg'];
const Header = () => {
  const [activeSlide, setActive] = useState(0)

  useEffect(() => {
  if (activeSlide < 0) {
    setActive(imgs.length - 1);
  }
  if (activeSlide > imgs.length - 1) {
    setActive(0);
  }
    let slider = setInterval(() => {
      setActive(activeSlide + 1);
    }, 7000);
    return () => {
      clearInterval(slider);
    };
  }, [activeSlide]);
  return (
    <div className='retavive app__header  app__wrapper_info h-[calc(h-100vh-4.5rem) mt-[4.5rem]] transition backdrop-brightness-50'>
      {imgs.map((img, index) => {
        return (
          <div
            key={index}
            style={{ backgroundImage: `url(/images/${img})` }}
            className={`${
              !(activeSlide === index) ? "opacity-0" : ""
            } absolute top-0 left-0 h-full w-full bg-cover bg-no-repeat bg-center ease-out duration-500`}
          ></div>
        );
      })}
      <div className='flex flex-col md:block items-center justify-center z-10 backdrop-brightness-50 h-full w-full p-16'>
        <SubHeading title='The Palate Portfolio' />
        <h1 className='app__header-h1'>
          Artisan Winery <br />
          Experience
        </h1>
        <p
          className='p__opensans text-center md:text-left'
          style={{ margin: "2rem 0" }}
        >
          Discover the art of winemaking at our state-of-the-art winery, where
          quality, tradition, and innovation come together in every glass.
        </p>
        <a href='/#about' type='button' className='custom__button'>
          Explore more
        </a>
      </div>
    </div>
  );
};

export default Header;
