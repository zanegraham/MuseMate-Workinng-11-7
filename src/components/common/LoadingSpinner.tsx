import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-200"></div>
        <div className="w-12 h-12 rounded-full border-t-2 border-indigo-600 animate-spin absolute top-0"></div>
      </div>
    </div>
  );
}