import { Logo } from "@/components/ui-elements/Logo";

export function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <Logo size="lg" />
    </div>
  );
}
