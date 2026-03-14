import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, MultipleChoiceQuestion, TrueFalseQuestion, ShortAnswerQuestion } from '../data/questions';
import { MathText } from './MathText';
import { playSound } from '../utils/audio';
import { shuffleArray } from '../utils/shuffle';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface QuizProps {
  questions: Question[];
  onComplete: (answers: Record<string, any>, score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const question = questions[currentIndex];

  useEffect(() => {
    if (question.type === 'multiple-choice') {
      setShuffledOptions(shuffleArray((question as MultipleChoiceQuestion).options));
    }
  }, [question]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
      setIsCorrect(null);
    } else {
      // Calculate final score
      let score = 0;
      questions.forEach(q => {
        const answer = answers[q.id];
        if (q.type === 'multiple-choice') {
          if (answer === (q as MultipleChoiceQuestion).correctAnswer) score += 1;
        } else if (q.type === 'true-false') {
          let allCorrect = true;
          (q as TrueFalseQuestion).statements.forEach((stmt, idx) => {
            if (answer && answer[idx] !== stmt.isTrue) allCorrect = false;
            if (!answer || answer[idx] === undefined) allCorrect = false;
          });
          if (allCorrect) score += 1;
        } else if (q.type === 'short-answer') {
          if (answer && answer.trim().toLowerCase() === (q as ShortAnswerQuestion).correctAnswer.toLowerCase()) score += 1;
        }
      });
      onComplete(answers, score);
    }
  };

  const checkAnswer = (currentAnswer: any) => {
    let correct = false;
    if (question.type === 'multiple-choice') {
      correct = currentAnswer === (question as MultipleChoiceQuestion).correctAnswer;
    } else if (question.type === 'true-false') {
      let allCorrect = true;
      (question as TrueFalseQuestion).statements.forEach((stmt, idx) => {
        if (currentAnswer[idx] !== stmt.isTrue) allCorrect = false;
        if (currentAnswer[idx] === undefined) allCorrect = false;
      });
      correct = allCorrect;
    } else if (question.type === 'short-answer') {
      correct = currentAnswer.trim().toLowerCase() === (question as ShortAnswerQuestion).correctAnswer.toLowerCase();
    }

    setIsCorrect(correct);
    if (correct) {
      playSound('correct');
    } else {
      playSound('incorrect');
    }
    setShowExplanation(true);
  };

  const handleMultipleChoice = (option: string) => {
    if (showExplanation) return;
    const newAnswers = { ...answers, [question.id]: option };
    setAnswers(newAnswers);
    checkAnswer(option);
  };

  const handleTrueFalse = (statementIndex: number, value: boolean) => {
    if (showExplanation) return;
    const currentAnswer = answers[question.id] || {};
    const newAnswer = { ...currentAnswer, [statementIndex]: value };
    setAnswers({ ...answers, [question.id]: newAnswer });
    
    // Check if all statements are answered
    if (Object.keys(newAnswer).length === (question as TrueFalseQuestion).statements.length) {
      checkAnswer(newAnswer);
    }
  };

  const handleShortAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showExplanation) return;
    const currentAnswer = answers[question.id] || '';
    if (currentAnswer.trim()) {
      checkAnswer(currentAnswer);
    }
  };

  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
            <span>Câu hỏi {currentIndex + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          >
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full mb-4 uppercase tracking-wide">
                {question.type === 'multiple-choice' ? 'Trắc nghiệm' : 
                 question.type === 'true-false' ? 'Đúng / Sai' : 'Tự luận ngắn'}
              </span>
              <h2 className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed">
                <MathText text={question.text} />
              </h2>
              {question.svg && (
                <div className="mt-6 flex justify-center text-slate-700">
                  {question.svg}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {question.type === 'multiple-choice' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {shuffledOptions.map((option, idx) => {
                    const isSelected = answers[question.id] === option;
                    const isCorrectOption = option === (question as MultipleChoiceQuestion).correctAnswer;
                    
                    let buttonClass = "p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden ";
                    
                    if (!showExplanation) {
                      buttonClass += "border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-700";
                    } else {
                      if (isCorrectOption) {
                        buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-800";
                      } else if (isSelected) {
                        buttonClass += "border-rose-500 bg-rose-50 text-rose-800";
                      } else {
                        buttonClass += "border-slate-200 opacity-50 text-slate-500";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleMultipleChoice(option)}
                        disabled={showExplanation}
                        className={buttonClass}
                      >
                        <div className="flex items-center">
                          <span className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center mr-3 font-semibold text-slate-500 shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <MathText text={option} />
                        </div>
                        {showExplanation && isCorrectOption && (
                          <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                        )}
                        {showExplanation && isSelected && !isCorrectOption && (
                          <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {question.type === 'true-false' && (
                <div className="space-y-4">
                  {(question as TrueFalseQuestion).statements.map((stmt, idx) => {
                    const currentAnswer = answers[question.id]?.[idx];
                    const isAnswered = currentAnswer !== undefined;
                    
                    return (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border-2 border-slate-200 bg-slate-50 gap-4">
                        <div className="flex-1">
                          <span className="font-medium mr-2">{String.fromCharCode(97 + idx)})</span>
                          <MathText text={stmt.text} />
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => handleTrueFalse(idx, true)}
                            disabled={showExplanation}
                            className={`px-6 py-2 rounded-lg font-medium border-2 transition-colors ${
                              currentAnswer === true 
                                ? showExplanation 
                                  ? stmt.isTrue ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                                  : 'bg-indigo-600 border-indigo-600 text-white'
                                : 'bg-white border-slate-300 text-slate-600 hover:border-indigo-400'
                            } ${showExplanation && stmt.isTrue && currentAnswer !== true ? 'border-emerald-500 text-emerald-600' : ''}`}
                          >
                            Đúng
                          </button>
                          <button
                            onClick={() => handleTrueFalse(idx, false)}
                            disabled={showExplanation}
                            className={`px-6 py-2 rounded-lg font-medium border-2 transition-colors ${
                              currentAnswer === false 
                                ? showExplanation 
                                  ? !stmt.isTrue ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                                  : 'bg-indigo-600 border-indigo-600 text-white'
                                : 'bg-white border-slate-300 text-slate-600 hover:border-indigo-400'
                            } ${showExplanation && !stmt.isTrue && currentAnswer !== false ? 'border-emerald-500 text-emerald-600' : ''}`}
                          >
                            Sai
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {question.type === 'short-answer' && (
                <form onSubmit={handleShortAnswerSubmit} className="mt-4">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={answers[question.id] || ''}
                      onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                      disabled={showExplanation}
                      placeholder="Nhập câu trả lời của bạn..."
                      className={`flex-1 px-4 py-3 rounded-xl border-2 outline-none transition-colors text-lg ${
                        showExplanation 
                          ? isCorrect 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                            : 'border-rose-500 bg-rose-50 text-rose-800'
                          : 'border-slate-200 focus:border-indigo-500'
                      }`}
                    />
                    {!showExplanation && (
                      <button 
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Trả lời
                      </button>
                    )}
                  </div>
                  {showExplanation && !isCorrect && (
                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800">
                      <span className="font-semibold">Đáp án đúng: </span>
                      <MathText text={(question as ShortAnswerQuestion).correctAnswer} />
                    </div>
                  )}
                </form>
              )}
            </div>

            {showExplanation && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 pt-6 border-t border-slate-200"
              >
                <div className={`p-4 rounded-xl mb-6 ${isCorrect ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                  <div className="flex items-center gap-2 mb-2 font-semibold text-lg">
                    {isCorrect ? <CheckCircle2 /> : <XCircle />}
                    {isCorrect ? 'Chính xác!' : 'Chưa chính xác!'}
                  </div>
                  <div className="text-slate-700 mt-4 whitespace-pre-line leading-relaxed">
                    <span className="font-semibold block mb-2 text-slate-800">Giải thích:</span>
                    <MathText text={question.explanation} />
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-md"
                >
                  {currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
