import { Link } from "react-router-dom"
import { BsBoxSeam, BsCart4 } from "react-icons/bs";
import Ratings from "./Ratings";
import { FaBoxOpen } from "react-icons/fa";
import { useAppContext } from "../context/appContext";

const ProductCard = ({ product }) => {
  const { _id:id, productName, imgUrl, rating, numReviews, price, countInStock } = product;
  const { addToCartHandler } = useAppContext()
  return (
    <div className='w-full flex flex-col mt-5 gap-2 max-w-sm mx-auto overflow-hidden'>
      <div className='w-full h-36 border border-gray-300 rounded-md p-1'>
        <Link to={`/product/${id}`}>
          <img
            src={`${imgUrl.url}`}
            alt={productName}
            className='object-contain w-full h-full transform hover:scale-110 transition .duraton-700  ease-in-out'
          />
        </Link>
      </div>
      <Link to={`/product/${id}`}>
        <h2 className='font-semibold capitalize'>{productName}</h2>
      </Link>
      <div className='flex items-center'>
        <Ratings rating={rating} numReviews={numReviews} />
        <span className='text-orange-500 text-sm'>{numReviews} reviews</span>
      </div>

      <div className='flex items-center justify-between'>
        <p className='font-semibold text-red-500 text-xl'>${price}</p>
        {countInStock > 1 ? (
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
      <button
        onClick={() => addToCartHandler(product)}
        className='flex items-center justify-between bg-gray-700 p-1 rounded-sm cursor-pointer hover:bg-gray-600'
      >
        <p className='text-white capitalize'>add to cart</p>
        <span>
          <BsCart4 className='text-xl text-white cursor-pointer' />
        </span>
      </button>
    </div>
  );
};

export default ProductCard;
