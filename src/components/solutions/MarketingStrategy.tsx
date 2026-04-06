import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Compass, 
  Users, 
  Zap, 
  ArrowUpRight, 
  BarChart4, 
  Layers, 
  RefreshCcw, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { cn } from '../../lib/cn';

interface MarketingStrategyProps {
  pageId?: string;
}

export function MarketingStrategy({ pageId }: MarketingStrategyProps) {
  // Navigation mapping from SolutionViewer slugs
  const renderContent = () => {
    switch (pageId) {
      case 'overview':
        return <StrategyOverview />;
      case 'positioning':
        return <StrategyPositioning />;
      case 'funnel':
        return <StrategyFunnel />;
      case 'roadmap':
        return <StrategyRoadmap />;
      default:
        return <StrategyOverview />;
    }
  };

  return (
    <div className="min-h-full pb-10">
      {renderContent()}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StrategyOverview() {
  const goals = [
    { title: 'Кол-во продаж', value: '≥ 3 сделки / мес', desc: 'По рынку Бали' },
    { title: 'Чистая прибыль', value: '≥ $10 000 / мес', desc: 'На горизонте 6-12 мес' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="px-5 pt-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
          Маркетинговая стратегия <span className="text-blue-600">Smart Solutions</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          Переход от классического агентства к инвестиционной платформе.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5">
        {goals.map((goal, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{goal.title}</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{goal.value}</p>
            <p className="text-sm text-slate-500 mt-2">{goal.desc}</p>
          </div>
        ))}
      </div>

      <section className="px-5 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white px-1">Ключевая идея</h3>
        <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-600/10">
          <Zap size={24} className="mb-4 opacity-80" />
          <p className="text-lg font-medium leading-relaxed italic">
            "Smart Solutions — это не просто объекты. Это агентство, которое продает инвестиционную логику в недвижимости."
          </p>
        </div>
      </section>
    </div>
  );
}

function StrategyPositioning() {
  return (
    <div className="space-y-8 animate-fade-in px-5 py-4">
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Позиционирование</h2>
        <p className="text-slate-500 mt-1">Трансформация продукта</p>
      </section>

      <div className="bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
            <Compass className="text-red-500" size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest pt-1">Было: Классика</h4>
            <ul className="mt-3 space-y-2">
              {['Продажа характеристик объекта', 'Массовый трафик (сырой)', 'Конкуренция ценой лида'].map((t, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-1 h-1 rounded-full bg-red-400" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-700 mx-10" />

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
            <Target className="text-emerald-500" size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest pt-1">Стало: Smart Solutions</h4>
            <ul className="mt-3 space-y-2">
              {['Продажа инвестиционного решения', 'Партнерские каналы доверия', 'Конкуренция качеством принятия решений'].map((t, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle2 className="text-emerald-500" size={14} /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StrategyFunnel() {
  const steps = [
    { title: 'Диагностика', icon: < Compass size={16} />, color: 'bg-indigo-500', desc: 'Персональная диагностика целей инвестора' },
    { title: 'Продукт', icon: < Layers size={16} />, color: 'bg-blue-500', desc: 'Упаковка объекта в инвест-кейс под стратегию' },
    { title: 'Доверие', icon: < Users size={16} />, color: 'bg-emerald-500', desc: 'Продажи через партнеров и экспертный контент' },
    { title: 'Сделка', icon: < Zap size={16} />, color: 'bg-amber-500', desc: 'Сопровождение как проектного менеджера' },
  ];

  return (
    <div className="space-y-8 animate-fade-in px-5 py-4">
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Новая воронка</h2>
        <p className="text-slate-500 mt-1">От лидов к инвест-диалогам</p>
      </section>

      <div className="relative">
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800" />
        <div className="space-y-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg relative z-10", step.color)}>
                {step.icon}
              </div>
              <div className="pt-1 flex-1 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 ml-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StrategyRoadmap() {
  const phases = [
    { time: '30 дней', title: 'Фундамент', tasks: ['Финализация позиционирования', 'Запуск партнерки', 'Обучение менеджеров'] },
    { time: '60 дней', title: 'Ускорение', tasks: ['Экспертные эфиры', 'SMM-воронка', 'Контроль качества лидов'] },
    { time: '90 дней', title: 'Системность', tasks: ['Подключение AI-тулзов', 'Масштабирование каналов', 'Стабильные сделки'] },
  ];

  return (
    <div className="space-y-8 animate-fade-in px-5 py-4">
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">План внедрения</h2>
        <p className="text-slate-500 mt-2">Приоритеты на 3 месяца</p>
      </section>

      <div className="space-y-4">
        {phases.map((phase, i) => (
          <div key={i} className="group overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between p-6 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-50 dark:border-slate-800">
               <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{phase.time}</span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{phase.title}</h4>
               </div>
               <ArrowUpRight className="text-slate-300 group-hover:text-blue-500 transition-colors" size={20} />
            </div>
            <div className="p-6 space-y-3">
              {phase.tasks.map((task, ti) => (
                <div key={ti} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-300 leading-tight">{task}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
