import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaBriefcase,
  FaHome,
  FaShoppingBag,
  FaSignOutAlt,
  FaTable,
  FaTachometerAlt,
  FaTimes,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const AdminDashboard = () => {
  const { user } = useAppContext()
  const [isMobileNavlinksOpen, setIsMobileNavlinksOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState("dashboard");
  const navigate = useNavigate()

    useEffect(() => {
      if (!user) {
        return navigate("/register");
      }
      if (user.isAdmin === false) {
        navigate("/");
        return;
      }
    }, [user, navigate]);
  return (
    <div className='bg-gray-100 flex'>
      <aside className='relative bg-gray-700 h-screen w-64 hidden sm:block shadow-xl'>
        <div className='p-6'>
          <Link
            to='/adminDashboard'
            className='text-white text-3xl font-semibold uppercase hover:text-gray-300 cursor-pointer'
          >
            Admin
          </Link>
        </div>
        <nav className='text-white text-base font-semibold pt-3'>
          <Link
            to='/adminDashboard/stats'
            className='flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 cursor-pointer'
          >
            <FaTachometerAlt className='mr-3' />
            Dashboard
          </Link>
          <Link
            to='/'
            className='flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 cursor-pointer'
          >
            <FaHome className='mr-3' />
            Home
          </Link>
          <Link
            to='/Admindashboard/products'
            className='flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 cursor-pointer'
          >
            <FaBriefcase className='mr-3 text-white' />
            Products
          </Link>
          <Link
            to='/Admindashboard/posts'
            className='flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 cursor-pointer'
          >
            <FaTable className='mr-3' />
            Posts
          </Link>
          <Link
            to='/Admindashboard/users'
            className='flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 cursor-pointer'
          >
            <FaUserCircle className='mr-3' />
            Users
          </Link>
          <Link
            to='/Admindashboard/orders'
            className={`${
              isActive === "orders" && "opacity-100"
            } flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 cursor-pointer`}
          >
            <FaShoppingBag className='mr-3' />
            Orders
          </Link>
        </nav>
      </aside>

      <div className='relative w-full flex flex-col h-screen overflow-y-hidden '>
        <header className='w-full items-center justify-center bg-white py-2 px-6 hidden sm:flex shadow-md'>
          <Link
            to='/'
            className='text-lg md:text-2xl font-bold self-center text-gray-800 hover:text-gray-600'
          >
            The Palate Portfolio
          </Link>
          <div className='relative flex justify-end ml-auto'>
            <button
              className='realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none'
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src='/images/Wine.jpg'
                className='bg-cover w-full h-full bg-center'
              />
            </button>
            <div
              className={`${
                isOpen ? "absolute" : "hidden"
              } w-32 bg-white rounded-lg shadow-lg py-2 mt-16`}
            >
              <a
                href='#'
                className='block px-4 py-2 account-link hover:bg-gray-100'
              >
                Account
              </a>
              <a
                href='#'
                className='block px-4 py-2 account-link hover:bg-gray-100'
              >
                Sign Out
              </a>
            </div>
          </div>
        </header>

        {/* Mobile Header & Nav  */}
        <header className='w-full bg-black py-5 px-6 sm:hidden'>
          <div className='flex items-center justify-between'>
            <Link
              to='/adminDashboard'
              className='text-white text-3xl font-semibold uppercase hover:text-gray-300'
            >
              Admin
            </Link>
            <button className='text-white text-3xl focus:outline-none cursor-pointer'>
              <FaBars
                className='z-50 text-white'
                onClick={() => setIsMobileNavlinksOpen(!isMobileNavlinksOpen)}
              />
            </button>
          </div>
          <nav
            className={`${
              isMobileNavlinksOpen
                ? "translate-x-0 ease-out"
                : "translate-x-full ease-in"
            } fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-black border-l-2 z-40 mb-2`}
          >
            <FaTimes
              className='text-white text-2xl focus:outline-none cursor-pointer'
              onClick={() => setIsMobileNavlinksOpen(!isMobileNavlinksOpen)}
            />
            <Link
              to='/adminDashboard/statics'
              className='flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item'
              onClick={() => setIsMobileNavlinksOpen(false)}
            >
              <FaTachometerAlt className='mr-3' />
              Dashboard
            </Link>
            <Link
              to='/'
              className='flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item'
              onClick={() => setIsMobileNavlinksOpen(false)}
            >
              <FaHome className='mr-3' />
              Home
            </Link>

            <Link
              to='/Admindashboard/products'
              className='flex items-center py-4 pl-4 nav-item cursor-pointer'
              onClick={() => setIsMobileNavlinksOpen(false)}
            >
              <FaBriefcase className='mr-3' />
              Products
            </Link>

            <Link
              to='/Admindashboard/posts'
              className='flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item'
              onClick={() => setIsMobileNavlinksOpen(false)}
            >
              <FaTable className='mr-3' />
              Posts
            </Link>
            <Link
              to='/Admindashboard/users'
              className='flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item'
              onClick={() => setIsMobileNavlinksOpen(false)}
            >
              <FaUserCircle className='mr-3' />
              Users
            </Link>
            <Link
              to='/Admindashboard/orders'
              className='flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item'
              onClick={() => setIsMobileNavlinksOpen(false)}
            >
              <FaShoppingBag className='mr-3' />
              Orders
            </Link>
          </nav>
        </header>

        <div className='w-full h-screen overflow-x-hidden border-t flex flex-col'>
          <main className='w-full flex-grow p-6'>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
