"use client";
import { Input } from "@/components/ui/input";
import React, { useActionState, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { uploadShortsAction } from "@/actions/upload-shotrs";
import Upload from "@/components/upload";
import { Loader2 } from "lucide-react";

export default function page() {
  const [videoURL, setVideoURL] = useState<string>("");
  const [formState, action, isPending] = useActionState(uploadShortsAction, {
    error: {},
  });
  const handleSubmit = (formData: FormData) => {
    formData.append("video", videoURL);
    return action(formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 border-2 mt-16 rounded-3xl ">
      <div className="bt-4 flex justify-center font-bold text-2xl   text-white">
        <h1>Upload Short</h1>
      </div>
      <div className="mt-4">
        <form action={handleSubmit}>
          <div className="grid w-full max-w-sm items-center gap-3 mt-6">
            <Label htmlFor="text">Title</Label>
            <Input
              type="text"
              name="title"
              id="title-field"
              placeholder="title"
            />
            {formState.error.title && (
              <span className="text-red-500 text-sm">
                {formState.error.title}
              </span>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-3 mt-6">
            <Label htmlFor="text">Description</Label>
            <Input
              type="text"
              id="Description-field"
              placeholder="Description"
              name="description"
            />

            {formState.error.description && (
              <span className="text-red-500 text-sm">
                {formState.error.description}
              </span>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-3 mt-6 mb-7">
            <Upload setVideoUrl={setVideoURL} />
            {formState.error.video && (
              <span className="text-red-500 text-sm">
                {formState.error.video}
              </span>
            )}
          </div>
          <div className=" grid w-full ">
            <Button
              type="submit"
              className="hover:bg-indigo-300 font-bold"
              disabled={isPending || !videoURL}
            >
              {isPending ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
