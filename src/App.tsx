import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { generateQuestions, Question } from './data/questions';

type GameState = 'login' | 'playing' | 'results';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('login');
  const [studentInfo, setStudentInfo] = useState({ name: '', className: '' });
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleLogin = (name: string, className: string) => {
    setStudentInfo({ name, className });
    setGameState('playing');
  };

  const handleComplete = (finalAnswers: Record<string, any>, finalScore: number) => {
    setAnswers(finalAnswers);
    setScore(finalScore);
    setGameState('results');
  };

  const handleRetry = () => {
    setAnswers({});
    setScore(0);
    setQuestions(generateQuestions());
    setGameState('playing');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {gameState === 'login' && <Login onLogin={handleLogin} />}
      {gameState === 'playing' && (
        <Quiz 
          questions={questions} 
          onComplete={handleComplete} 
        />
      )}
      {gameState === 'results' && (
        <Results 
          studentInfo={studentInfo}
          score={score}
          totalQuestions={questions.length}
          answers={answers}
          questions={questions}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
