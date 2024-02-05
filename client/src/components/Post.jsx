import React from "react";
import { FaArrowRight, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <article className='flex flex-col shadow my-4 w-full'>
      <Link to={`/post/${post._id}`} className='hover:opacity-75'>
        <div className='flex w-full max-h-80  border overflow-hidden'>
          <img
            src={`${post.img.url}`}
            className='w-full object-cover object-center'
          />
        </div>
      </Link>
      <div className='bg-white flex flex-col justify-start p-6'>
        <div className='flex justify-between items-center'>
          <p className='text-gray-700 text-sm font-bold uppercase'>
            Wine making
          </p>
          <p className='flex gap-1 items-center'>
            <FaEye /> {post?.views?.length} views
          </p>
        </div>
        <Link
          to={`/post/${post._id}`}
          className='text-lg md:text-3xl font-bold hover:text-gray-700 pb-4 capitalize'
        >
          {post.title}
        </Link>
        <p href='#' className='text-sm pb-3'>
          By{" "}
          <a href='#' className='font-semibold hover:text-gray-800 capitalize'>
            {post?.author?.name}
          </a>
          , Published on {post.createdAt.substring(0,10)}
        </p>
        <a href='#' className='pb-6'>
          {post.summary}
        </a>
        <Link
          to={`/post/${post._id}`}
          className='uppercase text-gray-800 hover:text-black flex gap-1 items-center'
        >
          <p>Continue Reading</p> <FaArrowRight />
        </Link>
      </div>
    </article>
  );
};

export default Post;
