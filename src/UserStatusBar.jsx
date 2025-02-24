import { useState, useEffect } from "react";

import axios from "axios";

export default function UserStatusBar() {
  const [user, setUser] = useState(null);

  // {withCredentials}: let browser send session cookies with request
  // so the backend server recognizes the session
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("http://localhost:5000/auth/user", {
          withCredentials: true,
        }); // ensure the session is saved after login.
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
      await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      }); // ensure the session is cleared.

      setUser(null);
      window.location.href = "http://localhost:5173";
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
