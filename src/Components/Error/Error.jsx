import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center grid items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${"https://img.freepik.com/free-vector/internet-network-warning-404-error-page-file-found-web-page-internet-error-page-issue-found-network-404-error-present-by-man-sleep-display_1150-55450.jpg?w=1060&t=st=1686567869~exp=1686568469~hmac=cefe1b71f708d0efc2eb51750a87d80c1247a4ce62f0c26bed280559c371a3f8"})`,
      }}
    >
      <div className="lg:mt-96 text-center">
        <h1 className=" text-4xl md:text-5xl font-bold   text-white">
          Page Not found
        </h1>
        <span className="text-3xl font-bold text-white pt-10">
          {" "}
          Go To{" "}
          <Link className="text-hotPink" to="/">
            {" "}
            Home{" "}
          </Link>{" "}
          Page
        </span>
      </div>
    </div>
  );
};

export default Error;
