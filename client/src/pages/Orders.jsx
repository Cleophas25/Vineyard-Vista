import React, { useEffect, useReducer, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useAppContext } from "../context/appContext";
import { getError } from "../ultils";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
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
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_TOTAL_PAGES":
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
};

const Orders = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [
    {
      loading,
      error,
      orders,
      loadingDelete,
      successDelete,
      currentPage,
      totalPages,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
    orders: [],
    currentPage: 1,
    totalPages: 1,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/orders?page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data.orders });
        dispatch({ type: "SET_TOTAL_PAGES", payload: data.totalPages });
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

    useEffect(() => {
      if (!user) {
        return navigate("/register");
      }
      if (user.isAdmin === false) {
        navigate("/");
        return;
      }
    }, [user, navigate]);

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
  }

  const handlePageChange = (page) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
    dispatch({ type: "DELETE_SUCCESS" });
  };
  return (
    <div>
      <div className='min-h-[calc(100vh-10rem)]'>
        <h1 className='text-3xl font-semibold text-gray-700 mb-2'>Orders</h1>
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
                {orders?.map((order) => {
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
                          onClick={()=>deleteOrder(order)}
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
      <div className='flex justify-center'>
        <div className='flex rounded-md mt-8'>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${
                  page === currentPage ? "font-bold border-2" : ""
                }py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 ml-1 rounded-l hover:bg-blue-500 hover:text-white`}
                disabled={page === currentPage}
              >
                <span>{page}</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
