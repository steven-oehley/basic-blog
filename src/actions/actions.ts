"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  const dbData = {
    title: data.title,
    content: data.content,
    slug: data.title.toLowerCase().replace(/\s+/g, "-"),
    author: {
      connect: {
        email: "john@gmail.com",
      },
    },
  };

  await prisma.post.create({
    data: dbData,
  });

  revalidatePath("/posts");
}

export async function deletePost(slug: string) {
  await prisma.post.delete({
    where: { slug },
  });

  revalidatePath("/posts");
}

export async function updatePost(formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  const dbData = {
    title: data.title,
    content: data.content,
    slug: data.title.toLowerCase().replace(/\s+/g, "-"),
  };

  await prisma.post.update({
    where: { slug: dbData.slug },
    data: dbData,
  });

  revalidatePath("/posts");
}
