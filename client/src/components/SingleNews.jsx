import React from 'react'
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaClock, FaComments, FaEye, FaFacebook, FaGooglePlus, FaLinkedin, FaPinterest, FaTwitter} from 'react-icons/fa'

const SingleNews = () => {
  return (
    <>

    <div className='container flex flex-col md:flex-row gap-2 mx-auto mt-8'>
      <div className='shadow-md shadow-gray-400 rounded-md md:w-2/3 p-4'>
        <div className='bg-gray-200 w-full h-80 mb-4 '></div>
        <h2 className='font-bold text-2xl mb-5'>
          More than 80 clinical trials launch to test of the coronavirus.
        </h2>

        <div className='flex flex-col lg:flex-row lg:items-center justify-center lg:justify-between border-t border-b border-gray-300 p-5 mb-4'>
          <div className='flex gap-3 items-center'>
            <div className='w-8 h-8 rounded-full bg-gray-500'></div>
            <p className='leading-3 text-gray-500'>Carlton Chiunye</p>
            <span className='flex gap-2 items-center'>
              <FaClock className='text-blue-500 text-xl' />
              <p className='leading-3 text-gray-500'>25 Sept 2023</p>
            </span>
          </div>
          <div className='flex gap-3 items-center ml-8 lg:m-0'>
            <FaComments className='text-blue-500 text-xl' />
            <p className='leading-3 text-gray-500'>05 Comments</p>
            <span className='flex gap-2 items-center'>
              <FaEye className='text-blue-500 text-xl' />
              <p className='leading-3 text-gray-500'>33K Views</p>
            </span>
          </div>
        </div>

        <div>
          <p className='text-sm text-gray-500 mb-5'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            facilisis ultricies tortor, nec sollicitudin lorem sagittis vitae.
            Curabitur rhoncus commodo rutrum. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Aliquam nec lacus pulvinar, laoreet dolor quis, pellentesque ante.
            Cras nulla orci, pharetra at dictum consequat, pretium pretium
            nulla. Suspendisse porttitor nunc a sodales tempor. Mauris sed felis
            maximus, interdum metus vel, tincidunt diam.
          </p>
          <p className='text-sm text-gray-500 mb-5'>
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Aliquam nec lacus pulvinar, laoreet dolor
            quis, pellentesque ante. Cras nulla orci, pharetra at dictum
            consequat, pretium pretium nulla. Suspendisse porttitor nunc a
            sodales tempor. Mauris sed felis maximus, interdum metus vel,
            tincidunt diam. Nam ac risus vitae sem vehicula egestas. Sed velit
            nulla, viverra non commod
          </p>
          <div className='mb-5'>
            <div className='flex flex-col gap-4 md:flex-row'>
              <div className='h-52 md:w-1/2 bg-gray-400'></div>
              <div className='h-52 md:w-1/2 bg-gray-400'></div>
            </div>
          </div>
          <p className='text-sm text-gray-500 mb-5'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            facilisis ultricies tortor, nec sollicitudin lorem sagittis vitae.
            Curabitur rhoncus commodo rutrum. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Aliquam nec lacus pulvinar, laoreet dolor quis, pellentesque ante.
            Cras nulla orci, pharetra at dictum consequat, pretium pretium
            nulla. Suspendisse porttitor nunc a sodales tempor. Mauris sed felis
            maximus, interdum metus vel, tincidunt diam.
          </p>
          <blockquote className='p-7 overflow-hidden bg-blue-500 opacity-90 my-5'>
            <p className='text-sm mb-5 text-white m-0 leading-7 font-semibold'>
              Aliquam nec lacus pulvinar, laoreet dolor quis, pellentesque ante.
              Cras nulla orci, pharetra at dictum consequat, pretium pretium
              nulla. Suspendisse porttitor nunc a sodales tempor. Mauris sed
              felis maximus, interdum metus vel, tincidunt diam. Nam ac risus
              vitae sem vehicula egestas. Sed velit nulla, viverra non commodo
              et, sodales
            </p>
          </blockquote>
          <p className='text-sm text-gray-500 mb-5'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            facilisis ultricies tortor, nec sollicitudin lorem sagittis vitae.
            Curabitur rhoncus commodo rutrum. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Aliquam nec lacus pulvinar, laoreet dolor quis, pellentesque ante.
            Cras nulla orci, pharetra at dictum consequat, pretium pretium
            nulla. Suspendisse porttitor nunc a sodales tempor. Mauris sed felis
            maximus, interdum metus vel, tincidunt diam. Nam ac risus vitae sem
            vehicula egestas. Sed velit nulla, viverra non commodo et, sodales
            id dui.
          </p>
          <p className='text-sm text-gray-500 mb-5'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            facilisis ultricies tortor, nec sollicitudin lorem sagittis vitae.
            Curabitur rhoncus commodo rutrum. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Aliquam nec lacus pulvinar, laoreet dolor quis, pellentesque ante.
            Cras nulla orci, pharetra at dictum consequat, pretium pretium
            nulla. Suspendisse
          </p>
        </div>

        <div className='flex items-center h-10 jusify-between'>
          <div className='flex items-center gap-2 bg-blue-600 p-2 h-full'>
            <FaFacebook className='text-white text-md' />
            <p className='text-white'>Facebook</p>
          </div>

          <div className='flex items-center gap-2 bg-sky-500 p-2 h-full'>
            <FaTwitter className='text-white text-md' />
            <p className='text-white'>Twitter</p>
          </div>
          <div className='flex items-center bg-red-500 p-2 h-full w-12 justify-center'>
            <FaGooglePlus className='text-white text-md' />
          </div>
          <div className='flex items-center bg-blue-500 p-2 h-full w-12 justify-center'>
            <FaLinkedin className='text-white text-md' />
          </div>
          <div className='flex items-center bg-orange-600 p-2 h-full w-12 justify-center'>
            <FaPinterest className='text-white text-md' />
          </div>
          <ul className='md:flex- flex gap-1 ml-auto'>
            <li className='border border-gray-400 p-3 rounded-md'>
              <a href='#'>
                <FaAngleDoubleLeft />
              </a>
            </li>
            <li className='border border-gray-400 p-3 rounded-md'>
              <a href='#'>
                <FaAngleDoubleRight />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className=' flex flex-col gap-3 md:w-1/3'>
        <div className='shadow-lg rounded-md w-full h-32'></div>
        <div className='shadow-lg rounded-md w-full h-56'></div>
        <div className='shadow-lg rounded-md w-full h-96'></div>
        <div className='shadow-2xl rounded-md w-full h-52'></div>
      </div>
    </div>
    </>
  );
}

export default SingleNews
