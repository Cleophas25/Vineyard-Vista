import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import Post from "../components/post";
import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import Aside from "../components/Aside.jsx";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isChanged, setIsChanged] = useState(false)
  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(false);
      try {
        const result = await axios(
          `https://vineyard-vista.onrender.com/api/v1/posts?page=${currentPage}`
        );
        setPosts(result.data.posts);
        console.log(result)
        setTotalPages(result.data.numOfPage);
      } catch (error) {
        setError(error.message);
        console.log(error)
      }
    };
    getPosts();
  }, [currentPage]);


  useEffect(()=> {
    window.scrollTo(0,0)
  }, [])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setIsChanged(!isChanged)
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }

  return (
    <div>
      {/* <Hero title=' welcome to our blog' subheading='blog' /> */}
      <div className='container mx-auto flex flex-wrap py-6'>
        <section className='w-full md:w-2/3 flex flex-col items-center px-3 min-h-screen'>
          {isLoading === true ? (
            <Spinner />
          ) : error ? (
            <div className='min-h-screen text-gray-700 text-3xl'>{error}</div>
          ) : posts.length > 0 ? (
            posts.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <div className='flex items-center w-full'>
              <p></p>
            </div>
          )}
          <div className='flex justify-center'>
            <div className='flex rounded-md mt-8'>
              {currentPage > 1 && (
                <span
                  onClick={handlePrev}
                  className='h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center mr-3 cursor-pointer'
                >
                  <FaArrowLeft /> Prev
                </span>
              )}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`${
                        page === parseInt(currentPage) && "bg-blue-800"
                      } h-10 w-10 hover:bg-blue-600 font-semibold text-sm flex items-center justify-center`}
                    >
                      {page}
                    </button>
                  );
                }
              )}
              {currentPage < totalPages && (
                <span
                  className='h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3 cursor-pointer'
                  onClick={handleNext}
                >
                  Next <FaArrowRight />
                </span>
              )}
            </div>
          </div>
        </section>
        <Aside />
      </div>
    </div>
  );
};

export default Blog;
