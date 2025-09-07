"use client";

import { SignupForm } from "@/components/auth/SignupForm";
import { Logo } from "@/components/ui/Logo";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex flex-col items-center mb-6 gap-4">
            <Logo size="lg" />
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
