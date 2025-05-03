import React, { useState, useEffect } from 'react';
import { RealTimeQuiz } from './RealTimeQuiz';
import { Analytics } from './Analytics';
import { Question, RiskCard, riskCards } from '../lib/roleData';
import { assessmentStore } from '../lib/assessmentStore';

interface RealTimeAssessmentProps {
  selectedRoles: string[];
  questions: Question[];
  userType: 'user' | 'admin';
}

interface CardSummary {
  cardId: string;
  cardTitle: string;
  correctAnswersCount: number;
  totalQuestions: number;
  score: number;
  wrongAnswers: {
    question: string;
    correctAnswer: string;
    userAnswer: string;
  }[];
  correctAnswersList: {
    question: string;
    answer: string;
  }[];
}

export const RealTimeAssessment: React.FC<RealTimeAssessmentProps> = ({
  selectedRoles,
  questions,
  userType
}) => {
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [hintCounts, setHintCounts] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showCardSummary, setShowCardSummary] = useState(false);
  const [cardSummaries, setCardSummaries] = useState<CardSummary[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; answer: string }[]>([]);

  const handleAnswerSubmit = (questionId: string, answer: string, isCorrect: boolean) => {
    setAnsweredQuestions(prev => [...prev, isCorrect]);
    setTotalScore(prev => prev + (isCorrect ? 5 : 0));
    setUserAnswers(prev => [...prev, { questionId, answer }]);
  };

  const handleHintUse = (questionIndex: number) => {
    setHintCounts(prev => {
      const newCounts = [...prev];
      newCounts[questionIndex] = (newCounts[questionIndex] || 0) + 1;
      return newCounts;
    });
  };

  const handleNextCard = () => {
    if (currentCardIndex < riskCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowCardSummary(false);
      setAnsweredQuestions([]);
      setUserAnswers([]);
      setHintCounts([]);
    } else {
      setShowAnalytics(true);
    }
  };

  useEffect(() => {
    const currentCard = riskCards[currentCardIndex];
    const cardQuestions = currentCard.questions;

    if (answeredQuestions.length === cardQuestions.length) {
      // Create summary for current card
      const summary: CardSummary = {
        cardId: currentCard.id,
        cardTitle: currentCard.title,
        correctAnswersCount: answeredQuestions.filter(Boolean).length,
        totalQuestions: cardQuestions.length,
        score: (answeredQuestions.filter(Boolean).length / cardQuestions.length) * 100,
        wrongAnswers: userAnswers
          .filter((_, index) => !answeredQuestions[index])
          .map((ua, index) => ({
            question: cardQuestions[index].question,
            correctAnswer: cardQuestions[index].options[cardQuestions[index].correctAnswer],
            userAnswer: ua.answer
          })),
        correctAnswersList: userAnswers
          .filter((_, index) => answeredQuestions[index])
          .map((ua, index) => ({
            question: cardQuestions[index].question,
            answer: ua.answer
          }))
      };

      setCardSummaries(prev => [...prev, summary]);
      setShowCardSummary(true);
    }
  }, [answeredQuestions, currentCardIndex]);

  if (showAnalytics) {
    return (
      <Analytics
        answeredQuestions={answeredQuestions}
        hintCounts={hintCounts}
        currentRiskCardQuestions={questions}
        selectedRoles={selectedRoles}
        totalScore={totalScore}
      />
    );
  }

  if (showCardSummary) {
    const currentSummary = cardSummaries[currentCardIndex];
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">{currentSummary.cardTitle} - Summary</h2>
        
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Score: {currentSummary.score.toFixed(1)}%</h3>
          <p className="text-gray-700">
            Correct Answers: {currentSummary.correctAnswersCount} / {currentSummary.totalQuestions}
          </p>
        </div>

        {currentSummary.wrongAnswers.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Areas for Improvement</h3>
            <div className="space-y-4">
              {currentSummary.wrongAnswers.map((wrong, index) => (
                <div key={index} className="p-4 bg-red-50 rounded-lg">
                  <p className="font-medium mb-2">{wrong.question}</p>
                  <p className="text-sm text-gray-600">Your answer: {wrong.userAnswer}</p>
                  <p className="text-sm text-green-600">Correct answer: {wrong.correctAnswer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentSummary.correctAnswersList.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-green-600">Correct Answers</h3>
            <div className="space-y-4">
              {currentSummary.correctAnswersList.map((correct, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg">
                  <p className="font-medium mb-2">{correct.question}</p>
                  <p className="text-sm text-gray-600">Your answer: {correct.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleNextCard}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {currentCardIndex < riskCards.length - 1 ? 'Next Risk Card' : 'View Final Analytics'}
        </button>
      </div>
    );
  }

  return (
    <RealTimeQuiz
      questions={questions}
      onAnswerSubmit={handleAnswerSubmit}
      userType={userType}
    />
  );
}; 