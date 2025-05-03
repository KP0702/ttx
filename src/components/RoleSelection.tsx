import React, { useState } from 'react';
import { roles } from '../lib/roleData';

interface RoleSelectionProps {
  onStartAssessment: (selectedRoles: string[]) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onStartAssessment }) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleStartAssessment = () => {
    if (selectedRoles.length > 0) {
      onStartAssessment(selectedRoles);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Select Your Role(s)</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => toggleRole(role)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedRoles.includes(role)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <h3 className="text-lg font-semibold">{role}</h3>
            </button>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={handleStartAssessment}
            disabled={selectedRoles.length === 0}
            className={`px-6 py-3 rounded-lg text-white font-semibold ${
              selectedRoles.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
}; 