'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function TaskItem({ task }) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);

  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (res.status === 204) {
        router.refresh();
      }
    }
  };

  const handleTaskDone = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`,
      {
        method: 'POST',
        body: JSON.stringify({ done: !task.done }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleUpdate = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,
      {
        method: 'PUT',
        body: JSON.stringify({ title: newTitle, description: newDescription }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      setEdit(false);
      router.refresh();
    }
  };

  return (
    <div className='bg-zinc-700 p-4 mb-4 rounded-md flex items-center justify-between'>
      <div className='flex flex-col'>
        {!edit ? (
          <div className='flex gap-x-10'>
            <h3
              className={`text-lg font-semibold ${
                task.done ? 'line-through' : ''
              }`}
            >
              {task.title}
            </h3>
            {task.done ? '✅' : '❌'}
          </div>
        ) : (
          <input
            type='text'
            placeholder={task.title}
            className='bg-zinc-800 rounded-sm p-2 mb-2 border-none'
            onChange={(e) => setNewTitle(e.target.value)}
          />
        )}

        {!edit ? (
          <p>{task.description}</p>
        ) : (
          <textarea
            name='description'
            placeholder={task.description}
            rows='1'
            className='bg-zinc-800 rounded-sm p-2 mb-2 border-none'
            onChange={(e) => setNewDescription(e.target.value)}
          />
        )}
      </div>
      <div className='flex px-4'>
        {edit && (
          <button
            className='bg-blue-600 hover:bg-blue-500 text-white rounded-sm p-1 mr-2 text-sm min-w-[50px]'
            onClick={() => handleUpdate(task.id)}
          >
            Save
          </button>
        )}

        <button
          className={`${
            task.done
              ? 'bg-zinc-600 hover:bg-zinc-800'
              : 'bg-blue-600 hover:bg-blue-500'
          } text-white rounded-sm p-1 mr-2 text-sm min-w-[50px]`}
          onClick={() => handleTaskDone(task.id)}
        >
          {task.done ? 'Undone' : 'Done'}
        </button>
        <button
          className='bg-red-600 hover:bg-red-500 text-white rounded-sm p-1 mr-2 text-sm min-w-[50px]'
          onClick={() => handleDelete(task.id)}
        >
          Delete
        </button>
        <button
          className='bg-green-600 hover:bg-green-700 text-white rounded-sm p-1 text-sm min-w-[50px]'
          onClick={() => setEdit(!edit)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
