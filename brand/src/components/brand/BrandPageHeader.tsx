type Props = {
  title: string;
  description: string;
};

export function BrandPageHeader({ title, description }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
} 