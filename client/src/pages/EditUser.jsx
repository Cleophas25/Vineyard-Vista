import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/appContext";
import Spinner from "../components/Spinner";
import { getError } from "../ultils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function EditUser() {
   const { user } = useAppContext()
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/auth/${userId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userId, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `http://localhost:3000/api/v1/auth/${userId}`,
        { _id: userId, name, email, isAdmin },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("User updated successfully");
      navigate("/adminDashboard/users");
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  return (
    <div>
      <h1 className='text-3xl font-semibold'>User Profile</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='grid items-center relative'>
          <form
            className='max-w-md border-t-4 border-black w-[90vw] bg-white rounded-md shadow-md py-8 px-10 my-12 mx-auto transition-all ease-in-out hover:shadow-lg'
            onSubmit={submitHandler}
          >
            <h3 className='text-center text-3xl font-semibold mb-2'>
              Update User
            </h3>
            {/* name input */}
            <input
              placeholder='Your Email'
              type='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none mt-2'
              required
            />

            {/* email input */}
            <input
              placeholder='Your Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none my-4'
              required
            />
            <div className='flex items-center mb-4'>
              <input
                type='checkbox'
                label='admin'
                className='w-4 h-4 text-orange-600 bg-gray-100 border-gray-300'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label
                htmlFor='checkbox'
                className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                IsAdmin
              </label>
            </div>
            <button
              type='submit'
              className='cursor-pointer text-white bg-black border-transparent rounded-md tracking-wider py-1 p-3 shadow-sm transition-all ease-in-out capitalize inline-block w-full hover:bg-gray-900 hover:shadow-lg'
              disabled={loadingUpdate}
            >
              submit
            </button>
            {loadingUpdate && <Spinner />}
          </form>
        </div>
      )}
    </div>
  );
}
