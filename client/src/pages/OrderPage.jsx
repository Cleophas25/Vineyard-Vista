import React, { useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        order: action.payload,
      };
    case "FETCH_FAIL":
      return {
        ...state,
        err: action.payload,
      };

    default:
      return state;
  }
};

const OrderPage = () => {
  const { id } = useParams()
  const { user } = useAppContext();
  const [{ isLoading, order, err }, dispatch] = useReducer(reducer, {
    isLoading: true,
    order: {},
    err: "",
  });

  const navigate = useNavigate()

  if(!user) {
    navigate(`/register?rederect=/order/${id}`)
  }

   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);

  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        dispatch({type: 'FETCH_REQUEST'})
        const res = await axios(`http://localhost:3000/api/v1/orders/${id}`);

        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
        toast.error(err);
      }
    };
    getOrderDetail()
  }, []);
  return (
    <div className='min-h-screen p-4'>
      {isLoading ? (
        <Spinner />
      ) : err ? (
        <div>{err}</div>
      ) : (
        <div className='flex flex-col md:flex-row gap-2'>
          <div className='md:w-2/3 flex flex-col gap-4'>
            <div className='w-full border border-gray-300 p-2 rounded-md'>
              <h1 className='text-2xl font-bold mb-4 text-gray-600'>
                Shipping Details
              </h1>
              <p>
                <strong>Name:</strong> {order.shippingAddress.name} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
              </p>
            </div>
            <div className='w-full border border-gray-300 p-2 rounded-md'>
              <h1 className='text-2xl font-bold mb-4 text-gray-600'>Payment</h1>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}
              </p>
              <p>
                <strong>Deliverd:</strong> {order.isDelivered ? "Yes" : "No"}
              </p>
            </div>
            <div className='w-full border border-gray-300 p-4 rounded-md'>
              <h1 className='text-2xl font-bold mb-4 text-gray-600'>
                Order Items
              </h1>
              {order.orderItems == 0 ? (
                <div>No orders</div>
              ) : (
                order.orderItems.map((order) => {
                  return (
                    <div key={order._id} className='flex justify-between mt-6'>
                      <div className='flex'>
                        <div className='h-20 w-20 border rounded'>
                          <img
                            className='h-20 w-20 object-contain bg-cover'
                            src={`${order.imgUrl.url}`}
                            alt={order.name}
                          />
                        </div>

                        <div className='mx-3'>
                          <h3 className='text-sm text-gray-600'>
                            {order.productName}
                          </h3>
                        </div>
                      </div>
                      <span className='text-gray-600'>${order.price}</span>
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
              {order.orderItems.map((item) => {
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
                <p className='text-gray-700'>${order.itemsPrice}</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-gray-700'>Tax</p>
                <p className='text-gray-700'>${order.taxPrice}</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-gray-700'>Shipping</p>
                <p className='text-gray-700'>${order.shippingPrice}</p>
              </div>
              <hr className='my-4' />
              <div className='flex justify-between'>
                <p className='text-lg font-bold'>Total</p>
                <div className=''>
                  <p className='mb-1 text-lg font-bold'>
                    ${order.totalPrice} USD
                  </p>
                  <p className='text-sm text-gray-700'>including VAT</p>
                </div>
              </div>
            </div>
            <div className='font-semibold text-xl px-8 flex justify-between py-8 text-gray-600'></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
