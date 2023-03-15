import React from 'react';

interface ButtonProps {
  type?: 'submit' | 'button';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({
  type = 'button',
  className = '',
  disabled = false,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${className} text-white text-lg h-min mx-auto my-5 rounded-xl p-3
      transition-all ease-linear duration-300  animate-SCALER disabled:animate-none`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
