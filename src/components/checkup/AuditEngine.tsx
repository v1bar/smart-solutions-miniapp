import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { AuditQuestion, AuditAnswer } from '../../types';
import { cn } from '../../lib/cn';
import { telegram } from '../../lib/telegram';
import { Check, ChevronRight, ChevronLeft, Mic, Square, Trash2, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// Voice Recorder Component
// ==========================================

interface VoiceRecorderProps {
  answer: AuditAnswer | undefined;
  questionId: string;
  onAnswer: (answer: AuditAnswer) => void;
}

function VoiceRecorder({ answer, questionId, onAnswer }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Build a playable URL from either a saved voiceUrl or a local blob
  useEffect(() => {
    if (answer?.voiceUrl && !answer?.voiceBlob) {
      setAudioUrl(answer.voiceUrl);
    } else if (answer?.voiceBlob) {
      const url = URL.createObjectURL(answer.voiceBlob);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setAudioUrl(null);
    }
  }, [answer?.voiceUrl, answer?.voiceBlob]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onAnswer({
          questionId,
          textValue: answer?.textValue,
          voiceBlob: blob,
        });
        stream.getTracks().forEach(t => t.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
      telegram.haptic('medium');
    } catch (err) {
      console.error('Microphone access denied:', err);
      alert('Для записи голоса разрешите доступ к микрофону.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    telegram.haptic('light');
  };

  const deleteRecording = () => {
    setAudioUrl(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    onAnswer({
      questionId,
      textValue: answer?.textValue,
      voiceBlob: undefined,
      voiceUrl: undefined,
    });
    telegram.haptic('light');
  };

  const togglePlay = () => {
    if (!audioUrl) return;
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const hasRecording = !!(answer?.voiceBlob || answer?.voiceUrl);

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
        {isRecording ? (
          <>
            <button
              onClick={stopRecording}
              className="w-12 h-12 flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg shadow-red-500/30 animate-pulse"
            >
              <Square size={18} />
            </button>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-500">Запись...</p>
              <p className="text-xs text-slate-400 tabular-nums">{formatTime(duration)}</p>
            </div>
            <div className="flex gap-1 items-center">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-red-400 rounded-full animate-pulse"
                  style={{
                    height: `${12 + Math.random() * 16}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </>
        ) : hasRecording ? (
          <>
            <button
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-full shadow-md"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Голосовое сообщение</p>
              <p className="text-xs text-slate-400">Готово к отправке</p>
            </div>
            <button
              onClick={deleteRecording}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={startRecording}
              className="w-12 h-12 flex items-center justify-center bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              <Mic size={20} />
            </button>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Или запишите голосовое сообщение</p>
              <p className="text-xs text-slate-400">Нажмите для начала записи</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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
    <div>
      <textarea
        value={answer?.textValue ?? ''}
        onChange={(e) => onAnswer({ questionId: question.id, textValue: e.target.value, voiceBlob: answer?.voiceBlob, voiceUrl: answer?.voiceUrl })}
        placeholder="Введите ваш ответ..."
        rows={3}
        className="w-full p-4 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-slate-800 dark:focus:border-slate-300 transition-colors"
      />
      <VoiceRecorder
        answer={answer}
        questionId={question.id}
        onAnswer={onAnswer}
      />
    </div>
  );
}

// ==========================================
// Main Audit Engine (One Question Per Page)
// ==========================================

interface AuditEngineProps {
  questions: AuditQuestion[];
  onComplete: (answers: AuditAnswer[]) => void;
  onBack: () => void;
  initialAnswers?: Map<string, AuditAnswer>;
}

export function AuditEngine({ questions, onComplete, onBack, initialAnswers }: AuditEngineProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, AuditAnswer>>(initialAnswers ?? new Map());
  const [direction, setDirection] = useState<1 | -1>(1);

  const currentQuestion = questions[questionIndex];
  const totalQuestions = questions.length;

  const handleAnswer = useCallback((answer: AuditAnswer) => {
    setAnswers((prev) => {
      const next = new Map(prev);
      next.set(answer.questionId, answer);
      return next;
    });
  }, []);

  const answeredCount = Array.from(answers.values()).filter(a => {
    const q = questions.find(qu => qu.id === a.questionId);
    if (!q) return false;
    if (q.type === 'slider') return a.sliderValue !== undefined;
    if (q.type === 'text_input') return (a.textValue?.trim().length ?? 0) > 0 || !!a.voiceBlob || !!a.voiceUrl;
    return (a.selectedOptions?.length ?? 0) > 0;
  }).length;

  const progress = (answeredCount / totalQuestions) * 100;

  const isCurrentAnswered = useMemo(() => {
    if (!currentQuestion) return false;
    const a = answers.get(currentQuestion.id);
    if (!a) return false;
    if (currentQuestion.type === 'slider') return a.sliderValue !== undefined;
    if (currentQuestion.type === 'text_input') return (a.textValue?.trim().length ?? 0) > 0 || !!a.voiceBlob || !!a.voiceUrl;
    return (a.selectedOptions?.length ?? 0) > 0;
  }, [currentQuestion, answers]);

  const handleNext = () => {
    telegram.haptic('light');
    setDirection(1);
    if (questionIndex === totalQuestions - 1) {
      onComplete(Array.from(answers.values()));
    } else {
      setQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    telegram.haptic('light');
    setDirection(-1);
    if (questionIndex > 0) {
      setQuestionIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const renderQuestion = (question: AuditQuestion) => {
    const props: QuestionProps = {
      question,
      answer: answers.get(question.id),
      onAnswer: handleAnswer,
    };
    switch (question.type) {
      case 'single_choice': return <SingleChoiceQuestion {...props} />;
      case 'multiple_choice': return <MultipleChoiceQuestion {...props} />;
      case 'slider': return <SliderQuestion {...props} />;
      case 'text_input': return <TextInputQuestion {...props} />;
      default: return null;
    }
  };

  if (!currentQuestion) return null;

  // Determine the group title for current question
  const groupTitle = currentQuestion.groupTitle || '';

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col text-slate-900 dark:text-slate-100 font-sans">

      {/* Progress Header */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-4 py-3 border-b border-slate-100 dark:border-slate-900">
        <div className="flex items-center justify-between mb-2">
          <button onClick={handlePrev} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            ← Назад
          </button>
          <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">
            {questionIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div className="h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-900 dark:bg-slate-100 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="w-full max-w-xl mx-auto flex-1 flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="flex-1 flex flex-col"
            >
              {/* Group badge */}
              {groupTitle && (
                <div className="inline-block self-start px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
                  {groupTitle}
                </div>
              )}

              {/* Question */}
              <div className="space-y-1 mb-8">
                <span className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">
                  Вопрос {questionIndex + 1}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  {currentQuestion.title}
                </h3>
                {currentQuestion.subtitle && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                    {currentQuestion.subtitle}
                  </p>
                )}
              </div>

              {/* Answer Area */}
              <div className="flex-1">
                {renderQuestion(currentQuestion)}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="pt-8 pb-4 flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="flex-1 py-5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-400 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft size={16} />
              Назад
            </button>
            <button
              onClick={handleNext}
              disabled={!isCurrentAnswered}
              className={cn(
                "flex-[2] py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2",
                isCurrentAnswered
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-slate-200 dark:shadow-none"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-300 dark:text-slate-700 cursor-not-allowed border-0"
              )}
            >
              {questionIndex === totalQuestions - 1 ? 'Завершить аудит' : 'Далее'}
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
