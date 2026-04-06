import React, { useState, useCallback, useEffect } from 'react';
import { AppShell } from './components/layout/AppShell';
import { CheckupPage } from './components/checkup/CheckupPage';
import { SolutionsPage } from './components/solutions/SolutionsPage';
import { Audit, AuditAnswer, Solution } from './types';
import { telegram } from './lib/telegram';
import { sendPulse } from './lib/sendpulse';
import { loginOrRegister, fetchAudits, fetchSolutions, submitAudit } from './lib/api';
import { Loader2 } from 'lucide-react';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
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
      console.log('Telegram Theme Applied:', scheme);
    };

    applyTheme();
    telegram.onEvent('themeChanged', applyTheme);

    async function loadAppInfo() {
      try {
        const uid = await loginOrRegister(tgId, { name: tgName });
        setUserId(uid);
        
        const [loadedAudits, loadedSolutions] = await Promise.all([
          fetchAudits(uid),
          fetchSolutions(uid),
        ]);

        setAudits(loadedAudits);
        setSolutions(loadedSolutions);
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

  // Handle audit completion: push to Supabase, then update local state
  const handleAuditComplete = useCallback(async (auditId: string, answers: AuditAnswer[]) => {
    if (!userId) return;
    
    // Optimistic UI update
    setAudits((prev) =>
      prev.map((a) =>
        a.id === auditId
          ? { ...a, status: 'processing' as const, completedAt: new Date().toISOString() }
          : a
      )
    );

    try {
      await submitAudit(userId, auditId, answers);
      
      // Trigger notification via SendPulse
      const tgId = telegram.user?.id || 123456789;
      sendPulse.sendNotification(tgId, 'audit_completed', {
        audit_id: auditId,
        user_id: userId
      });

    } catch (err) {
      console.error('Failed to submit audit to DB:', err);
      // Revert logically or notify user
    }
  }, [userId]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-500 font-medium">Загрузка платформы...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-4xl mb-4">🥲</div>
        <p className="text-sm text-red-500 font-medium mb-4">{fetchError}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl text-sm font-medium"
        >
          Обновить
        </button>
      </div>
    );
  }

  const processingCount = audits.filter((a) => a.status === 'processing').length;

  return (
    <AppShell processingCount={processingCount}>
      {(activeTab) => {
        if (activeTab === 'checkup') {
          return (
            <CheckupPage
              audits={audits}
              userId={userId!}
              onAuditComplete={handleAuditComplete}
            />
          );
        }
        return <SolutionsPage solutions={solutions} />;
      }}
    </AppShell>
  );
}

export default App;
