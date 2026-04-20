import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AuditAnswer } from '../../types';
import { telegram } from '../../lib/telegram';
import { Mic, Square, Trash2, Play, Pause } from 'lucide-react';
import { cn } from '../../lib/cn';

interface VoiceRecorderProps {
  answer: AuditAnswer | undefined;
  questionId: string;
  onAnswer: (answer: AuditAnswer) => void;
  showStatus?: boolean;
}

export function VoiceRecorder({ answer, questionId, onAnswer, showStatus = true }: VoiceRecorderProps) {
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

  const hasOldRecording = !!(answer?.voiceUrl && !answer?.voiceBlob);
  const hasNewRecording = !!answer?.voiceBlob;
  const hasRecording = hasOldRecording || hasNewRecording;

  return (
    <div className="mt-4 w-full">
      <div className={cn(
        "flex flex-col gap-3 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl transition-all",
        isRecording && "ring-2 ring-red-500/20 bg-red-50/10 dark:bg-red-950/5"
      )}>
        {isRecording ? (
          <div className="flex items-center gap-3">
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
          </div>
        ) : hasOldRecording ? (
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Предыдущий ответ</p>
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                {isPlaying ? 'Пауза' : 'Прослушать старое'}
              </button>
              <button
                onClick={startRecording}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm transition-all active:scale-95"
              >
                <Mic size={16} />
                Записать новое
              </button>
            </div>
          </div>
        ) : hasNewRecording ? (
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Новое голосовое</p>
              {showStatus && <p className="text-xs text-slate-400">Готово к замене</p>}
            </div>
            <button
              onClick={deleteRecording}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={startRecording}
              className="w-12 h-12 flex items-center justify-center bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              <Mic size={20} />
            </button>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Записать голос</p>
              <p className="text-xs text-slate-400">Нажмите для начала</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
