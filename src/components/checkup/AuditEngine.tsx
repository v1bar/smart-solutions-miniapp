import React, { useState, useCallback, useMemo } from 'react';
import { AuditQuestion, AuditAnswer } from '../../types';
import { cn } from '../../lib/cn';
import { telegram } from '../../lib/telegram';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';

// ==========================================
// Question Type Renderers (Business Style)
// ==========================================

interface QuestionProps {
  question: AuditQuestion;
  answer: AuditAnswer | undefined;
  onAnswer: (answer: AuditAnswer) => void;
}

function SingleChoiceQuestion({ question, answer, onAnswer }: QuestionProps) {
  const selected = answer?.selectedOptions?.[0];
  return (
    <div className="space-y-2">
      {question.options?.map((opt) => (
        <button
          key={opt.id}
          onClick={() => {
            telegram.haptic('light');
            onAnswer({ questionId: question.id, selectedOptions: [opt.id] });
          }}
          className={cn(
            'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left',
            selected === opt.id
              ? 'border-slate-800 dark:border-slate-200 bg-slate-50 dark:bg-slate-900'
              : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-slate-200 dark:hover:border-slate-700'
          )}
        >
          <div className={cn(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
            selected === opt.id ? 'border-slate-800 dark:border-slate-200' : 'border-slate-300 dark:border-slate-700'
          )}>
            {selected === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-200" />}
          </div>
          <span className={cn(
            'text-sm font-medium',
            selected === opt.id ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
          )}>
            {opt.label}
          </span>
        </button>
      ))}
    </div>
  );
}

function MultipleChoiceQuestion({ question, answer, onAnswer }: QuestionProps) {
  const selected = new Set(answer?.selectedOptions ?? []);
  const toggle = (id: string) => {
    telegram.hapticSelection();
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onAnswer({ questionId: question.id, selectedOptions: Array.from(next) });
  };

  return (
    <div className="space-y-2">
      {question.options?.map((opt) => {
        const isSelected = selected.has(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => toggle(opt.id)}
            className={cn(
              'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left',
              isSelected
                ? 'border-slate-800 dark:border-slate-200 bg-slate-50 dark:bg-slate-900'
                : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-slate-200 dark:hover:border-slate-700'
            )}
          >
            <div className={cn(
              'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all',
              isSelected ? 'bg-slate-800 dark:bg-slate-200 border-slate-800 dark:border-slate-200' : 'border-slate-300 dark:border-slate-700'
            )}>
              {isSelected && <Check size={14} className="text-white dark:text-slate-900" />}
            </div>
            <span className={cn(
              'text-sm font-medium',
              isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
            )}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SliderQuestion({ question, answer, onAnswer }: QuestionProps) {
  const min = question.sliderMin ?? 0;
  const max = question.sliderMax ?? 100;
  const step = question.sliderStep ?? 1;
  const value = answer?.sliderValue ?? min;
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="py-2">
      <div className="flex justify-between items-end mb-4">
        <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
          {value.toLocaleString()}
        </span>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {question.sliderUnit || 'млн. руб'}
        </span>
      </div>
      <div className="relative h-10 flex items-center">
        <div className="absolute w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full" />
        <div 
          className="absolute h-1.5 bg-slate-800 dark:bg-slate-200 rounded-full" 
          style={{ width: `${percent}%` }} 
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            const val = Number(e.target.value);
            onAnswer({ questionId: question.id, sliderValue: val });
          }}
          className="absolute w-full h-8 opacity-0 cursor-pointer z-20"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />
        <div 
          className="absolute w-6 h-6 bg-white dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-200 rounded-full shadow-md pointer-events-none transition-transform active:scale-125"
          style={{ left: `calc(${percent}% - 12px)` }}
        />
      </div>
    </div>
  );
}

function TextInputQuestion({ question, answer, onAnswer }: QuestionProps) {
  return (
    <textarea
      value={answer?.textValue ?? ''}
      onChange={(e) => onAnswer({ questionId: question.id, textValue: e.target.value })}
      placeholder="Введите ваш ответ..."
      rows={3}
      className="w-full p-4 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-slate-800 dark:focus:border-slate-300 transition-colors"
    />
  );
}

// ==========================================
// Main Audit Engine (Group-Based)
// ==========================================

interface AuditEngineProps {
  questions: AuditQuestion[];
  onComplete: (answers: AuditAnswer[]) => void;
  onBack: () => void;
}

export function AuditEngine({ questions, onComplete, onBack }: AuditEngineProps) {
  // Group questions by groupTitle
  const groups = useMemo(() => {
    const map = new Map<string, { title: string, description?: string, questions: AuditQuestion[] }>();
    let currentGroup = 'Default';
    
    questions.forEach(q => {
      const gTitle = q.groupTitle || 'Без названия';
      if (!map.has(gTitle)) {
        map.set(gTitle, {
          title: gTitle,
          description: q.groupDescription,
          questions: []
        });
      }
      map.get(gTitle)!.questions.push(q);
    });
    
    return Array.from(map.values());
  }, [questions]);

  const [groupIndex, setGroupIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [answers, setAnswers] = useState<Map<string, AuditAnswer>>(new Map());

  const currentGroup = groups[groupIndex];
  
  const handleAnswer = useCallback((answer: AuditAnswer) => {
    setAnswers((prev) => {
      const next = new Map(prev);
      next.set(answer.questionId, answer);
      return next;
    });
  }, []);

  const totalQuestions = questions.length;
  const answeredCount = Array.from(answers.values()).filter(a => {
    const q = questions.find(qu => qu.id === a.questionId);
    if (!q) return false;
    if (q.type === 'slider') return a.sliderValue !== undefined;
    if (q.type === 'text_input') return (a.textValue?.trim().length ?? 0) > 0;
    return (a.selectedOptions?.length ?? 0) > 0;
  }).length;
  
  const progress = (answeredCount / totalQuestions) * 100;

  const isCurrentGroupComplete = useMemo(() => {
    if (!currentGroup) return false;
    return currentGroup.questions.every(q => {
      const a = answers.get(q.id);
      if (!a) return false;
      if (q.type === 'slider') return a.sliderValue !== undefined;
      if (q.type === 'text_input') return (a.textValue?.trim().length ?? 0) > 0;
      return (a.selectedOptions?.length ?? 0) > 0;
    });
  }, [currentGroup, answers]);

  const handleNext = () => {
    telegram.haptic('light');
    if (showIntro) {
      setShowIntro(false);
      window.scrollTo(0, 0);
    } else {
      if (groupIndex === groups.length - 1) {
        onComplete(Array.from(answers.values()));
      } else {
        setGroupIndex(prev => prev + 1);
        setShowIntro(true);
        window.scrollTo(0, 0);
      }
    }
  };

  const handlePrev = () => {
    telegram.haptic('light');
    if (!showIntro) {
      setShowIntro(true);
    } else if (groupIndex > 0) {
      setGroupIndex(prev => prev - 1);
      setShowIntro(false);
    } else {
      onBack();
    }
  };

  const renderQuestion = (question: AuditQuestion) => {
    const props: QuestionProps = { 
      question, 
      answer: answers.get(question.id), 
      onAnswer: handleAnswer 
    };
    switch (question.type) {
      case 'single_choice': return <SingleChoiceQuestion {...props} />;
      case 'multiple_choice': return <MultipleChoiceQuestion {...props} />;
      case 'slider': return <SliderQuestion {...props} />;
      case 'text_input': return <TextInputQuestion {...props} />;
      default: return null;
    }
  };

  if (!currentGroup) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Progress Header */}
      {!showIntro && (
        <div className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-4 py-3 border-b border-slate-100 dark:border-slate-900">
          <div className="flex items-center justify-between mb-2">
            <button onClick={handlePrev} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              ← Назад
            </button>
            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">
              Прогресс: {Math.round(progress)}%
            </span>
          </div>
          <div className="h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-900 dark:bg-slate-100 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl mx-auto">
          {showIntro ? (
            <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                Уровень {groupIndex + 1} из {groups.length}
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                {currentGroup.title}
              </h1>
              {currentGroup.description && (
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {currentGroup.description}
                </p>
              )}
              <div className="pt-6">
                <button
                  onClick={handleNext}
                  className="group flex items-center justify-center gap-2 mx-auto px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-lg shadow-2xl shadow-slate-200 dark:shadow-none transition-all active:scale-95"
                >
                  Приступить
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                {groupIndex === 0 && (
                  <button onClick={onBack} className="mt-6 text-sm font-semibold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    Отменить опрос
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-12 animate-in fade-in duration-500">
              {currentGroup.questions.map((q, idx) => (
                <div key={q.id} className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">Вопрос {q.sortOrder}</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                      {q.title}
                    </h3>
                  </div>
                  {renderQuestion(q)}
                  {q.subtitle && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 italic font-medium pl-1 border-l-2 border-slate-100 dark:border-slate-800 py-1">
                      {q.subtitle}
                    </p>
                  )}
                </div>
              ))}

              <div className="pt-10 flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  className="flex-1 py-5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-400 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={16} />
                  Назад
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isCurrentGroupComplete}
                  className={cn(
                    "flex-[2] py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2",
                    isCurrentGroupComplete 
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-slate-200 dark:shadow-none" 
                      : "bg-slate-100 dark:bg-slate-900 text-slate-300 dark:text-slate-700 cursor-not-allowed border-0"
                  )}
                >
                  {groupIndex === groups.length - 1 ? 'Завершить аудит' : 'Следующий уровень'}
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
