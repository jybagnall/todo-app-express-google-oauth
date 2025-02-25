import { useForm } from "react-hook-form";
import axios from "axios";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [redirect, setRedirect] = useState(false);

  const BACKEND_URL =
    process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_BACKEND_URL
      : process.env.BACKEND_URL;

  const FRONTEND_URL =
    process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_FRONTEND_URL
      : process.env.FRONTEND_URL;

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/register`, data);

      if (res.status === 201) {
        window.location.href = FRONTEND_URL;
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setRedirect(true);
    }
  };

  if (redirect) {
    window.location.href = FRONTEND_URL;
    return null;
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
