const LoadingDots = () => {
  return (
    <div className="flex space-x-2 h-10 justify-center items-center">
      <span className="w-3 h-3 bg-indigo-600 rounded-full animate-spin-grow delay-0"></span>
      <span className="w-3 h-3 bg-indigo-600 rounded-full animate-spin-grow delay-150"></span>
      <span className="w-3 h-3 bg-indigo-600 rounded-full animate-spin-grow delay-300"></span>
    </div>
  );
};

export default LoadingDots;
