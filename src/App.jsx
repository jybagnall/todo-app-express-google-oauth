import Logo from "./Logo";
import TodoList from "./TodoList";
import Reminders from "./Reminders";
import PriorityList from "./PriorityList";
import UserStatusBar from "./UserStatusBar";

import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen bg-white">
        <header className="shrink-0 bg-emerald-950 w-full">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 flex-wrap">
            <Logo />
            <UserStatusBar />
          </div>
        </header>

        <div className="flex-1 flex mx-auto w-full max-w-4xl grid grid-cols-2 gap-6 border border-gray-300 p-6 rounded-lg shadow-lg">
          <TodoList />

          <div className="flex flex-col flex-1 space-y-3">
            <PriorityList className="flex-[2]" />
            <Reminders className="flex-[1]" />
          </div>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
