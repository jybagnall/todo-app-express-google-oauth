import { useState, useEffect } from "react";

import axios from "axios";

export default function UserStatusBar() {
  const [user, setUser] = useState(null);

  const BACKEND_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_PRODUCTION_BACKEND_URL
      : import.meta.env.VITE_BACKEND_URL;

  const FRONTEND_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_process.env.PRODUCTION_FRONTEND_URL
      : import.meta.env.VITE_FRONTEND_URL;

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${BACKEND_URL}/auth/user`, {
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
  }, [BACKEND_URL]);

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/auth/logout`, {
        withCredentials: true,
      });

      setUser(null);
      window.location.href = FRONTEND_URL;
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
          <a href="http://localhost:5000/auth/google">
            <button className="rounded-sm bg-emerald-900 px-2 py-1 text-sm text-gray-300 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-emerald-700 hover:text-gray-100">
              Login with Google
            </button>
          </a>
          <a href="http://localhost:5000/auth/google">
            <button className="rounded-sm bg-emerald-900 px-2 py-1 text-sm text-gray-300 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-emerald-700 hover: text-gray-100">
              Register with Google
            </button>
          </a>
        </div>
      )}
    </div>
  );
}
