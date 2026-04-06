import React from 'react';
import { Audit } from '../../types';
import { cn } from '../../lib/cn';
import { Clock, CalendarDays, Loader2, CheckCircle2, Archive } from 'lucide-react';
import { telegram } from '../../lib/telegram';

interface AuditCardProps {
  audit: Audit;
  onClick: (audit: Audit) => void;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  available: { label: '', color: '', icon: null },
  in_progress: { label: 'В процессе', color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300', icon: null },
  processing: { label: 'В обработке', color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300', icon: <Loader2 size={12} className="animate-spin" /> },
  completed: { label: 'Решения готовы', color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300', icon: <CheckCircle2 size={12} /> },
  archived: { label: 'В архиве', color: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400', icon: <Archive size={12} /> },
};

export function AuditCard({ audit, onClick }: AuditCardProps) {
  const status = statusConfig[audit.status];
  const isClickable = audit.status === 'available' || audit.status === 'completed';

  const handleClick = () => {
    if (isClickable) {
      telegram.haptic('light');
      onClick(audit);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isClickable}
      className={cn(
        'group relative w-full text-left rounded-2xl overflow-hidden transition-all duration-300',
        isClickable && 'hover:-translate-y-1 hover:shadow-lg cursor-pointer',
        !isClickable && 'opacity-80 cursor-default',
        'shadow-sm'
      )}
    >
      {/* Cover gradient */}
      <div className={cn(
        'relative h-36 bg-gradient-to-br p-5 flex flex-col justify-end',
        audit.coverGradient
      )}>
        {/* Goal tag */}
        <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
          {audit.goalTag}
        </span>

        {/* Status badge */}
        {audit.status !== 'available' && status.label && (
          <span className={cn(
            'absolute top-3 left-3 flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full',
            status.color
          )}>
            {status.icon}
            {status.label}
          </span>
        )}

        {/* Title overlay */}
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white leading-tight">{audit.title}</h3>
          <p className="text-sm text-white/80 mt-0.5">{audit.subtitle}</p>
        </div>

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Bottom info bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-4 py-3">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <Clock size={14} />
          <span className="text-xs font-medium">{audit.estimatedMinutes} мин</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <CalendarDays size={14} />
          <span className="text-xs font-medium">{audit.deadlineDays} дней</span>
        </div>
      </div>
    </button>
  );
}
