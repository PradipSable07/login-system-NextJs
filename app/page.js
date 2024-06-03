import Link from 'next/link';

const Home = () => (
    <div className='flex flex-col items-center justify-center w-screen h-screen '>
        <h1 className='text-3xl text-blue-500'>Welcome to the Login System</h1>
        <nav className="flex gap-4">
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
        </nav>
    </div>
);

export default Home;
