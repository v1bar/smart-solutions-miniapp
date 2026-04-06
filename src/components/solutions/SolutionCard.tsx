import React from 'react';
import { Solution } from '../../types';
import { cn } from '../../lib/cn';
import { ArrowRight } from 'lucide-react';
import { telegram } from '../../lib/telegram';

interface SolutionCardProps {
  solution: Solution;
  onClick: (solution: Solution) => void;
}

export function SolutionCard({ solution, onClick }: SolutionCardProps) {
  const handleClick = () => {
    telegram.haptic('light');
    onClick(solution);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative w-full text-left rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      {/* Cover */}
      <div className={cn(
        'relative h-36 bg-gradient-to-br p-5 flex flex-col justify-end',
        solution.coverGradient
      )}>
        {/* Goal tag */}
        <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
          {solution.goalTag}
        </span>

        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white leading-tight">{solution.title}</h3>
          <p className="text-sm text-white/80 mt-0.5">{solution.subtitle}</p>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-4 py-3">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {solution.pages.length} разделов
        </span>
        <ArrowRight size={16} className="text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
      </div>
    </button>
  );
}
