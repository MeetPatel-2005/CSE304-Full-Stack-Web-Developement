import React from 'react';

/**
 * Loading Spinner Component
 * Beautiful animated loading spinner with message
 */
const LoadingSpinner = ({ message = 'Loading...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`loading-spinner ${sizeClasses[size]} mx-auto`}></div>
      <p className="mt-4 text-gray-600 text-sm font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;