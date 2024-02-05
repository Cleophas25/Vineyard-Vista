import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import { getError } from "../ultils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload,
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

const Products = () => {
  const { user } = useAppContext();
  const [{ loading, error, products, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });
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
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `https://vineyard-vista.onrender.com/api/v1/products`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data.products });
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

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        dispatch({ type: "DELETE_REQUEST" });
        await axios.delete(
          `https://vineyard-vista.onrender.com/api/v1/products/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
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
      <h1 className='text-3xl font-semibold text-gray-700 mb-2'>Products</h1>
      <Link
        to='/Admindashboard/createProduct'
        className='flex items-center gap-1 text-gray-800 text-lg mb-2'
      >
        Create Products <FaPlus />
      </Link>
      {loadingDelete && <Spinner />}
      {loading === true ? (
        <Spinner />
      ) : error ? (
        <div className='text-gray-700 text-2xl'>{error}</div>
      ) : products.length > 0 ? (
        <div className='bg-white overflow-auto'>
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Product ID
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Category
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Price
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {products.map((product) => {
                const { _id: id, productName, category, price } = product;
                return (
                  <tr key={id}>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      {id}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm capitalize'>
                      {productName}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm capitalize'>
                      {category}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        ${price}
                      </p>
                    </td>
                    <td className='gap-2 px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <div className='flex items-center gap-4'>
                        <FaTrash
                          onClick={() => deleteProduct(id)}
                          className='cursor-pointer hover:text-red-500'
                        />
                        <Link to={`/Admindashboard/updateproduct/${id}`}>
                          <FaEdit className='cursor-pointer hover:text-blue-500' />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='flex items-center w-full'>
          <p>no products</p>
        </div>
      )}
    </div>
  );
};

export default Products;
