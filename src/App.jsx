import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import UserContext from "./UserContext";
import Logo from "./Logo";
import TodoList from "./TodoList";
import Reminders from "./Reminders";
import PriorityList from "./PriorityList";
import UserStatusBar from "./UserStatusBar";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    fetchUser(abortController);

    return () => {
      abortController.abort();
    };
  }, []);

  async function fetchUser(abortController) {
    setLoading(true);
    try {
      const res = await axios.get("/api/auth/user", {
        signal: abortController.signal,
        withCredentials: true,
      });

      setUser(res.data.user);
    } catch (e) {
      if (!abortController.signal.aborted) {
        console.error("User not logged in", e);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading && <h1 className="text-black">Loading...</h1>}
      {!loading && (
        <div className="flex flex-col min-h-screen bg-white">
          <header className="shrink-0 bg-emerald-950 w-full">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 flex-wrap">
              <Logo />
              <UserStatusBar />
            </div>
          </header>

          <div className="flex-1 flex mx-auto w-full max-w-4xl grid grid-cols-2 gap-6 border border-gray-300 p-6 rounded-lg shadow-lg">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <TodoList />
                    <div className="flex flex-col flex-1 space-y-3">
                      <PriorityList className="flex-[2]" />
                      <Reminders className="flex-[1]" />
                    </div>
                  </>
                }
              />

              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </div>
        </div>
      )}
    </UserContext.Provider>
  );
}

export default App;
