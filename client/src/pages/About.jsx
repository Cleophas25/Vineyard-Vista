import React, { useEffect } from "react";
import { images } from "../constants";
import Hero from '../components/Hero.jsx'

const About = () => {

  useEffect(() => {
  window.scrollTo(0,0)
  }, [])
  return (
    <div className='bg-[#0b0704]'>
      <Hero title='about us' subheading='About' />
      <div className='max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col lg:flex-row justify-centr items-cente gap-2 py-2'>
          <div className='w-full lg:w-1/2 flex flex-col h-full p-2'>
            <h1 className='text-[#DCCA87] text-6xl capitalize mb-4 font-primary'>
              Who we are
            </h1>

            <p className='text-[#AAAAAA] font-normal tracking-wider capitalize mb-4'>
              As a family-owned winery, we are driven by a deep respect for
              tradition and a relentless pursuit of winemaking excellence. For
              generations, we have cultivated a profound connection to our land,
              harnessing the unique terroir of our region to craft wines that
              captivate the senses. Our winemaking team blends time-honored
              techniques with innovative approaches, creating a portfolio that
              showcases the distinctive character and flavors of our vineyards.
              Whether you're a seasoned connoisseur or a curious explorer, we
              invite you to experience the passion and artistry that define our
              winery.
            </p>
            <h2 className='text-[#DCCA87] text-3xl capitalize mb-4 font-primary'>
              How We Started
            </h2>

            <p className='text-[#AAAAAA] font-normal tracking-wider capitalize mb-2'>
              Fueled by a family's generational passion for viticulture, our
              winery was founded with a vision to share the exceptional wines
              cultivated from our cherished land. This dream has blossomed into
              a legacy of winemaking excellence.
            </p>
          </div>
          <div className='w-full lg:w-1/2 flex flex-col'>
            <img
              src={images.wine_stand}
              className='object-cover h-[30rem] w-full rounded-md'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
