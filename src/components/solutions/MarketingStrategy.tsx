import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Users,
  Layers,
  Zap,
  Network,
  ShieldCheck,
  Map,
  ArrowUpRight,
  Info,
  ChevronRight,
  Check,
  ArrowLeft
} from 'lucide-react';
import { cn } from '../../lib/cn';

interface MarketingStrategyProps {
  pageId?: string;
}

export function MarketingStrategy({ pageId }: MarketingStrategyProps) {
  const renderContent = () => {
    switch (pageId) {
      case 'content': return <ContentVerbatim />;
      case 'intro': return <IntroVerbatim />;
      case 'positioning': return <PositioningVerbatim />;
      case 'audience': return <AudienceVerbatim />;
      case 'product': return <ProductVerbatim />;
      case 'funnel': return <FunnelVerbatim />;
      case 'acquisition': return <AcquisitionVerbatim />;
      case 'partners': return <PartnershipVerbatim />;
      case 'ops': return <OpsVerbatim />;
      case 'roadmap': return <RoadmapVerbatim />;
      case 'growth': return <GrowthVerbatim />;
      default: return <ContentVerbatim />;
    }
  };

  return (
    <div className="min-h-full pb-24 bg-slate-50/30 dark:bg-slate-950/30 font-sans">
       <AnimatePresence mode="wait">
          <motion.div
            key={pageId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {renderContent()}
          </motion.div>
       </AnimatePresence>
    </div>
  );
}

// --- CHAPTER 0: ОГЛАВЛЕНИЕ (ИНТЕРАКТИВНЫЙ ВЕРБАТИВ) ---
function ContentVerbatim() {
  const [step, setStep] = React.useState(0);
  const totalSteps = 3;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <PageHeader title="Маркетинговая стратегия" subtitle="Smart Solutions — инвестиционная логика" />
      
      <div className="px-6 mb-8">
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar py-2">
          {['Фокус документа', 'Ключевая идея', 'Оглавление'].map((label, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={cn(
                "px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                step === i 
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10 scale-105" 
                  : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="p-8 rounded-[40px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <h3 className="text-xs font-black uppercase text-blue-600 tracking-widest mb-6">Цель стратегии</h3>
                  <p className="text-base font-bold text-slate-900 dark:text-white leading-tight mb-8">
                    Достижение устойчивой прибыли агентства ≥ 3 сделки в месяц / ≥ $10 000 чистой прибыли
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-50 dark:border-slate-800 pt-6">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Горизонт планирования</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white italic">6–12 месяцев</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Рынок</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white italic leading-tight">Бали (основной), с логикой масштабирования в Тайланд</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="p-8 rounded-[48px] bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 blur-[100px] rounded-full -mr-24 -mt-24" />
                  
                  <p className="text-[10px] uppercase font-black text-slate-500 mb-6 tracking-[0.3em] font-mono">Ключевая идея стратегии</p>
                  <h2 className="text-xl font-black italic tracking-tighter leading-tight mb-8">
                     Smart Solutions — это не классическое агентство недвижимости.
                  </h2>
                  <p className="text-sm font-bold text-slate-300 leading-relaxed italic mb-8 border-l-2 border-blue-600 pl-4">
                    Это агентство, которое продает инвестиционную логику и стратегию, а объекты недвижимости использует как инструмент реализации целей инвестора.
                  </p>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed uppercase tracking-tighter">
                    Настоящая маркетинговая стратегия описывает, как агентству выйти из перегретого конкурентного поля и построить системный поток качественных инвестиционных клиентов через партнёрский маркетинг, экспертное доверие и продуктовую переупаковку.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 gap-2.5"
              >
                {[
                  "Введение и контекст",
                  "Позиционирование Smart Solutions",
                  "Целевая аудитория и фокус",
                  "Продуктовая переупаковка агентства",
                  "Воронка продаж нового типа",
                  "Каналы привлечения клиентов",
                  "Партнёрская модель масштабирования",
                  "Маркетинговая операционка и контроль",
                  "План внедрения",
                  "Итоговая логика роста агентства"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-transform active:scale-[0.98]">
                    <span className="text-[10px] font-black text-blue-600 font-mono w-4 shrink-0">{i+1}</span>
                    <p className="text-[10px] font-bold uppercase text-slate-900 dark:text-white tracking-widest leading-tight">{item}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-8">
           <button 
             onClick={handlePrev}
             disabled={step === 0}
             className={cn(
               "w-12 h-12 rounded-full flex items-center justify-center border transition-all active:scale-95",
               step === 0 ? "opacity-30 pointer-events-none" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white"
             )}
           >
             <ArrowLeft size={18} className="translate-x-[-1px]" />
           </button>

           <div className="flex gap-1.5">
             {[0, 1, 2].map((i) => (
               <div key={i} className={cn(
                 "h-1 rounded-full transition-all duration-500",
                 step === i ? "w-6 bg-blue-600" : "w-1.5 bg-slate-200 dark:bg-slate-800"
               )} />
             ))}
           </div>

           <button 
             onClick={handleNext}
             disabled={step === totalSteps - 1}
             className={cn(
               "w-12 h-12 rounded-full flex items-center justify-center border transition-all active:scale-95",
               step === totalSteps - 1 ? "opacity-30 pointer-events-none" : "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20"
             )}
           >
             <ChevronRight size={18} className="translate-x-[1px]" />
           </button>
        </div>
      </div>
    </>
  );
}

// --- SHARED UI COMPONENTS (ZENLABS VERBATIM TOOLKIT) ---

const PageHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="px-6 pt-10 pb-6">
    <div className="h-1.5 w-12 bg-blue-600 rounded-full mb-6" />
    <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter uppercase">{title}</h1>
    {subtitle && <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-bold uppercase tracking-widest">{subtitle}</p>}
  </div>
);

const SectionHeader = ({ id, title }: { id?: string, title: string }) => (
  <div className="px-6 mt-10 mb-5">
    <div className="flex items-center gap-3">
      {id && <span className="text-xs font-black text-blue-600 font-mono">{id}</span>}
      <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
    </div>
  </div>
);

const VerbatimTable = ({ rows, headers }: { rows: string[][], headers?: string[] }) => (
  <div className="mx-6 mb-8 overflow-hidden rounded-[40px] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
    {headers && (
      <div className="grid grid-cols-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
        {headers.map((h, i) => (
          <div key={i} className="p-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">{h}</div>
        ))}
      </div>
    )}
    {rows.map((row, i) => (
      <div key={i} className={cn(
        "grid grid-cols-2 border-b border-slate-50 dark:border-slate-800 last:border-0",
        i % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50/30 dark:bg-slate-800/20"
      )}>
        <div className="p-5 text-xs font-black text-slate-900 dark:text-white uppercase leading-tight tracking-tighter border-r border-slate-50 dark:border-slate-800">{row[0]}</div>
        <div className="p-5 text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic">{row[1]}</div>
      </div>
    ))}
  </div>
);

const SimpleTable = ({ rows }: { rows: { label: string, value: string, check?: boolean, cross?: boolean }[] }) => (
  <div className="mx-6 mb-8 overflow-hidden rounded-[40px] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
    {rows.map((row, i) => (
      <div key={i} className="flex items-center justify-between p-5 border-b border-slate-50 dark:border-slate-800 last:border-0">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-2/3 leading-tight">{row.label}</span>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">{row.value}</span>
          {row.check && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
          {row.cross && <XCircle size={16} className="text-red-400 shrink-0" />}
        </div>
      </div>
    ))}
  </div>
);

const Paragraph = ({ children, className, italic }: { children: React.ReactNode, className?: string, italic?: boolean }) => (
  <p className={cn(
    "px-6 mb-6 text-sm leading-relaxed",
    italic ? "text-slate-500 dark:text-slate-400 italic" : "text-slate-600 dark:text-slate-400",
    className
  )}>{children}</p>
);

const HighlightCard = ({ children, variant = 'blue' }: { children: React.ReactNode, variant?: 'blue' | 'red' | 'dark' }) => (
  <div className={cn(
    "mx-6 my-8 p-8 rounded-[48px] border shadow-sm relative overflow-hidden",
    variant === 'blue' && "bg-blue-50/50 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/20",
    variant === 'red' && "bg-red-50/50 dark:bg-red-500/5 border-red-100 dark:border-red-500/20",
    variant === 'dark' && "bg-slate-900 text-white border-0 shadow-2xl"
  )}>
    {children}
  </div>
);

const ListItem = ({ children, type = 'check', className }: { children: React.ReactNode, type?: 'check' | 'cross' | 'bullet', className?: string }) => (
  <div className={cn("px-6 flex gap-4 mb-5 items-start group text-slate-400", className)}>
    <div className={cn(
      "w-7 h-7 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-500 group-hover:scale-110",
      type === 'check' && "bg-emerald-500/10 text-emerald-500",
      type === 'cross' && "bg-red-500/10 text-red-500",
      type === 'bullet' && "bg-blue-500/10 text-blue-500"
    )}>
      {type === 'check' && <Check size={14} strokeWidth={3} />}
      {type === 'cross' && <XCircle size={14} strokeWidth={3} />}
      {type === 'bullet' && <ChevronRight size={14} strokeWidth={3} />}
    </div>
    <div className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed group-hover:translate-x-1 transition-transform duration-300">{children}</div>
  </div>
);

function IntroVerbatim() {
  const [step, setStep] = React.useState(0);
  const totalSteps = 3;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <PageHeader title="Введение и контекст" subtitle="Агентство недвижимости c фокусом на инвест-продажи" />
      
      <div className="px-6 mb-8">
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar py-2">
          {['1.1. Бизнес-цели', '1.2. Ограничения', '1.3. Причины'].map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className={cn(
                "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap transition-all border",
                step === i 
                  ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/20 scale-105" 
                  : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="1.1" title="Задача стратегии и бизнес-цели агентства" />
                <Paragraph className="font-bold text-slate-900 dark:text-white text-base leading-tight">Что именно должна изменить эта маркетинговая стратегия в бизнесе Smart Solutions?</Paragraph>
                
                <VerbatimTable rows={[
                  ["Кол-во продаж", "не менее 3 закрытых сделок в месяц по рынку Бали"],
                  ["Чистая прибыль", "$10 000+ чистой прибыли на горизонте планирования"]
                ]} />

                <HighlightCard variant="blue">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 italic leading-relaxed border-l-2 border-blue-600 pl-4">
                    Маркетинговая стратегия Smart Solutions разрабатывается не как набор гипотез или каналов, а как инструмент достижения конкретного бизнес-результата.
                  </p>
                </HighlightCard>

                <Paragraph>
                  Стратегия отвечает на вопрос: **как системно привлекать инвестиционно релевантных клиентов**, с которыми агентство способно закрывать сделки, не тратя ресурсы на фильтрацию «мусора».
                </Paragraph>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="1.2" title="Ограничения и допущения" />
                <Paragraph>
                  **В каких условиях стратегия должна работать и что мы осознанно не пытаемся решить?** Эта стратегия разрабатывается с учётом следующих реальных ограничений:
                </Paragraph>

                <SimpleTable rows={[
                  { label: "Smart Solutions находится на стадии агентского бизнеса", value: "Yes", check: true },
                  { label: "У агентства ограниченные ресурсы по времени, бюджету и управлению командой", value: "Yes", check: true },
                  { label: "Основной фокус — один рынок (Бали) с логикой масштабирования в будущем", value: "Yes", check: true },
                  { label: "Цель — достижение прибыли", value: "Yes", check: true }
                ]} />

                <div className="px-6 mt-10 mb-4 pt-10">
                   <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Мы не рассматриваем:</h3>
                </div>
                
                <div className="space-y-2">
                  <ListItem type="cross">Роль AI в аналитике и продукте компании</ListItem>
                  <ListItem type="cross">Масштабирование через фондовую модель</ListItem>
                  <ListItem type="cross">Массовый B2C-маркетинг и конкуренцию по объему рекламы</ListItem>
                </div>

                <HighlightCard variant="red">
                  <p className="text-sm font-black italic text-center text-slate-900 dark:text-white leading-tight">
                    Эта стратегия — про фокус. Всё, что не ведёт к 3 сделкам в месяц, считается нерелевантным.
                  </p>
                </HighlightCard>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="1.3" title="Почему текущая модель не масштабируется" />
                <Paragraph className="font-bold text-slate-900 dark:text-white">Текущая модель лидогенерации основана на классическом подходе рынка:</Paragraph>
                
                <HighlightCard variant="dark">
                   <p className="text-sm font-bold italic leading-relaxed text-slate-300 border-l-2 border-blue-500 pl-4">
                     Прямой трафик, оффер «инвестиционная недвижимость», ставка на объекты и доходности, последующая фильтрация лидов силами отдела продаж.
                   </p>
                </HighlightCard>

                <Paragraph>Эта модель **структурно не масштабируется** по трём причинам:</Paragraph>

                <div className="space-y-4 px-6">
                  <div className="p-6 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm leading-tight">
                    <p className="text-[10px] font-black uppercase text-blue-600 mb-2 tracking-widest">Низкая концентрация ЦА в платном трафике</p>
                    <p className="text-xs text-slate-500 italic">Рациональные инвесторы с капиталом не находятся в Facebook как покупатели. Они не ищут «объекты», чаще всего они принимают решения через доверие, экспертизу и рекомендации.</p>
                  </div>
                  
                  <div className="p-6 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm leading-tight">
                    <p className="text-[10px] font-black uppercase text-red-500 mb-2 tracking-widest">Перегретый красный океан</p>
                    <p className="text-xs text-slate-500 italic">Рынок переполнен агентствами, которые транслируют одни и те же смыслы, используют одинаковые форматы креативов, конкурируют ценой лида, а не качеством клиента.</p>
                  </div>

                  <div className="p-6 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm leading-tight">
                    <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-widest">Несоответствие продукта и воронки</p>
                    <p className="text-xs text-slate-500 italic leading-relaxed">Smart Solutions позиционируется как партнер, но воронка продаёт нас как очередное агентство. Это создает системный разрыв между декларацией и фактом.</p>
                  </div>
                </div>

                <div className="pt-10">
                   <SectionHeader title="Ключевые изменения" />
                   <VerbatimTable headers={["Текущая модель", "Требуемая модель"]} rows={[
                     ["Продажа объектов", "Продажа инвестиционной логики"],
                     ["Массовый трафик", "Фильтрованное привлечение"],
                     ["Холодные лиды", "Доверие и рекомендации"],
                     ["Отдел продаж = фильтр", "Маркетинг = фильтр"]
                   ]} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-12 border-t border-slate-100 dark:border-slate-800 pt-8">
           <button 
             onClick={handlePrev}
             disabled={step === 0}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === 0 ? "opacity-20 pointer-events-none" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm"
             )}
           >
             <ArrowLeft size={20} className="translate-x-[-1px]" />
           </button>

           <div className="flex gap-2.5">
             {[0, 1, 2].map((i) => (
               <div key={i} className={cn(
                 "h-1 rounded-full transition-all duration-700",
                 step === i ? "w-10 bg-blue-600" : "w-2.5 bg-slate-200 dark:bg-slate-800"
               )} />
             ))}
           </div>

           <button 
             onClick={handleNext}
             disabled={step === totalSteps - 1}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === totalSteps - 1 ? "opacity-20 pointer-events-none" : "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-blue-900/40"
             )}
           >
             <ChevronRight size={20} className="translate-x-[1px]" />
           </button>
        </div>
      </div>
    </>
  );
}

// --- CHAPTER 2: ПОЗИЦИОНИРОВАНИЕ (ИНТЕРАКТИВНЫЙ ВЕРБАТИВ) ---
function PositioningVerbatim() {
  const [step, setStep] = React.useState(0);
  const totalSteps = 4;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <PageHeader title="Позиционирование" subtitle="Smart Solutions — агентство инвестиционных продаж" />
      
      <div className="px-6 mb-8">
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar py-2">
          {['2.1. Кто мы', '2.2. Наш продукт', '2.3. Сравнение', '2.4. Преимущества'].map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className={cn(
                "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap transition-all border",
                step === i 
                  ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/20 scale-105" 
                  : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="2.1" title="Кто мы для инвестора" />
                <HighlightCard variant="dark">
                  <p className="text-sm font-black italic leading-tight text-white mb-4">
                    Smart Solutions — это инвестиционный партнер на входе в сделку, а не классический брокер недвижимости.
                  </p>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed uppercase tracking-tighter">
                    Для инвестора мы выполняем роль: навигатора по рынку, фильтра инвестиционных решений, переводчика «недвижимости» в язык целей, рисков и доходности.
                  </p>
                </HighlightCard>

                <Paragraph>
                  Наша зона ответственности начинается раньше — с понимания целей инвестора — и заканчивается позже, на этапе принятия инвестиционного решения.
                </Paragraph>
                
                <HighlightCard variant="blue">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 italic leading-relaxed text-center">
                    Инвестор приходит к нам не за объектом, а за уверенным решением: <br/>
                    <span className="text-blue-600 not-italic font-black uppercase tracking-widest mt-2 block">“я понимаю, зачем мне этот актив и как он работает”.</span>
                  </p>
                </HighlightCard>

                <Paragraph italic>
                  Инвестиционное позиционирование — это про экономику агентства и управляемый рост.
                </Paragraph>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="2.2" title="Что мы продаем на самом деле" />
                <Paragraph className="font-bold text-slate-900 dark:text-white">Формально мы продаём недвижимость. Фактически we продаём инвестиционную логику.</Paragraph>
                
                <VerbatimTable rows={[
                  ["Наш продукт", "сценарий достижения инвестиционной цели, объяснение дохода, понимание рисков и альтернатив"],
                  ["Объекты", "инструменты реализации стратегии, а не сам продукт"]
                ]} />

                <HighlightCard variant="dark">
                   <p className="text-sm font-bold italic leading-relaxed text-slate-300 border-l-2 border-blue-500 pl-4">
                     Мы продаём не “виллу на Бали”, а ответ на вопрос инвестора: “как этот актив помогает достичь моей цели”.
                   </p>
                </HighlightCard>
                
                <Paragraph className="text-xs italic text-slate-500">
                  Поэтому один и тот же объект может быть релевантен одному инвестору, и абсолютно не подходить другому — при тех же цифрах.
                </Paragraph>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="2.3" title="Инвестиционное позиционирование vs классическое агентство" />
                
                <VerbatimTable headers={["Классическое агентство", "Smart Solutions"]} rows={[
                  ["Продажа объектов", "Продажа инвест-решений"],
                  ["Фокус на характеристиках", "Фокус на целях инвестора"],
                  ["Доходность как хук", "Доходность как логика"],
                  ["Широкая аудитория", "Отфильтрованная ЦА"],
                  ["Лидогенерация (трафик)", "Лидогенерация (доверие)"]
                ]} />

                <div className="grid grid-cols-2 gap-4 px-6">
                  <div className="p-5 rounded-[40px] bg-red-50/50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/20">
                    <p className="text-[10px] font-black uppercase text-red-600 mb-2 tracking-widest">Конкуренция (Классика)</p>
                    <p className="text-[10px] font-bold text-slate-500 leading-tight uppercase italic tracking-tighter">Ценой, скоростью, количеством предложений</p>
                  </div>
                  <div className="p-5 rounded-[40px] bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20">
                    <p className="text-[10px] font-black uppercase text-emerald-600 mb-2 tracking-widest">Конкуренция (Smart)</p>
                    <p className="text-[10px] font-bold text-slate-500 leading-tight uppercase italic tracking-tighter">Ясностью, доверием, качеством решений</p>
                  </div>
                </div>

                <HighlightCard variant="blue">
                  <p className="text-xs font-bold leading-relaxed text-blue-600 uppercase tracking-widest text-center">
                    Мы выходим из красного океана конкуренции за “лучший объект” и заходим в нишу “лучшего инвестиционного решения”.
                  </p>
                </HighlightCard>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="2.4" title="Почему это конкурентное преимущество" />
                <Paragraph className="font-bold text-slate-900 dark:text-white">Инвестиционное позиционирование даёт устойчивые преимущества:</Paragraph>
                
                <div className="space-y-3">
                  <ListItem type="check">**Сложно скопировать**: Методология отбора и логика не покупаются «с рынка».</ListItem>
                  <ListItem type="check">**Снижение зависимости от трафика**: Доверие и экспертиза эффективнее рекламы.</ListItem>
                  <ListItem type="check">**Выше качество клиентов**: Приходят инвесторы, готовые думать стратегией.</ListItem>
                  <ListItem type="check">**Выше маржинальность**: Конкурируем ценностью, а не комиссией.</ListItem>
                </div>

                <HighlightCard variant="dark">
                  <p className="text-sm font-black italic text-center text-white leading-tight">
                    Инвестиционное позиционирование — это про экономику агентства и управляемый рост.
                  </p>
                </HighlightCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-12 border-t border-slate-100 dark:border-slate-800 pt-8">
           <button 
             onClick={handlePrev}
             disabled={step === 0}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === 0 ? "opacity-20 pointer-events-none" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm"
             )}
           >
             <ArrowLeft size={20} className="translate-x-[-1px]" />
           </button>

           <div className="flex gap-2.5">
             {[0, 1, 2, 3].map((i) => (
               <div key={i} className={cn(
                 "h-1 rounded-full transition-all duration-700",
                 step === i ? "w-10 bg-blue-600" : "w-1.5 bg-slate-200 dark:bg-slate-800"
               )} />
             ))}
           </div>

           <button 
             onClick={handleNext}
             disabled={step === totalSteps - 1}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === totalSteps - 1 ? "opacity-20 pointer-events-none" : "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-blue-900/40"
             )}
           >
             <ChevronRight size={20} className="translate-x-[1px]" />
           </button>
        </div>
      </div>
    </>
  );
}

const AudienceVerbatim = () => {
  const [step, setStep] = React.useState(0);
  const totalSteps = 3;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <PageHeader title="Целевая аудитория и фокус" subtitle="Анализ рационального инвестора" />
      
      <div className="px-6 mb-8">
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar py-2">
          {['3.1. Фокус Рациональности', '3.2. B2C vs B2B', '3.3. Цели и Стратегии'].map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className={cn(
                "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap transition-all border",
                step === i 
                  ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/20 scale-105" 
                  : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="3.1" title="Кого мы обслуживаем осознанно" />
                <Paragraph>Smart Solutions не работает с «широкой аудиторией». Мы сознательно ограничиваем сегмент, чтобы продукт и воронка оставались управляемыми.</Paragraph>
                
                <HighlightCard variant="blue">
                  <p className="text-sm font-black text-slate-900 dark:text-white leading-tight mb-2">Наш клиент — рациональный инвестор.</p>
                  <p className="text-xs text-slate-500 italic leading-relaxed">Принимает решения на основе целей, цифр и логики.</p>
                </HighlightCard>

                <div className="space-y-3">
                  <ListItem type="check">Частные инвесторы с капиталом (ценят сценарии и объяснение доходности)</ListItem>
                  <ListItem type="check">Предприниматели и топ-менеджеры (без желания «разбираться во всём самим»)</ListItem>
                  <ListItem type="check">Инвесторы с опытом (ищут качественные и структурированные решения)</ListItem>
                </div>

                <div className="pt-6">
                  <SectionHeader id="3.2" title="С кем мы не работаем" />
                  <Paragraph italic>Отказ от неподходящих клиентов — часть стратегии, а не потеря выручки. Мы освобождаем ресурс для «своих» клиентов.</Paragraph>
                  <div className="space-y-3">
                    <ListItem type="cross">Покупатели «для жизни» без инвестиционной цели</ListItem>
                    <ListItem type="cross">Клиенты без определённого бюджета</ListItem>
                    <ListItem type="cross">Эмоциональные покупки формата «хочу виллу, потому что красиво»</ListItem>
                    <ListItem type="cross">Инвесторы, ожидающие гарантированной доходности без рисков</ListItem>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="3.3" title="B2C и B2B логика" />
                <HighlightCard variant="dark">
                  <p className="text-sm font-bold text-slate-300 leading-relaxed italic border-l-2 border-blue-500 pl-4">
                    Мы продаём инвестиционные решения инвестору (B2C) и масштабируем продажи через партнёров (B2B).
                  </p>
                </HighlightCard>

                <div className="grid grid-cols-2 gap-4 px-6 pt-4">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest px-2">B2C Логика</p>
                    <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-500 space-y-2">
                      <p>• Диагностика целей</p>
                      <p>• Выбор стратегии</p>
                      <p>• Презентация кейса</p>
                      <p>• Закрытие сделки</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest px-2">B2B Логика</p>
                    <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-500 space-y-2">
                      <p>• Генерируют доверие</p>
                      <p>• Масштабируют охват</p>
                      <p>• Приводят инвесторов</p>
                      <p>• Экспертный союз</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <SectionHeader title="Сравнение сегментов" />
                  <VerbatimTable headers={["B2C (Инвестор)", "B2B (Партнёр)"]} rows={[
                    ["Что продаём", "Стратегию и решения"],
                    ["Продукт", "Инвест-кейс"],
                    ["Цель", "Сделка"],
                    ["Масштаб", "Ограничен"],
                    ["Доверие", "Личное"],
                    ["Продукт (B2B)", "Экспертиза + комиссия"]
                  ]} />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="3.4" title="Ключевые инвестиционные цели" />
                <Paragraph font-bold>Мы строим продукт не вокруг объектов, а вокруг целей инвестора. Все кейсы укладываются в 3 базовые цели:</Paragraph>
                
                <div className="space-y-4 px-6">
                  <div className="p-6 rounded-[40px] bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                    <p className="text-[10px] font-black uppercase text-emerald-600 mb-2 tracking-widest">1. Стабильный пассивный доход</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">«Хочу регулярно получать доход в $ с минимальными рисками и высокой предсказуемостью»</p>
                  </div>
                  
                  <div className="p-6 rounded-[40px] bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                    <p className="text-[10px] font-black uppercase text-blue-600 mb-2 tracking-widest">2. Рост капитала</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">«Хочу приумножить свободный капитал без активного участия и операционной головной боли»</p>
                  </div>

                  <div className="p-6 rounded-[40px] bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
                    <p className="text-[10px] font-black uppercase text-amber-600 mb-2 tracking-widest">3. Диверсификация и защита</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">«Хочу распределить риски и снизить зависимость от одного рынка или инструмента»</p>
                  </div>
                </div>

                <div className="pt-10">
                  <SectionHeader title="Матрица: Цель → Продукт" />
                  <VerbatimTable headers={["Инвест-цель", "Продуктовая стратегия"]} rows={[
                    ["Пассивный доход", "Стратегия Cash-Flow"],
                    ["Рост капитала", "Стратегия Grow"],
                    ["Защита капитала", "Диверсификация"]
                  ]} />
                </div>

                <HighlightCard variant="dark">
                  <p className="text-xs font-black italic text-center text-white leading-tight">
                    Четкий фокус на ЦА — это основа выхода из красного океана. <br/>
                    <span className="text-blue-500 uppercase tracking-widest text-[10px] mt-2 block">B2C даёт сделки, B2B даёт масштаб.</span>
                  </p>
                </HighlightCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-12 border-t border-slate-100 dark:border-slate-800 pt-8">
           <button 
             onClick={handlePrev}
             disabled={step === 0}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === 0 ? "opacity-20 pointer-events-none" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm"
             )}
           >
             <ArrowLeft size={20} className="translate-x-[-1px]" />
           </button>

           <div className="flex gap-2.5">
             {[0, 1, 2].map((i) => (
               <div key={i} className={cn(
                 "h-1 rounded-full transition-all duration-700",
                 step === i ? "w-10 bg-blue-600" : "w-2.5 bg-slate-200 dark:bg-slate-800"
               )} />
             ))}
           </div>

           <button 
             onClick={handleNext}
             disabled={step === totalSteps - 1}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === totalSteps - 1 ? "opacity-20 pointer-events-none" : "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-blue-900/40"
             )}
           >
             <ChevronRight size={20} className="translate-x-[1px]" />
           </button>
        </div>
      </div>
    </>
  );
};

function ProductVerbatim() {
  const [step, setStep] = React.useState(0);
  const totalSteps = 4;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <PageHeader title="Продуктовая переупаковка" subtitle="От объекта к инвестиционному кейсу" />
      
      <div className="px-6 mb-8">
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar py-2">
          {['4.1. Кейсы', '4.2. Стратегии', '4.3. Критерии', '4.4. Шаблоны'].map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className={cn(
                "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap transition-all border",
                step === i 
                  ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/20 scale-105" 
                  : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="4.1" title="Объект → Инвестиционный кейс" />
                <Paragraph>Рациональный инвестор покупает не объект, а понятный сценарий заработка с объясненной логикой и рисками.</Paragraph>
                
                <HighlightCard variant="blue">
                  <p className="text-[10px] font-black uppercase text-blue-600 mb-4 tracking-widest">Логика Smart Solutions</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight italic">
                    Мы не показываем объекты «как есть». Мы упаковываем каждый объект в инвестиционный кейс, встроенный в конкретную стратегию.
                  </p>
                </HighlightCard>

                <div className="space-y-4 px-6">
                   {[
                     { q: "Инвестиционная цель", a: "Что должно случиться в жизни инвестора?" },
                     { q: "Инвестиционная стратегия", a: "Как это случится в жизни инвестора?" },
                     { q: "Объект как инструмент", a: "За счет чего это случится?" },
                     { q: "Прогноз и сценарии", a: "Почему и с какой вероятностью это случится?" }
                   ].map((item, i) => (
                     <div key={i} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 shadow-sm leading-tight">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">0{i+1}. {item.q}</p>
                        <p className="text-xs font-bold text-slate-900 dark:text-white italic leading-tight">{item.a}</p>
                     </div>
                   ))}
                </div>

                <div className="pt-6">
                  <SectionHeader title="Практическое применение" />
                  <div className="space-y-3">
                    <ListItem type="check">Не показывается без привязки к стратегии</ListItem>
                    <ListItem type="check">Не продаётся без объяснения логики заработка</ListItem>
                    <ListItem type="check">Не используется в рекламе как «просто вилла»</ListItem>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="4.2" title="Инвестиционные стратегии как продукт" />
                <Paragraph>Инвестиционные запросы повторяются. Меняются объекты, но цели инвесторов — типовые.</Paragraph>
                
                <HighlightCard variant="dark">
                  <p className="text-sm font-black italic text-center text-white leading-tight">
                    Продукт агентства — это набор инвестиционных стратегий, а не набор объектов.
                  </p>
                </HighlightCard>

                <VerbatimTable headers={["Цель", "Стратегия", "Тип объектов"]} rows={[
                  ["Пассивный доход", "Cash-flow", "Вторичка, готовые виллы"],
                  ["Рост капитала", "Capital Growth", "Первичка, флиппинг"],
                  ["Диверсификация", "Hybrid", "Коллективные инвестиции"]
                ]} />

                <div className="pt-6">
                  <SectionHeader title="Влияние на процессы" />
                  <div className="space-y-3">
                    <ListItem type="bullet">Продажи начинаются с выбора стратегии</ListItem>
                    <ListItem type="bullet">Маркетинг строится вокруг стратегий и целей</ListItem>
                    <ListItem type="bullet">Объекты подбираются под стратегию</ListItem>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="4.3" title="Критерии отбора объектов" />
                <Paragraph>Мы фиксируем критерии отбора по каждой стратегии. Личная субъективность менеджера заменяется скорингом.</Paragraph>
                
                <div className="mx-6 p-8 rounded-[40px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <p className="text-[10px] font-black uppercase text-blue-600 mb-8 tracking-widest text-center">Базовые критерии (фильтр)</p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {["Локация", "Динамика спроса", "Источники дохода", "Стратегия выхода", "Экономика", "Надёжность", "Юр. структура", "Метрики стратегии"].map(tag => (
                      <div key={tag} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/20" />
                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <HighlightCard variant="red">
                   <p className="text-[10px] font-black uppercase tracking-widest text-center mb-6 text-red-600">Объект отклоняется, если:</p>
                   <div className="space-y-2">
                     <ListItem type="cross">Не проходит критерии</ListItem>
                     <ListItem type="cross">Не встраивается в стратегию</ListItem>
                     <ListItem type="cross">Нельзя объяснить риски</ListItem>
                   </div>
                </HighlightCard>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="4.4" title="Шаблоны презентации инвест-кейсов" />
                <Paragraph>Создаем единые шаблоны, которые превращают экспертизу Smart Solutions в повторяемый продукт.</Paragraph>
                
                <div className="mx-6 p-8 rounded-[40px] bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-8 tracking-widest">Структура презентации:</p>
                  <div className="space-y-5">
                    {[
                      "Цель инвестора (Зачем?)",
                      "Стратегия (Как?)",
                      "Экономика (Доходы, ROI)",
                      "Риски (Что может пойти не так?)",
                      "Сценарии (База / Рост / Стресс)",
                      "Вывод (Кому подходит?)"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-5">
                        <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-black text-blue-600 font-mono italic">{i+1}</span>
                        </div>
                        <p className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest leading-tight">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <HighlightCard variant="blue">
                  <p className="text-xs font-black italic text-center leading-relaxed">
                    Шаблоны масштабируют продажи (Ctrl+C / Ctrl+V) и гарантируют качество смыслов на уровне каждого менеджера.
                  </p>
                </HighlightCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-12 border-t border-slate-100 dark:border-slate-800 pt-8">
           <button 
             onClick={handlePrev}
             disabled={step === 0}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === 0 ? "opacity-20 pointer-events-none" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm"
             )}
           >
             <ArrowLeft size={20} className="translate-x-[-1px]" />
           </button>

           <div className="flex gap-2.5">
             {[0, 1, 2, 3].map((i) => (
               <div key={i} className={cn(
                 "h-1 rounded-full transition-all duration-700",
                 step === i ? "w-10 bg-blue-600" : "w-1.5 bg-slate-200 dark:bg-slate-800"
               )} />
             ))}
           </div>

           <button 
             onClick={handleNext}
             disabled={step === totalSteps - 1}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === totalSteps - 1 ? "opacity-20 pointer-events-none" : "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-blue-900/40"
             )}
           >
             <ChevronRight size={20} className="translate-x-[1px]" />
           </button>
        </div>
      </div>
    </>
  );
}

function FunnelVerbatim() {
  const [step, setStep] = React.useState(0);
  const totalSteps = 4;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <PageHeader title="Воронка продаж нового типа" subtitle="Диагностика и инвест-менеджмент" />
      
      <div className="px-6 mb-8">
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar py-2">
          {['5.1. Модель', '5.2. Диагностика', '5.3. Роль IM', '5.4. Качество'].map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className={cn(
                "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap transition-all border",
                step === i 
                  ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/20 scale-105" 
                  : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="5.1" title="Этапы инвестиционных продаж" />
                <Paragraph italic>Классическая воронка начинается с объектов. Мы начинаем с мышления инвестора.</Paragraph>
                
                <div className="space-y-4 px-6">
                   {[
                     { t: "Диагностика инвестора", d: "Какие инвестиционные цели стоят перед человеком?" },
                     { t: "Инвест-решение", d: "Какие решения помогут достичь цели?" },
                     { t: "Презентация стратегии", d: "Демонстрация способа достижения" },
                     { t: "Сделка", d: "Поддержка в реализации" }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-5 items-center p-6 rounded-[36px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-transform active:scale-[0.98]">
                       <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-lg shadow-blue-600/20">{i+1}</div>
                       <div>
                         <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white tracking-widest mb-0.5">{item.t}</p>
                         <p className="text-[10px] font-bold text-slate-400 italic leading-tight tracking-tighter">{item.d}</p>
                       </div>
                     </div>
                   ))}
                </div>

                <HighlightCard variant="dark">
                  <p className="text-sm font-black italic text-center text-white leading-tight">
                    Инвестиционные продажи — это не каталог объектов, а навигация по целям инвестора.
                  </p>
                </HighlightCard>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="5.2" title="Диагностика как точка входа" />
                <Paragraph italic>Диагностика и скоринг лидов — обязательный первый этап. Без него продажа не продолжается.</Paragraph>
                
                <VerbatimTable headers={["Параметр", "Что фиксируем", "Зачем?"]} rows={[
                  ["Цель", "доход / рост / диверсификация", "Персонализация"],
                  ["Горизонт", "1–3 / 3–5 / 5+ лет", "Выбор стратегии"],
                  ["Бюджет", "реальный диапазон", "Квалификация"],
                  ["Риск", "низкий / средний / высокий", "Безопасность"],
                  ["Роль", "пассивный / активный", "Акцент в презентации"]
                ]} />

                <div className="pt-6">
                  <SectionHeader title="Фиксация и применение" />
                  <div className="space-y-3">
                    <ListItem type="check">Данные фиксируются в CRM (обязательно)</ListItem>
                    <ListItem type="check">Используются для подбора инвест-кейсов</ListItem>
                    <ListItem type="check">Возвращаются клиенту как отражение запроса</ListItem>
                  </div>
                </div>

                <HighlightCard variant="red">
                  <p className="text-xs font-black italic text-center leading-tight">
                    Если нет заполненной диагностики — следующего этапа воронки быть не может.
                  </p>
                </HighlightCard>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="5.3" title="От Агента к Investment Manager" />
                <Paragraph font-bold>Investment Manager помогает инвестору принять рациональное решение, объясняя логику и риски.</Paragraph>
                
                <VerbatimTable headers={["Классический Агент", "Investment Manager"]} rows={[
                  ["Продает объект", "Проектирует инвест кейсы"],
                  ["Показывает варианты", "Подбирает под стратегию"],
                  ["Давит на эмоции", "Работает через логику"],
                  ["Реагирует на запрос", "Управляет процессом"]
                ]} />

                <div className="pt-6">
                  <SectionHeader title="Следствие для бизнеса" />
                  <div className="grid grid-cols-1 gap-4 px-6">
                    <div className="p-5 rounded-[32px] bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 flex items-center justify-between shadow-sm">
                      <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Рост доверия</p>
                      <CheckCircle2 size={20} className="text-emerald-500" />
                    </div>
                    <div className="p-5 rounded-[32px] bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 flex items-center justify-between shadow-sm">
                      <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Выше чек и конверсия</p>
                      <TrendingUp size={20} className="text-blue-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="5.4" title="Обучение и контроль качества" />
                <Paragraph italic>Без обучения модель не работает. Инвестиционная воронка — это другой формат аргументации.</Paragraph>
                
                <HighlightCard variant="blue">
                  <p className="text-[10px] font-black uppercase text-blue-600 mb-6 tracking-widest text-center">Система контроля</p>
                  <div className="space-y-4">
                     <div className="flex gap-4 p-5 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm leading-tight">
                        <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0"><Info size={14} className="text-blue-600" /></div>
                        <p className="text-[10px] font-bold text-slate-500 leading-tight italic">Анализ Zoom/звонков: проведена ли диагностика, презентовалась ли стратегия?</p>
                     </div>
                     <div className="flex gap-4 p-5 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm leading-tight">
                        <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0"><Check size={14} className="text-blue-600" /></div>
                        <p className="text-[10px] font-bold text-slate-500 leading-tight italic">Менеджеры записывают видео-презентации инвест-кейсов для внутренней валидации.</p>
                     </div>
                  </div>
                </HighlightCard>

                <div className="pt-10">
                   <SectionHeader title="Итог главы" />
                   <Paragraph italic>Продажи становятся управляемым процессом, доводя агентство до стабильной прибыли.</Paragraph>
                   <HighlightCard variant="dark">
                      <p className="text-xs font-black italic text-center text-white leading-tight uppercase tracking-tighter">
                        Investment Excellence: К стабильным 3+ сделкам в месяц.
                      </p>
                   </HighlightCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-12 border-t border-slate-100 dark:border-slate-800 pt-8">
           <button 
             onClick={handlePrev}
             disabled={step === 0}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === 0 ? "opacity-20 pointer-events-none" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm"
             )}
           >
             <ArrowLeft size={20} className="translate-x-[-1px]" />
           </button>

           <div className="flex gap-2.5">
             {[0, 1, 2, 3].map((i) => (
               <div key={i} className={cn(
                 "h-1 rounded-full transition-all duration-700",
                 step === i ? "w-10 bg-blue-600" : "w-1.5 bg-slate-200 dark:bg-slate-800"
               )} />
             ))}
           </div>

           <button 
             onClick={handleNext}
             disabled={step === totalSteps - 1}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === totalSteps - 1 ? "opacity-20 pointer-events-none" : "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-blue-900/40"
             )}
           >
             <ChevronRight size={20} className="translate-x-[1px]" />
           </button>
        </div>
      </div>
    </>
  );
}

function AcquisitionVerbatim() {
  const [step, setStep] = React.useState(0);
  const totalSteps = 3;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <PageHeader title="Каналы привлечения" subtitle="Маркетинг на основе доверия и партнерства" />
      
      <div className="px-6 mb-8">
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar py-2">
          {['6.1. Трафик vs Партнеры', '6.2. Партнерская ставка', '6.3. Экспертность & SMM'].map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className={cn(
                "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap transition-all border",
                step === i 
                  ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/20 scale-105" 
                  : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="6.1" title="Платный трафик vs Партнерский маркетинг" />
                <Paragraph italic>Рынок Facebook Ads перегрет. Прямой трафик без доверия дает много «сырья», но мало сделок.</Paragraph>
                
                <VerbatimTable headers={["Критерий", "Платный трафик", "Партнерский"]} rows={[
                  ["Уровень доверия", "Низкий", "Высокий"],
                  ["Квалификация лида", "Низкая / Средняя", "Высокая"],
                  ["Стоимость", "Растущая", "За результат"],
                  ["Масштабируемость", "Через бюджет", "Через сеть"],
                  ["Позиционирование", "Слабое", "Полное"]
                ]} />

                <div className="pt-6">
                  <SectionHeader title="Роль платного трафика" />
                  <Paragraph>Мы используем его как вспомогательный инструмент, а не как основной драйвер.</Paragraph>
                  <div className="space-y-3">
                    <ListItem type="bullet">Поддержка SMM и набор подписчиков</ListItem>
                    <ListItem type="bullet">Тестирование гипотез и креативов</ListItem>
                    <ListItem type="bullet">Дожим теплой аудитории</ListItem>
                    <ListItem type="bullet">Привлечение B2B кандидатов (B2B воронка)</ListItem>
                  </div>
                </div>

                <HighlightCard variant="red">
                  <p className="text-sm font-black italic text-center text-red-600 leading-tight">
                    Прямой платный трафик без доверия не масштабирует инвестиционные продажи.
                  </p>
                </HighlightCard>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="6.2" title="Ставка на Партнерский маркетинг" />
                <Paragraph font-bold>Для чеков $200k–$1M решения принимаются почти всегда через рекомендации и доверие.</Paragraph>
                
                <HighlightCard variant="blue">
                  <p className="text-[10px] font-black uppercase text-blue-600 mb-4 tracking-widest">Ключевая позиция</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight italic">
                    Партнерский маркетинг позволяет выйти из «красного океана» рекламы и строить рост через доверие и высокий средний чек.
                  </p>
                </HighlightCard>

                <div className="space-y-3 px-6">
                  <ListItem type="check">Партнерский маркетинг — основной канал привлечения квал-лидов</ListItem>
                  <ListItem type="check">Фокус на качестве и повторяемости сделок, а не на количестве партнеров</ListItem>
                  <ListItem type="check">Партнёры работают не с объектами, а со стратегиями Smart Solutions</ListItem>
                </div>

                <div className="pt-10">
                   <SectionHeader title="Практический вывод" />
                   <Paragraph italic>Мы масштабируем партнерскую сеть как систему доставки экспертного доверия до инвестора.</Paragraph>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="6.3" title="Экспертный маркетинг и SMM как актив" />
                <Paragraph italic>Инвестиции — это про доверие к людям. Экспертность должна быть видимой и системной.</Paragraph>
                
                <div className="grid grid-cols-2 gap-4 px-6 pt-2">
                   {[
                     { t: "Публичные эфиры", d: "Вебинары с партнерами" },
                     { t: "Аналитика", d: "Разборы объектов и рынков" },
                     { t: "Стратегии", d: "Презентация логики" },
                     { t: "Подкасты", d: "Интервью и нарезки" }
                   ].map(f => (
                     <div key={f.t} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm leading-tight">
                       <p className="text-[10px] font-black uppercase text-blue-600 mb-1 tracking-tight">{f.t}</p>
                       <p className="text-[10px] font-bold text-slate-400 italic leading-tight">{f.d}</p>
                     </div>
                   ))}
                </div>

                <div className="pt-10 px-6">
                   <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">SMM как стратегический актив:</h3>
                   <div className="space-y-4">
                      <VerbatimTable headers={["Формат", "Функция", "Результат"]} rows={[
                        ["Экспертный контент", "Доказательство", "Доверие"],
                        ["Видео-кейсы", "Демонстрация", "Прогрев"],
                        ["Лид-магниты", "Захват внимания", "Подписки"],
                        ["Рассылки", "Касания", "Дожим"]
                      ]} />
                   </div>
                </div>

                <div className="space-y-3 mb-10">
                  <ListItem type="bullet">Контент-воронка 10–15 касаний для прогрева</ListItem>
                  <ListItem type="bullet">Развитие личных брендов внутри команды</ListItem>
                </div>

                <HighlightCard variant="dark">
                  <p className="text-xs font-black italic text-center text-white leading-tight uppercase tracking-tighter">
                    Мы выходим из красного океана и строим рост через экспертизу.
                  </p>
                </HighlightCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-12 border-t border-slate-100 dark:border-slate-800 pt-8">
           <button 
             onClick={handlePrev}
             disabled={step === 0}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === 0 ? "opacity-20 pointer-events-none" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm"
             )}
           >
             <ArrowLeft size={20} className="translate-x-[-1px]" />
           </button>

           <div className="flex gap-2.5">
             {[0, 1, 2].map((i) => (
               <div key={i} className={cn(
                 "h-1 rounded-full transition-all duration-700",
                 step === i ? "w-10 bg-blue-600" : "w-1.5 bg-slate-200 dark:bg-slate-800"
               )} />
             ))}
           </div>

           <button 
             onClick={handleNext}
             disabled={step === totalSteps - 1}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === totalSteps - 1 ? "opacity-20 pointer-events-none" : "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-blue-900/40"
             )}
           >
             <ChevronRight size={20} className="translate-x-[1px]" />
           </button>
        </div>
      </div>
    </>
  );
}

function PartnershipVerbatim() {
  const [step, setStep] = React.useState(0);
  const totalSteps = 4;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <PageHeader title="Партнерская модель" subtitle="Механизм системного масштабирования" />
      
      <div className="px-6 mb-8">
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar py-2">
          {['7.1. Типы партнеров', '7.2. Ценность', '7.3. Механика', '7.4. Принципы'].map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className={cn(
                "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap transition-all border",
                step === i 
                  ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/20 scale-105" 
                  : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="7.1" title="Экосистема партнеров Smart Solutions" />
                <Paragraph italic>Масштаб достигается не количеством лидов, а доступом к доверенным аудиториям.</Paragraph>
                
                <VerbatimTable headers={["Партнер", "Доступ к ЦА", "Роль в системе"]} rows={[
                  ["Инвест-клубы", "Частные инвесторы", "Массовый поток чеков $350k+"],
                  ["Комьюнити Брит.", "Предприниматели", "Сделки под капитализацию"],
                  ["Агентства-партнеры", "Клиенты под инвест", "Масштаб без расширения штата"],
                  ["Фин. советники", "VIP-клиенты", "Высокое доверие, чек $250k+"],
                  ["Family Offices", "Крупный капитал", "Чеки > $500k"]
                ]} />

                <div className="px-6 pt-6">
                   <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">С кем мы работаем:</h3>
                   <div className="space-y-3">
                     <ListItem type="check">Партнёры с доверием и доступом к деньгам</ListItem>
                     <ListItem type="bullet" className="opacity-40 italic">Партнёры без аудитории («хочу попробовать») — НЕТ</ListItem>
                   </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="7.2" title="Ценность для партнера" />
                <Paragraph font-bold>Мы продаем партнёру готовую логику продажи, контент и продукт.</Paragraph>
                
                <VerbatimTable headers={["Критерий", "Классика", "Smart Solutions"]} rows={[
                  ["Что продает", "Объект", "Инвест-стратегию"],
                  ["Аргументы", "Эмоции", "Цифры + Логика"],
                  ["Поддержка", "Минимальная", "Методология + Материалы"],
                  ["Комиссия", "Стандартная", "Выше рынка"],
                  ["Риск", "Репутационный", "Контролируемый"]
                ]} />

                <HighlightCard variant="blue">
                  <p className="text-[10px] font-black uppercase text-blue-600 mb-2 tracking-widest text-center">Почему выбирают нас?</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight italic text-center">
                    Возможность зарабатывать больше, усиливая свою экспертизу через нашу аналитику, без необходимости погружаться в рынок Бали самостоятельно.
                  </p>
                </HighlightCard>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="7.3" title="Механика и Мотивация" />
                <Paragraph italic>Партнёрская модель — это управляемая воронка, а не хаотичные договорённости.</Paragraph>
                
                <div className="px-6 space-y-4">
                   <div className="p-5 rounded-[40px] bg-slate-900 text-white shadow-2xl shadow-blue-900/20">
                      <h3 className="text-[10px] font-black uppercase text-blue-500 mb-4 tracking-widest">Что мы даем партнеру:</h3>
                      <div className="grid grid-cols-1 gap-3">
                         <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> <p className="text-[10px] font-bold uppercase tracking-tight">Презентации инвест-стратегий</p></div>
                         <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> <p className="text-[10px] font-bold uppercase tracking-tight">Шаблоны инвест-кейсов</p></div>
                         <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> <p className="text-[10px] font-bold uppercase tracking-tight">Расчеты доходности</p></div>
                         <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> <p className="text-[10px] font-bold uppercase tracking-tight">Сценарии общения (скрипты)</p></div>
                      </div>
                   </div>

                   <div className="p-5 rounded-[40px] bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                      <h3 className="text-[10px] font-black uppercase text-emerald-600 mb-4 tracking-widest">Мотивация:</h3>
                      <div className="space-y-2">
                        <ListItem type="check">Комиссия выше рынка</ListItem>
                        <ListItem type="check">Совместные эфиры и запуски</ListItem>
                        <ListItem type="check">Долгосрочное масштабирование</ListItem>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="7.4" title="Smart Solutions vs Агентские сети" />
                <Paragraph font-bold>Отличие от классических моделей — в приоритете качества над массовостью.</Paragraph>
                
                <VerbatimTable headers={["Параметр", "Агентская сеть", "Smart Solutions"]} rows={[
                  ["Фокус", "Массовость", "Качество"],
                  ["Обучение", "Минимальное", "Методология продаж"],
                  ["Контроль", "Отсутствует", "Четкие стандарты"],
                  ["Продукт", "Объекты", "Инвест-стратегии"],
                  ["Масштаб", "Через людей", "Через систему"]
                ]} />

                <div className="pt-6 px-6">
                   <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Чего мы НЕ делаем:</h3>
                   <div className="space-y-2">
                      <div className="flex items-center gap-3 text-red-500"><XCircle size={16} /> <p className="text-[10px] font-black uppercase">НЕ СТРОИМ MLM-АГЕНТКУ</p></div>
                      <div className="flex items-center gap-3 text-red-500"><XCircle size={16} /> <p className="text-[10px] font-black uppercase">НЕ ГОНИМСЯ ЗА КОЛИЧЕСТВОМ</p></div>
                      <div className="flex items-center gap-3 text-red-500"><XCircle size={16} /> <p className="text-[10px] font-black uppercase">НЕ ДАЕМ ПРОДАВАТЬ «ЧТО УГОДНО»</p></div>
                   </div>
                </div>

                <HighlightCard variant="dark">
                  <p className="text-xs font-black italic text-center text-white leading-tight uppercase tracking-tighter">
                    Мы остаемся управляемым бизнесом даже при бурном росте.
                  </p>
                </HighlightCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-12 border-t border-slate-100 dark:border-slate-800 pt-8">
           <button 
             onClick={handlePrev}
             disabled={step === 0}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === 0 ? "opacity-20 pointer-events-none" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm"
             )}
           >
             <ArrowLeft size={20} className="translate-x-[-1px]" />
           </button>

           <div className="flex gap-2.5">
             {[0, 1, 2, 3].map((i) => (
               <div key={i} className={cn(
                 "h-1 rounded-full transition-all duration-700",
                 step === i ? "w-10 bg-blue-600" : "w-1.5 bg-slate-200 dark:bg-slate-800"
               )} />
             ))}
           </div>

           <button 
             onClick={handleNext}
             disabled={step === totalSteps - 1}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === totalSteps - 1 ? "opacity-20 pointer-events-none" : "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-blue-900/40"
             )}
           >
             <ChevronRight size={20} className="translate-x-[1px]" />
           </button>
        </div>
      </div>
    </>
  );
}

function OpsVerbatim() {
  const [step, setStep] = React.useState(0);
  const totalSteps = 4;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <PageHeader title="Маркетинговая операционка" subtitle="Управление через метрики и результат" />
      
      <div className="px-6 mb-8">
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar py-2">
          {['8.1. Метрики', '8.2. Подрядчики', '8.3. Оплата', '8.4. Роль AI'].map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className={cn(
                "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap transition-all border",
                step === i 
                  ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/20 scale-105" 
                  : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="8.1" title="Метрики инвестиционного маркетинга" />
                <Paragraph italic>Мы не оптимизируем маркетинг под клики. Мы оптимизируем его под сделки.</Paragraph>
                
                <VerbatimTable headers={["Уровень", "Метрика", "Зачем?"]} rows={[
                  ["Качество", "% контактируемых лидов", "Отсекаем мусор"],
                  ["Качество", "% квал-лидов (SQL)", "Релевантность ЦА"],
                  ["Продажи", "Cost per Qualified Lead", "Ключевая стоимость"],
                  ["Бизнес", "Сделки / Месяц", "Финальная цель"],
                  ["Бизнес", "Доход / Сделка", "Юнит-экономика"]
                ]} />

                <HighlightCard variant="blue">
                   <p className="text-sm font-black italic text-center text-slate-900 leading-tight">
                     Главная метрика — не «лиды», а количество квалифицированных инвестиционных диалогов.
                   </p>
                </HighlightCard>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="8.2" title="Контроль подрядчиков по маркетингу" />
                <Paragraph font-bold>Подрядчики — не источник стратегии. Они исполнители в рамках фиксированной системы.</Paragraph>
                
                <div className="px-6 space-y-4">
                   <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Требования к команде:</h3>
                   <ListItem type="check">Понимание инвест-позиционирования Smart Solutions</ListItem>
                   <ListItem type="check">Работа строго по утвержденным офферам и стратегиям</ListItem>
                   <ListItem type="check">Еженедельная отчетность по квал-лидам и гипотезам</ListItem>
                   <ListItem type="check">Продвинутый навык работы с AI инструментами</ListItem>
                   <ListItem type="check">Готовность к оплате за конкретный результат</ListItem>
                </div>

                <HighlightCard variant="red">
                  <p className="text-xs font-black italic text-center text-red-600 leading-tight">
                    Если подрядчик не готов работать в логике квал-лидов — он не подходит агентству.
                  </p>
                </HighlightCard>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="8.3" title="Модели оплаты за результат" />
                <Paragraph italic>Принимаем решение переходить на гибридную или результат-ориентированную модель.</Paragraph>
                
                <SimpleTable rows={[
                  { label: "Только фикса (Fix only)", value: "No", cross: true },
                  { label: "Фикс + KPI за квал-лиды", value: "Ok", check: true },
                  { label: "Оплата строго за квал-лида", value: "Yes", check: true },
                  { label: "Success-fee с закрытых сделок", value: "Yes", check: true }
                ]} />

                <HighlightCard variant="dark">
                   <p className="text-sm font-black italic text-center text-white leading-tight mb-2 uppercase">Квал-лид (Vetted Lead)</p>
                   <p className="text-[10px] text-slate-400 font-medium italic text-center leading-tight">
                     Инвестор с понятной целью, бюджетом и горизонтом, прошедший первичную диагностику.
                   </p>
                </HighlightCard>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="8.4" title="Роль AI в операционке" />
                <Paragraph font-bold>AI — не «фишка», а системный усилитель управляемости и скорости маркетинга.</Paragraph>
                
                <VerbatimTable headers={["Зона", "Что делает AI", "Эффект"]} rows={[
                  ["Контент", "Сценарии, идеи, видео", "Скорость / Масштаб"],
                  ["Креативы", "Анализ и генерация гипотез", "Быстрое тестирование"],
                  ["Продажи", "Анализ звонков и зумов", "Контроль качества IM"],
                  ["CRM", "Релевантные письма под лида", "Рост конверсии"]
                ]} />

                <div className="pt-10 px-6">
                   <HighlightCard variant="blue">
                      <p className="text-xs font-black italic text-center text-slate-900 leading-tight">
                        AI позволяет быстрее выявлять, что работает, а что нет. Внедряем там, где это усиливает контроль.
                      </p>
                   </HighlightCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-12 border-t border-slate-100 dark:border-slate-800 pt-8">
           <button 
             onClick={handlePrev}
             disabled={step === 0}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === 0 ? "opacity-20 pointer-events-none" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm"
             )}
           >
             <ArrowLeft size={20} className="translate-x-[-1px]" />
           </button>

           <div className="flex gap-2.5">
             {[0, 1, 2, 3].map((i) => (
               <div key={i} className={cn(
                 "h-1 rounded-full transition-all duration-700",
                 step === i ? "w-10 bg-blue-600" : "w-1.5 bg-slate-200 dark:bg-slate-800"
               )} />
             ))}
           </div>

           <button 
             onClick={handleNext}
             disabled={step === totalSteps - 1}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === totalSteps - 1 ? "opacity-20 pointer-events-none" : "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-blue-900/40"
             )}
           >
             <ChevronRight size={20} className="translate-x-[1px]" />
           </button>
        </div>
      </div>
    </>
  );
}

function RoadmapVerbatim() {
  const [step, setStep] = React.useState(0);
  const totalSteps = 3;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <PageHeader title="План внедрения" subtitle="Поэтапная реализация стратегии" />
      
      <div className="px-6 mb-8">
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar py-2">
          {['9.1. Приоритеты', '9.2. Инициативы', '9.3. Риски'].map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className={cn(
                "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap transition-all border",
                step === i 
                  ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/20 scale-105" 
                  : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="9.1" title="Приоритеты на 30 / 60 / 90 дней" />
                <Paragraph italic>Мы внедряем стратегию волнами: сначала фундамент, затем масштабирование.</Paragraph>
                
                <div className="space-y-4">
                   {[
                     { 
                       t: "0–30 Дней: Фундамент", 
                       d: "Финализация позиционирования, переупаковка в инвест-кейсы, старт партнерского канала.",
                       r: "Первые тёплые сделки, контроль воронки" 
                     },
                     { 
                       t: "31–60 Дней: Ускорение", 
                       d: "Масштабирование партнерств, экспертные эфиры, запуск SMM-воронки и лид-магнитов.",
                       r: "Стабильный поток квал-лидов" 
                     },
                     { 
                       t: "61–90 Дней: Системность", 
                       d: "Оптимизация каналов, регламенты, AI-инструменты, подготовка базы для роста.",
                       r: "Повторяемая модель продаж" 
                     }
                   ].map((phase, i) => (
                     <div key={i} className="p-6 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm leading-tight relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h4 className="text-[10px] font-black uppercase text-blue-600 mb-2 tracking-widest">{phase.t}</h4>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mb-3">{phase.d}</p>
                        <div className="flex items-center gap-2 pt-3 border-t border-slate-50 dark:border-slate-800">
                           <p className="text-[9px] font-black uppercase text-emerald-500 tracking-tighter">Результат:</p>
                           <p className="text-[10px] font-bold text-slate-400 italic">{phase.r}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="9.2" title="Ключевые инициативы" />
                <Paragraph font-bold>5 инициатив с максимальным эффектом на сделки и доверие.</Paragraph>
                
                <div className="space-y-2">
                   <ListItem type="check">Переупаковка продукта в инвест-стратегии</ListItem>
                   <ListItem type="check">Запуск и масштабирование партнерского маркетинга</ListItem>
                   <ListItem type="check">Обучение команды роли Investment Manager</ListItem>
                   <ListItem type="check">Экспертный контент и личный бренд</ListItem>
                   <ListItem type="check">Контроль качества лидов через метрики</ListItem>
                </div>

                <HighlightCard variant="blue">
                   <p className="text-xs font-bold text-slate-700 dark:text-slate-300 italic leading-relaxed text-center">
                     Каждая инициатива имеет ответственного, срок и измеримую метрику успеха.
                   </p>
                </HighlightCard>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="9.3" title="Риски и точки контроля" />
                <Paragraph italic>Управляем ростом через превентивное выявление рисков.</Paragraph>
                
                <VerbatimTable headers={["Риск", "Метод контроля"]} rows={[
                  ["Размывание фокуса", "Приоритет на партнерский канал"],
                  ["Низкое качество лидов", "CPLQ — ключевая метрика"],
                  ["Сопротивление команды", "Обучение и контроль звонков"],
                  ["Перегруз маркетинга", "Отказ от лишних каналов"]
                ]} />

                <HighlightCard variant="red">
                  <p className="text-sm font-black italic text-center text-red-600 leading-tight">
                    Мы внедряем стратегию поэтапно, не переходя к следующему шагу без стабилизации метрик.
                  </p>
                </HighlightCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-12 border-t border-slate-100 dark:border-slate-800 pt-8">
           <button 
             onClick={handlePrev}
             disabled={step === 0}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === 0 ? "opacity-20 pointer-events-none" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm"
             )}
           >
             <ArrowLeft size={20} className="translate-x-[-1px]" />
           </button>

           <div className="flex gap-2.5">
             {[0, 1, 2].map((i) => (
               <div key={i} className={cn(
                 "h-1 rounded-full transition-all duration-700",
                 step === i ? "w-10 bg-blue-600" : "w-1.5 bg-slate-200 dark:bg-slate-800"
               )} />
             ))}
           </div>

           <button 
             onClick={handleNext}
             disabled={step === totalSteps - 1}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === totalSteps - 1 ? "opacity-20 pointer-events-none" : "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-blue-900/40"
             )}
           >
             <ChevronRight size={20} className="translate-x-[1px]" />
           </button>
        </div>
      </div>
    </>
  );
}

function GrowthVerbatim() {
  const [step, setStep] = React.useState(0);
  const totalSteps = 3;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <PageHeader title="Логика роста" subtitle="Финальный вектор развития агентства" />
      
      <div className="px-6 mb-8">
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar py-2">
          {['10.1. Путь к 3+ сделкам', '10.2. База экосистемы', '10.3. Видение'].map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className={cn(
                "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap transition-all border",
                step === i 
                  ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/20 scale-105" 
                  : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="10.1" title="Как мы приходим к 3+ сделкам в месяц" />
                <Paragraph italic>Цель — стабильный поток сделок через правильный продукт, каналы и воронку.</Paragraph>
                
                <div className="grid grid-cols-1 gap-4 px-6">
                   {[
                     { t: "Продукт", d: "Инвест-кейсы вместо объектов", icon: <Layers size={16} /> },
                     { t: "Каналы", d: "Партнерства вместо трафика", icon: <Network size={16} /> },
                     { t: "Воронка", d: "Диагностика → Стратегия → Сделка", icon: <Target size={16} /> }
                   ].map(item => (
                     <div key={item.t} className="flex items-center gap-5 p-6 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 shrink-0">
                           {item.icon}
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{item.t}</p>
                           <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{item.d}</p>
                        </div>
                     </div>
                   ))}
                </div>

                <HighlightCard variant="blue">
                  <p className="text-xs font-black italic text-center text-slate-900 leading-tight">
                    Мы выходим на 3+ сделки в месяц за счет концентрации на качестве входа, а не объеме лидов.
                  </p>
                </HighlightCard>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="10.2" title="Агентство как фундамент экосистемы" />
                <Paragraph font-bold>Агентство — это не конечная цель, а первый и обязательный бизнес-юнит.</Paragraph>
                
                <VerbatimTable headers={["Роль", "Что дает агентство?"]} rows={[
                  ["Деньги", "Cash-flow и ресурс на развитие"],
                  ["Доверие", "База инвесторов и рекомендации"],
                  ["Продукт", "Проверка стратегий на практике"],
                  ["Данные", "Реальные сделки и понимание спроса"],
                  ["Масштаб", "База для безопасного запуска юнитов"]
                ]} />

                <HighlightCard variant="dark">
                  <p className="text-xs font-black italic text-center text-white leading-tight uppercase tracking-tighter">
                    Агентство — это точка входа инвестора и основа всей экосистемы Smart Solutions.
                  </p>
                </HighlightCard>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <SectionHeader id="10.3" title="Связь с долгосрочным видением" />
                <Paragraph italic>Платформа инвестиционных решений в недвижимости.</Paragraph>
                
                <div className="px-6 space-y-3">
                   <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Логика перехода:</h3>
                   <ListItem type="check">Стабильные 3+ сделки в месяц</ListItem>
                   <ListItem type="check">Сформированный пул инвесторов и партнеров</ListItem>
                   <ListItem type="check">Повторяемые инвестиционные стратегии</ListItem>
                   <ListItem type="check">Ко-девелопмент и коллективные инвестиции</ListItem>
                </div>

                <div className="pt-6">
                   <div className="mx-6 p-8 rounded-[48px] bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 text-center">
                      <p className="text-[10px] font-black uppercase text-emerald-600 mb-4 tracking-widest">Финальный результат</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-8">
                         Эта стратегия выводит агентство на прибыль, убирает зависимость от трафика и закладывает фундамент для экосистемы.
                      </p>
                      <div className="flex justify-center gap-3">
                         <div className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 text-[9px] font-black uppercase text-emerald-600">ТЗ для подрядчиков</div>
                         <div className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 text-[9px] font-black uppercase text-emerald-600">Ориентир роста</div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-12 border-t border-slate-100 dark:border-slate-800 pt-8">
           <button 
             onClick={handlePrev}
             disabled={step === 0}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === 0 ? "opacity-20 pointer-events-none" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm"
             )}
           >
             <ArrowLeft size={20} className="translate-x-[-1px]" />
           </button>

           <div className="flex gap-2.5">
             {[0, 1, 2].map((i) => (
               <div key={i} className={cn(
                 "h-1 rounded-full transition-all duration-700",
                 step === i ? "w-10 bg-blue-600" : "w-1.5 bg-slate-200 dark:bg-slate-800"
               )} />
             ))}
           </div>

           <button 
             onClick={handleNext}
             disabled={step === totalSteps - 1}
             className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-90",
               step === totalSteps - 1 ? "opacity-20 pointer-events-none" : "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-blue-900/40"
             )}
           >
             <ChevronRight size={20} className="translate-x-[1px]" />
           </button>
        </div>
      </div>
    </>
  );
}

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-[24px] flex items-center justify-center mb-6">
      <Zap size={32} className="text-slate-400 animate-pulse" />
    </div>
    <h2 className="text-xl font-black uppercase tracking-widest text-slate-400 mb-2">{title}</h2>
    <p className="text-sm text-slate-500 max-w-[240px]">Контент в процессе портирования из MD документа.</p>
  </div>
);
