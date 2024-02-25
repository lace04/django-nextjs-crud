import { TaskItem } from './TaskItem';

async function loadTasks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`);
  const tasks = await res.json();
  return tasks;
}

async function ListTask() {
  const tasks = await loadTasks();

  return (
    <section className='w-full bg-zinc-800 p-4'>
      <h2 className='text-2xl font-semibold text-center'>List Tasks</h2>
      <div className='mb-10'>
        {tasks.length === 0 ? (
          <p className='text-center text-white text-xl'>No tasks to show</p>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </section>
  );
}

export default ListTask;
