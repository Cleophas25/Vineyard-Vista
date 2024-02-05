import React, { useEffect, useReducer } from "react";
import { useAppContext } from "../context/appContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../ultils";
import Spinner from "../components/Spinner";


const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const PlaceOrder = () => {
  const { user, cart, dereaseCartItem, increaseCartItem, clearCart } = useAppContext();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  if(!cart.cartItems) {
    toast.error("You haven't seletect Items to order")
    return
  }
  if(!cart.address) {
    toast.error("Please Enter Your Shipping Address first")
    navigate("/shippingAddress");
  }

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.shippingPrice = cart.total > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.05 * cart.total);
  cart.totalPrice = cart.total + cart.shippingPrice + cart.taxPrice;

  const navigate = useNavigate()

  const placeOrder = async() => {
    console.log('hie')
   try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await axios.post(
        "https://vineyard-vista.onrender.com/api/v1/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.address,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.total,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      clearCart()
      toast.success(data.message)
      navigate(`/order/${data.newOrder._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err.message));
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='min-h-screen w-[90vw] mx-auto'>
      <h1 className='text-4xl font-bold mb-4'>Preview Order</h1>
      <div className='flex flex-col md:flex-row gap-2'>
        <div className='md:w-2/3 flex flex-col gap-4'>
          <div className='w-full border border-gray-300 p-2 rounded-md'>
            <h1 className='font-bold mb-2'>Shipping Details</h1>
            <p>
              <strong>Name:</strong> {cart.address.name} <br />
              <strong>Address: </strong> {cart.address.address},
              {cart.address.city}, {cart.address.postalCode},
              {cart.address.country}
            </p>
            <Link to='/shippingAddress' className='text-blue-500'>
              Edit
            </Link>
          </div>
          <div className='w-full border border-gray-300 p-2 rounded-md'>
            <h1 className='font-bold md-2'>Payment</h1>
            <p>
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
            <Link to='/shippingAddress' className='text-blue-500'>
              Edit
            </Link>
          </div>
          <div className='w-full border border-gray-300 p-4 rounded-md'>
            <h1 className='text-2xl font-bold mb-4'>Your Order</h1>
            {cart.cartItems == 0 ? (
              <div>Your Cart is currently Empty!  <span><Link className='text-blue-500' to='/shop'>Go shopping</Link> </span></div>
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
          </div>
        </div>
        <div className='w-full md:w-1/3 bg-white'>
          <h1 className='pb-6 border-b-2 text-xl text-gray-600 px-8'>
            Order Summary
          </h1>
          <ul className='py-6 border-b space-y-6 px-8'>
            {cart.cartItems.map((item) => {
              return (
                <li
                  key={item._id}
                  className='grid grid-cols-2 gap-2 border-b-1'
                >
                  <div className='flex flex-col col-span-1 pt-2'>
                    <span className='text-black text-md font-semibold'>
                      {item.productName}
                    </span>
                  </div>
                  <div className='col-span-1 pt-3'>
                    <div className='flex items-center space-x-2 text-sm justify-between'>
                      <span className='text-gray-400'>
                        {item.quantity} x {item.price}
                      </span>
                      <span className='font-semibold inline-block text-gray-700'>
                        ${item.quantity * item.price}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className='px-8 border-b'>
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
          </div>
          <div className='font-semibold text-xl px-8 flex justify-between py-8 text-gray-600'>
          </div>
          <button
             onClick={placeOrder}
            className='flex justify-center bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 w-full mb-2 text-white p-2'
          >
           Place Order
          </button>
            { loading ? <Spinner/> : null }
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
