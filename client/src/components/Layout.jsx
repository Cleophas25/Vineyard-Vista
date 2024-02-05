import { Outlet } from "react-router-dom";
import { Footer } from '../container';
import Submenu from './Submenu';
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      {/* <Submenu/> */}
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Layout;
