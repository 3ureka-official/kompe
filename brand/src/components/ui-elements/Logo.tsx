import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: 80,
    md: 120,
    lg: 160,
  };

  return (
    <Image
      src="/images/logo/logo-coloredhdpi.png"
      alt="Logo"
      width={sizeClasses[size]}
      height={0}
      className={`object-contain w-[${sizeClasses[size]}px] h-auto ${className}`}
    />
  );
}
