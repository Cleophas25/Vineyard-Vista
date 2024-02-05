import React, { useState } from "react";

import SubHeading from "../SubHeading/SubHeading";
import "./Newsletter.css";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email)
    setEmail('')
    toast.success('Thank You For Signing Up')
  }
  return (
    <div className='app__newsletter'>
      <div className='app__newsletter-heading'>
        <SubHeading title='Newsletter' />
        <h1 className='headtext__cormorant'>Subscribe To Our Newsletter</h1>
        <p className='p__opensans'>And never miss latest Updates!</p>
      </div>
      <form className='app__newsletter-input flex__center' onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Enter your email address'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <button type='submit' className='custom__button'>
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
