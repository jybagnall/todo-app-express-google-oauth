import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink to="/" className="text-stone-200 text-xl font-bold">
      To Do List
    </NavLink>
  );
}
