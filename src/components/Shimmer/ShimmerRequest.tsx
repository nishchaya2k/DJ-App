const ShimmerRequest = () => {
  return (
    <div className="w-full flex flex-wrap gap-4 mt-[6rem] ml-6 overflow-x-scroll">
      {Array.from({ length: 10 }, (_, i) => {
        return (
          <div
            key={i}
            className="w-[208px] h-[300px] rounded-3xl flex flex-col gap-2 flex-shrink-0 shadow-md  hover:scale-[0.99] transition-all duration-500 ease-in-out bg-[#1d1f21] animate-pulse"
          >
            <div className="w-full h-1/2 overflow-hidden bg-[#212426] rounded-t-2xl"></div>
            <div className="w-full h-1/2  flex flex-col gap-4 p-2 pt-4">
              <div className="w-5/6 h-8 bg-[#212426] rounded-r-lg"></div>
              <div className="w-2/3 h-6 bg-[#212426] rounded-r-lg"></div>
              <div className="w-full h-8 bg-[#212426] rounded-2xl"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShimmerRequest;

// h-[calc(100vh - 30rem)] w-[13rem]
//mt-[6rem] ml-6
// bg-[#222527]
