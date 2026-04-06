import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { AppTab } from '../../types';

interface AppShellProps {
  children: (activeTab: AppTab) => React.ReactNode;
  processingCount?: number;
}

export function AppShell({ children, processingCount = 0 }: AppShellProps) {
  const [activeTab, setActiveTab] = useState<AppTab>('checkup');

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        processingCount={processingCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {children(activeTab)}
      </main>

      {/* Mobile Bottom Nav */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        processingCount={processingCount}
      />
    </div>
  );
}
