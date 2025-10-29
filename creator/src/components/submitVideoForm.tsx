"use client";
import { Button } from "@/components/ui/button";
import {
  CloudUploadIcon,
  CheckIcon,
  LoaderCircleIcon,
  PlayIcon,
  SaveIcon,
} from "lucide-react";
import { useState, useTransition } from "react";
import { submitVideo } from "@/actions/submitVideo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { RequiredVideo } from "@/models/tiktok/video";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SubmitVideoDialog({
  competitionId,
  previousValue,
  videos,
  initialSelectedVideoId,
}: {
  competitionId: string;
  previousValue: string | null;
  videos: RequiredVideo[];
  initialSelectedVideoId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(
    initialSelectedVideoId || null,
  );
  const [isPending, startTransition] = useTransition();
  const onSubmitButtonClick = () => {
    if (!selectedVideoId) return;
    startTransition(() => {
      submitVideo(competitionId, selectedVideoId);
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="submit"
          className="w-full py-5 font-bold"
          disabled={isPending || previousValue !== null}
        >
          {previousValue ? (
            <>
              <CheckIcon />
              応募済み
            </>
          ) : (
            <>
              <CloudUploadIcon />
              動画を提出
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>紐づける動画を選択</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <ScrollArea className="h-[500px]">
            <RadioGroup
              className="flex flex-col gap-4 mb-4 px-4"
              onValueChange={(value) => setSelectedVideoId(value)}
              value={selectedVideoId || undefined}
            >
              {!videos.length && (
                <div className="text-sm text-muted-foreground px-4 py-16 text-center">
                  TikTokに動画が見つかりません。動画を投稿してから、再度この画面を開いてください。
                </div>
              )}
              {videos.map((video) => (
                <Card
                  className={`h-[100px] py-4 ${selectedVideoId === video.id ? "border-primary border-2" : ""}`}
                  key={video.id}
                  onClick={() => setSelectedVideoId(video.id)}
                >
                  <CardContent className="h-full px-4">
                    <div className="h-full flex items-center gap-4">
                      <Image
                        src={
                          video.cover_image_url ||
                          "" /* todo: add fallback image */
                        }
                        alt={video.title || "タイトル未設定の動画"}
                        width={500}
                        height={500}
                        className="h-full w-auto rounded-lg"
                      />
                      <div>
                        <p className="text-md line-clamp-2">{video.title}</p>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <PlayIcon className="size-4" />
                          <p className="text-sm">{`${video.view_count}回再生`}</p>
                        </div>
                      </div>
                      <RadioGroupItem
                        value={video.id}
                        id={video.id}
                        className="ml-auto"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </ScrollArea>
          <div className="px-4 pt-4 border-t">
            <Button
              className="w-full py-5 font-bold"
              onClick={() => onSubmitButtonClick()}
              disabled={!selectedVideoId || isPending}
            >
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
