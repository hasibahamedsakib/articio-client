const Logo = () => {
  return (
    <div className="relative ">
      <div className="w-6 md:w-8 h-6 md:h-8 bg-[#d86fe7] rounded-sm"></div>
      <div className="w-6 md:w-8 h-6 md:h-8 bg-hotPink rounded-sm absolute top-4 left-4">
        <h2 className="text-lg md:text-2xl font-bold relative bottom-2 left-8 md:left-11 ">
          ARITCIO
        </h2>
      </div>
    </div>
  );
};

export default Logo;
