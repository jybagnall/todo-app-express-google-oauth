import { useForm } from "react-hook-form";

export default function Form({ addTodo, isLoggedIn }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!isLoggedIn) return;

    if (!data.newItem.trim()) {
      alert("The field cannot be empty.");
      return;
    }

    addTodo(data.newItem);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex items-center w-full mt-2 gap-2"
    >
      <div className="relative w-full">
        <input
          type="text"
          {...register("newItem", { required: "*The field cannot be empty." })}
          className={`peer block w-full bg-lime-50 px-3 py-1.5 text-gray-900 placeholder-gray-500 focus:outline-none sm:text-sm 
                 ${
                   errors.newItem
                     ? "border-red-500 focus:border-red-500"
                     : "border-gray-300 focus:border-indigo-600"
                 }`}
          placeholder="Enter your task..."
          aria-invalid={errors.newItem ? "true" : "false"}
        />

        <div
          className={`absolute inset-x-0 bottom-0 border-t ${
            errors.newItem ? "border-red-500" : "border-gray-300"
          } 
                  peer-focus:border-t-2 peer-focus:${
                    errors.newItem ? "border-red-500" : "border-indigo-600"
                  }`}
          aria-hidden="true"
        ></div>

        {errors.newItem && (
          <svg
            className="absolute right-3 top-1/2 -translate-y-[100%] size-5 text-red-500 sm:size-4"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
        )}

        {errors.newItem && (
          <p
            className="mt-1 text-xs text-red-600"
            id="task-error"
            aria-live="assertive"
          >
            {errors.newItem.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-full bg-emerald-600 p-2 text-white shadow-md hover:bg-emerald-500 
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
        </svg>
      </button>

     
    </form>
  );
}
