import React from 'react';

import { images } from '../../constants';

const SubHeading = ({ title }) => (
  <div style={{ marginBottom: "1rem" }}>
    <p className='p__cormorant'>{title}</p>
    <div className='mt-1 h-1 w-14 bg-[#DCCA87]'></div>
  </div>
);

export default SubHeading;
