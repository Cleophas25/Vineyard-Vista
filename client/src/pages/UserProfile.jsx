import React, { useEffect, useReducer, useState } from "react";
import FormRow from "../components/FornRow";
import { toast } from "react-toastify";
import { useAppContext } from "../context/appContext";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import { getError } from "../ultils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const UserProfile = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    isAmin: user?.isAmin || false,
  };
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

   if (!user) {
     navigate("/register");
   }

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Enter All Values!");
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `https://vineyard-vista.onrender.com/api/v1/orders/mine`,

          { headers: { Authorization: `Bearer ${user?.token}` } }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [user]);

  return (
    <section className='min-h-screen w-[90vw] mx-auto'>
      <h1 className='text-2xl font-bold my-5 text-center text-gray-800'>Your Orders</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner></Spinner>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : orders?.length == 0 ? (
        <div className='text-center h-56'>
          <h1 className='text-gray-700 text-3xl font-bold capitalize mb-4'>
            no orders made yet!
          </h1>
          <p className='text-gray-500 capitalize'>
            please visit our
            <span>
              <Link to='/shop' className='text-blue-500 underline capitalize'>
                {" "}
                shop{" "}
              </Link>
            </span>
            and make an order, Cheers!
          </p>
        </div>
      ) : (
        <div className='bg-white overflow-auto'>
          <table className='min-w-full leading-normal'>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Order ID
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Created At
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Total
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Paid
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Delivered
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  DETAILS
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => {
                return (
                  <tr key={order._id}>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      {order._id}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {order.createdAt.substring(0, 10)}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : "No"}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <Link
                        to={`/order/${order._id}`}
                        className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                      >
                        <span className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
                        <span className='relative'>Details</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
