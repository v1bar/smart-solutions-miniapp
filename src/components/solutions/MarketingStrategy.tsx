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
      case 'partners': return <PartnersVerbatim />;
      case 'ops': return <OpsVerbatim />;
      case 'roadmap': return <RoadmapVerbatim />;
      case 'growth': return <GrowthVerbatim />;
      default: return <ContentVerbatim />;
    }
  };

  return (
    <div className="min-h-full pb-24 bg-slate-50/30 dark:bg-slate-950/30">
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
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Горизонт</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white italic">6–12 месяцев</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Рынок</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white italic">Бали & Таиланд</p>
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
                  
                  <p className="text-[10px] uppercase font-black text-slate-500 mb-6 tracking-[0.3em] font-mono">Core Logic</p>
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
                className="grid grid-cols-1 gap-2"
              >
                {[
                  "1. Введение и контекст",
                  "2. Позиционирование Smart Solutions",
                  "3. Целевая аудитория и фокус",
                  "4. Продуктовая переупаковка",
                  "5. Воронка продаж нового типа",
                  "6. Каналы привлечения клиентов",
                  "7. Партнёрская модель",
                  "8. Операционка и контроль",
                  "9. План внедрения",
                  "10. Итоговая логика роста"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-[20px] bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800/50">
                    <span className="text-[10px] font-black text-blue-600 font-mono w-4">{i+1}</span>
                    <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white tracking-widest truncate">{item.split('. ')[1]}</p>
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
  <div className="mx-6 mb-6 overflow-hidden rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
    {headers && (
      <div className="grid grid-cols-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
        {headers.map((h, i) => (
          <div key={i} className={cn(
            "p-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center",
            i === 0 && "border-r border-slate-200 dark:border-slate-800"
          )}>{h}</div>
        ))}
      </div>
    )}
    {rows.map((row, i) => (
      <div key={i} className="grid grid-cols-2 border-b border-slate-100 dark:border-slate-800/50 last:border-0">
        <div className="p-4 text-xs font-bold text-slate-500 dark:text-slate-500 bg-slate-50/30 dark:bg-slate-800/10 border-r border-slate-100 dark:border-slate-800/50 flex items-center">{row[0]}</div>
        <div className="p-4 text-xs font-bold text-slate-900 dark:text-white flex items-center justify-end text-right">{row[1]}</div>
      </div>
    ))}
  </div>
);

const SimpleTable = ({ rows }: { rows: { label: string, value: string, check?: boolean, cross?: boolean }[] }) => (
  <div className="mx-6 mb-6 overflow-hidden rounded-[32px] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50">
    {rows.map((row, i) => (
      <div key={i} className="flex items-center justify-between p-4 border-b border-slate-50 dark:border-slate-800/50 last:border-0">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter w-2/3">{row.label}</span>
        <div className="flex items-center gap-2 justify-end text-right">
          <span className="text-xs font-black text-slate-900 dark:text-white leading-tight">{row.value}</span>
          {row.check && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
          {row.cross && <XCircle size={16} className="text-red-400 shrink-0" />}
        </div>
      </div>
    ))}
  </div>
);

const Paragraph = ({ children, className, italic }: { children: React.ReactNode, className?: string, italic?: boolean }) => (
  <p className={cn(
    "px-6 mb-5 text-sm leading-relaxed",
    italic ? "text-slate-500 dark:text-slate-400 italic" : "text-slate-600 dark:text-slate-400",
    className
  )}>{children}</p>
);

const HighlightCard = ({ children, variant = 'blue' }: { children: React.ReactNode, variant?: 'blue' | 'red' | 'dark' }) => (
  <div className={cn(
    "mx-6 my-6 p-6 rounded-[40px] border shadow-sm",
    variant === 'blue' && "bg-blue-50/50 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/20",
    variant === 'red' && "bg-red-50/50 dark:bg-red-500/5 border-red-100 dark:border-red-500/20",
    variant === 'dark' && "bg-slate-900 text-white border-0"
  )}>
    {children}
  </div>
);

const ListItem = ({ children, type = 'check' }: { children: React.ReactNode, type?: 'check' | 'cross' | 'bullet' }) => (
  <div className="px-6 flex gap-4 mb-4 items-start group">
    <div className={cn(
      "w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
      type === 'check' && "bg-emerald-500/10 text-emerald-500",
      type === 'cross' && "bg-red-500/10 text-red-500",
      type === 'bullet' && "bg-blue-500/10 text-blue-500"
    )}>
      {type === 'check' && <Check size={14} />}
      {type === 'cross' && <XCircle size={14} />}
      {type === 'bullet' && <ChevronRight size={14} />}
    </div>
    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:translate-x-1 transition-transform duration-300">{children}</p>
  </div>
);

// --- CHAPTER 1: ВВЕДЕНИЕ И КОНТЕКСТ ---
function IntroVerbatim() {
  return (
    <>
      <PageHeader title="Введение и контекст" subtitle="Агентство Smart Solutions" />
      
      <SectionHeader id="1.1" title="Задача стратегии и бизнес-цели агентства" />
      <Paragraph className="font-bold text-slate-900 dark:text-white">Что именно должна изменить эта маркетинговая стратегия в бизнесе Smart Solutions?</Paragraph>
      <VerbatimTable rows={[
        ["Кол-во продаж", "не менее 3 закрытых сделок в месяц"],
        ["Чистая прибыль", "$10 000+ на горизонте планирования"]
      ]} />
      <Paragraph italic>
        Маркетинговая стратегия Smart Solutions разрабатывается не как набор гипотез или каналов, а как инструмент достижения конкретного бизнес-результата.
      </Paragraph>
      <Paragraph>
        Стратегия отвечает не на вопрос: как системно привлекать инвестиционно релевантных клиентов, с которыми агентство способно закрывать сделки, не тратя ресурсы на фильтрацию «мусора».
      </Paragraph>

      <SectionHeader id="1.2" title="Ограничения и допущения" />
      <Paragraph>В каких условиях стратегия должна работать и что мы осознанно не пытаемся решить?</Paragraph>
      <SimpleTable rows={[
        { label: "Стадия агентского бизнеса", value: "Yes", check: true },
        { label: "Ограниченные ресурсы", value: "Yes", check: true },
        { label: "Фокус — рынок Бали", value: "Yes", check: true },
        { label: "Цель — прибыль", value: "Yes", check: true },
        { label: "Роль AI в продукте", value: "No", cross: true },
        { label: "Фондовая модель", value: "No", cross: true },
        { label: "Массовый B2C-маркетинг", value: "No", cross: true },
      ]} />
      <HighlightCard variant="red">
        <Paragraph className="mb-0 font-bold text-red-600">Эта стратегия — про фокус. Всё, что не ведёт к 3 сделкам в месяц, считается нерелевантным.</Paragraph>
      </HighlightCard>

      <SectionHeader id="1.3" title="Почему текущая модель не масштабируется" />
      <HighlightCard variant="dark">
        <Paragraph className="text-slate-400 mb-2">Текущая модель лидогенерации:</Paragraph>
        <p className="text-lg font-bold italic leading-tight">Прямой трафик, оффер «инвестиционная недвижимость», ставка на объекты, последующая фильтрация.</p>
      </HighlightCard>
      
      <SectionHeader title="Причины отсутствия масштаба:" />
      <ListItem type="cross">Низкая концентрация ЦА в платном трафике: Инвесторы принимают решения через доверие и рекомендации.</ListItem>
      <ListItem type="cross">Перегретый красный океан: Конкуренция ценой лида, а не качеством клиента.</ListItem>
      <ListItem type="cross">Несоответствие продукта и воронки: Разрыв между декларацией партнерства и фактическими продажами объектов.</ListItem>

      <SectionHeader title="Ключевые изменения" />
      <VerbatimTable headers={["Текущая модель", "Требуемая модель"]} rows={[
        ["Продажа объектов", "Продажа инвест-логики"],
        ["Массовый трафик", "Фильтрованное привлечение"],
        ["Холодные лиды", "Доверие и рекомендации"],
        ["Отдел продаж = фильтр", "Маркетинг = фильтр"]
      ]} />
    </>
  );
}

// --- CHAPTER 2: ПОЗИЦИОНИРОВАНИЕ ---
function PositioningVerbatim() {
  return (
    <>
      <PageHeader title="Позиционирование" subtitle="DNA Smart Solutions" />
      
      <SectionHeader id="2.1" title="Кто мы для инвестора" />
      <HighlightCard variant="blue">
        <p className="text-base font-bold text-blue-700 dark:text-blue-400 leading-relaxed italic">
          "Smart Solutions — это инвестиционный партнер на входе в сделку, а не классический брокер недвижимости."
        </p>
      </HighlightCard>
      <Paragraph>Для инвестора мы выполняем роль:</Paragraph>
      <div className="space-y-2 mb-6">
        {['Навигатора по рынку', 'Фильтра инвестиционных решений', 'Переводчика «недвижимости» в язык целей'].map(t => (
          <ListItem key={t} type="bullet">{t}</ListItem>
        ))}
      </div>
      <Paragraph>Инвестор приходит к нам не за объектом, а за уверенным решением: «я понимаю, зачем мне этот актив и как он работает».</Paragraph>

      <SectionHeader id="2.2" title="Что мы продаем на самом деле" />
      <Paragraph>Формально мы продаём недвижимость. Фактически мы продаём инвестиционную логику.</Paragraph>
      <VerbatimTable rows={[
        ["Наш продукт", "Сценарий достижения цели"],
        ["Логика", "Объяснение формирования дохода"],
        ["Прозрачность", "Понимание рисков и альтернатив"],
        ["Объекты", "Инструменты реализации стратегии"]
      ]} />
      <Paragraph className="font-bold text-center mt-6">Мы продаём ответ на вопрос: «как этот актив помогает достичь моей цели».</Paragraph>

      <SectionHeader id="2.3" title="Инвестиционное позиционирование vs классика" />
      <VerbatimTable headers={["Классика", "Smart Solutions"]} rows={[
        ["Продажа объектов", "Продажа решений"],
        ["Фокус на характеристиках", "Фокус на целях инвестора"],
        ["Доходность как хук", "Доходность как логика"],
        ["Широкая аудитория", "Отфильтрованная ЦА"],
        ["Массовый трафик", "Доверие и экспертиза"]
      ]} />

      <SectionHeader id="2.4" title="Конкурентное преимущество" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-0">
        <HighlightCard>
          <p className="text-sm font-black mb-2 uppercase">Сложно скопировать</p>
          <p className="text-xs text-slate-500 leading-tight">Методология отбора и логика работы не покупаются «с рынка».</p>
        </HighlightCard>
        <HighlightCard>
          <p className="text-sm font-black mb-2 uppercase">Выше маржинальность</p>
          <p className="text-xs text-slate-500 leading-tight">Конкурируем не комиссией, а ценностью решения.</p>
        </HighlightCard>
      </div>
    </>
  );
}

// --- CHAPTER 3: АУДИТОРИЯ ---
function AudienceVerbatim() {
  return (
    <>
      <PageHeader title="Целевая аудитория" subtitle="Кому мы важны" />
      
      <SectionHeader id="3.1" title="Наш клиент" />
      <Paragraph className="font-bold">Рациональный инвестор, принимающий решения на основе целей, цифр и логики.</Paragraph>
      <SimpleTable rows={[
        { label: "Частные инвесторы с капиталом", value: "Yes", check: true },
        { label: "Предприниматели и топ-менеджеры", value: "Yes", check: true },
        { label: "Инвесторы с опытом", value: "Yes", check: true }
      ]} />

      <SectionHeader id="3.2" title="С кем мы не работаем" />
      <Paragraph italic>Отказ от неподходящих клиентов — часть стратегии. Мы осознанно не выбираем сегменты, где невозможно продать логику.</Paragraph>
      <SimpleTable rows={[
        { label: "Покупатели «для жизни»", value: "No", cross: true },
        { label: "Клиенты без бюджета", value: "No", cross: true },
        { label: "Эмоциональные покупки («красиво»)", value: "No", cross: true },
        { label: "Искатели быстрых денег без риска", value: "No", cross: true }
      ]} />

      <SectionHeader id="3.3" title="B2C и B2B логика" />
      <Paragraph>B2C даёт сделки, B2B даёт масштаб.</Paragraph>
      <VerbatimTable headers={["Критерий", "B2C / B2B"]} rows={[
        ["Кто клиент", "Инвестор / Партнёр"],
        ["Что продаём", "Решения / Экспертизу"],
        ["Цель", "Сделка / Поток"],
        ["Масштаб", "Ограничен / Высокий"]
      ]} />

      <SectionHeader id="3.4" title="Ключевые инвестиционные цели" />
      <div className="space-y-4 px-0">
        <HighlightCard>
          <div className="flex gap-4">
            <TrendingUp size={24} className="text-blue-600 shrink-0" />
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Стабильный пассивный доход</p>
              <p className="text-xs text-slate-500 leading-relaxed font-medium italic">"Хочу регулярно получать доход в $ с минимальными рисками."</p>
            </div>
          </div>
        </HighlightCard>
        <HighlightCard>
          <div className="flex gap-4">
            <ArrowUpRight size={24} className="text-emerald-500 shrink-0" />
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Рост капитала</p>
              <p className="text-xs text-slate-500 leading-relaxed font-medium italic">"Хочу приумножить свободный капитал без активного участия."</p>
            </div>
          </div>
        </HighlightCard>
        <HighlightCard>
          <div className="flex gap-4">
            <ShieldCheck size={24} className="text-amber-500 shrink-0" />
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Диверсификация и защита</p>
              <p className="text-xs text-slate-500 leading-relaxed font-medium italic">"Хочу распределить риски и снизить зависимость от одного рынка."</p>
            </div>
          </div>
        </HighlightCard>
      </div>
    </>
  );
}

// --- CHAPTER 4: ПРОДУКТ ---
function ProductVerbatim() {
  return (
    <>
      <PageHeader title="Продуктовая переупаковка" subtitle="Инструменты Smart Solutions" />
      
      <SectionHeader id="4.1" title="Объект → Инвестиционный кейс" />
      <Paragraph className="font-black text-slate-900 dark:text-white mb-8">Инвестор покупает не объект, а понятный сценарий заработка.</Paragraph>
      <div className="space-y-8 px-6 relative pb-10">
        <div className="absolute left-[39px] top-6 bottom-10 w-0.5 bg-slate-100 dark:bg-slate-800" />
        {[
          { q: "Зачем?", h: "Инвестиционная цель", d: "Что должно случиться в жизни инвестора?" },
          { q: "Как?", h: "Инвестиционная стратегия", d: "Как это случится в жизни инвестора?" },
          { q: "Чем?", h: "Объект как инструмент", d: "За счет чего это случится?" },
          { q: "Почему?", h: "Прогноз и риски", d: "Почему результат вероятен?" }
        ].map((step, i) => (
          <div key={i} className="flex gap-6 relative z-10">
             <div className="w-12 h-12 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black italic text-xs shrink-0 shadow-lg">{step.q}</div>
             <div className="pt-1">
                <p className="text-sm font-black uppercase text-slate-900 dark:text-white leading-none mb-1.5">{step.h}</p>
                <p className="text-xs text-slate-500 leading-tight font-medium uppercase tracking-tighter opacity-80">{step.d}</p>
             </div>
          </div>
        ))}
      </div>

      <HighlightCard variant="blue">
        <Paragraph className="mb-0 font-bold text-center">Мы продаем не квадратные метры, а модель достижения цели.</Paragraph>
      </HighlightCard>

      <SectionHeader id="4.2" title="Инвестиционные стратегии как продукт" />
      <VerbatimTable headers={["Цель", "Стратегия / Объекты"]} rows={[
        ["Пассивный доход", "Cash-flow / Вторичка"],
        ["Рост капитала", "Capital Growth / Флиппинг"],
        ["Диверсификация", "Hybrid / Коллективные инв."]
      ]} />

      <SectionHeader id="4.3" title="Критерии отбора объектов" />
      <div className="grid grid-cols-2 gap-4 px-6 mb-8">
        {['Локация', 'Спрос', 'Застройщик', 'Экономика', 'Юрид. чистота', 'Выход'].map(t => (
          <div key={t} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-tighter text-slate-500">{t}</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
        ))}
      </div>

      <SectionHeader id="4.4" title="Шаблоны презентации инвест-кейсов" />
      <HighlightCard variant="dark">
         <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-6 text-center">Структура презентации</p>
         <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            {['Инвест-цель', 'Стратегия', 'Экономика', 'Риски', 'Сценарии', 'Вывод'].map(t => (
              <div key={t} className="text-center font-bold text-xs uppercase italic">{t}</div>
            ))}
         </div>
      </HighlightCard>
    </>
  );
}

// --- CHAPTER 5: ВОРОНКА ---
function FunnelVerbatim() {
  return (
    <>
      <PageHeader title="Воронка продаж" subtitle="Алгоритм Smart Solutions" />
      
      <SectionHeader id="5.1" title="Новая модель воронки" />
      <Paragraph>Инвестиционные продажи начинаются с мышления инвестора, а не с каталога объектов.</Paragraph>
      <div className="space-y-4 px-0">
        <ListItem type="bullet">Диагностика целей инвестора</ListItem>
        <ListItem type="bullet">Формирование инвестиционного решения</ListItem>
        <ListItem type="bullet">Презентация стратегии достижения цели</ListItem>
        <ListItem type="bullet">Сделка и сопровождение</ListItem>
      </div>

      <SectionHeader id="5.2" title="Диагностика как точка входа" />
      <VerbatimTable headers={["Параметр", "Зачем"]} rows={[
        ["Цель инвестора", "Персонализация"],
        ["Горизонт", "Выбор стратегии"],
        ["Бюджет", "Квалификация"],
        ["Риск-профиль", "Снятие рисков"],
        ["Роль инвестора", "Акцент в презентации"]
      ]} />
      <HighlightCard variant="blue">
        <Paragraph className="mb-0 font-bold text-center italic">"Если нет заполненной диагностики — следующего этапа быть не может."</Paragraph>
      </HighlightCard>

      <SectionHeader id="5.3" title="Роль: От Агента к Investment Manager" />
      <VerbatimTable headers={["Агент", "Int. Manager"]} rows={[
        ["Продает объект", "Проектирует кейс"],
        ["Показывает варианты", "Подбирает под стратегию"],
        ["Давит на эмоции", "Работает через логику"],
        ["Реагирует на запрос", "Управляет процессом"]
      ]} />

      <SectionHeader id="5.4" title="Контроль качества" />
      <HighlightCard>
        <Paragraph className="mb-4 font-black uppercase text-[10px] tracking-widest text-slate-400">Что мы анализируем:</Paragraph>
        <ListItem type="bullet">Проведена ли диагностика?</ListItem>
        <ListItem type="bullet">Презентовалась ли стратегия?</ListItem>
        <ListItem type="bullet">Зафиксированы ли данные в CRM?</ListItem>
      </HighlightCard>
    </>
  );
}

// --- CHAPTER 6: КАНАЛЫ ---
function AcquisitionVerbatim() {
  return (
    <>
      <PageHeader title="Каналы привлечения" subtitle="Стратегия охвата" />
      
      <SectionHeader id="6.1" title="Почему платный трафик — не основной?" />
      <Paragraph>Для инвестиционного продукта платный трафик без доверия дает много «сырья», низкий процент квалификации и высокую нагрузку на менеджеров.</Paragraph>
      <SimpleTable rows={[
        { label: "Основной источник сделок", value: "No", cross: true },
        { label: "Поддержка SMM", value: "Yes", check: true },
        { label: "Тестирование гипотез", value: "Yes", check: true },
        { label: "Дожим теплой аудитории", value: "Yes", check: true }
      ]} />

      <SectionHeader id="6.2" title="Партнерский маркетинг vs Платный" />
      <VerbatimTable headers={["Платный трафик", "Партнерский"]} rows={[
        ["Низкое доверие", "Высокое доверие"],
        ["Низкая квалификация", "Высокая квалификация"],
        ["Стоимость за клик", "Оплата за результат"],
        ["Масштаб через бюджет", "Масштаб через сеть"]
      ]} />

      <SectionHeader id="6.3" title="Экспертный маркетинг" />
      <Paragraph>Инвестиции — это всегда про доверие к людям, а не к объявлениям.</Paragraph>
      <HighlightCard variant="dark">
        <div className="space-y-4 py-2">
          {['Публичные эфиры', 'Совместные вебинары', 'Аналитические разборы', 'Презентации стратегий'].map(t => (
            <div key={t} className="flex items-center gap-4 text-sm font-bold italic tracking-tight opacity-90">
              <CheckCircle2 size={16} className="text-blue-500" /> {t}
            </div>
          ))}
        </div>
      </HighlightCard>

      <SectionHeader id="6.4" title="SMM как долгосрочный актив" />
      <VerbatimTable rows={[
        ["Экспертный контент", "Доверие"],
        ["Видео-кейсы", "Прогрев"],
        ["Лид-магниты", "Подписки"],
        ["Рассылки", "Дожим"]
      ]} />
    </>
  );
}

// --- CHAPTER 7: ПАРТНЕРЫ ---
function PartnersVerbatim() {
  return (
    <>
      <PageHeader title="Партнерская модель" subtitle="Масштабирование доверия" />
      
      <SectionHeader id="7.1" title="Типы партнеров" />
      <VerbatimTable rows={[
        ["Инвест-клубы", "$350 - $500k чек"],
        ["Предприниматели", "$350 - $500k чек"],
        ["Агентства", "$150 - $250k чек"],
        ["Фин. советники", "$250 - $350k чек"],
        ["Private Banking", "> $500k чек"]
      ]} />

      <SectionHeader id="7.2" title="Ценность для партнёра" />
      <VerbatimTable headers={["Классика", "Smart Solutions"]} rows={[
        ["Продает объект", "Инвест-стратегию"],
        ["Эмоции / Локация", "Цифры + логика"],
        ["Мин. поддержка", "Методология + макеты"],
        ["Комиссия стандартная", "Выше рынка"]
      ]} />

      <SectionHeader id="7.3" title="Механика привлечения" />
      <div className="space-y-0 px-0">
        <ListItem type="bullet">Идентификация партнера</ListItem>
        <ListItem type="bullet">Онбординг и обучение методологии</ListItem>
        <ListItem type="bullet">Совместные запуски / сделки</ListItem>
      </div>

      <SectionHeader id="7.4" title="Что мы НЕ делаем" />
      <div className="mx-6 p-6 rounded-[32px] bg-red-500/5 border border-red-500/20">
        <ListItem type="cross">Мы НЕ строим MLM-агентку.</ListItem>
        <ListItem type="cross">Мы НЕ гонимся за количеством партнёров.</ListItem>
        <ListItem type="cross">Мы НЕ даем продавать «что угодно».</ListItem>
      </div>
    </>
  );
}

// --- CHAPTER 8: ОПЕРАЦИОНКА ---
function OpsVerbatim() {
  return (
    <>
      <PageHeader title="Операционка и контроль" subtitle="Управление по метрикам" />
      
      <SectionHeader id="8.1" title="Метрики, которые важны" />
      <Paragraph className="mb-10 leading-tight">Главная метрика — не “лиды”, а количество квалифицированных инвестиционных диалогов (CPLQ).</Paragraph>
      <HighlightCard variant="blue">
         <div className="grid grid-cols-2 gap-8 text-center py-4">
            <div>
               <p className="text-3xl font-black text-blue-700 leading-none">CPLQ</p>
               <p className="text-[10px] uppercase font-black text-slate-400 mt-3 tracking-widest">Ключевая цена</p>
            </div>
            <div>
               <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">3+</p>
               <p className="text-[10px] uppercase font-black text-slate-400 mt-3 tracking-widest">Сделки / Месяц</p>
            </div>
         </div>
      </HighlightCard>

      <SectionHeader id="8.2" title="Требования к подрядчикам" />
      <div className="space-y-0 px-0">
        <ListItem type="check">Понимание позиционирования Smart Solutions</ListItem>
        <ListItem type="check">Работа строго по офферам стратегии</ListItem>
        <ListItem type="check">Прозрачная отчетность раз в неделю</ListItem>
        <ListItem type="check">Продвинутый навык работы с AI</ListItem>
        <ListItem type="check">Оплата за результат (Success-fee)</ListItem>
      </div>

      <SectionHeader id="8.4" title="Роль AI в маркетинге" />
      <VerbatimTable headers={["Зона", "Эффект AI"]} rows={[
        ["Контент", "Скорость и масштаб"],
        ["Креативы", "Тестирование гипотез"],
        ["Продажи", "Анализ звонков (QA)"],
        ["CRM", "Релевантность рассылок"]
      ]} />
    </>
  );
}

// --- CHAPTER 9: ВНЕДРЕНИЕ ---
function RoadmapVerbatim() {
  return (
    <>
      <PageHeader title="План внедрения" subtitle="30 / 60 / 90 дней" />
      
      <SectionHeader id="9.1" title="Волны внедрения" />
      <div className="px-6 space-y-12 py-10 relative">
        <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-slate-100 dark:bg-slate-800" />
        {[
          { t: "30 дней: Фундамент", d: "Финализация позиционирования, переупаковка первых кейсов, запуск партнерки, обучение команды." },
          { t: "60 дней: Ускорение", d: "Масштабирование партнерств, выступления, SMM-воронка, лид-магниты." },
          { t: "90 дней: Системность", d: "Оптимизация каналов, регламенты, AI-инструменты, повторяемая модель." }
        ].map((step, i) => (
          <div key={i} className="flex gap-6 relative z-10">
            <div className="w-12 h-12 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-600 flex items-center justify-center text-blue-600 font-black italic text-xs shadow-xl shrink-0">{(i+1)*30}</div>
            <div className="pt-2">
               <p className="text-sm font-black text-slate-900 dark:text-white uppercase leading-none mb-1.5">{step.t.split(': ')[1]}</p>
               <p className="text-xs text-slate-500 leading-tight font-medium opacity-80">{step.d}</p>
            </div>
          </div>
        ))}
      </div>

      <SectionHeader id="9.2" title="Ключевые инициативы" />
      <div className="space-y-0 px-0">
         {[
           "Переупаковка продукта в стратегии",
           "Запуск партнерского маркетинга",
           "Обучение роли Investment Manager",
           "Экспертный контент и Личный Бренд",
           "Контроль качества через метрики"
         ].map(t => (
           <ListItem key={t} type="check">{t}</ListItem>
         ))}
      </div>
    </>
  );
}

// --- CHAPTER 10: ИТОГ ---
function GrowthVerbatim() {
  return (
    <>
      <PageHeader title="Итоговая логика" subtitle="Экосистема Smart Solutions" />
      
      <SectionHeader id="10.1" title="Цель: 3+ сделки в месяц" />
      <Paragraph italic className="text-center px-10">"3 сделки в месяц достигаются за счёт правильного продукта (кейсы), правильных каналов (партнёрства) и воронки (диагностика)."</Paragraph>

      <SectionHeader id="10.2" title="Агентство как фундамент" />
      <Paragraph>Агентство дает cash-flow без крупных инвестиций и формирует базу инвесторов.</Paragraph>
      <div className="grid grid-cols-2 gap-4 px-6 mb-10">
        {['Деньги', 'Доверие', 'Продукт', 'Данные'].map(t => (
          <div key={t} className="p-5 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center shadow-sm">
            <p className="text-[10px] font-black uppercase text-blue-600 mb-1">{t}</p>
            <CheckCircle2 size={16} className="mx-auto text-blue-500" />
          </div>
        ))}
      </div>

      <SectionHeader id="10.3" title="Smart Solutions Vision" />
      <Paragraph className="italic text-slate-500 text-center px-6">Мы не “строим экосистему сразу”. Мы до неё доходим через сильное, прибыльное агентство.</Paragraph>

      <div className="px-6 py-10">
        <div className="p-10 rounded-[50px] bg-slate-900 text-white text-center shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/30 blur-[80px] rounded-full -mr-16 -mt-16" />
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-8">Final Verification</p>
           <h3 className="text-3xl font-black mb-8 italic tracking-tighter leading-none">Верно в точности.</h3>
           <CheckCircle2 size={48} className="mx-auto text-blue-500 mb-4" />
           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Verbatim Porting Complete</p>
        </div>
      </div>
    </>
  );
}
