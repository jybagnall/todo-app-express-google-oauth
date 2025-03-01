import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import GoogleButton from "./GoogleButton";

export default function Login() {
  return (
    <div className="flex min-h-full flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl space-y-6">
        <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
          Continue with your email
        </h2>
        <p className="mt-2 text-center text-sm/6 text-gray-500">
          Sign in or create a personal account to continue
        </p>
      </div>

      <LoginForm />

      <div className="relative mt-10">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm/6 font-medium">
          <span className="bg-white px-6 text-gray-900">Or continue with</span>
        </div>
      </div>

      <div className="mt-1 flex justify-center">
        <GoogleButton />
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have one?{" "}
        <NavLink
          to="/register"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Create an account
        </NavLink>
      </p>
    </div>
  );
}
