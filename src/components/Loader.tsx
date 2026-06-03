import React from 'react';

export const Loader: React.FC<{ fullScreen?: boolean }> = ({ fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg border border-gray-200">{content}</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8">
      {content}
    </div>
  );
};
