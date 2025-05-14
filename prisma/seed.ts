import { PrismaClient, Prisma } from "@/generated/prisma";

const prisma = new PrismaClient();
async function main() {
  await prisma.post.deleteMany({});
  // If you need to clear users too (be careful with this in production)
  await prisma.user.deleteMany({});
  const initialPosts: Prisma.PostCreateInput[] = [
    {
      title: "First Post",
      content: "This is the content of the first post.",
      slug: "first-post",
      author: {
        connectOrCreate: {
          where: { email: "john@gmail.com" },
          create: {
            email: "john@gmail.com",
            hashedPassword: "hashedpassword",
          },
        },
      },
    },
    {
      title: "Second Post",
      content: "This is the content of the second post.",
      slug: "second-post",
      author: {
        connectOrCreate: {
          where: { email: "steve@gmail.com" },
          create: {
            email: "steve@gmail.com",
            hashedPassword: "hashedpassword",
          },
        },
      },
    },
    {
      title: "Third Post",
      content: "This is the content of the third post.",
      slug: "third-post",
      author: {
        connectOrCreate: {
          where: { email: "john@gmail.com" },
          create: {
            email: "john@gmail.com",
            hashedPassword: "hashedpassword",
          },
        },
      },
    },
  ];

  for (const post of initialPosts) {
    const newPost = await prisma.post.create({
      data: post,
    });
    console.log(`Created post: ${newPost.title}`);
  }

  console.log("Seeding completed.");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
