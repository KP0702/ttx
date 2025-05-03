import React, { useEffect, useState } from 'react';
import { socketService } from '../lib/socket';
import { Question, Answer } from '../lib/types';

const sampleQuestions: Question[] = [
  {
    id: '1',
    text: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow']
  },
  {
    id: '2',
    text: 'What is your favorite programming language?',
    options: ['JavaScript', 'Python', 'Java', 'C++']
  }
];

export const UserView: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    socketService.connect('user');
    return () => socketService.disconnect();
  }, []);

  const handleAnswer = (answer: string) => {
    const currentQuestion = sampleQuestions[currentQuestionIndex];
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      answer
    };

    setAnswers([...answers, newAnswer]);
    socketService.sendAnswer(currentQuestion.id, answer);

    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User View</h1>
      {currentQuestion && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl mb-4">{currentQuestion.text}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      {currentQuestionIndex === sampleQuestions.length && (
        <div className="text-center text-xl font-semibold text-green-600">
          All questions completed!
        </div>
      )}
    </div>
  );
}; 