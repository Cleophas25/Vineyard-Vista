import React from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

import { FooterOverlay, Newsletter } from "../../components";
import { images } from "../../constants";
import "./Footer.css";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='app__footer section__padding' id='login'>
      <FooterOverlay />
      <Newsletter />

      <div className='app__footer-links'>
        <div className='app__footer-links_contact'>
          <h1 className='app__footer-headtext'>Contact Us</h1>
          <p className='p__opensans'>69 Rossal park Greendale, Harare</p>
          <p className='p__opensans'>+263 77 269 1169</p>
          <p className='p__opensans'>+263 71 770 2233</p>
        </div>

        <div className='app__footer-links_logo'>
          <h1 className='text-lg md:text-2xl font-bold text-gray-300 mb-2 font-primary'>
            The Palate Portfolio
          </h1>
          <p className='p__opensans'>
            &quot;The best way to find yourself is to lose yourself in the
            service of others.&quot;
          </p>
          <div className='flex app__footer-links_icons items-center w-full justify-center'>
            <FiFacebook />
            <FiTwitter />
            <FiInstagram />
          </div>
        </div>

        <div className='app__footer-links_work'>
          <h1 className='app__footer-headtext'>Working Hours</h1>
          <p className='p__opensans'>Monday-Friday:</p>
          <p className='p__opensans'>08:00 am - 5:00 pm</p>
          <p className='p__opensans'>Saturday-Sunday:</p>
          <p className='p__opensans'>08:00 am - 12:00 pm</p>
        </div>
      </div>

      <div className='footer__copyright flex flex-col gap-2 justify-center items-center'>
        <p className='p__opensans'>
          {new Date().getFullYear()} @The Palate Portfolio. All Rights reserved.{" "}
        </p>
        <p className='p__opensans flex items-center gap-2 text-center'>
          Developed by Carlton with
          <span>
            <FaHeart className='text-red-500' />
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
