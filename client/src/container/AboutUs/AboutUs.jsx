import React from 'react';

import { images } from '../../constants';
import './AboutUs.css';
import { Link } from 'react-router-dom';

const AboutUs = () => (
  <div
    className='app__aboutus app__bg flex__center section__padding scroll-m-16'
    id='about'
  >
    <div className='app__aboutus-overlay flex__center'>
      <img src={images.G} alt='G_overlay' />
    </div>

    <div className='app__aboutus-content flex__center'>
      <div className='app__aboutus-content_about'>
        <h1 className='headtext__cormorant'>About Us</h1>
        <img src={images.spoon} alt='about_spoon' className='spoon__img' />
        <p className='p__opensans'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis pharetra
          adipiscing ultrices vulputate posuere tristique. In sed odio nec
          aliquet eu proin mauris et.
        </p>
        <Link to='/about' type='button' className='custom__button'>
          Know More
        </Link>
      </div>

      <div className='hidden md:block my-8 mx-16 w-0.5 h-80 bg-[#ddb731]'></div>

      <div className='app__aboutus-content_history'>
        <h1 className='headtext__cormorant'>Our History</h1>
        <img src={images.spoon} alt='about_spoon' className='spoon__img' />
        <p className='p__opensans'>
          Adipiscing tempus ullamcorper lobortis odio tellus arcu volutpat.
          Risus placerat morbi volutpat habitasse interdum mi aliquam In sed
          odio nec aliquet.
        </p>
        <Link to='/about' type='button' className='custom__button'>
          Know More
        </Link>
      </div>
    </div>
  </div>
);

export default AboutUs;
