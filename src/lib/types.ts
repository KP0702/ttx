export interface Question {
  id: string;
  text: string;
  options: string[];
}

export interface Answer {
  questionId: string;
  answer: string;
}

export interface UserSession {
  id: string;
  userType: 'user' | 'admin';
  currentQuestion: Question | null;
  answers: Answer[];
} 