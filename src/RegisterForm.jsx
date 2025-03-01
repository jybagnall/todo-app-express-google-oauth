import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userContext = useContext(UserContext);

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    setErrorMessage(null);

    try {
      const res = await axios.post("/api/auth/register", data, {
        withCredentials: true,
      });

      if (res.status === 201) {
        userContext.setUser(res.data.user);
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="Name"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              {...register("name", {
                required: "Please enter your name",
              })}
              type="name"
              name="name"
              id="name"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              placeholder="e.g.,John"
            />
          </div>
        </div>

        {errors.name?.message && (
          <span className="mt-2 text-xm text-red-600">
            {errors.name.message}
          </span>
        )}

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
          <span className="mt-2 text-xm text-red-600">
            {errors.email.message}
          </span>
        )}

        <div>
          <label
            htmlFor="Password"
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
              placeholder="Enter a password"
              name="password"
              id="password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {errors.password?.message && (
          <span className="mt-2 text-xm text-red-600">
            {errors.password.message}
          </span>
        )}

        {errorMessage && (
          <span className="mt-2 text-xm text-red-600">{errorMessage}</span>
        )}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}
