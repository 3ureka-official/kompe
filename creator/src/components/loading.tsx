import { Spinner } from "@/components/ui/spinner";

export default function Loading({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
      <Spinner className="size-8 animate-spin" />
      {message && <p className="text-sm text-gray mt-4">{message}</p>}
    </div>
  );
}
