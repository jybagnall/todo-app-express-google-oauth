import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStatus();
  }, []);

  async function fetchUserStatus() {
    try {
      const res = await axios.get("http://localhost:5000/auth/user", {
        withCredentials: true,
      });

      setUser(res.data.user);
    } catch (e) {
      console.error("User not logged in", e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider value={{ user, loading, fetchUserStatus }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
