import React, { useState, useCallback } from 'react';
import { Audit, AuditAnswer } from '../../types';
import { AuditCard } from './AuditCard';
import { AuditPreScreen } from './AuditPreScreen';
import { AuditEngine } from './AuditEngine';
import { AuditCompleteScreen } from './AuditCompleteScreen';
import { fetchAnswersForAudit } from '../../lib/api';
import { Loader2, ArchiveRestore } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/cn';

type CheckupView = 'menu' | 'prescreen' | 'engine' | 'complete' | 'loading';
type TabState = 'active' | 'archive';

interface CheckupPageProps {
  audits: Audit[];
  userId: string;
  onAuditComplete: (auditId: string, answers: AuditAnswer[]) => void;
}

export function CheckupPage({ audits, userId, onAuditComplete }: CheckupPageProps) {
  const [view, setView] = useState<CheckupView>('menu');
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);
  const [completedAnswers, setCompletedAnswers] = useState<AuditAnswer[]>([]);
  const [activeTab, setActiveTab] = useState<TabState>('active');
  const [previousAnswers, setPreviousAnswers] = useState<Map<string, AuditAnswer>>(new Map());

  const processingCount = audits.filter((a) => a.status === 'processing').length;
  // Available means 'available', 'in_progress', 'processing'
  const activeAudits = audits.filter((a) => a.status === 'available' || a.status === 'in_progress' || a.status === 'processing');
  const archivedAudits = audits.filter((a) => a.status === 'completed' || a.status === 'archived');

  // Load previous answers from DB and open engine in readOnly mode
  const openWithPreviousAnswers = useCallback(async (audit: Audit) => {
    setSelectedAudit(audit);
    setView('loading');

    try {
      const dbAnswers = await fetchAnswersForAudit(userId, audit.id);
      const answersMap = new Map<string, AuditAnswer>();
      dbAnswers.forEach(a => answersMap.set(a.questionId, a));
      setPreviousAnswers(answersMap);
      setView('engine');
    } catch (err) {
      console.error('Error loading previous answers:', err);
      setView('menu');
    }
  }, [userId]);

  const handleCardClick = useCallback((audit: Audit) => {
    if (audit.status === 'completed' || audit.status === 'archived' || audit.status === 'processing') {
      openWithPreviousAnswers(audit);
      return;
    }
    setSelectedAudit(audit);
    setPreviousAnswers(new Map());
    setView('prescreen');
  }, [openWithPreviousAnswers]);

  const handleStart = useCallback(() => {
    setView('engine');
  }, []);

  const handleComplete = useCallback((answers: AuditAnswer[]) => {
    setCompletedAnswers(answers);
    setView('complete');
    if (selectedAudit) {
      onAuditComplete(selectedAudit.id, answers);
    }
  }, [selectedAudit, onAuditComplete]);

  const handleBack = useCallback(() => {
    setView('menu');
    setSelectedAudit(null);
    setPreviousAnswers(new Map());
  }, []);

  const handleCompleteClose = useCallback(() => {
    setView('menu');
    setSelectedAudit(null);
    setCompletedAnswers([]);
  }, []);

  const handleStrategyStart = useCallback(() => {
    // Find the specific strategy audit from the database list
    const strategyAudit = audits.find(a => a.id === 'strategy-audit-001');
    if (strategyAudit) {
      // If already completed/processing, show previous answers
      if (strategyAudit.status === 'completed' || strategyAudit.status === 'archived' || strategyAudit.status === 'processing') {
        openWithPreviousAnswers(strategyAudit);
      } else {
        setSelectedAudit(strategyAudit);
        setPreviousAnswers(new Map());
        setView('engine');
      }
    } else {
      alert('Стратегический аудит не найден в базе данных. Пожалуйста, убедитесь, что SQL скрипт выполнен.');
    }
  }, [audits, openWithPreviousAnswers]);

  // Framer motion variants for view transitions
  const viewVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  // Loading view
  if (view === 'loading') {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-8 h-8 text-slate-400 animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-500 font-medium">Загрузка ответов...</p>
      </div>
    );
  }

  // Render based on current view
  if (view === 'prescreen' && selectedAudit) {
    return (
      <motion.div variants={viewVariants} initial="initial" animate="animate" exit="exit" className="h-full">
        <AuditPreScreen audit={selectedAudit} onStart={handleStart} onBack={handleBack} />
      </motion.div>
    );
  }

  if (view === 'engine' && selectedAudit) {
    return (
      <motion.div variants={viewVariants} initial="initial" animate="animate" exit="exit" className="h-full">
        <AuditEngine
          questions={selectedAudit.questions}
          onComplete={handleComplete}
          onBack={handleBack}
          initialAnswers={previousAnswers.size > 0 ? previousAnswers : undefined}
        />
      </motion.div>
    );
  }

  if (view === 'complete' && selectedAudit) {
    return <AuditCompleteScreen audit={selectedAudit} answers={completedAnswers} onClose={handleCompleteClose} />;
  }

  // Menu view with swipeable active/archive tabs
  return (
    <motion.div
      variants={viewVariants} initial="initial" animate="animate" exit="exit"
      className="min-h-screen px-4 md:px-8 py-6 md:py-8 flex flex-col"
    >
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">CheckUP Service</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Аудиты для вашего бизнеса</p>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="flex p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={cn(
              "flex-1 py-1.5 text-sm font-medium rounded-lg transition-all",
              activeTab === 'active'
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            Текущие ({activeAudits.length})
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            className={cn(
              "flex-1 py-1.5 text-sm font-medium rounded-lg transition-all",
              activeTab === 'archive'
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            Архив ({archivedAudits.length})
          </button>
        </div>

        {/* Swipeable Container */}
        <div className="flex-1 w-full overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === 'active' ? (
              <motion.div
                key="active"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -50 || velocity.x < -500) setActiveTab('archive');
                }}
                className="w-full absolute inset-0 overflow-y-auto pb-24 scrollbar-hide"
              >
                {/* Processing notice */}
                {processingCount > 0 && (
                  <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 px-4 py-3 rounded-2xl mb-6">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm font-medium">
                      {processingCount} {processingCount === 1 ? 'аудит' : 'аудита'} в обработке
                    </span>
                  </div>
                )}

                {/* Strategy Audit Dedicated Card */}
                <div
                  onClick={handleStrategyStart}
                  className="mb-8 p-6 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white shadow-xl shadow-slate-900/10 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Стратегический аудит</h3>
                  <p className="text-slate-300 text-sm max-w-sm">
                    Анализ стратегических целей и возможности их достижения.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300">
                    Начать аудит &rarr;
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Стандартные аудиты</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeAudits.filter(a => a.id !== 'strategy-audit-001').map((audit) => (
                    <AuditCard key={audit.id} audit={audit} onClick={handleCardClick} />
                  ))}
                </div>
                {activeAudits.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-slate-400 dark:text-slate-500 text-sm">Нет активных аудитов</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="archive"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe > 50 || velocity.x > 500) setActiveTab('active');
                }}
                className="w-full absolute inset-0 overflow-y-auto pb-24 scrollbar-hide"
              >
                <div className="grid grid-cols-1 gap-4 opacity-80">
                  {archivedAudits.map((audit) => (
                    <AuditCard key={audit.id} audit={audit} onClick={handleCardClick} />
                  ))}
                </div>
                {archivedAudits.length === 0 && (
                  <div className="text-center py-20 flex flex-col items-center gap-3">
                    <ArchiveRestore size={32} className="text-slate-300 dark:text-slate-700" />
                    <p className="text-slate-400 dark:text-slate-500 text-sm">Архив пуст</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
