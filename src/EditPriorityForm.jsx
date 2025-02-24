import { useState } from "react";

export default function EditPriorityForm({
  id,
  text,
  editPriority,
  handleToggleEdit,
}) {
  const [newPriority, setNewPriority] = useState(text);

  const handleCancel = () => {
    handleToggleEdit();
    setNewPriority(newPriority);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editPriority(id, newPriority);
    handleToggleEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex gap-3 py-2 border-b last:border-none items-center"
    >
      <div className="relative mt-2">
        <input
          type="text"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          autoFocus
          className="peer block w-full  px-3 py-1.5 text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-emerald-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
        <svg
          className="-mr-0.5 size-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <button
        type="submit"
        onClick={handleCancel}
        className="inline-flex items-center gap-x-1.5 rounded-md bg-slate-50 px-2.5 py-1.5 text-sm font-semibold text-slate-800 shadow-xs hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Cancel
      </button>
    </form>
  );
}
