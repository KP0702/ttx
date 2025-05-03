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

export const AdminView: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    socketService.connect('admin');

    socketService.onAnswerUpdate((data) => {
      setAnswers((prevAnswers) => [...prevAnswers, data]);
      setCurrentQuestionIndex((prev) => prev + 1);
    });

    return () => socketService.disconnect();
  }, []);

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin View</h1>
      {currentQuestion && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl mb-4">{currentQuestion.text}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div
                key={option}
                className={`w-full p-3 border rounded-lg ${
                  answers.find((a) => a.questionId === currentQuestion.id)?.answer === option
                    ? 'bg-green-100 border-green-500'
                    : 'bg-gray-50'
                }`}
              >
                {option}
              </div>
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