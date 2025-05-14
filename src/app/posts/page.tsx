import { createPost } from "@/actions/actions";
import SubmitBtn from "@/components/submit-btn";
import { prisma } from "@/lib/prisma";

import Link from "next/link";

const PostsPage = async () => {
  // const posts = await prisma.post.findMany();
  const user = await prisma.user.findUnique({
    where: {
      email: "steve@gmail.com",
    },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const postCount = await prisma.post.count();

  if (!user) {
    return (
      <div className='flex flex-col items-center min-h-screen p-4 w-full'>
        <h1 className='text-4xl font-bold mb-2'>No Posts Found</h1>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center min-h-screen p-4 w-full'>
      <Link
        href='/'
        className='hover:text-sky-800 underline cursor-pointer mb-4'
      >
        {" "}
        &larr; Back Home
      </Link>
      <h1 className='text-4xl font-bold mb-2'>All Posts</h1>
      <div>
        <h2 className='text-2xl text-slate-600 text-center mb-6'>
          Posts ({postCount})
        </h2>
        <ul className='border-t-2 border-b-2 mb-4'>
          {user?.posts.map((post) => (
            <li
              key={post.id}
              className='text-lg p-2 my-2 flex flex-col justify-center items-center ring-2 ring-slate-700'
            >
              <div className='flex justify-center gap-4'>
                <span>Post Name: </span>
                <Link
                  href={`/posts/${post.slug}`}
                  className='hover:text-sky-800 underline cursor-pointer'
                >
                  {post.title}
                </Link>
              </div>
              <span>Written by: {user.email}</span>
            </li>
          ))}
        </ul>

        <form
          action={createPost}
          className='max-w-lg w-full flex flex-col gap-2 border-2 p-4'
        >
          <h3>Add A New Post</h3>
          <input
            id='title'
            type='text'
            name='title'
            placeholder='Post Title'
            className='px-2 py-1 rounded-2xl border-2'
          />
          <textarea
            name='content'
            id='content'
            rows={8}
            placeholder='Post Content'
            className='px-2 py-1 rounded-2xl border-2'
          ></textarea>
          <SubmitBtn />
        </form>
      </div>
    </div>
  );
};
export default PostsPage;
