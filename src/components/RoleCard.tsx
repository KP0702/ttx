import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { BackgroundGradient } from "./ui/background-gradient";

export default function RoleCard() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const roles = [
    "Chief Information Security Officer (CISO)",
    "Security Operations Center (SOC) Manager",
    "Incident Response Team Lead",
    "Network Security Engineer",
    "Digital Forensics Specialist",
    "Threat Intelligence Analyst",
    "Security Compliance Officer",
    "Application Security Engineer",
    "Security Awareness Trainer"
  ];

  const toggleRole = (title: string) => {
    setSelectedRoles(prev => 
      prev.includes(title) 
        ? prev.filter(role => role !== title)
        : [...prev, title]
    );
  };

  const handleStartAssessment = () => {
    if (selectedRoles.length > 0) {
      const rolesParam = encodeURIComponent(selectedRoles.join(','));
      console.log('Selected roles:', selectedRoles);
      console.log('Redirecting to second project...');
      window.location.href = `http://localhost:5176?roles=${rolesParam}`;
    }
  };

  return (
    <BackgroundGradient className="rounded-[22px] max-w-md w-full h-[600px] mx-auto">
      <div className="h-full p-4 flex flex-col">
        <div className="flex justify-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">SELECT ROLES</h3>
        </div>

        <div className="h-48 overflow-hidden rounded-lg mb-4">
          <img
            src="https://images.pexels.com/photos/7319074/pexels-photo-7319074.jpeg"
            alt="Cybersecurity Assessment"
            className="w-full h-full object-cover brightness-75"
          />
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Select one or multiple roles to begin the assessment. Each role offers unique perspectives and responsibilities in cybersecurity incident response.
          </p>
        </div>

        <div className="flex-grow overflow-hidden">
          <div className="h-full overflow-y-auto space-y-3 pr-2">
            {roles.map((role) => (
              <div
                key={role}
                className="p-3 rounded-lg bg-gray-100 dark:bg-black backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{role}</h4>
                    </div>
                    <button
                      onClick={() => toggleRole(role)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border-2 transition-colors ${
                        selectedRoles.includes(role)
                          ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                          : 'bg-white dark:bg-black text-black dark:text-white border-black dark:border-white'
                      }`}
                    >
                      {selectedRoles.includes(role) ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedRoles.length > 0 && (
          <div className="mt-4">
            <button
              onClick={handleStartAssessment}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white rounded-full text-sm font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors w-full justify-center"
            >
              Start Assessment ({selectedRoles.length} {selectedRoles.length === 1 ? 'role' : 'roles'} selected)
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </BackgroundGradient>
  );
} 