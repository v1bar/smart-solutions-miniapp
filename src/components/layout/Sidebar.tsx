import React from 'react';
import { cn } from '../../lib/cn';
import { AppTab } from '../../types';
import { ClipboardCheck, Lightbulb } from 'lucide-react';

interface SidebarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  processingCount?: number;
}

const tabs: { id: AppTab; label: string; icon: React.ReactNode }[] = [
  { id: 'checkup', label: 'CheckUP', icon: <ClipboardCheck size={22} /> },
  { id: 'solutions', label: 'Solutions', icon: <Lightbulb size={22} /> },
];

export function Sidebar({ activeTab, onTabChange, processingCount = 0 }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-[260px] h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-200 dark:border-slate-800">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <div>
          <h1 className="text-base font-semibold text-slate-900 dark:text-white">Smart Solutions</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Ваша платформа</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
              activeTab === tab.id
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.id === 'checkup' && processingCount > 0 && (
              <span className="ml-auto bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                {processingCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Powered by ZenLabs
        </p>
      </div>
    </aside>
  );
}
