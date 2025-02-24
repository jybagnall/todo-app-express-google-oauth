import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import RegisterOptions from "./RegisterOptions";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/register", data);

      if (res.status === 201) {
        window.location.href = "http://localhost:5173/";
        // navigate("/"); 📍when success, navigate to the homepage
      }
    } catch {
      setRedirect(true);
    }
  };
  if (redirect) {
    return <RegisterOptions />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} placeholder="Name" />
        {errors.name?.type === "required" && "Name is required"}

        <input
          {...register("email", {
            required: true,
            pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
          })}
          placeholder="Email"
        />
        {errors.email?.type === "required" && "Email is required"}

        <input
          {...register("password", {
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Password"
        />
        {errors.password?.type === "required" && "Password is required"}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
