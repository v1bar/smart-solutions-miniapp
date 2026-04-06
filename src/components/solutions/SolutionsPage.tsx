import React, { useState, useCallback } from 'react';
import { Solution } from '../../types';
import { SolutionCard } from './SolutionCard';
import { SolutionViewer } from './SolutionViewer';

interface SolutionsPageProps {
  solutions: Solution[];
}

export function SolutionsPage({ solutions }: SolutionsPageProps) {
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  
  // Map of solutionId -> activePageId
  const [activePages, setActivePages] = useState<Record<string, string>>({});

  const handleSelect = useCallback((solution: Solution) => {
    setSelectedSolution(solution);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedSolution(null);
  }, []);

  const handlePageChange = useCallback((solutionId: string, pageId: string) => {
    setActivePages(prev => ({ ...prev, [solutionId]: pageId }));
  }, []);

  // Fullscreen viewer mode
  if (selectedSolution) {
    return (
      <SolutionViewer 
        solution={selectedSolution} 
        onBack={handleBack} 
        activePageId={activePages[selectedSolution.id] || selectedSolution.pages[0]?.id}
        onPageChange={(pageId) => handlePageChange(selectedSolution.id, pageId)}
      />
    );
  }

  // Menu view
  return (
    <div className="min-h-screen px-4 md:px-8 py-6 md:py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Solutions</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Готовые решения для вашего бизнеса</p>
        </div>

        {/* Solution cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {solutions.map((sol) => (
            <SolutionCard key={sol.id} solution={sol} onClick={handleSelect} />
          ))}
        </div>

        {/* Empty state */}
        {solutions.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">💡</div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Решения появятся после прохождения аудитов
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
              Пройдите аудит в разделе CheckUP, чтобы получить персональные решения
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
