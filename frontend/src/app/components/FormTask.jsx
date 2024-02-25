'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function FormTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,
      {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();

    setTitle('');
    setDescription('');

    router.refresh();
  };

  return (
    <div className='flex items-center justify-center h-fit'>
      <form
        action=''
        onSubmit={handleSubmit}
        className='flex flex-col justify-center bg-zinc-800 p-4 rounded-sm mb-4 min-w-[300px] max-w-[400px] w-full'
      >
        <h1 className='text-2xl font-semibold text-center'>Task Form</h1>
        <label htmlFor='title' className='text-white mb-2 text-xs'>
          Title
        </label>
        <input
          type='text'
          name='title'
          placeholder="Task's title"
          className='bg-zinc-700 rounded-sm p-2 mb-2'
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='description' className='text-white mb-2 text-xs'>
          Description
        </label>
        <textarea
          name='description'
          placeholder="Task's description"
          rows='3'
          className='bg-zinc-700 rounded-sm p-2 mb-2'
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type='submit'
          className='bg-blue-900 hover:bg-blue-950 trasition duration-500 ease-in-out text-white rounded-sm p-2 mb-2'
        >
          Add task
        </button>
      </form>
    </div>
  );
}

export default FormTask;
