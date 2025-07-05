"use server";

import { prisma } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod/v4";

const uploadShortSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "description must be at least 10 characters long"),
  video: z.string(),
});

type uploadShortsState = {
  error: {
    title?: string[];
    description?: string[];
    video?: string[];
    formError?: string[];
  };
};

export const uploadShortsAction = async (
  preState: uploadShortsState,
  formData: FormData
): Promise<uploadShortsState> => {
  const rawFormData = uploadShortSchema.safeParse({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    video: formData.get("video") as string,
  });

  // if (!rawFormData.success) {
  //   return {
  //     error: rawFormData.error.flatten().fieldErrors, // <<== this is where formState.error comes from
  //   };
  // }

  if (!rawFormData.data?.video) {
    return {
      error: {
        video: ["Video upload failed or is missing"],
      },
    };

  }
  // authentication by clerk
  const { userId } = await auth();

  if (!userId) {
    return {
      error: {
        formError: ["Login first then upload video"],
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  try {
    if (!user?.id) {
      return {
        error: {
          formError: ["User not Found"],
        },
      };
    }
    console.log("Creating Shorts with data:", {
      title: rawFormData.data.title,
      description: rawFormData.data.description,
      videoURL: rawFormData.data.video,
      userId: user.id,
    });


    await prisma.shorts.create({
      data: {
        title: rawFormData.data.title,
        description: rawFormData.data.description,
        videoURL: rawFormData.data.video,
        userId: user.id,
      },
    });
  } catch (error: unknown) {
    console.error("Upload Shorts Error:", error); 
    if (error instanceof Error) {
      return {
        error: {
          formError: [error.message],
        },
      };
    } else {
      return {
        error: {
          formError: ["Internal Server Error"],
        },
      };
    }
  }
  revalidatePath("/");
  redirect("/");
};
