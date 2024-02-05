import React from 'react';

import { SubHeading, MenuItem } from '../../components';
import { data, images } from '../../constants';
import "./Wines.css";
import { Link } from 'react-router-dom';

const Wines = () => (
  <div className='app__specialMenu flex__center section__padding' id='wine&gin'>
    <div className='app__specialMenu-title'>
      <SubHeading title='Wine that fits your palatte' />
      <h1 className='headtext__cormorant'>Wine & Gin Bar</h1>
    </div>

    <div className='app__specialMenu-menu'>
      <div className='app__specialMenu-menu_wine  flex__center'>
        <p className='app__specialMenu-menu_heading'>Wine</p>
        <div className='app__specialMenu_menu_items'>
          {data.wines.map((wine, index) => (
            <MenuItem
              key={wine.title + index}
              title={wine.title}
              price={wine.price}
              tags={wine.tags}
            />
          ))}
        </div>
      </div>

      <div className="app__specialMenu-menu_img">
        <img src={images.gin} alt="menu__img" />
      </div>

      <div className='app__specialMenu-menu_cocktails  flex__center'>
        <p className='app__specialMenu-menu_heading'>Gin</p>
        <div className='app__specialMenu_menu_items'>
          {data.cocktails.map((cocktail, index) => (
            <MenuItem
              key={cocktail.title + index}
              title={cocktail.title}
              price={cocktail.price}
              tags={cocktail.tags}
            />
          ))}
        </div>
      </div>
    </div>

    <div style={{ marginTop: 15 }}>
      <Link to='/shop' className='custom__button'>
        View More
      </Link>
    </div>
  </div>
);

export default Wines;
