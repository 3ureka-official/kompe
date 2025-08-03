interface FormHeaderProps {
  title: string;
  subtitle: string;
}

export function FormHeader({ title, subtitle }: FormHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] p-8 text-white text-center">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-xl opacity-90">{subtitle}</p>
    </div>
  );
}
