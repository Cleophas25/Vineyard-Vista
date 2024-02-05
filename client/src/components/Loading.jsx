const Loading = ({ center }) => {
  return <div className={center ? `w-24 h-24 border border-gray-400 rounded-full border-t-green-400 animate-spin mx-auto` : `w-24 h-24 border border-gray-400 rounded-full border-t-green-400 animate-spin`}></div>;
};

export default Loading;
