import React, { useEffect, useReducer, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useAppContext } from "../context/appContext";
import { getError } from "../ultils";
import axios from "axios";
import { FaBook, FaList, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

const Stats = () => {
  const { user } = useAppContext();
  const [{ loading, error, orders, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });
    const [stats, setStats] = useState({})
    const navigate = useNavigate();

      useEffect(() => {
        if (!user) {
          return navigate("/register");
        }
        if (user.isAdmin === false) {
          navigate("/");
          return;
        }
      }, [user, navigate]);

    useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          `https://vineyard-vista.onrender.com/api/v1/posts/adminStats`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setStats(data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchStats()
    }, [user, successDelete])


  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/orders`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data.orders });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [user, successDelete]);

  const deleteOrder = async (order) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        dispatch({ type: "DELETE_REQUEST" });
        await axios.delete(`http://localhost:3000/api/v1/orders/${order._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        toast.success("order deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };
  return (
    <div>
      <div className=' flex items-center gap-2 text-3xl font-semibold text-gray-700 mb-4'>
        <FaBook className='text-xl' />
        <h1>Statistics</h1>
      </div>
      <div className='flex items-center justify-between w-full gap-6 sm:gap-10 mb-4'>
        <div className='flex items-center justify-center w-1/3 h-32 sm:h-40 bg-white border border-gray-400 rounded-md'>
          <div className='flex items-center flex-col gap-2'>
            <p className='text-blue-900 whitespace-no-wrap text-6xl font-semibold'>
              {stats?.users}
            </p>
            <p className='text-gray-900 whitespace-no-wrap text-xl capitalize'>
              users
            </p>
          </div>
        </div>
        <div className='flex items-center justify-center w-1/3 h-32 sm:h-40 bg-white border border-gray-400 rounded-md'>
          <div className='flex items-center flex-col gap-2'>
            <p className='text-green-600 whitespace-no-wrap text-6xl font-semibold'>
              {stats?.orders}
            </p>
            <p className='text-gray-900 whitespace-no-wrap text-xl capitalize'>
              Orders
            </p>
          </div>
        </div>
        <div className='flex items-center justify-center w-1/3 h-32 sm:h-40 bg-white border border-gray-400 rounded-md'>
          <div className='flex items-center flex-col gap-2'>
            <p className='text-orange-600 whitespace-no-wrap text-6xl font-semibold'>
              {stats?.totalPosts}
            </p>
            <p className='text-gray-900 whitespace-no-wrap text-xl capitalize'>
              posts
            </p>
          </div>
        </div>
      </div>
      <div className=' flex items-center gap-2 text-3xl font-semibold text-gray-700'>
        <FaList className='text-xl' />
        <h1>Recent Orders</h1>
      </div>
      {loadingDelete && <Spinner />}
      {loading === true ? (
        <Spinner />
      ) : error ? (
        <div>
          <div>{error}</div>
        </div>
      ) : orders.length > 0 ? (
        <div className='bg-white overflow-auto'>
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Order ID
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Customer
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
                  Action
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  DETAILS
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 3)?.map((order) => {
                return (
                  <tr key={order._id}>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      {order._id}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm capitalize'>
                      {order.shippingAddress.name}
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
                      <FaTrash
                        onClick={() => deleteOrder(order)}
                        className='cursor-pointer hover:text-red-500'
                      />
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
      ) : (
        <div className='flex items-center w-full'>
          <p>No orders</p>
        </div>
      )}
    </div>
  );
};

export default Stats;
