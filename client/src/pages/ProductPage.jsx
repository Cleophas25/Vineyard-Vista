import React, { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { BsBoxSeam, BsCart4 } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import Ratings from "../components/Ratings";
import axios from 'axios'
import { getError } from "../ultils";
import { useAppContext } from "../context/appContext";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const initialState = {
  product: [],
  loading: true,
  error: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductPage = () => {
  const { addToCartHandler } = useAppContext()
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isloading, product, error } = state
  useEffect(()=> {
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'})
      try {
        const result = await axios.get(
          `https://vineyard-vista.onrender.com/api/v1/products/${id}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err)})
      }
    }
    fetchData()
  }, [id])

   useEffect(() => {
     window.scrollTo(0, 0);
   }, []);

  return (
    <div className='h-[calc(100vh-68px)] container w-[90vw] mx-auto my-5'>
      {isloading ? (
        <Spinner/>
      ) : error ? (
        toast.error(error)
      ) : (
        <div className='flex flex-row  my-5 gap-4 w-full items-start h-[20rem] md:h-[30rem]'>
          <div className='w-1/2 md:w-2/3 border border-gray-300 rounded-md p-1 h-1/2 sm:h-full'>
            <img
              src={`${product?.imgUrl?.url}`}
              alt={product.name}
              className='object-contain w-full h-full'
            />
          </div>
          <div className='flex flex-col justify-between w-1/2 md:w-1/3 h-full'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-3xl font-semibold capitalize'>
                {product.productName}
              </h2>
              <div className='flex items-center gap-2'>
                <p className='font-semibold'>Rating:</p>
                <Ratings
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </div>
              <p className='font-semibold'>
                Category:
                <span className='font-normal capitalize text-sm ml-1'>
                  {product.category}
                </span>
              </p>
              <p className='font-semibold'>
                Desc:
                <span className='font-normal capitalize text-sm ml-1'>
                  {product.description}
                </span>
              </p>
              <p className='font-semibold'>
                Price: <span className='text-red-500'>${product.price}</span>
              </p>
              <div className='flex items-center justify-between'>
                {product.countInStock > 1 ? (
                  <div className='flex items-center gap-1'>
                    <BsBoxSeam className='text-green-700' />
                    <span className='text-green-700'>In stock</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-1'>
                    <FaBoxOpen className='text-red-700' />
                    <span className='text-red-700'>Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            <div className='flex flex-col w-full border'>
              <button
                onClick={() => addToCartHandler(product)}
                className='flex items-center justify-between bg-gray-700 p-1 rounded-md cursor-pointer hover:bg-gray-600 w-full mb-2'
              >
                <p className='text-white capitalize'>add to cart</p>
                <span>
                  <BsCart4 className='text-xl text-white cursor-pointer' />
                </span>
              </button>
              <Link to='/shippingAddress' className='text-white bg-black p-1 rounded-md w-full hover:bg-black capitalize'>
                buy now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
