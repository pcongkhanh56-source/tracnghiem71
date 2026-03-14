import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Question, MultipleChoiceQuestion, TrueFalseQuestion, ShortAnswerQuestion } from '../data/questions';
import { MathText } from './MathText';
import { RotateCcw, Trophy, CheckCircle2, XCircle } from 'lucide-react';

interface ResultsProps {
  studentInfo: { name: string; className: string };
  score: number;
  totalQuestions: number;
  answers: Record<string, any>;
  questions: Question[];
  onRetry: () => void;
}

export const Results: React.FC<ResultsProps> = ({ studentInfo, score, totalQuestions, answers, questions, onRetry }) => {
  useEffect(() => {
    const percentage = score / totalQuestions;
    if (percentage > 0.5) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#4f46e5', '#10b981', '#f59e0b']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#4f46e5', '#10b981', '#f59e0b']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [score, totalQuestions]);

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8"
        >
          <div className="bg-indigo-600 p-8 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <Trophy className="mx-auto mb-4 w-20 h-20 text-yellow-400" />
            <h1 className="text-4xl font-bold mb-2">Hoàn thành bài kiểm tra!</h1>
            <p className="text-indigo-100 text-lg">Học sinh: <span className="font-semibold text-white">{studentInfo.name}</span> - Lớp: <span className="font-semibold text-white">{studentInfo.className}</span></p>
          </div>
          
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-40 h-40 rounded-full border-8 border-indigo-100 mb-6 relative">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-indigo-600"
                  strokeDasharray={`${percentage}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-800">{score}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">/ {totalQuestions}</div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {percentage >= 80 ? 'Xuất sắc!' : percentage >= 50 ? 'Khá tốt!' : 'Cần cố gắng hơn!'}
            </h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Bạn đã trả lời đúng {score} trên tổng số {totalQuestions} câu hỏi. Hãy xem lại chi tiết bài làm bên dưới nhé.
            </p>

            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-md hover:shadow-lg"
            >
              <RotateCcw size={20} />
              Làm lại bài
            </button>
          </div>
        </motion.div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 px-2">Chi tiết bài làm</h3>
          
          {questions.map((q, index) => {
            const answer = answers[q.id];
            let isCorrect = false;
            
            if (q.type === 'multiple-choice') {
              isCorrect = answer === (q as MultipleChoiceQuestion).correctAnswer;
            } else if (q.type === 'true-false') {
              let allCorrect = true;
              (q as TrueFalseQuestion).statements.forEach((stmt, idx) => {
                if (answer && answer[idx] !== stmt.isTrue) allCorrect = false;
                if (!answer || answer[idx] === undefined) allCorrect = false;
              });
              isCorrect = allCorrect;
            } else if (q.type === 'short-answer') {
              isCorrect = answer && answer.trim().toLowerCase() === (q as ShortAnswerQuestion).correctAnswer.toLowerCase();
            }

            return (
              <motion.div 
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-sm border-l-4 p-6 ${isCorrect ? 'border-emerald-500' : 'border-rose-500'}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`mt-1 shrink-0 ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Câu {index + 1}</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
                        {q.type === 'multiple-choice' ? 'Trắc nghiệm' : q.type === 'true-false' ? 'Đúng/Sai' : 'Tự luận'}
                      </span>
                    </div>
                    <h4 className="text-lg font-medium text-slate-800 mb-4">
                      <MathText text={q.text} />
                    </h4>
                    
                    {q.svg && (
                      <div className="mb-4 flex justify-center text-slate-700 bg-slate-50 rounded-xl p-4">
                        {q.svg}
                      </div>
                    )}

                    <div className="bg-slate-50 rounded-xl p-4 mb-4">
                      <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Câu trả lời của bạn:</div>
                      {q.type === 'multiple-choice' && (
                        <div className={`font-medium ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {answer ? <MathText text={answer} /> : <span className="italic text-slate-400">Chưa trả lời</span>}
                        </div>
                      )}
                      {q.type === 'true-false' && (
                        <div className="space-y-2">
                          {(q as TrueFalseQuestion).statements.map((stmt, idx) => {
                            const stmtAnswer = answer?.[idx];
                            const isStmtCorrect = stmtAnswer === stmt.isTrue;
                            return (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className={isStmtCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                                  {isStmtCorrect ? <CheckCircle2 size={16} className="mt-0.5" /> : <XCircle size={16} className="mt-0.5" />}
                                </span>
                                <span>
                                  <span className="font-medium mr-1">{String.fromCharCode(97 + idx)})</span>
                                  <MathText text={stmt.text} />
                                  <span className="ml-2 font-semibold">
                                    (Chọn: {stmtAnswer === true ? 'Đúng' : stmtAnswer === false ? 'Sai' : 'Chưa chọn'} - 
                                    Thực tế: {stmt.isTrue ? 'Đúng' : 'Sai'})
                                  </span>
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {q.type === 'short-answer' && (
                        <div className={`font-medium ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {answer || <span className="italic text-slate-400">Chưa trả lời</span>}
                        </div>
                      )}
                    </div>

                    {!isCorrect && (
                      <div className="bg-emerald-50 rounded-xl p-4 mb-4 border border-emerald-100">
                        <div className="text-sm font-semibold text-emerald-800 mb-2 uppercase tracking-wider">Đáp án đúng:</div>
                        <div className="font-medium text-emerald-700">
                          {q.type === 'multiple-choice' && <MathText text={(q as MultipleChoiceQuestion).correctAnswer} />}
                          {q.type === 'short-answer' && <MathText text={(q as ShortAnswerQuestion).correctAnswer} />}
                          {q.type === 'true-false' && <span className="italic">Xem chi tiết từng ý ở trên</span>}
                        </div>
                      </div>
                    )}

                    <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                      <div className="text-sm font-semibold text-indigo-800 mb-2 uppercase tracking-wider">Giải thích chi tiết:</div>
                      <div className="text-indigo-900 leading-relaxed whitespace-pre-line">
                        <MathText text={q.explanation} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
