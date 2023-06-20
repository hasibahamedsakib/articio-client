import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../Components/Button/Button";
import RouteTitle from "../../Components/RouteTitle/RouteTitle";
import { AuthContext } from "../../Provider/AuthProvider";
import { savedStudentToDB } from "../../api/Students";

const Register = () => {
  const { userSignUp, updateUserProfile, googleLogin, userLogOut } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const image = data.file[0];
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    }`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageRes) => {
        const imageUrl = imageRes.data.display_url;

        userSignUp(data.email, data.password).then((userCredential) => {
          const user = userCredential.user;
          updateUserProfile(data.name, imageUrl).then(() => {
            savedStudentToDB(user)
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  Swal.fire(
                    "registration success",
                    "User created successfully.",
                    "success"
                  );
                  userLogOut();
                  navigate("/login", { replace: true });
                }
              });
          });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleGoogleSignIn = () => {
    googleLogin().then((result) => {
      const user = result.user;

      savedStudentToDB(user)
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire(
              "registration success",
              "User created successfully.",
              "success"
            );

            navigate("/", { replace: true });
          }
        });
    });
  };
  return (
    <div className="flex justify-center items-center container dark:text-white">
      <RouteTitle title={"Register"} />
      <div className="flex flex-col w-full md:w-[500px] p-6 rounded-md sm:p-10 border-2 border-[#ff6899] text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold dark:text-white">Sign Up</h1>
          <p className="text-lg text-gray-400">Welcome to ARITCIO</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm dark:text-white"
              >
                Name
              </label>
              <input
                required
                type="text"
                {...register("name")}
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md  border-[#ff6899] focus:outline-[#ff6899] focus:ring-0 focus:border-transparent text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm dark:text-white"
              >
                Email address
              </label>
              <input
                required
                type="email"
                {...register("email")}
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-[#ff6899] focus:outline-[#ff6899] focus:ring-0 focus:border-transparent text-gray-900"
                data-temp-mail-org="0"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="text-sm dark:text-white mb-2"
                >
                  Password
                </label>
              </div>
              <input
                required
                type="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-[#ff6899] focus:outline-[#ff6899] focus:ring-0 focus:border-transparent text-gray-900"
                {...register("password", {
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
              />
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="text-sm dark:text-white mb-2"
                >
                  Confirm Password
                </label>
              </div>
              <input
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-[#ff6899] focus:outline-[#ff6899] focus:ring-0 focus:border-transparent text-gray-900"
              />
              <p className="text-red-500">{errors.confirmPassword?.message}</p>
            </div>
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm dark:text-white"
              >
                Upload Image:
              </label>

              <input
                required
                className="block w-full text-sm dark:text-white text-gray-900 border  rounded-lg cursor-pointer border-[#ff6899] focus:outline-[#ff6899] focus:ring-0 focus:border-transparent dark:placeholder-gray-400"
                type="file"
                {...register("file")}
              />
            </div>
          </div>

          <div>
            <Button>Register</Button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-[#ff6899] border-rounded cursor-pointer dark:text-white">
          <FcGoogle size={32} onClick={handleGoogleSignIn} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-hotPink text-gray-600 dark:text-white"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
