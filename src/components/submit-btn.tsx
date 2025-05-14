"use client";

import { useFormStatus } from "react-dom";

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      className='ring-2 ring-slate-600 rounded-xl px-2 py-1 hover:bg-slate-600 hover:text-white'
    >
      Add Post
      {pending && (
        <span
          className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600'
          role='status'
          aria-label='Loading'
        ></span>
      )}
    </button>
  );
};
export default SubmitBtn;
