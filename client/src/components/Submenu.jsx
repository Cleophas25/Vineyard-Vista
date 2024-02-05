import React, { useEffect, useRef } from 'react'
import { useAppContext } from '../context/appContext'

const Submenu = () => {
   const { isSubmenuOpen, submenuLocation, page } = useAppContext();
   const container = useRef(null)

   useEffect(() => {
     const submenu = container.current;
     const { center, bottom } = submenuLocation;
     submenu.style.left = `${center}px`;
     submenu.style.top = `${bottom}px`;
   }, [page, location]);
  return (
    <div
      ref={container}
      className={`${isSubmenuOpen ? "submenu block" : "submenu hidden"}`}
    >
      Sub Menu
    </div>
  );
}

export default Submenu
