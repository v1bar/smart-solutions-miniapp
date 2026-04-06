import React, { useEffect, useState } from 'react';
import { Audit, AuditAnswer } from '../../types';
import { ArrowLeft, CheckCircle2, Loader2, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchAnswersForAudit } from '../../lib/api';

interface AuditResultsViewerProps {
  audit: Audit;
  userId: string;
  onBack: () => void;
}

export function AuditResultsViewer({ audit, userId, onBack }: AuditResultsViewerProps) {
  const [answers, setAnswers] = useState<AuditAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAnswersForAudit(userId, audit.id);
        setAnswers(data);
      } catch (err) {
        console.error('Error fetching answers', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [audit.id, userId]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col md:relative md:inset-auto md:z-auto md:h-full"
    >
      {/* Header */}
      <div className="flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Результаты аудита</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{audit.title}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 flex items-start gap-3">
            <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400">Аудит завершен</h3>
              <p className="text-sm text-emerald-700 dark:text-emerald-500/80 mt-1">
                Ответы сохранены. Аналитика и персональные решения доступны в разделе Solutions.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-2">Ваши ответы</h3>
            
            {isLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
              </div>
            ) : audit.questions.length > 0 ? (
              audit.questions.map((q, index) => {
                const ans = answers.find(a => a.questionId === q.id);
                return (
                  <div key={q.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Вопрос {index + 1}</p>
                    <p className="text-base font-medium text-slate-900 dark:text-white">{q.title}</p>
                    <div className="pt-2">
                      <div className="inline-block bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-700">
                        <div className="text-sm text-slate-700 dark:text-slate-300">
                          {!ans ? (
                            <span className="opacity-50">Нет ответа</span>
                          ) : q.type === 'slider' ? (
                            <span className="font-semibold">{ans.sliderValue} {q.sliderUnit}</span>
                          ) : q.type === 'text_input' ? (
                            <span>{ans.textValue}</span>
                          ) : q.type === 'voice_input' ? (
                            <div className="flex items-center gap-2 text-blue-600">
                              <PlayCircle size={16} /> <span>Голосовое сообщение ({ans.voiceUrl})</span>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {ans.selectedOptions?.map(optId => {
                                const option = q.options?.find(o => o.id === optId);
                                return option?.label ? (
                                  <div key={optId} className="flex flex-wrap items-center gap-2">
                                    <span className="font-medium">{option.label}</span>
                                  </div>
                                ) : (
                                  <span key={optId}>{optId}</span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-sm text-slate-500">Вопросы не найдены</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
