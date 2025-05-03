import React, { useEffect, useState } from 'react';
import { socketService } from '../lib/socket';
import { Question } from '../lib/types';
import { Question as RoleQuestion } from '../lib/roleData';

interface RealTimeQuizProps {
  questions: RoleQuestion[];
  onAnswerSubmit: (questionId: string, answer: string, isCorrect: boolean) => void;
  userType: 'user' | 'admin';
}

export const RealTimeQuiz: React.FC<RealTimeQuizProps> = ({
  questions,
  onAnswerSubmit,
  userType
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; answer: string }[]>([]);

  useEffect(() => {
    socketService.connect(userType);

    if (userType === 'admin') {
      socketService.onAnswerUpdate((data) => {
        setAnswers((prevAnswers) => [...prevAnswers, data]);
        setCurrentQuestionIndex((prev) => prev + 1);
      });
    }

    return () => socketService.disconnect();
  }, [userType]);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswer = {
      questionId: currentQuestion.question,
      answer
    };

    setAnswers([...answers, newAnswer]);
    socketService.sendAnswer(currentQuestion.question, answer);

    // Check if answer is correct
    const isCorrect = answer === currentQuestion.options[currentQuestion.correctAnswer];
    onAnswerSubmit(currentQuestion.question, answer, isCorrect);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {userType === 'user' ? 'Quiz View' : 'Admin View'}
      </h1>
      {currentQuestion && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {currentQuestion.scenario && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Scenario:</h3>
              <p className="text-gray-700">{currentQuestion.scenario}</p>
            </div>
          )}
          <h2 className="text-xl mb-4">{currentQuestion.question}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  userType === 'admin' && answers.find(a => a.questionId === currentQuestion.question)?.answer === option
                    ? 'bg-green-100 border-green-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {currentQuestion.hints && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Hints:</h3>
              <ul className="list-disc list-inside">
                {currentQuestion.hints.map((hint, index) => (
                  <li key={index} className="text-gray-700">{hint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {currentQuestionIndex === questions.length && (
        <div className="text-center text-xl font-semibold text-green-600">
          All questions completed!
        </div>
      )}
    </div>
  );
}; 