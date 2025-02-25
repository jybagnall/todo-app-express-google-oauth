import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginFailed, setLoginFailed] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (data) => {
    setLoginFailed(false);
    try {
      const res = await axios.post("/api/auth/login", {username: data.email, password: data.password}, {withCredentials: true});

      if (res.status === 201) {
        // redirect to homepage
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginFailed(true);
    }
  };

  const onReject = (errorObject, event) => {
    console.log(errorObject);
  }

  if (redirect) {
    window.location.href = "/";
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onReject)}>
        <input
          {...register("email", {
            required: true,
            pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
          })}
          placeholder="Email"
          className="mt-3 peer block w-full bg-lime-50 px-3 py-1.5 text-gray-900 placeholder-gray-500 focus:outline-none sm:text-sm"
        />
        {errors.email?.message && errors.email.message}

        <input
          {...register("password", {
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Password"
          className="mt-3 peer block w-full bg-lime-50 px-3 py-1.5 text-gray-900 placeholder-gray-500 focus:outline-none sm:text-sm"
        />
        {errors.password?.message && errors.password.message}
        <button type="submit" className="mt-2 w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-500">Log In</button>
      </form>
      {loginFailed && <div className="mt-2 font-semibold text-red-600">Incorrect username or password</div>}
    </div>
  );
}
