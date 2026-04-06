import React, { useState, useCallback } from 'react';
import { AuditQuestion, AuditAnswer } from '../../types';
import { cn } from '../../lib/cn';
import { telegram } from '../../lib/telegram';
import { Send, Mic, Check } from 'lucide-react';

// ==========================================
// Question Type Renderers
// ==========================================

interface QuestionProps {
  question: AuditQuestion;
  answer: AuditAnswer | undefined;
  onAnswer: (answer: AuditAnswer) => void;
}

function SingleChoiceQuestion({ question, answer, onAnswer }: QuestionProps) {
  const selected = answer?.selectedOptions?.[0];
  return (
    <div className="space-y-3">
      {question.options?.map((opt) => (
        <button
          key={opt.id}
          onClick={() => {
            telegram.haptic('light');
            onAnswer({ questionId: question.id, selectedOptions: [opt.id] });
          }}
          className={cn(
            'w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 text-left',
            selected === opt.id
              ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'
          )}
        >
          {opt.icon && <span className="text-xl">{opt.icon}</span>}
          <span className={cn(
            'text-sm font-medium flex-1',
            selected === opt.id
              ? 'text-blue-700 dark:text-blue-300'
              : 'text-slate-700 dark:text-slate-300'
          )}>
            {opt.label}
          </span>
          {selected === opt.id && (
            <Check size={18} className="text-blue-600 dark:text-blue-400" />
          )}
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
    <div className="space-y-3">
      {question.options?.map((opt) => {
        const isSelected = selected.has(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => toggle(opt.id)}
            className={cn(
              'w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 text-left',
              isSelected
                ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'
            )}
          >
            {/* Checkbox */}
            <div className={cn(
              'w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0',
              isSelected
                ? 'bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500'
                : 'border-slate-300 dark:border-slate-600'
            )}>
              {isSelected && <Check size={12} className="text-white" />}
            </div>
            {opt.icon && <span className="text-xl">{opt.icon}</span>}
            <span className={cn(
              'text-sm font-medium',
              isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'
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
  const value = answer?.sliderValue ?? Math.round((min + max) / 2);
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-6">
      {/* Value display */}
      <div className="text-center">
        <span className="text-5xl font-bold text-slate-900 dark:text-white tabular-nums">
          {value}
        </span>
        {question.sliderUnit && (
          <span className="text-lg text-slate-500 dark:text-slate-400 ml-2">
            {question.sliderUnit}
          </span>
        )}
      </div>

      {/* Slider */}
      <div className="px-2">
        <div className="relative">
          {/* Track background */}
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 rounded-full transition-all duration-100"
              style={{ width: `${percent}%` }}
            />
          </div>
          {/* Native input */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              onAnswer({ questionId: question.id, sliderValue: Number(e.target.value) });
            }}
            className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-200 rounded-full shadow-md border-2 border-blue-600 dark:border-blue-400 pointer-events-none transition-all duration-100"
            style={{ left: `calc(${percent}% - 12px)` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-400 dark:text-slate-500">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
}

function TextInputQuestion({ question, answer, onAnswer }: QuestionProps) {
  return (
    <textarea
      value={answer?.textValue ?? ''}
      onChange={(e) => onAnswer({ questionId: question.id, textValue: e.target.value })}
      placeholder="Напишите ваш ответ..."
      rows={4}
      className="w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 resize-none transition-colors"
    />
  );
}

// ==========================================
// Main Audit Engine
// ==========================================

interface AuditEngineProps {
  questions: AuditQuestion[];
  onComplete: (answers: AuditAnswer[]) => void;
  onBack: () => void;
}

export function AuditEngine({ questions, onComplete, onBack }: AuditEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, AuditAnswer>>(new Map());
  const [messageText, setMessageText] = useState('');

  const question = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const isLast = currentIndex === questions.length - 1;

  const currentAnswer = answers.get(question.id);

  const handleAnswer = useCallback((answer: AuditAnswer) => {
    setAnswers((prev) => {
      const next = new Map(prev);
      next.set(answer.questionId, answer);
      return next;
    });
  }, []);

  const hasAnswer = (): boolean => {
    const a = answers.get(question.id);
    if (!a) return false;
    switch (question.type) {
      case 'single_choice': return (a.selectedOptions?.length ?? 0) > 0;
      case 'multiple_choice': return (a.selectedOptions?.length ?? 0) > 0;
      case 'slider': return a.sliderValue !== undefined;
      case 'text_input': return (a.textValue?.trim().length ?? 0) > 0;
      case 'voice_input': return (a.textValue?.trim().length ?? 0) > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    telegram.haptic('light');
    if (isLast) {
      onComplete(Array.from(answers.values()));
    } else {
      setCurrentIndex((i) => i + 1);
      setMessageText('');
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    telegram.haptic('light');
    // Append message as text_value to current question
    const existing = answers.get(question.id);
    handleAnswer({
      ...existing,
      questionId: question.id,
      textValue: messageText.trim(),
    });
    setMessageText('');
  };

  const renderQuestion = () => {
    const props: QuestionProps = { question, answer: currentAnswer, onAnswer: handleAnswer };
    switch (question.type) {
      case 'single_choice': return <SingleChoiceQuestion {...props} />;
      case 'multiple_choice': return <MultipleChoiceQuestion {...props} />;
      case 'slider': return <SliderQuestion {...props} />;
      case 'text_input': return <TextInputQuestion {...props} />;
      case 'voice_input': return <TextInputQuestion {...props} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Top bar: back + progress */}
      <div className="sticky top-0 z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-lg px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors"
          >
            ← Выйти
          </button>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-blue-500 dark:to-cyan-300 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 px-4 py-6">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Question title */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
              {question.title}
            </h2>
            {question.subtitle && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                {question.subtitle}
              </p>
            )}
          </div>

          {/* Question UI */}
          {renderQuestion()}

          {/* Next button */}
          {hasAnswer() && (
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all duration-200 active:scale-[0.98] animate-fade-in"
            >
              {isLast ? 'Завершить' : 'Далее'}
            </button>
          )}
        </div>
      </div>

      {/* Messenger-style input bar */}
      <div className="sticky bottom-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-4 py-3 pb-safe">
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2.5">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Добавить комментарий..."
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
            />
            <button
              className="ml-2 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Голосовой ввод"
            >
              <Mic size={18} />
            </button>
          </div>
          {messageText.trim() && (
            <button
              onClick={handleSendMessage}
              className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-md transition-all active:scale-95"
            >
              <Send size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
