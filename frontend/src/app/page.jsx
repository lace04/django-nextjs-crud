import FormTask from './components/FormTask';
import ListTask from './components/ListTask';

export const dynamic = 'force-dynamic';

function HomePage() {
  return (
    <div className='container mx-auto '>
      <h1 className='bg-zinc-900 p-2 mb-10 text-3xl'>Tasks app</h1>
      <section className='flex justify-center gap-x-20 max-w-[1220px] mx-auto'>
        <FormTask />
        <ListTask />
      </section>
    </div>
  );
}

export default HomePage;
