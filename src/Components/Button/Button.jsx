const Button = ({ children }) => {
  return (
    <button className="px-4 md:px-6 py-2 text-sm md:text-lg rounded-lg font-semibold text-white bg-hotPink w-full">
      {children}
    </button>
  );
};

export default Button;
