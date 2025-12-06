export function FormWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg p-8 shadow-sm">{children}</div>
    </div>
  );
}
