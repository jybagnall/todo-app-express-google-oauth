import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    setErrorMessage(null);

    try {
      const res = await axios.post(
        "/api/auth/login",
        { username: data.email, password: data.password },
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="Email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^\S+@\S+$/,
                    message: "Invalid email format",
                  },
                })}
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                placeholder="e.g., yourname@yourhost.com"
              />
            </div>
          </div>

          {errors.email?.message && (
            <span className="mt-2 text-xs text-red-600">
              {errors.email.message}
            </span>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                placeholder="Enter a password"
              />
              {errors.password?.message && (
                <span className="mt-2 text-xs text-red-600">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          {errorMessage && (
            <span className="mt-2 text-sm text-red-600">{errorMessage}</span>
          )}

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
