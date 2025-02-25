import { useState } from "react";
import EditTodoForm from "./EditTodoForm";

export default function TodoItem({
  id,
  text,
  completed,
  removeTodo,
  toggleTodo,
  editTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  return isEditing ? (
    <EditTodoForm
      id={id}
      editTodo={editTodo}
      text={text}
      handleToggleEdit={handleToggleEdit}
    />
  ) : (
    <div className="relative flex gap-3 py-2 border-b last:border-none items-center">
      <div className="min-w-0 flex-1 text-sm/6">
        <label
          htmlFor={`todo-${id}`}
          className={`font-medium select-none ${
            completed ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {text}
        </label>
      </div>

      <div className="flex h-6 shrink-0 items-center">
        <div className="group grid size-4 grid-cols-1">
          <input
            id={`todo-${id}`}
            name={`todo-${id}`}
            type="checkbox"
            checked={completed}
            onChange={() => toggleTodo(id)}
            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white 
                    checked:border-indigo-600 checked:bg-emerald-500 focus-visible:outline-2 
                    focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          />
          <svg
            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              className="opacity-0 group-has-checked:opacity-100"
              d="M3 8L6 11L11 3.5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="opacity-0 group-has-indeterminate:opacity-100"
              d="M3 7H11"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex space-x-2">
        <div className="relative group">
          <button
            onClick={handleToggleEdit}
            className="px-2 py-1 text-xs text-white rounded-md hover:text-blue-500"
          >
            ✏️
          </button>
          <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 scale-0 transition-all duration-200 bg-gray-800 text-white text-xs py-1 px-2 rounded-md group-hover:scale-100">
            Edit
          </span>
        </div>

        <div className="relative group">
          <button
            onClick={() => removeTodo(id)}
            className="px-2 py-1 text-xs text-white rounded-md hover:text-red-500"
          >
            🗑️
          </button>
          <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 scale-0 transition-all duration-200 bg-gray-800 text-white text-xs py-1 px-2 rounded-md group-hover:scale-100">
            Delete
          </span>
        </div>
      </div>
    </div>
  );
}
