import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { getError } from "../ultils";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        users: action.payload,
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
const Users = () => {
   const [{ loading, error, users, loadingDelete, successDelete }, dispatch] =
     useReducer(reducer, {
       loading: true,
       error: "",
     });

   const { user } = useAppContext();
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

   useEffect(() => {
     const fetchData = async () => {
       try {
         dispatch({ type: "FETCH_REQUEST" });
         const { data } = await axios.get(
           `https://vineyard-vista.onrender.com/api/v1/auth`,
           {
             headers: { Authorization: `Bearer ${user.token}` },
           }
         );
         dispatch({ type: "FETCH_SUCCESS", payload: data });
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

   const deleteUser = async (user) => {
     if (window.confirm("Are you sure to delete?")) {
       try {
         dispatch({ type: "DELETE_REQUEST" });
         await axios.delete(
           `https://vineyard-vista.onrender.com/api/v1/auth/${user._id}`,
           {
             headers: { Authorization: `Bearer ${user.token}` },
           }
         );
         toast.success("user deleted successfully");
         dispatch({ type: "DELETE_SUCCESS" });
       } catch (error) {
         toast.error(getError(error));
         dispatch({
           type: "DELETE_FAIL",
         });
       }
     }
   };

  return (
    <div>
      <h1 className='text-3xl font-semibold text-gray-700 mb-2'>Users</h1>
      {loadingDelete && <Spinner />}
      {loading === true ? (
        <Spinner />
      ) : error ? (
        <div>
          <div>{error}</div>
        </div>
      ) : users.length > 0 ? (
        <div className='bg-white overflow-auto'>
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  User ID
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  User
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Email
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Rol
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                return (
                  <tr key={user._id}>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      {user._id}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm capitalize'>
                      {user.name}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {user.email}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      {user.isAdmin ? (
                        <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                          <span className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
                          Admin
                        </span>
                      ) : (
                        <span className='relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight'>
                          <span className='absolute inset-0 bg-yellow-200 opacity-50 rounded-full'></span>
                          Client
                        </span>
                      )}
                    </td>
                    <td className='gap-2 px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <div className='flex items-center gap-4'>
                        <FaTrash
                          onClick={() => deleteUser(user)}
                          className='cursor-pointer hover:text-red-500'
                        />
                        <Link to={`/adminDashboard/user/${user._id}`}>
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
          <p>No users</p>
        </div>
      )}
    </div>
  );
};

export default Users;
