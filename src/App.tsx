import React, { useState, useCallback, useEffect } from 'react';
import { AppShell } from './components/layout/AppShell';
import { CheckupPage } from './components/checkup/CheckupPage';
import { SolutionsPage } from './components/solutions/SolutionsPage';
import { Audit, AuditAnswer, Solution, AppUser } from './types';
import { telegram } from './lib/telegram';
import { sendPulse } from './lib/sendpulse';
import { loginOrRegister, fetchAudits, fetchSolutions, submitAudit } from './lib/api';
import { mockSolutions } from './data/mock';
import { Loader2, ShieldCheck } from 'lucide-react';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [audits, setAudits] = useState<Audit[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(telegram.colorScheme);

  // Initialize App and User Data from Supabase
  useEffect(() => {
    let tgId = 123456789; // Default dev ID
    let tgName = 'Dev User';

    if (telegram.user) {
      tgId = telegram.user.id;
      tgName = telegram.user.first_name || 'User';
    }

    telegram.init();
    
    const applyTheme = () => {
      const scheme = telegram.colorScheme;
      setColorScheme(scheme);
      if (scheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();
    telegram.onEvent('themeChanged', applyTheme);

    async function loadAppInfo() {
      try {
        const user = await loginOrRegister(tgId, { name: tgName });
        setCurrentUser(user);
        
        const [loadedAudits, dbSolutions] = await Promise.all([
          fetchAudits(user.id),
          fetchSolutions(user.id),
        ]);

        setAudits(loadedAudits);
        
        // Merge DB solutions with mock solutions (unique by id)
        const combinedSolutions = [...dbSolutions];
        mockSolutions.forEach((mock: Solution) => {
          if (!combinedSolutions.find(s => s.id === mock.id)) {
            combinedSolutions.push(mock);
          }
        });
        setSolutions(combinedSolutions);
      } catch (err: any) {
        console.error('Error loading app data:', err);
        setFetchError('Не удалось загрузить данные. Проверьте соединение.');
      } finally {
        setIsInitializing(false);
      }
    }

    loadAppInfo();

    return () => {
      telegram.offEvent('themeChanged', applyTheme);
    };
  }, []);

  // Handle audit completion
  const handleAuditComplete = useCallback(async (auditId: string, answers: AuditAnswer[]) => {
    if (!currentUser) return;
    
    // Optimistic UI update
    setAudits((prev) =>
      prev.map((a) =>
        a.id === auditId
          ? { ...a, status: 'processing' as const, completedAt: new Date().toISOString() }
          : a
      )
    );

    try {
      await submitAudit(currentUser.id, auditId, answers);
      
      const tgId = telegram.user?.id || 123456789;
      sendPulse.sendNotification(tgId, 'audit_completed', {
        audit_id: auditId,
        user_id: currentUser.id
      });

    } catch (err) {
      console.error('Failed to submit audit to DB:', err);
    }
  }, [currentUser]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-500 font-medium tracking-tight">Инициализация ClientOS...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-4xl mb-4">🤫</div>
        <p className="text-sm text-red-500 font-medium mb-4">{fetchError}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-sm font-semibold shadow-lg active:scale-95 transition-transform"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  const processingCount = audits.filter((a) => a.status === 'processing').length;

  return (
    <AppShell processingCount={processingCount}>
      {(activeTab) => (
        <div className="relative h-full animate-in fade-in duration-500">
          {currentUser?.role === 'admin' && (
            <div className="fixed top-4 right-4 z-[60] flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Admin Access</span>
            </div>
          )}
          
          {activeTab === 'checkup' ? (
            <CheckupPage
              audits={audits}
              userId={currentUser!.id}
              onAuditComplete={handleAuditComplete}
            />
          ) : (
            <SolutionsPage solutions={solutions} />
          )}
        </div>
      )}
    </AppShell>
  );
}

export default App;
