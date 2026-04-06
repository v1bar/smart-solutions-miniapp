import React, { useEffect } from 'react';
import { Audit, AuditAnswer } from '../../types';
import { CheckCircle2, Target, ArrowRight, PartyPopper } from 'lucide-react';
import { telegram } from '../../lib/telegram';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface AuditCompleteScreenProps {
  audit: Audit;
  answers: AuditAnswer[];
  onClose: () => void;
}

export function AuditCompleteScreen({ audit, answers: _answers, onClose }: AuditCompleteScreenProps) {
  useEffect(() => {
    // Trigger confetti when screen mounts
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleClose = () => {
    telegram.hapticSuccess();
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-6"
    >
      <div className="max-w-sm w-full text-center space-y-8">
        {/* Success icon */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mx-auto w-24 h-24"
        >
          <div className="absolute inset-0 bg-emerald-400/20 dark:bg-emerald-400/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
          <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          {/* Confetti decorations */}
          <PartyPopper size={24} className="absolute -top-2 -right-4 text-amber-400 animate-bounce" />
        </motion.div>

        {/* Congrats text */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Отлично! 🎉
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Аудит «{audit.title}» пройден
          </p>
        </motion.div>

        {/* Goal progress card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4"
        >
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Target size={18} />
            <span className="text-sm font-semibold uppercase tracking-wide">Ваша цель</span>
          </div>
          <p className="text-base font-medium text-slate-800 dark:text-slate-200">
            {audit.goalDescription}
          </p>
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '33%' }}
              transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" 
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Первый шаг выполнен — мы уже анализируем ваши данные
          </p>
        </motion.div>

        {/* Info */}
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-slate-500 dark:text-slate-400"
        >
          Наша команда получила ваши ответы и приступает к обработке. Вы получите уведомление, когда результаты будут готовы.
        </motion.p>

        {/* Back button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={handleClose}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all duration-200 active:scale-[0.98]"
        >
          Вернуться в меню
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}
