import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    dereaseCartItem,
    increaseCartItem,
    removeCartItem,
  } = useAppContext();
  const checkoutHandler = () => {
    navigate("/register?redirect=/shippingAddress");
  };
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100
  cart.shippingPrice = cart.total > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.05 * cart.total);
  cart.totalPrice = cart.total + cart.shippingPrice + cart.taxPrice;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (cart.cartItems.length === 0) {
    return (
      <section className='min-h-[calc(100vh-68px)] w-[90vw] mx-auto mt-10 py-10 max-w-3xl'>
        <header>
          <h2 className='uppercase text-center mb-12'>your cart</h2>
          <h4 className='mt-4 lowercase text-gray-500 text-center'>
            is currently empty!{" "}
            <span className='text-blue-500 cursor-pointer capitalize'>
              <Link to='/shop'>go shopping</Link>
            </span>
          </h4>
        </header>
      </section>
    );
  }
  return (
<section className=" bg-gray-100 ">

    <div className='min-h-[calc(100vh-68px)] w-[90vw] mx-auto pt-10'>
      <h1 className='mb-10 text-center text-2xl font-bold'>Cart Items</h1>
      <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 py-2'>
        <div className='md:w-2/3'>
          {cart.cartItems.map((item) => {
            return (
              <div key={item._id} className=' rounded-lg w-full'>
                <div className='justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'>
                  <div className='h-40 w-40 border'>
                    <img
                      src={`${item.imgUrl.url}`}
                      alt='product-image'
                      className=' object-contain h-40 w-40 rounded-lg'
                    />
                  </div>

                  <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
                    <div className='mt-5 sm:mt-0'>
                      <h2 className='capitalize text-lg font-bold text-gray-900'>
                        {item.productName}
                      </h2>
                      <p className='capitalize mt-1 text-xs text-gray-700'>
                        {item.description}
                      </p>
                    </div>
                    <div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'>
                      <div className='flex items-center border-gray-100'>
                        <span
                          onClick={() => dereaseCartItem(item._id)}
                          className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'
                        >
                          {" "}
                          -{" "}
                        </span>
                        <p
                          className='flex h-8 w-8 border bg-white text-xs outline-none items-center justify-center'
                        >
                          {item.quantity}
                        </p>
                        <span
                          onClick={() => increaseCartItem(item._id)}
                          className='cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50'
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <p className='text-sm'>${item.price * item.quantity}</p>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
                          onClick={() => removeCartItem(item._id)}
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
          <div className='mb-2 flex justify-between'>
            <p className='text-gray-700'>Subtotal</p>
            <p className='text-gray-700'>${cart.total}</p>
          </div>
          <div className='flex justify-between'>
            <p className='text-gray-700'>Shipping</p>
            <p className='text-gray-700'>${cart.shippingPrice}</p>
          </div>
          <hr className='my-4' />
          <div className='flex justify-between'>
            <p className='text-lg font-bold'>Total</p>
            <div className=''>
              <p className='mb-1 text-lg font-bold'>${cart.totalPrice} USD</p>
              <p className='text-sm text-gray-700'>including VAT</p>
            </div>
          </div>
          <Link to='/shippingAddress'>
            <button className='flex items-center justify-center gap-1 mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 cursor-pointer'>
              Check out <FaArrowRight/>
            </button>
          </Link>
          <Link to='/shop'>
            <button className='w-full rounded-md bg-black py-1.5 font-medium text-blue-50 mt-2 cursor-pointer'>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
</section>
  );
};

export default Cart;
