import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { images } from "../constants/index.js";
import { getError } from "../ultils";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner.jsx";
import { BsThreeDots } from 'react-icons/bs'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import Aside from "../components/Aside.jsx";
import { useAppContext } from "../context/appContext.jsx";

const initialState = {
  post: [],
  loading: true,
  error: "",
  isChanged: false,
  isDropdownOpen: false,
  commentId: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, post: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "IS_CHANGED":
      return { ...state, isChanged: !state.isChanged };
    case "SET_IS_DROPDOWN_OPEN":
      return {
        ...state, isDropdownOpen: !state.isDropdownOpen, commentId: action.payload
      }
    default:
      return state;
  }
};
const BlogPost = () => {
  const { user } = useAppContext()
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isloading, post, error, isChanged, isDropdownOpen, commentId } = state;
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:3000/api/v1/posts/${id}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.post });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [isChanged]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `http://localhost:3000/api/v1/posts/comment/${post._id}`,
        {
          name: name,
          comment: comment,
        }
      );
      dispatch({type:'IS_CHANGED'})
      toast.success("Comment Posted");
      setName("");
      setComment("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteComment = async(id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/posts/comment/${id}/${post._id}`
      );
       dispatch({ type: "IS_CHANGED" });
      toast.success('Comment Deleted')
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleIsDropDownOpen = (index) => {
    if(activeIndex === index){
      setActiveIndex(null)
    } else {
    setActiveIndex(index)
    }
  }
  return (
    <div>
      <div className='container mx-auto flex flex-wrap py-6'>
        <section className='w-full md:w-2/3 flex flex-col items-center px-3'>
          {isloading ? (
            <Spinner />
          ) : error ? (
            toast.success(error)
          ) : (
            <article className='flex flex-col shadow my-4 w-full'>
              <div className='flex w-full max-h-80  border overflow-hidden'>
                <img
                  src={`${post?.img?.url}`}
                  className='w-full object-cover object-center'
                />
              </div>
              <div className='bg-white flex flex-col justify-start p-6'>
                <a
                  href='#'
                  className='text-blue-700 text-sm font-bold uppercase pb-4'
                >
                  Wine Technolongy
                </a>
                <h1 className='text-3xl font-bold hover:text-gray-700 pb-4 capitalize'>
                  {post?.title}
                </h1>
                <p href='#' className='text-sm pb-8'>
                  By{" "}
                  <a href='#' className='font-semibold hover:text-gray-800'>
                    {post?.author?.name}
                  </a>
                  , Published on {post?.createdAt?.substring(0, 10)}
                </p>
                <div
                  className='content'
                  dangerouslySetInnerHTML={{ __html: post?.content }}
                />
              </div>
            </article>
          )}
          <section className='w-full'>
            <h2 className='text-lg lg:text-2xl font-bold text-gray-900 mb-2'>
              Comments
            </h2>
            {post?.comments?.length > 0 ? (
              post?.comments?.map((comment, index) => {
                return (
                  <article
                    key={comment._id}
                    className='p-6 mb-6 text-base bg-white border-t border-gray-200'
                  >
                    <footer className='flex justify-between items-center mb-2'>
                      <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center'>
                          <p className='inline-flex items-center mr-3 font-semibold text-sm text-gray-900'>
                            <FaUser className='mr-2 w-4 h-4 rounded-full' />
                            {comment.name}
                          </p>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            <time
                              pubdate
                              dateTime='2022-03-12'
                              title='March 12th, 2022'
                            >
                              {comment.createdAt.substring(0, 10)}
                            </time>
                          </p>
                        </div>
                       {user && user?.isAdmin ? <div className='relative flex items-center gap-1 mr-4 curser-pointer font-semibold capitalize text-md'>
                          <BsThreeDots
                            className='cursor-pointer'
                            onClick={() => {
                              handleIsDropDownOpen(index);
                            }}
                          />
                          <div
                            id='dropdown'
                            className={` ${
                              activeIndex === index ? "absolute" : "hidden"
                            } absolute py-2 mt-32 z-10 bg-white divide-gray-100 rounded-lg shadow w-full min-w-[7rem] dark:bg-gray-700`}
                          >
                            <ul
                              className='py-2 text-sm text-gray-700 dark:text-gray-200'
                              aria-labelledby='dropdownDefaultButton'
                            >
                              

                              <li>
                                  <button
                                    className='w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                                    onClick={() => {
                                      handleIsDropDownOpen(index);
                                      handleDeleteComment(comment._id)
                                    }}
                                  >
                                    delete
                                  </button>
                              </li>
                            </ul>
                          </div>
                        </div> : null}
                      </div>
                    </footer>
                    <p>{comment.comment}</p>
                  </article>
                );
              })
            ) : (
              <div className='p-6 mb-6 text-base bg-white border-t border-gray-200'>
                <p className='text-gray-600'>
                  Be the first one to comment
                </p>
              </div>
            )}

            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-lg lg:text-2xl font-bold text-gray-900'>
                Leave a comment
              </h2>
            </div>
            <form className='mb-6' onSubmit={handleSubmit}>
              <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200'>
                <label htmlFor='comment' className='sr-only'>
                  Your comment
                </label>
                <input
                  id='name'
                  className='px-0 w-full text-sm text-gray-900 border-0 focus:outline-none'
                  placeholder='Your Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></input>
              </div>
              <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200'>
                <label htmlFor='comment' className='sr-only'>
                  Your comment
                </label>
                <textarea
                  id='comment'
                  rows='6'
                  className='px-0 w-full text-sm text-gray-900 border-0 focus:outline-none'
                  placeholder='Write a comment...'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type='submit'
                className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-purple-700 rounded-md'
              >
                Post comment
              </button>
            </form>
          </section>

          <div className='w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6'>
            <div className='w-full md:w-1/5 flex justify-center md:justify-start pb-4'>
              <img
                src={images.wine}
                className='rounded-full shadow h-32 w-32'
              />
            </div>
            <div className='flex-1 flex flex-col justify-center md:justify-start'>
              <p className='font-semibold text-2xl'>Taps</p>
              <p className='pt-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur vel neque non libero suscipit suscipit eu eu urna.
              </p>
              <div className='flex items-center justify-center md:justify-start text-2xl no-underline text-black pt-4'>
                <a className='' href='#'>
                  <FaFacebook />
                </a>
                <a className='pl-4' href='#'>
                  <FaInstagram />
                </a>
                <a className='pl-4' href='#'>
                  <FaTwitter />
                </a>
                <a className='pl-4' href='#'>
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </section>
        <Aside />
      </div>
    </div>
  );
};

export default BlogPost;
