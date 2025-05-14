import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface PostPageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) {
    return (
      <div className='flex flex-col items-center min-h-screen p-4'>
        <Link href='/' className='hover:text-sky-800 underline cursor-pointer'>
          {" "}
          &larr; Back Home
        </Link>
        <h1 className='text-4xl font-bold mb-2'>Post Not Found</h1>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center min-h-screen p-4'>
      <Link href='/' className='hover:text-sky-800 underline cursor-pointer'>
        {" "}
        &larr; Back Home
      </Link>

      <div className='mt-4'>
        <h2 className='text-2xl text-slate-600 text-center'>{post.title}</h2>
        <section>{post.content}</section>
      </div>
    </div>
  );
};
export default PostPage;
