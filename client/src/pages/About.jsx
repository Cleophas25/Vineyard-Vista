import React, { useEffect } from "react";
import { images } from "../constants";
import Hero from '../components/Hero.jsx'

const About = () => {

  useEffect(() => {
  window.scrollTo(0,0)
  }, [])
  return (
    <div className='bg-[#0b0704]'>
      <Hero title='about us' subheading='About'/>
      <div className='max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col lg:flex-row justify-centr items-cente gap-2 py-2'>
          <div className='w-full lg:w-1/2 flex flex-col h-full p-2'>
            <h1 className='text-[#DCCA87] text-6xl capitalize mb-4 font-primary'>
              Who we are
            </h1>

            <p className='text-[#AAAAAA] font-normal tracking-wider capitalize mb-4'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
              sed saepe voluptatum cum, quia aliquid nulla veniam amet ea non,
              modi aperiam placeat maiores soluta nihil harum illo minima ipsam
              quod provident? Blanditiis rerum ut ea eligendi ipsam minima
              accusantium repudiandae doloribus porro. Recusandae facilis
              consequuntur corrupti dignissimos exercitationem laudantium
              dolores vitae accusamus, laboriosam at, fuga nam, ipsum cum
              adipisci?
            </p>
            <h2 className='text-[#DCCA87] text-3xl capitalize mb-4 font-primary'>
              How We Started
            </h2>

            <p className='text-[#AAAAAA] font-normal tracking-wider capitalize mb-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
              sed saepe voluptatum cum, quia aliquid nulla veniam amet ea non,
              modi aperiam placeat maiores soluta nihil harum illo minima ipsam
              quod provident?
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
