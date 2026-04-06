import React from 'react';
import { cn } from '../../lib/cn';
import { AppTab } from '../../types';
import { ClipboardCheck, Lightbulb } from 'lucide-react';
import { telegram } from '../../lib/telegram';

interface BottomNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  processingCount?: number;
}

const tabs: { id: AppTab; label: string; icon: React.ReactNode }[] = [
  { id: 'checkup', label: 'CheckUP', icon: <ClipboardCheck size={22} /> },
  { id: 'solutions', label: 'Solutions', icon: <Lightbulb size={22} /> },
];

export function BottomNav({ activeTab, onTabChange, processingCount = 0 }: BottomNavProps) {
  const handleTap = (tab: AppTab) => {
    telegram.hapticSelection();
    onTabChange(tab);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTap(tab.id)}
            className={cn(
              'relative flex flex-col items-center gap-1 py-2 px-6 rounded-2xl transition-all duration-200',
              activeTab === tab.id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-400 dark:text-slate-500'
            )}
          >
            {/* Active indicator pill */}
            {activeTab === tab.id && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
            )}
            
            <div className="relative">
              {tab.icon}
              {tab.id === 'checkup' && processingCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {processingCount}
                </span>
              )}
            </div>
            
            <span className={cn(
              'text-[11px] font-medium',
              activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
            )}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
