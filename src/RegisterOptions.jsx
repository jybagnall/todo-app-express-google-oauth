import RegisterForm from "./RegisterForm";

export default function RegisterOptions() {
  return (
    <div>
      <h2>Choose Registration Method</h2>
      <div>
        <a href="http://localhost:5000/auth/google">
          <button>Register with Google</button>
        </a>
      </div>
      <h2>or</h2>
      <div>
        <h3>Create an account</h3>
        <RegisterForm />
      </div>
    </div>
  );
}
