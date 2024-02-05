import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import { getError } from "../ultils";

const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state, isLoading: true
      }
    case 'FETCH_SUCCESS':
      return {
        ...state, isLoading: false, posts: action.payload
      }
    case 'FETCH_FAIL':
      return {
        ...state, error: action.payload, isLoading: false
      }
    default:
      return state
  }
}

const Posts = () => {
  const { user } = useAppContext()
  const [{ isLoading, posts, error }, dispatch] = useReducer(reducer, {
    posts: [],
    isLoading: false,
    error: ''
  })
  const [ isChanged, setIsChanged ] = useState(true)
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
     const getPosts = async () => {
       try {
         dispatch({ type: "FETCH_REQUEST" });
         const { data } = await axios(
           "https://vineyard-vista.onrender.com/api/v1/posts"
         );
         dispatch({ type: "FETCH_SUCCESS", payload: data.posts });
       } catch (err) {
         dispatch({ type: "FETCH_FAIL", payload: getError(err) });
       }
     };
     getPosts();
     if(isChanged){
       getPosts();
       setIsChanged(false)
     }
  }, [isChanged]);



  const deletePost = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete the post?");
    if (confirm) {
      try {
        const response = await fetch(
          `https://vineyard-vista.onrender.com/api/v1/posts/${id}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        setIsChanged(true)
        toast.success("Post Deleted");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div>
      <h1 className='text-3xl font-semibold text-gray-700 mb-2'>Posts</h1>
      <Link
        to='/Admindashboard/createpost'
        className='flex items-center gap-1 text-gray-800 text-lg mb-2'
      >
        Create Post <FaPlus />
      </Link>
      {isLoading === true ? (
        <Spinner />
      ) : error ? (
        <div className='text-center h-56'>
          <h1 className='text-gray-700 text-xl font-bold capitalize mb-4'>
            {error}
          </h1>
        </div>
      ) : posts.length > 0 ? (
        <div className='bg-white overflow-auto'>
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Post ID
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Title
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Author
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Date
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {posts.map((post) => {
                const { _id: id, title, createdAt } = post;
                return (
                  <tr key={id}>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      {post._id}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm capitalize'>
                      {title}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm capitalize'>
                      {post?.author?.name}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {createdAt.substring(0, 10)}
                      </p>
                    </td>
                    <td className='gap-2 px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <div className='flex items-center gap-4'>
                        <FaTrash
                          onClick={() => deletePost(id)}
                          className='cursor-pointer hover:text-red-500'
                        />
                        <Link to={`/Admindashboard/updatepost/${id}`}>
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
          <p className='text-gray-600 text-xl'>
            No Posts, Please Create A Post!
          </p>
        </div>
      )}
    </div>
  );
};

export default Posts;


