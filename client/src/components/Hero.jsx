import { BsChevronRight } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { images } from '../constants'
const Hero = ({ title, subheading}) => {
  return (
    <div
      className='w-full h-96 bg-cover bg-no-repeat bg-center'
      style={{
        backgroundImage: `url(/images/four-wines.jpg)`,
      }}
    >
      <div className='flex justify-center items-center h-3/4 backdrop-brightness-50'>
        <h1 className='text-4xl sm:text-6xl text-white capitalize text-center font-primary'>
          {title}
        </h1>
      </div>
      <div className='flex justify-center items-center gap-2 border-t border-gray-500 h-1/4 backdrop-brightness-50 font-primary'>
        <div className='flex items-center gap-2'>
          <FaHome className='text-white text-xl' />
          <h2 className='text-white'>Home</h2>
        </div>
        <BsChevronRight className='text-gray-300' />
        <p className='text-gray-300 font-semibold'>{subheading}</p>
      </div>
    </div>
  );
}

export default Hero
