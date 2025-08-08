"use client";

import { AppGate } from "@/components/auth/AuthGuard";
import LoginBox from "@/components/auth/LoginBox";

export default function LoginPage() {
  return (
    <AppGate>
      <LoginBox />
    </AppGate>
  );
}
