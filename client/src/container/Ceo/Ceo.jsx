import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Ceo.css';

const Ceo = () => (
  <div className='app__bg app__wrapper section__padding'>
    <div className='app__wrapper_img app__wrapper_img-reverse'>
      <img src={images.findus} alt='chef_image' />
    </div>
    <div className='app__wrapper_info'>
      <SubHeading title="CEO's word" />
      <h1 className='headtext__cormorant'>What we believe in</h1>

      <div className='app__chef-content'>
        <div className='app__chef-content_quote'>
          <img src={images.quote} alt='quote_image' />
          <p className='p__opensans'>
            At the heart of our winery lies a relentless dedication to quality
          </p>
        </div>
        <p className='p__opensans'>
          and a steadfast commitment to honoring the unique character of our
          land. Each bottle tells a story of our pursuit of winemaking
          excellence.
        </p>
      </div>

      <div className='app__chef-sign'>
        <p>Taps Shinya</p>
        <p className='p__opensans'>CEO & Founder</p>
      </div>
    </div>
  </div>
);

export default Ceo;
