import GoogleButton from "./GoogleButton";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create your personal account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <RegisterForm />

        <div>
          <div className="relative mt-10">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm/6 font-medium">
              <span className="bg-white px-6 text-gray-900">
                Or continue with
              </span>
            </div>
          </div>
        </div>
        <GoogleButton />
      </div>
    </div>
  );
}
