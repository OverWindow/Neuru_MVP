import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-xl font-medium transition-colors min-h-[48px]';

  const variantClasses = {
    primary: disabled
      ? 'bg-muted text-muted-foreground cursor-not-allowed'
      : 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: disabled
      ? 'bg-muted text-muted-foreground cursor-not-allowed'
      : 'bg-secondary-light text-secondary hover:bg-secondary/10',
    outline: disabled
      ? 'border-2 border-muted text-muted-foreground cursor-not-allowed'
      : 'border-2 border-border text-foreground hover:border-primary hover:bg-primary-light/30'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
