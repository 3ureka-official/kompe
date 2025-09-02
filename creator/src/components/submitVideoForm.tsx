"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  CloudUploadIcon,
  EditIcon,
  LoaderCircleIcon,
  SaveIcon,
} from "lucide-react";
import { useActionState, useState } from "react";
import { submitVideo } from "@/actions/submitVideo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function SubmitVideoDialog({
  competitionId,
  previousValue,
}: {
  competitionId: string;
  previousValue: string | null;
}) {
  const submitVideoWithId = submitVideo.bind(null, competitionId);
  const [state, action, isPending] = useActionState(
    submitVideoWithId,
    undefined,
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="submit" className="w-full">
          {previousValue ? (
            <>
              <EditIcon />
              動画の紐づけを編集
            </>
          ) : (
            <>
              <CloudUploadIcon />
              動画を提出
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {previousValue ? "動画の紐づけを編集" : "動画を提出"}
          </DialogTitle>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-4">
          <Label htmlFor="tiktok_url">TikTok URL</Label>
          <Input
            type="text"
            id="tiktok_url"
            name="tiktok_url"
            placeholder="https://www.tiktok.com/..."
            defaultValue={previousValue || ""}
            required
          />
          <Button type="submit" className="w-full">
            {isPending ? (
              <>
                <LoaderCircleIcon className="animate-spin" />
                保存しています...
              </>
            ) : previousValue ? (
              <>
                <SaveIcon />
                保存
              </>
            ) : (
              <>
                <CloudUploadIcon />
                動画を提出
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
