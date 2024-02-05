import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { FaChevronDown, FaHome, FaInfoCircle, FaPhoneAlt, FaShoppingBag, FaTimes} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsCart4 } from "react-icons/bs";

const Navbar = () => {
  const { user, cart, openSubmenu, closeSubmenu, logoutUser, clearCart } = useAppContext();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isActive, setIsActive] = useState('home')

  const displaySubmenu = (e) => {
    const text = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;
    openSubmenu(text, { center, bottom });
  };
  const handleSubmenu = (e) => {
    if (!e.target.classList.contains("link-btn")) {
      // closeSubmenu()
    }
  };

  return (
    <nav
      className={`sticky top-0 left-0 transition-all ease-in-out duration-1000 flex justify-between items-center w-full bg-[#0C0C0C] py-4 px-8 z-50 font-primary`}
      onMouseOver={handleSubmenu}
    >
      <ul className='hidden lg:flex items-center justify-between'>
        <li className='link-btn mr-4 curser-pointer text-white font-semibold capitalize text-md hover:border-b border-orange-500 transition'>
          <Link onMouseOver={displaySubmenu} to='/'>
            Home
          </Link>
        </li>
        <li className='mr-4 curser-pointer text-white font-semibold capitalize text-md hover:border-b border-orange-500 transition'>
          <Link to='/about'>About</Link>
        </li>
        <li className='link-btn mr-4 curser-pointer text-white font-semibold capitalize text-base hover:border-b border-orange-500 transition'>
          <Link onMouseOver={displaySubmenu} to='/shop'>
            Shop
          </Link>
        </li>
      </ul>

      <div>
        <Link to='/' className='text-lg md:text-2xl font-bold text-gray-300'>
          Vineyard Vista
        </Link>
      </div>
      <ul className='hidden md:flex items-center justify-between'>
        <li className='mr-4 curser-pointer text-white font-semibold capitalize text-md hover:border-b border-white transition'>
          <Link to='/blog'>Blog</Link>
        </li>
        <li className='relative mr-4 curser-pointer text-white font-semibold capitalize text-md'>
          <Link to='/cart'>
            <BsCart4 className='text-xl text-white cursor-pointer' />
            {cart?.cartItems?.length !== 0 ? (
              <span className='absolute flex items-center justify-center bg-orange-500 h-4 w-4 rounded-full text-sm text-center -bottom-2 -right-3'>
                {cart?.quantity}
              </span>
            ) : null}
          </Link>
        </li>
        {user ? (
          <li className='relative flex items-center gap-1 mr-4 curser-pointer text-white font-semibold capitalize text-md'>
            <button
              id='dropdownDefaultButton'
              data-dropdown-toggle='dropdown'
              className='text-white bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-1'
              type='button'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <p className='capitalize'>{user?.name}</p>
              <FaChevronDown className='ml-2' />
            </button>
            <div
              id='dropdown'
              className={` ${
                isDropdownOpen ? "absolute" : "hidden"
              } absolute py-2 mt-40 z-10 bg-white divide-gray-100 rounded-lg shadow w-full min-w-[7rem] dark:bg-gray-700`}
            >
              <ul
                className='py-2 text-sm text-gray-700 dark:text-gray-200'
                aria-labelledby='dropdownDefaultButton'
              >
                <li>
                  {user?.isAdmin ? (
                    <Link
                      to={`/adminDashboard/stats`}
                      className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      to='/profile'
                      className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      onClick={() => {
                        setIsDropdownOpen(false);
                      }}
                    >
                      My Account
                    </Link>
                  )}
                </li>

                <li>
                  <Link
                    to='/'
                    className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                    onClick={() => {
                      logoutUser();
                      clearCart();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        ) : (
          <li className='mr-4 curser-pointer text-white font-semibold capitalize text-md px-1 py-2 rounded-sm'>
            <Link to='/register'>Log In | Register</Link>
          </li>
        )}
      </ul>
      <div className='lg:hidden'>
        <GiHamburgerMenu
          color='#fff'
          fontSize={27}
          onClick={() => setToggleMenu(true)}
          className='cursor-pointer'
        />
        <div
          className={`${
            toggleMenu ? "translate-x-0 ease-out" : "translate-x-full ease-in"
          } fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-black text-[#DCCA87] border-l border-[#DCCA87] z-50`}
        >
          <FaTimes
            className='text-white text-2xl focus:outline-none cursor-pointer'
            onClick={() => setToggleMenu(false)}
          />

          <Link
            to='/'
            className='pl-4 flex items-center py-4 nav-item cursor-pointer'
            onClick={() => setToggleMenu(false)}
          >
            <FaHome className='mr-3' />
            Home
          </Link>
          <Link
            to='/shop'
            className='pl-4 flex items-center py-4 nav-item cursor-pointer'
            onClick={() => setToggleMenu(false)}
          >
            <FaShoppingBag className='mr-3' />
            Shop
          </Link>
          <Link
            to='/about'
            className='pl-4 flex items-center py-4 nav-item cursor-pointer'
            onClick={() => setToggleMenu(false)}
          >
            <FaInfoCircle className='mr-3' />
            About
          </Link>
          <Link
            to='/'
            className='pl-4 flex items-center py-4 nav-item cursor-pointer'
            onClick={() => setToggleMenu(false)}
          >
            <FaPhoneAlt className='mr-3' />
            Contact
          </Link>

          {user ? (
            <div className='relative flex items-center gap-1 mr-4 curser-pointer text-white font-semibold capitalize text-md md:hidden'>
              <button
                id='dropdownDefaultButton'
                data-dropdown-toggle='dropdown'
                className='text-white bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-1'
                type='button'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <p className='capitalize'>{user?.name}</p>
                <FaChevronDown className='ml-2' />
              </button>
              <div
                id='dropdown'
                className={` ${
                  isDropdownOpen ? "absolute" : "hidden"
                } absolute py-2 pl-4 mt-40 z-10 bg-white divide-gray-100 rounded-lg shadow w-full min-w-[7rem]`}
              >
                <ul
                  className='py-2 text-sm text-gray-700 dark:text-gray-200'
                  aria-labelledby='dropdownDefaultButton'
                >
                  <li>
                    {user?.isAdmin ? (
                      <Link
                        to={`/adminDashboard/stats`}
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        to='/profile'
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setToggleMenu(false)
                        }}
                      >
                        My Account
                      </Link>
                    )}
                  </li>

                  <li>
                    <Link
                      to='/'
                      className='block px-4 py-2 hover:bg-gray-100'
                      onClick={() => {
                        logoutUser();
                        clearCart();
                        setIsDropdownOpen(false);
                        setToggleMenu(false)
                      }}
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className='mr-4 curser-pointer capitalize px-1 py-2 rounded-sm'>
              <Link to='/register' onClick={() => setToggleMenu(false)}>
                Log In | Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
