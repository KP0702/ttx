import React, { useState } from 'react';
import { ViewSelector } from './components/ViewSelector';
import { Layout } from './components/Layout';
import { ViewType } from './types/view';
import { RealTimeAssessment } from './components/RealTimeAssessment';
import { RoleSelection } from './components/RoleSelection';
import { Question, riskCards } from './lib/roleData';
import { RealTimeQuiz } from './components/RealTimeQuiz';

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '123';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('user');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleViewChange = (newView: ViewType) => {
    setView(newView);
  };

  const handleStartAssessment = (roles: string[]) => {
    setSelectedRoles(roles);
    setAssessmentStarted(true);
  };

  // Get all questions from all risk cards and filter based on selected roles
  const filteredQuestions = riskCards
    .flatMap(card => card.questions)
    .filter((q: Question) => selectedRoles.includes(q.role));

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === ADMIN_EMAIL && adminPassword === ADMIN_PASSWORD) {
      setAdminAuthenticated(true);
      setShowAdminLogin(false);
      setAdminError('');
    } else {
      setAdminError('Invalid credentials');
    }
  };

  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
    setAdminEmail('');
    setAdminPassword('');
  };

  if (!assessmentStarted) {
    return (
      <Layout>
        <RoleSelection onStartAssessment={handleStartAssessment} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <ViewSelector currentView={view} onViewChange={handleViewChange} />
        <div className="bg-white rounded-xl shadow-lg p-6">
          <RealTimeAssessment
            selectedRoles={selectedRoles}
            questions={filteredQuestions}
            userType={view}
          />
        </div>
      </div>
    </Layout>
  );
};

export default App;