"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

export default function RegisterLineSection() {
  return (
    <div className="flex flex-col gap-2 items-start justify-between pb-4">
      <p className="text-sm">最新のコンテスト情報を受け取りましょう</p>
      <Link
        href="https://lin.ee/hPx39td"
        target="_blank"
        className="flex items-center gap-2"
      >
        <Image
          src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
          alt="友だち追加"
          height="30"
          width="110"
        />
      </Link>
    </div>
  );
}
