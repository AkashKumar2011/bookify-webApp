import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  as: Component = 'button',
  className = '',
  ...props 
}) => {
  // Define variant classes
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-amber-400 hover:bg-amber-300 text-indigo-900 shadow-md hover:shadow-lg',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    outline: 'bg-transparent border hover:bg-gray-50',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700'
  };

  // Define size classes
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  // Base classes
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <Component
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;