const RouteHeader = ({ title }) => {
  return (
    <div
      className="h-20 md:h-44 bg-cover bg-center mb-16 grid items-center rounded-lg"
      style={{
        backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${"https://media.istockphoto.com/id/520700958/photo/beautiful-flowers-background.jpg?s=612x612&w=0&k=20&c=A7WF8MScj3YNBTA-qFQEKm-Xphzmi_mfaOqjq27--j4="})`,
      }}
    >
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center text-white ">
        {title}
      </h1>
    </div>
  );
};

export default RouteHeader;
