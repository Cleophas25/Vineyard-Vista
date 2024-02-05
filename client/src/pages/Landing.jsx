import { Link } from "react-router-dom"
import { AboutUs, Ceo, FindUs, Gallery, Header, Intro, Laurels, Wines } from '../container'
import { useEffect } from "react";

const Landing = () => {
   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);
  return (
    <div>
      <Header />
      <AboutUs />
      <Wines />
      <Ceo />
      <Intro />
      <Laurels />
      <Gallery />
      <FindUs />
    </div>
  );
}

export default Landing