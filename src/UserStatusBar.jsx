import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

export default function UserStatusBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function fetchUser() {
    try {
      const res = await axios.get("/api/auth/user", {
        withCredentials: true,
      });
      console.log("Fetched user:", res.data.user); // ✅
      setUser(res.data.user);
      console.log("Updated user state:", res.data.user); // ✅
    } catch (e) {
      console.error("User not logged in", e);
      setUser(null);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", {
        withCredentials: true,
      });

      setUser(null);
      navigate("/");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <div className="flex items-center gap-x-8">
      {user ? (
        <div className="flex items-center gap-x-4 text-slate-200">
          <p className="text-sm text-slate-50">Welcome, {user.name}</p>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-gray-300 text-sm"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-x-4">
          <NavLink
            to="/login"
            className="rounded-sm bg-emerald-900 px-2 py-1 text-sm text-gray-300 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-emerald-700 hover:text-gray-100"
          >
            Sign In
          </NavLink>
        </div>
      )}
    </div>
  );
}
