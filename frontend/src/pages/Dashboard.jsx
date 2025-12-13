import Card from '../components/Card';

export default function Dashboard() {
  return (
    <main className='p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Card title='Total Leaves' content='24' color='bg-blue-300' />
        <Card title='Approved Leaves' content='18' color='bg-green-500' />
        <Card title='Pending Leaves' content='6' color='bg-yellow-500' />
        <Card title='Rejected Leaves' content='2' color='bg-red-500' />
        <Card title='Upcoming Leaves' content='3' color='bg-purple-500' />
        <Card title='Leave Balance' content='12' color='bg-indigo-500' />
      </div>
    </main>
  );
}
