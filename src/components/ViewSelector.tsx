import React from 'react';
import { ViewType, ViewSelectorProps } from '../types/view';

export const ViewSelector: React.FC<ViewSelectorProps> = ({ currentView, onViewChange }) => {
  const buttonClasses = (isActive: boolean) => `
    px-6 py-2.5 text-sm font-medium transition-all duration-200
    ${isActive 
      ? 'bg-blue-600 text-white shadow-md' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }
  `;

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-xl shadow-lg p-1.5 inline-flex">
        <button
          onClick={() => onViewChange('user')}
          className={`${buttonClasses(currentView === 'user')} rounded-l-lg`}
          aria-label="Switch to User View"
        >
          User View
        </button>
        <button
          onClick={() => onViewChange('admin')}
          className={`${buttonClasses(currentView === 'admin')} rounded-r-lg`}
          aria-label="Switch to Admin View"
        >
          Admin View
        </button>
      </div>
    </div>
  );
}; 