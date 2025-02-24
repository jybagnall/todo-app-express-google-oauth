import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const error = queryParams.get("error");

  return (
    <div>
      {error && (
        <p style={{ color: "red" }}>Authentication failed. Please try again.</p>
      )}
      <a href="http://localhost:5000/auth/google">Login with Google</a>
    </div>
  );
};

export default Login;
