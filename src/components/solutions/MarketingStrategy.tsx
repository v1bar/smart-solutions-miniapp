import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Target,
  Users,
  Layers,
  Zap,
  Network,
  ShieldCheck,
  Map,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../../lib/cn';

interface MarketingStrategyProps {
  pageId?: string;
}

export function MarketingStrategy({ pageId }: MarketingStrategyProps) {
  const renderContent = () => {
    switch (pageId) {
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
      default: return <IntroVerbatim />;
    }
  };

  return (
    <div className="min-h-full pb-24">
       <AnimatePresence mode="wait">
          <motion.div
            key={pageId}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
       </AnimatePresence>
    </div>
  );
}

// --- VERBATIM COMPONENTS ---

const Header = ({ children, level = 1 }: { children: React.ReactNode, level?: 1 | 2 | 3 | 4 }) => {
  const styles = {
    1: "text-2xl font-black text-slate-900 dark:text-white px-5 pt-8 mb-6 tracking-tight leading-tight uppercase",
    2: "text-xl font-bold text-slate-900 dark:text-white px-5 mt-10 mb-4 tracking-tight",
    3: "text-lg font-bold text-slate-800 dark:text-slate-200 px-5 mt-8 mb-4 border-l-4 border-blue-600 pl-4",
    4: "text-base font-bold text-slate-700 dark:text-slate-300 px-5 mt-6 mb-3",
  };
  return <h2 className={styles[level]}>{children}</h2>;
};

const Text = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <p className={cn("text-sm text-slate-600 dark:text-slate-400 px-5 mb-4 leading-relaxed", className)}>{children}</p>
);

const Card = ({ children, className, accent }: { children: React.ReactNode, className?: string, accent?: 'blue' | 'red' | 'emerald' }) => (
  <div className={cn(
    "mx-5 my-4 p-6 rounded-[32px] border bg-white dark:bg-slate-900 shadow-sm",
    accent === 'blue' && "border-blue-100 dark:border-blue-900/50 bg-blue-50/10",
    accent === 'red' && "border-red-100 dark:border-red-900/50 bg-red-50/10",
    accent === 'emerald' && "border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/10",
    className
  )}>
    {children}
  </div>
);

const Table = ({ rows }: { rows: { label: string, value: string | React.ReactNode, status?: 'yes' | 'no' }[] }) => (
  <div className="mx-5 mb-6 overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50">
    {rows.map((row, i) => (
      <div key={i} className="flex items-center justify-between p-4 border-b border-slate-50 dark:border-slate-800 last:border-0">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider w-1/2">{row.label}</span>
        <div className="flex items-center gap-2 w-1/2 justify-end">
          <span className="text-sm font-bold text-slate-900 dark:text-white text-right">{row.value}</span>
          {row.status === 'yes' && <CheckCircle2 size={16} className="text-emerald-500" />}
          {row.status === 'no' && <XCircle size={16} className="text-red-400" />}
        </div>
      </div>
    ))}
  </div>
);

const ComparisonTable = ({ headers, rows }: { headers: [string, string], rows: [string, string][] }) => (
  <div className="mx-5 mb-6 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
    <div className="grid grid-cols-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
       <div className="p-4 text-xs font-black uppercase text-slate-400 text-center border-r border-slate-200 dark:border-slate-800 tracking-tighter">{headers[0]}</div>
       <div className="p-4 text-xs font-black uppercase text-blue-600 text-center tracking-tighter">{headers[1]}</div>
    </div>
    {rows.map((row, i) => (
       <div key={i} className="grid grid-cols-2 border-b border-slate-50 dark:border-slate-800 last:border-0 bg-white dark:bg-slate-900">
          <div className="p-4 text-xs text-slate-500 dark:text-slate-400 border-r border-slate-50 dark:border-slate-800 flex items-center justify-center text-center leading-tight">{row[0]}</div>
          <div className="p-4 text-xs text-slate-900 dark:text-white font-bold flex items-center justify-center text-center leading-tight bg-blue-50/20 dark:bg-blue-500/5">{row[1]}</div>
       </div>
    ))}
  </div>
);

// --- CHAPTER 1: INTRO ---
function IntroVerbatim() {
  return (
    <>
      <Header level={1}>Введение и контекст</Header>
      
      <Header level={4}>1.1. Задача стратегии и бизнес-цели агентства</Header>
      <Text>Что именно должна изменить эта маркетинговая стратегия в бизнесе Smart Solutions?</Text>
      
      <Table rows={[
        { label: "Кол-во продаж", value: "≥ 3 сделки / мес" },
        { label: "Чистая прибыль", value: "$10 000+ / мес" }
      ]} />
      
      <Text className="italic font-medium text-slate-900 dark:text-white">
        "Маркетинговая стратегия разрабатывается как инструмент достижения конкретного бизнес-результата."
      </Text>

      <Header level={4}>1.2. Ограничения и допущения</Header>
      <Table rows={[
        { label: "Стадия агентского бизнеса", value: "Yes", status: "yes" },
        { label: "Ограниченные ресурсы", value: "Yes", status: "yes" },
        { label: "Рынок Бали (основной)", value: "Yes", status: "yes" },
        { label: "Роль AI в аналитике", value: "No", status: "no" },
        { label: "Масштаб через фонды", value: "No", status: "no" },
        { label: "Массовый B2C маркетинг", value: "No", status: "no" },
      ]} />

      <Header level={4}>1.3. Почему текущая модель не масштабируется</Header>
      <Card accent="red">
        <p className="text-xs text-red-600 font-bold uppercase mb-2">Проблема:</p>
        <p className="text-sm">Прямой трафик, оффер «объекты», последующая фильтрация лидов.</p>
      </Card>
      
      <ul className="mx-5 space-y-4 mb-8">
        {[
          { t: "Низкая концентрация ЦА в платном трафике", d: "Инвесторы принимают решения через доверие и рекомендации, а не через оффер в ленте." },
          { t: "Перегретый красный океан", d: "Рынок переполнен одинаковыми смыслами и креативами, конкуренция идет ценой лида." },
          { t: "Несоответствие продукта и воронки", d: "Декларируем партнерство, но продаем как обычное агентство с каталогом объектов." }
        ].map((item, i) => (
          <li key={i} className="flex gap-3">
             <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
             <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{item.t}</p>
                <p className="text-xs text-slate-500 mt-1">{item.d}</p>
             </div>
          </li>
        ))}
      </ul>
    </>
  );
}

// --- CHAPTER 2: POSITIONING ---
function PositioningVerbatim() {
  return (
    <>
      <Header level={1}>Позиционирование</Header>
      
      <Header level={4}>2.1. Кто мы для инвестора</Header>
      <Card accent="blue">
        <p className="text-sm font-bold leading-relaxed">
          Smart Solutions — это инвестиционный партнер на входе в сделку, а не классический брокер недвижимости.
        </p>
      </Card>
      
      <Text>Наши роли для инвестора:</Text>
      <div className="mx-5 grid grid-cols-1 gap-2 mb-6">
        {['навигатор по рынку', 'фильтр инвест-решений', 'переводчик недвижимости в язык целей'].map((t, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
             <CheckCircle2 size={16} className="text-blue-500" />
             <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{t}</span>
          </div>
        ))}
      </div>

      <Header level={4}>2.2. Что мы продаем на самом деле</Header>
      <Text>Формально мы продаём недвижимость. Фактически мы продаём инвестиционную логику.</Text>
      <Card className="bg-slate-900 text-white border-0">
         <p className="text-xs opacity-60 uppercase font-bold tracking-widest mb-3">Наш продукт:</p>
         <ul className="space-y-4">
            <li className="text-sm font-medium">Сценарий достижения инвестиционной цели</li>
            <li className="text-sm font-medium">Объяснение, за счет чего формируется доход</li>
            <li className="text-sm font-medium">Понимание рисков и альтернатив</li>
         </ul>
      </Card>

      <Header level={4}>2.3. Инвестиционное vs Классическое агентство</Header>
      <ComparisonTable 
        headers={["Классика", "Smart Solutions"]}
        rows={[
          ["Продажа объектов", "Продажа решений"],
          ["Характеристики объекта", "Цели инвестора"],
          ["Маркетинговые хуки", "Инвестиционная логика"],
          ["Широкая аудитория", "Отфильтрованная ЦА"],
          ["Массовый трафик", "Доверие и экспертиза"]
        ]}
      />

      <Header level={4}>2.4. Преимущества позиционирования</Header>
      <div className="px-5 space-y-4 mb-8">
        {[
          { t: "Сложно скопировать", d: "Методология и алгоритм работы не покупаются «с рынка»." },
          { t: "Снижение зависимости от рекламы", d: "Партнерка и экспертность становятся эффективнее." },
          { t: "Выше качество клиентов", d: "Доходят те, кто готов думать категориями стратегии." },
          { t: "Выше маржинальность", d: "Конкурируем ценностью решения, а не комиссией." }
        ].map((item, i) => (
          <div key={i} className="p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50">
             <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">{item.t}</p>
             <p className="text-xs text-slate-500 mt-1">{item.d}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// --- CHAPTER 3: AUDIENCE ---
function AudienceVerbatim() {
  return (
    <>
      <Header level={1}>Целевая аудитория</Header>
      
      <Header level={4}>3.1. Кого мы обслуживаем осознанно</Header>
      <Text>Наш клиент — рациональный инвестор, принимающий решения на основе целей, цифр и логики.</Text>
      
      <div className="mx-5 space-y-3 mb-6">
        {[
          "Частные инвесторы с капиталом",
          "Предприниматели и топ-менеджеры",
          "Инвесторы с опытом на других рынках"
        ].map((t, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl">
             <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{t}</span>
             <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
        ))}
      </div>

      <Header level={4}>3.2. С кем мы не работаем</Header>
      <div className="mx-5 space-y-3 mb-6">
        {[
          "Покупатели «для жизни» без инвест-цели",
          "Клиенты без определенного бюджета",
          "Эмоциональные покупки («хочу виллу»)",
          "Искатели быстрых денег без риска"
        ].map((t, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl opacity-60">
             <span className="text-xs text-slate-600 dark:text-slate-400">{t}</span>
             <XCircle size={16} className="text-red-400" />
          </div>
        ))}
      </div>

      <Header level={4}>3.3. B2C и B2B логика</Header>
      <Text>B2C дает сделки, B2B дает масштаб.</Text>
      <ComparisonTable 
        headers={["B2C", "B2B"]}
        rows={[
          ["Инвестор", "Партнер"],
          ["Сценарии и кейсы", "Экспертиза + комиссия"],
          ["Сделка", "Поток инвесторов"],
          ["Ограниченный масштаб", "Высокий масштаб"]
        ]}
      />

      <Header level={4}>3.4. Ключевые инвестиционные цели</Header>
      <div className="mx-5 space-y-4 mb-8">
        {[
          { c: "Стабильный пассивный доход", d: "Регулярный Cash-flow в $, минимальный риск." },
          { c: "Рост капитала", d: "Приумножение через рост цены актива (Первичка)." },
          { c: "Диверсификация и защита", d: "Снижение зависимости от одного рынка или валюты." }
        ].map((item, i) => (
          <Card key={i}>
             <p className="text-xs font-black uppercase text-blue-600 mb-1">{item.c}</p>
             <p className="text-sm font-medium">{item.d}</p>
          </Card>
        ))}
      </div>
    </>
  );
}

// --- CHAPTER 4: PRODUCT ---
function ProductVerbatim() {
  return (
    <>
      <Header level={1}>Продуктовая переупаковка</Header>
      
      <Header level={4}>4.1. Объект → Инвестиционный кейс</Header>
      <Text>Рациональный инвестор покупает не объект, а понятный сценарий заработка.</Text>
      
      <div className="mx-5 relative py-6">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800" />
        <div className="space-y-10">
           {[
             { t: "Зачем?", h: "Инвестиционная цель", d: "Что должно случиться в жизни инвестора?" },
             { t: "Как?", h: "Инвестиционная стратегия", d: "Как именно мы к этому придем?" },
             { t: "Чем?", h: "Объект как инструмент", d: "За счет чего это произойдет?" },
             { t: "Почему?", h: "Прогноз и риски", d: "Обоснованность и вероятность результата." }
           ].map((step, i) => (
             <div key={i} className="flex items-start gap-5 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black text-xs shrink-0 shadow-lg italic">{step.t}</div>
                <div className="pt-1">
                   <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-1">{step.h}</p>
                   <p className="text-xs text-slate-500 leading-tight">{step.d}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      <Header level={4}>4.3. Критерии отбора объектов</Header>
      <Text>Мы фиксируем критерии скоринга и отбора по каждой стратегии.</Text>
      <Table rows={[
        { label: "Локация / Спрос", value: "Обязательно" },
        { label: "Надежность застройщика", value: "Обязательно" },
        { label: "Стратегия выхода", value: "Обязательно" },
        { label: "Юридическая чистота", value: "Обязательно" }
      ]} />

      <Header level={4}>4.4. Шаблоны презентации</Header>
      <Card className="bg-blue-600 text-white border-0 shadow-xl shadow-blue-600/20">
         <p className="text-xs opacity-60 uppercase font-black mb-4">Структура презентации:</p>
         <ul className="grid grid-cols-2 gap-4">
            {['Инвест-цель', 'Стратегия', 'Экономика', 'Риски', 'Сценарии', 'Вывод'].map((t, i) => (
              <li key={i} className="text-xs font-bold flex items-center gap-2">
                 <div className="w-1 h-1 rounded-full bg-white opacity-40 shrink-0" /> {t}
              </li>
            ))}
         </ul>
      </Card>
    </>
  );
}

// --- CHAPTER 5: SALES FUNNEL ---
function FunnelVerbatim() {
  return (
    <>
      <Header level={1}>Воронка продаж</Header>
      
      <Header level={4}>5.1. Этапы инвестиционных продаж</Header>
      <ComparisonTable 
        headers={["Классика", "Smart Solutions"]}
        rows={[
          ["Объекты", "Диагностика"],
          ["Попытка дожать клиента", "Формирование решения"],
          ["Размытые ожидания", "Презентация стратегии"],
          ["Низкая конверсия", "Сделка + Сопровождение"]
        ]}
      />

      <Header level={4}>5.2. Диагностика как точка входа</Header>
      <Text>Диагностика и скоринг — обязательный первый этап. Без него продажа не продолжается.</Text>
      <Table rows={[
        { label: "Цель инвестора", value: "Доход / Рост" },
        { label: "Горизонт", value: "1-3 / 3-5 лет" },
        { label: "Бюджет", value: "Реальный диапазон" },
        { label: "Риск-профиль", value: "L / M / H" }
      ]} />

      <Header level={4}>5.3. От Агента к Investment Manager</Header>
      <ComparisonTable 
        headers={["Агент", "Int. Manager"]}
        rows={[
          ["Продает объект", "Проектирует кейс"],
          ["Показывает варианты", "Подбирает под стратегию"],
          ["Давит на эмоции", "Работает через логику"],
          ["Реагирует на запрос", "Управляет процессом"]
        ]}
      />

      <Header level={4}>5.4. Обучение и контроль</Header>
      <ul className="mx-5 space-y-4 mb-8">
        {[
          "Единые шаблоны презентаций стратегий",
          "Скрипты диагностики и презентации",
          "Анализ Zoom-звонков (проведена ли диагностика?)",
          "Видео-презентации кейсов для внутренней валидации"
        ].map((t, i) => (
          <li key={i} className="flex gap-3 items-center p-3 border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
             <span className="text-xs font-medium">{t}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

// --- CHAPTER 6: ACQUISITION ---
function AcquisitionVerbatim() {
  return (
    <>
      <Header level={1}>Каналы привлечения</Header>
      
      <Header level={4}>6.1. Почему прямой трафик — не основной?</Header>
      <Card accent="red">
        <p className="text-sm">Рынок перегрет. Платный трафик без доверия дает «сырье», низкий процент квалификации и высокую нагрузку на менеджеров.</p>
      </Card>

      <Header level={4}>6.2. Партнерский маркетинг — ключ к росту</Header>
      <ComparisonTable 
        headers={["Платный трафик", "Партнерский"]}
        rows={[
          ["Низкое доверие", "Высокое доверие"],
          ["Низкая квалификация", "Высокая квалификация"],
          ["Стоимость за клик", "Оплата за результат"],
          ["Масштаб через бюджет", "Масштаб через сеть"]
        ]}
      />

      <Header level={4}>6.3. Экспертный маркетинг и доверие</Header>
      <Text>Инвестиции — это всегда про доверие к людям, а не к объявлениям.</Text>
      <Card accent="blue">
        <ul className="space-y-4">
          <li className="flex justify-between items-center text-xs"><span>Публичные эфиры</span> <Badge>Visible</Badge></li>
          <li className="flex justify-between items-center text-xs"><span>Аналитические разборы</span> <Badge>Expert</Badge></li>
          <li className="flex justify-between items-center text-xs"><span>Презентации стратегий</span> <Badge>System</Badge></li>
        </ul>
      </Card>

      <Header level={4}>6.4. SMM как долгосрочный актив</Header>
      <Table rows={[
        { label: "Экспертный контент", value: "Доверие" },
        { label: "Видео-кейсы", value: "Прогрев" },
        { label: "Лид-магниты", value: "Подписки" },
        { label: "Рассылки", value: "Дожим" }
      ]} />
    </>
  );
}

// --- CHAPTER 7: PARTNER MODEL ---
function PartnersVerbatim() {
  return (
    <>
      <Header level={1}>Партнерская модель</Header>
      
      <Header level={4}>7.1. Типы партнеров</Header>
      <Table rows={[
        { label: "Инвест-клубы", value: "Частные инвесторы" },
        { label: "Комьюнити предпринимателей", value: "C-level аудитория" },
        { label: "Финансовые советники", value: "Высокое доверие" },
        { label: "Family Offices", value: "Высокий чек" }
      ]} />

      <Header level={4}>7.2. Ценность для партнера</Header>
      <ComparisonTable 
        headers={["Обычное агентство", "Smart Solutions"]}
        rows={[
          ["Продает объект", "Инвест-стратегию"],
          ["Эмоции / Локация", "Цифры + Логика"],
          ["Мин. поддержка", "Методология + Материалы"],
          ["Репутационный риск", "Контролируемый процесс"]
        ]}
      />

      <Header level={4}>7.3. Механика и Мотивация</Header>
      <Text>Что мы даем партнеру:</Text>
      <div className="mx-5 flex flex-wrap gap-2 mb-6">
        {['шаблоны кейсов', 'расчеты доходности', 'методология', 'высокая комиссия', 'совместные эфиры'].map((t, i) => (
           <span key={i} className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-tight border border-blue-100/50 dark:border-blue-500/20">{t}</span>
        ))}
      </div>

      <Header level={4}>7.4. Чем мы НЕ являемся</Header>
      <div className="mx-5 p-4 rounded-2xl bg-red-500/5 border border-red-500/20 flex gap-4 items-start">
         <XCircle size={20} className="text-red-500 shrink-0" />
         <div className="space-y-4">
            <p className="text-xs font-bold text-red-600">Мы НЕ строим MLM-агентку.</p>
            <p className="text-xs font-bold text-red-600">Мы НЕ гонимся за количеством партнеров.</p>
            <p className="text-xs font-bold text-red-600">Мы НЕ даем продавать «что угодно».</p>
         </div>
      </div>
    </>
  );
}

// --- CHAPTER 8: OPERATIONS ---
function OpsVerbatim() {
  return (
    <>
      <Header level={1}>Маретинговая операционка</Header>
      
      <Header level={4}>8.1. Метрики, которые важны</Header>
      <Text>Главная метрика — количество квалифицированных инвестиционных диалогов.</Text>
      <Card accent="emerald">
        <div className="grid grid-cols-2 gap-6 text-center">
           <div>
             <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">CPLQ</p>
             <p className="text-[10px] uppercase font-bold text-slate-400 mt-2">Ключевой показатель</p>
           </div>
           <div>
             <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">3+</p>
             <p className="text-[10px] uppercase font-bold text-slate-400 mt-2">Сделок в месяц</p>
           </div>
        </div>
      </Card>

      <Header level={4}>8.2. Базовые требования к подрядчикам</Header>
      <div className="mx-5 space-y-2 mb-6">
        {[
          "Понимание инвест-позиционирования Smart Solutions",
          "Работа строго по офферам соответствующим стратегии",
          "Еженедельная прозрачная отчетность по гипотезам",
          "Продвинутый навык работы с AI (ускорение работы)",
          "Готовность работать за результат (Success-fee)"
        ].map((t, i) => (
          <div key={i} className="flex gap-3 p-3 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl">
             <ShieldCheck size={16} className="text-blue-500 shrink-0" />
             <span className="text-xs font-medium">{t}</span>
          </div>
        ))}
      </div>

      <Header level={4}>8.4. Роль AI в маркетинге</Header>
      <ComparisonTable 
        headers={["Зона", "AI эффект"]}
        rows={[
          ["Контент", "Скорость и масштаб"],
          ["Креативы", "Тестирование гипотез"],
          ["Продажи", "Анализ звонков (QA)"],
          ["CRM", "Релевантность рассылок"]
        ]}
      />
    </>
  );
}

// --- CHAPTER 9: ROADMAP ---
function RoadmapVerbatim() {
  return (
    <>
      <Header level={1}>План внедрения</Header>
      
      <Header level={4}>9.1. Приоритеты 30/60/90 дней</Header>
      <div className="px-5 space-y-6 mb-8 py-2 relative">
         <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-slate-100 dark:bg-slate-800" />
         {[
           { t: "30 дней: Фундамент", d: "Финализация позиционирования, переупаковка первых кейсов, первые партнеры, обучение команды." },
           { t: "60 дней: Ускорение", d: "Масштабирование партнерств, экспертные выступления, SMM-воронка, лидерство в контенте." },
           { t: "90 дней: Системность", d: "Оптимизация каналов, AI-инструменты, повторяемая модель сделок, база для масштаба." }
         ].map((step, i) => (
            <div key={i} className="flex gap-5 relative z-10 font-bold">
               <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-lg uppercase leading-none text-center p-2 italic">{step.t.split(':')[0]}</div>
               <div className="pt-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase leading-tight mb-1">{step.t.split(':')[1]}</h4>
                  <p className="text-xs text-slate-500 leading-tight">{step.d}</p>
               </div>
            </div>
         ))}
      </div>

      <Header level={4}>9.2. Ключевые инициативы</Header>
      <div className="mx-5 grid grid-cols-1 gap-2 mb-8">
         {[
           "Переупаковка продукта в стратегии",
           "Запуск партнерского маркетинга",
           "Обучение команды Investment Manager",
           "Экспертный контент и Личный Бренд",
           "Контроль качества через метрики"
         ].map((t, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl">
               <div className="w-1 h-1 rounded-full bg-blue-600" />
               <span className="text-xs font-bold leading-tight uppercase tracking-tight">{t}</span>
            </div>
         ))}
      </div>
    </>
  );
}

// --- CHAPTER 10: GROWTH ---
function GrowthVerbatim() {
  return (
    <>
      <Header level={1}>Итоговая логика</Header>
      
      <Header level={4}>10.1. Как выйти на 3+ сделки в месяц?</Header>
      <Text>За счет продукта (кейсы), каналов (партнерство) и воронки (диагностика). Концентрация на качестве входа, а не объеме лидов.</Text>
      
      <Header level={4}>10.2. Агентство как основа экосистемы</Header>
      <Text>Агентство — первый и обязательный бизнес-юнит. Оно дает:</Text>
      <ul className="mx-5 space-y-3 mb-8">
        {[
          { t: "Деньги", d: "Cash-flow на эксперименты и рост." },
          { t: "Доверие", d: "Пул инвесторов и их рекомендации." },
          { t: "Продукт", d: "Проверка инвест-стратегий на практике." },
          { t: "Данные", d: "Статистика реального спроса и конверсий." }
        ].map((item, i) => (
          <li key={i} className="p-4 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
             <p className="text-sm font-black text-slate-900 dark:text-white uppercase leading-none">{item.t}</p>
             <p className="text-xs text-slate-500 leading-tight">{item.d}</p>
          </li>
        ))}
      </ul>

      <Header level={3}>Smart Solutions 2026</Header>
      <Text className="mt-4 italic">
        Мы не «строим экосистему сразу». Мы до неё доходим через сильное, прибыльное агентство.
      </Text>
      
      <div className="px-5 py-8">
        <div className="p-8 rounded-[40px] bg-slate-900 text-white text-center shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full -mr-10 -mt-10" />
           <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-4 font-mono">End of Document</p>
           <h3 className="text-2xl font-black mb-4 leading-tight tracking-tighter italic">Ready for Growth.</h3>
           <CheckCircle2 size={40} className="mx-auto text-blue-500" />
        </div>
      </div>
    </>
  );
}
