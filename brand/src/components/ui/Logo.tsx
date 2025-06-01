interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center bg-gray-100 rounded-full`}>
      <svg 
        viewBox="0 0 24 24" 
        className="w-6 h-6"
        fill="none"
      >
        <path 
          d="M12 2L22 20H2L12 2Z" 
          fill="url(#gradient)"
          stroke="none"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="50%" stopColor="#4ECDC4" />
            <stop offset="100%" stopColor="#45B7D1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
} 