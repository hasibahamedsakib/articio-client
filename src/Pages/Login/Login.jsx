import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import RouteTitle from "../../Components/RouteTitle/RouteTitle";
import { AuthContext } from "../../Provider/AuthProvider";
import { savedStudentToDB } from "../../api/Students";

const Login = () => {
  const { googleLogin, userLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError("");
    userLogin(data.email, data.password)
      .then((result) => {
        const user = result.user;

        if (user) {
          Swal.fire("Login success!", "You clicked the button!", "success");
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        return setError(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleLogin().then((result) => {
      const user = result.user;

      savedStudentToDB(user)
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire("Login success", "User created successfully.", "success");

            navigate(from, { replace: true });
          } else {
            Swal.fire("Login success", "User created successfully.", "success");
            navigate(from, { replace: true });
          }
        })
        .catch((err) => {
          return setError(err.message);
        });
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen container dark:text-white">
      <RouteTitle title={"Login"} />
      <div className="flex flex-col w-full md:w-[500px] p-6 rounded-md sm:p-10 border-2 border-hotPink text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold dark:text-white">Log In</h1>
          <p className="text-sm text-gray-400">
            Login First, to access your account
          </p>
        </div>
        <form
          className="space-y-6 ng-untouched ng-pristine ng-valid"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                {...register("email")}
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-hotPink focus:outline-hotPink focus:ring-0 focus:border-transparent text-gray-900"
              />
            </div>
            <div className="relative">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="text-sm dark:text-white mb-2"
                >
                  Password
                </label>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-hotPink focus:outline-hotPink focus:ring-0 focus:border-transparent text-gray-900 relative "
                {...register("password", {
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 pt-7 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <HiEyeOff size={20} className="text-black " />
                ) : (
                  <HiEye size={20} className="text-black " />
                )}
              </div>
            </div>
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}
          </div>
          <p className="text-red-500 text-xl text-center">{error}</p>
          <input value="Login" type="submit" className="btn-primary" />
        </form>
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-hotPink text-gray-400">
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm  dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <hr />
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-hotPink border-rounded cursor-pointer dark:text-white"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm dark:text-white text-center text-gray-400">
          Do not have an account yet?{" "}
          <Link
            to="/register"
            className="hover:underline hover:text-hotPink text-gray-600 dark:text-white"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
