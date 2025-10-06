'use client';

import { useState } from 'react';

interface Thought {
  id: number;
  text: string;
  encouragement: string;
}

const encouragements = [
  "당신은 충분히 잘하고 있어요! 💪",
  "포기하지 마세요. 당신은 강합니다! ✨",
  "오늘도 최선을 다하는 당신이 자랑스러워요! 🌟",
  "작은 발걸음도 결국 큰 여정이 됩니다! 🚀",
  "당신의 노력은 반드시 빛을 발할 거예요! 💫",
  "힘든 시간도 지나갑니다. 화이팅! 🔥",
  "당신은 생각보다 훨씬 강한 사람입니다! 💎",
  "매일이 새로운 시작이에요! 🌅",
  "당신의 가능성은 무한합니다! 🌈",
  "지금 이 순간도 성장하고 있어요! 🌱"
];

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentEncouragement, setCurrentEncouragement] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

    const newThought: Thought = {
      id: Date.now(),
      text: inputText,
      encouragement: randomEncouragement
    };

    setThoughts([newThought, ...thoughts]);
    setCurrentEncouragement(randomEncouragement);
    setShowPopup(true);
    setInputText('');

    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            동기 부여 시트
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            당신의 생각을 공유하고 격려를 받아보세요
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="지금 어떤 생각을 하고 계신가요?"
              className="w-full px-4 py-3 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-all"
              rows={4}
            />
            <button
              type="submit"
              className="mt-4 w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputText.trim()}
            >
              격려해 주세요
            </button>
          </div>
        </form>

        {/* Thoughts List */}
        <div className="space-y-4">
          {thoughts.map((thought) => (
            <div
              key={thought.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200"
            >
              <p className="text-gray-800 dark:text-gray-200 text-lg mb-4">
                {thought.text}
              </p>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-purple-600 dark:text-purple-400 font-medium">
                  {thought.encouragement}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {thoughts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 dark:text-gray-600 text-lg">
              아직 작성된 생각이 없습니다. 첫 번째 생각을 공유해보세요!
            </p>
          </div>
        )}
      </div>

      {/* Encouragement Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          />
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full border-2 border-purple-200 dark:border-purple-700 animate-[scale-in_0.3s_ease-out]">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                응원합니다!
              </h3>
              <p className="text-xl text-purple-600 dark:text-purple-400 font-medium">
                {currentEncouragement}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
