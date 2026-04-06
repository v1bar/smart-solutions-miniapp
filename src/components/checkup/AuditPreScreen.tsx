import React from 'react';
import { Audit } from '../../types';
import { Clock, Target, ArrowRight, Sparkles } from 'lucide-react';
import { telegram } from '../../lib/telegram';

interface AuditPreScreenProps {
  audit: Audit;
  onStart: () => void;
  onBack: () => void;
}

export function AuditPreScreen({ audit, onStart, onBack }: AuditPreScreenProps) {
  const handleStart = () => {
    telegram.haptic('medium');
    onStart();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header with gradient */}
      <div className={`relative bg-gradient-to-br ${audit.coverGradient} px-6 pt-14 pb-10`}>
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-white/80 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
        >
          ← Назад
        </button>
        <h1 className="text-2xl font-bold text-white">{audit.title}</h1>
        <p className="text-base text-white/80 mt-1">{audit.subtitle}</p>
      </div>

      {/* Content card */}
      <div className="flex-1 px-4 -mt-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm p-6 space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-2">
              О чём этот аудит
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {audit.description}
            </p>
          </div>

          {/* Goal */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl">
            <div className="mt-0.5">
              <Target size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Цель</p>
              <p className="text-sm text-slate-800 dark:text-slate-200 mt-0.5">{audit.goalDescription}</p>
            </div>
          </div>

          {/* Result */}
          <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl">
            <div className="mt-0.5">
              <Sparkles size={20} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Результат</p>
              <p className="text-sm text-slate-800 dark:text-slate-200 mt-0.5">
                Персонализированный план действий на основе ваших данных
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Clock size={16} />
            <span className="text-sm">Займёт около {audit.estimatedMinutes} минут</span>
          </div>
        </div>
      </div>

      {/* Start button */}
      <div className="px-4 py-6 pb-safe">
        <button
          onClick={handleStart}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all duration-200 active:scale-[0.98]"
        >
          Начать
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
