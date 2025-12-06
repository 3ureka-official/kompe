"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ContestImage } from "@/types/Contest";
import { ImageIcon } from "lucide-react";

type Props = {
  images: ContestImage[];
  alt: string;
};

export function ImageCarousel({ images, alt }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) {
    return (
      <div className="aspect-video w-full rounded-lg border bg-muted flex flex-col gap-2 items-center justify-center">
        <ImageIcon className="w-20 h-20 text-muted-foreground stroke-1" />
        <span className="text-gray-600">サムネイルなし</span>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="w-full rounded-lg overflow-hidden">
        <Image
          src={images[currentIndex].url}
          alt={`${alt} - ${currentIndex + 1}`}
          width={800}
          height={450}
          className="aspect-video w-full h-auto object-cover rounded-lg"
        />
      </div>

      {images.length > 1 && (
        <>
          {/* 左右のナビゲーションボタン */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* インジケーター */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`画像 ${index + 1} に移動`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
