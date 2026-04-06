import React, { useState } from 'react';
import { Solution, SolutionPage } from '../../types';
import { ArrowLeft, LayoutDashboard, BarChart3, Map } from 'lucide-react';
import { cn } from '../../lib/cn';
import { telegram } from '../../lib/telegram';
import { ROICalculator } from '../magic_bricks/ROICalculator';

// Icon resolver
const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={18} />,
  BarChart3: <BarChart3 size={18} />,
  Map: <Map size={18} />,
};

interface SolutionViewerProps {
  solution: Solution;
  onBack: () => void;
  activePageId?: string;
  onPageChange?: (pageId: string) => void;
}

// Placeholder page content
function PageContent({ page }: { page: SolutionPage }) {
  if (page.componentSlug === 'metrics') {
    return (
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{page.title}</h2>
        <ROICalculator />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{page.title}</h2>
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-center h-48 text-slate-400 dark:text-slate-500">
          <div className="text-center space-y-2">
            <div className="text-4xl">🚧</div>
            <p className="text-sm font-medium">Контент раздела «{page.title}»</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Здесь будут персонализированные решения</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SolutionViewer({ solution, onBack, activePageId, onPageChange }: SolutionViewerProps) {
  const [localActivePageId, setLocalActivePageId] = useState(activePageId || solution.pages[0]?.id);
  
  const currentActivePageId = activePageId !== undefined ? activePageId : localActivePageId;
  const activePage = solution.pages.find((p) => p.id === currentActivePageId) ?? solution.pages[0];

  const handlePageChange = (page: SolutionPage) => {
    telegram.hapticSelection();
    if (onPageChange) {
      onPageChange(page.id);
    } else {
      setLocalActivePageId(page.id);
    }
  };

  return (
    // Fullscreen overlay — covers EVERYTHING including sidebar and bottom nav
    <div className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-950 flex">
      
      {/* Desktop: Sub-page sidebar */}
      <aside className="hidden md:flex flex-col w-[220px] h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-shrink-0">
        {/* Back button in sidebar header */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 flex-shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {solution.title}
          </span>
        </div>

        {/* Sub-page nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {solution.pages.map((page) => (
            <button
              key={page.id}
              onClick={() => handlePageChange(page)}
              className={cn(
                'w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left',
                currentActivePageId === page.id
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              )}
            >
              {iconMap[page.icon] ?? <LayoutDashboard size={18} />}
              {page.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header gradient */}
        <div className={`relative bg-gradient-to-br ${solution.coverGradient} px-6 pt-5 pb-5 md:pt-6 md:pb-6 flex-shrink-0`}>
          {/* Mobile: circle back button */}
          <button
            onClick={onBack}
            className="md:hidden absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all active:scale-95 z-10"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="md:pl-0 pl-12">
            <h1 className="text-xl font-bold text-white">{solution.title}</h1>
            <p className="text-sm text-white/80 mt-0.5">{solution.subtitle}</p>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-6">
          <PageContent page={activePage} />
        </div>
      </div>

      {/* Mobile: bottom nav transforms into sub-page tabs */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[101] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {solution.pages.map((page) => (
            <button
              key={page.id}
              onClick={() => handlePageChange(page)}
              className={cn(
                'relative flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all',
                currentActivePageId === page.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-400 dark:text-slate-500'
              )}
            >
              {currentActivePageId === page.id && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
              )}
              {iconMap[page.icon] ?? <LayoutDashboard size={18} />}
              <span className="text-[11px] font-medium">{page.title}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
