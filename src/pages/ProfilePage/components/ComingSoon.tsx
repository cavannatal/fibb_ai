import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface ComingSoonProps {
  featureName: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ featureName }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg shadow-md p-8 text-center">
      <Clock className="w-16 h-16 text-blue-500 mb-4" />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Coming Soon</h2>
      <p className="text-xl text-gray-600 mb-6">{featureName} is under construction</p>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-md" role="alert">
        <div className="flex">
          <AlertCircle className="w-6 h-6 mr-2" />
          <p>
            We're working hard to bring you an amazing {featureName.toLowerCase()} experience. 
            Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon