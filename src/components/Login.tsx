import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

interface LoginProps {
  onLogin: (name: string, className: string) => void;
}

const classes = ['7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7', '7.8', '7.9', '7.10'];

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState(classes[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim(), selectedClass);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
            <BookOpen size={48} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">Toán Học 7</h1>
        <p className="text-center text-slate-500 mb-8">Trắc nghiệm & Tự luận</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Họ và tên</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Nhập họ và tên của bạn"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Lớp</label>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
            >
              {classes.map(c => (
                <option key={c} value={c}>Lớp {c}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-md hover:shadow-lg"
          >
            Bắt đầu làm bài
          </button>
        </form>
      </motion.div>
    </div>
  );
};
