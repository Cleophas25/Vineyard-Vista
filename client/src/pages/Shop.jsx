import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Shop = () => {
  const {
    isChanged,
    products,
    cart,
    getAllProducts,
    selectedCategory,
    currentPage,
    totalPages,
    handleSearchChange,
    handleCategoryClick,
    handlePageChange,
    dereaseCartItem,
    increaseCartItem,
    handleNext,
    handlePrev,
    removeCartItem,
  } = useAppContext();
  const [query, setQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, [isChanged]);

   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);

   const scrollToTop = () => {
    window.scrollTo(0, 0);
   }

  return (
    <>
      <div className='h-[calc(100vh - 750px)]'>
        <div className='bg-white relative'>
          <div className='container mx-auto px-6 py-3'>
            <div className='flex items-center justify-between'>
              <div className='hidden w-full text-gray-600 md:flex md:items-center'>
                <svg
                  className='h-5 w-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z'
                    fill='currentColor'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z'
                    fill='currentColor'
                  />
                </svg>
                <span className='mx-1 text-sm'>ZW</span>
              </div>
              <div className='w-full text-gray-700 md:text-center text-2xl font-semibold'>
                Categories
              </div>
              <div className='flex items-center justify-end w-full'>
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className='text-gray-600 focus:outline-none mx-4 sm:mx-0'
                >
                  <svg
                    className='h-5 w-5'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'></path>
                  </svg>
                </button>

                <div className='flex sm:hidden'>
                  <button
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    type='button'
                    className='text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500'
                  >
                    <svg viewBox='0 0 24 24' className='h-6 w-6 fill-current'>
                      <path
                        fillRule='evenodd'
                        d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <nav
              className={`${
                isCategoriesOpen ? "" : "hidden"
              } sm:flex sm:justify-center sm:items-center mt-4`}
            >
              <ul className='flex flex-col sm:flex-row'>
                <li
                  className={`${
                    selectedCategory === "all" ? "underline font-bold" : ""
                  } mt-3 text-gray-600 cursor-pointer sm:mx-3 sm:mt-0 hover:text-gray-700`}
                  onClick={() => handleCategoryClick("all")}
                >
                  All
                </li>
                <li
                  className={`${
                    selectedCategory === "wine" ? "underline font-bold" : ""
                  } mt-3 text-gray-600 cursor-pointer sm:mx-3 sm:mt-0 hover:text-gray-700`}
                  onClick={() => handleCategoryClick("wine")}
                >
                  Wine
                </li>
                <li
                  className={`${
                    selectedCategory === "gin" ? "underline font-bold" : ""
                  } mt-3 text-gray-600 cursor-pointer sm:mx-3 sm:mt-0 hover:text-gray-700`}
                  onClick={() => handleCategoryClick("gin")}
                >
                  Gin
                </li>
                <li
                  className={`${
                    selectedCategory === "brandy" ? "underline font-bold" : ""
                  } mt-3 text-gray-600 cursor-pointer sm:mx-3 sm:mt-0 hover:text-gray-700`}
                  onClick={() => handleCategoryClick("brandy")}
                >
                  Brandy
                </li>
                <li
                  className={`${
                    selectedCategory === "vodka" ? "underline font-bold" : ""
                  } mt-3 text-gray-600 cursor-pointer sm:mx-3 sm:mt-0 hover:text-gray-700`}
                  onClick={() => handleCategoryClick("vodka")}
                >
                  Vodka
                </li>
              </ul>
            </nav>
            <div className='relative mt-6 max-w-lg mx-auto'>
              <span className='absolute inset-y-0 left-0 pl-3 flex items-center'>
                <svg
                  className='h-5 w-5 text-gray-500'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>

              <input
                className='w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline'
                type='text'
                name='searchTerm'
                placeholder='Search'
                onChange={(e) => handleSearchChange(e)}
              />
            </div>
          </div>
          <div
            className={`${
              isCartOpen ? "translate-x-0 ease-out" : "translate-x-full ease-in"
            } fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300 z-50`}
          >
            <div className='flex items-center justify-between'>
              <h3 className='text-2xl font-medium text-gray-700'>Your cart</h3>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className='text-gray-600 focus:outline-none'
              >
                <svg
                  className='h-5 w-5'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M6 18L18 6M6 6l12 12'></path>
                </svg>
              </button>
            </div>
            <hr className='my-3' />
            {cart.cartItems == 0 ? (
              <div className='min-h-32'>
                <p className='text-gray-600'>Your Cart is currently Empty</p>
              </div>
            ) : (
              cart.cartItems.map((cartItem) => {
                return (
                  <div key={cartItem._id} className='flex justify-between mt-6'>
                    <div className='flex'>
                      <div className='h-20 w-20 border rounded'>
                        <img
                          className='h-20 w-20 object-contain bg-cover'
                          src={`${cartItem.imgUrl.url}`}
                          alt={cartItem.name}
                        />
                      </div>

                      <div className='mx-3'>
                        <h3 className='text-sm text-gray-600'>
                          {cartItem.productName}
                        </h3>
                        <div className='flex items-center mt-2'>
                          <button
                            className='text-gray-500 focus:outline-none focus:text-gray-600'
                            onClick={() => increaseCartItem(cartItem._id)}
                          >
                            <svg
                              className='h-5 w-5'
                              fill='none'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                            </svg>
                          </button>
                          <span className='text-gray-700 mx-2'>
                            {cartItem.quantity}
                          </span>
                          <button
                            className='text-gray-500 focus:outline-none 
                          focus:text-gray-600'
                            onClick={() => dereaseCartItem(cartItem._id)}
                          >
                            <svg
                              className='h-5 w-5'
                              fill='none'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <span className='text-gray-600'>${cartItem.price}</span>
                  </div>
                );
              })
            )}

            <Link
              to='/cart'
              className='flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500'
            >
              <span>View Cart</span>
              <svg
                className='h-5 w-5 mx-2'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
              </svg>
            </Link>
            {cart.cartItems.length > 0 && (
              <Link
                to='/shippingAddress'
                className='flex items-center justify-center mt-4 px-3 py-2 bg-black text-white text-sm uppercase font-medium rounded'
              >
                <span>Chechout</span>
                <svg
                  className='h-5 w-5 mx-2'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
                </svg>
              </Link>
            )}
          </div>

          <main className='my-8'>
            <div className='container mx-auto px-6'>
              <h3 className='text-gray-700 text-2xl font-medium capitalize'>
                {selectedCategory}
              </h3>
              <span className='mt-3 text-sm text-gray-500'>
                {products.length} Product{products.length > 1 ? "s" : ""}
              </span>
              <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
                {products.length > 0 ? (
                  products.map((product) => {
                    return <ProductCard key={product._id} product={product} />;
                  })
                ) : (
                  <div className='text-gray-700 text-2xl font-medium capitalize'>
                    No Products
                  </div>
                )}
              </div>
              <div className='flex justify-center'>
                <div className='flex rounded-md mt-8'>
                  {currentPage > 1 && (
                    <span
                      onClick={()=>{
                      handlePrev()
                      scrollToTop();}}
                      className='h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center mr-3 cursor-pointer'
                    >
                      <FaArrowLeft /> Prev
                    </span>
                  )}
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => {
                    return (
                      <button
                        key={page}
                        onClick={() => {handlePageChange(page) 
                          scrollToTop()}}
                        className={`${
                          page === parseInt(currentPage) && "bg-blue-800"
                        } h-10 w-10 hover:bg-blue-600 font-semibold text-sm flex items-center justify-center`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  {currentPage < totalPages && (
                    <span
                      className='h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3 cursor-pointer'
                      onClick={()=>{
                      handleNext()
                      scrollToTop()}}
                    >
                      Next <FaArrowRight />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Shop;
