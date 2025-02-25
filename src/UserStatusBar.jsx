import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function UserStatusBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/auth/user", {
          withCredentials: true,
        });
        console.log("Fetched user:", res.data.user);
        setUser(res.data.user);
      } catch (e) {
        console.error("User not logged in", e);
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", {
        withCredentials: true,
      });

      setUser(null);
      window.location.href = "/";
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
          <NavLink to="/" className="rounded-sm bg-emerald-900 px-2 py-1 text-sm text-gray-300 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-emerald-700 hover:text-gray-100">
            Home
          </NavLink>
          <NavLink to="/login" className="rounded-sm bg-emerald-900 px-2 py-1 text-sm text-gray-300 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-emerald-700 hover:text-gray-100">
            Login
          </NavLink>
          <NavLink to="/register" className="rounded-sm bg-emerald-900 px-2 py-1 text-sm text-gray-300 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-emerald-700 hover:text-gray-100">
            Register
          </NavLink>
          <a href="/api/auth/google">
            <button className="rounded-sm bg-emerald-900 px-2 py-1 text-sm text-gray-300 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-emerald-700 hover:text-gray-100">
              Login with Google
            </button>
          </a>
        </div>
      )}
    </div>
  );
}
