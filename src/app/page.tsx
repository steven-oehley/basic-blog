import Link from "next/link";

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className='text-4xl font-bold mb-2'>Welcome to my blog</h1>
      <Link
        href={"/posts"}
        className='hover:text-sky-800 underline cursor-pointer'
      >
        View my posts
      </Link>
    </div>
  );
};
export default HomePage;
