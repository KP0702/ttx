import { Building2, Banknote, Bell, Users, MessageSquare, Target, Shield, AlertTriangle, Lock, BookOpen, CheckCircle } from 'lucide-react';
import riskCardsData from '../data/riskCards.json';

export interface Question {
  question: string;
  scenario: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hints: string[];
  role: string;
}

export interface RiskCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  impact: string;
  questions: Question[];
  roles: string[];
}

export const roles = ['CFO', 'Marketing', 'IT System', 'Legal Division'];

// Import risk cards from JSON file
export const riskCards: RiskCard[] = riskCardsData.riskCards; 