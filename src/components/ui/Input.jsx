import React from 'react';

const Input = ({ 
  type = 'text',
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
      {...props}
    />
  );
};

export default Input;