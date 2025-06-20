import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${sizes[size]}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;