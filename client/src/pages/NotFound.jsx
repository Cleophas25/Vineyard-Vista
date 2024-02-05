import React from 'react'

const NotFound = () => {
  return (
      <div className='w-9/12 m-auto py-16 min-h-screen flex items-center justify-center'>
        <div className='bg-white shadow overflow-hidden sm:rounded-lg pb-8'>
          <div className='text-center p-8'>
            <h1 className='text-9xl font-bold text-gray-700'>404</h1>
            <h1 className='text-6xl font-medium py-8 font-primary'>oops! Page not found</h1>
          </div>
        </div>
      </div>
  );
}

export default NotFound
