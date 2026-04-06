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
  ShieldCheck, 
  Map,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertCircle,
  Search,
  MessageSquare,
  Network,
  Activity,
  Lightbulb,
  FileText
} from 'lucide-react';
import { cn } from '../../lib/cn';

interface MarketingStrategyProps {
  pageId?: string;
}

export function MarketingStrategy({ pageId }: MarketingStrategyProps) {
  const renderContent = () => {
    switch (pageId) {
      case 'intro': return <IntroSection />;
      case 'positioning': return <PositioningSection />;
      case 'audience': return <AudienceSection />;
      case 'product': return <ProductSection />;
      case 'funnel': return <FunnelSection />;
      case 'acquisition': return <AcquisitionSection />;
      case 'partners': return <PartnersSection />;
      case 'ops': return <OpsSection />;
      case 'roadmap': return <RoadmapSection />;
      case 'growth': return <GrowthSection />;
      default: return <IntroSection />;
    }
  };

  return (
    <div className="min-h-full pb-10">
      {renderContent()}
    </div>
  );
}

// --- SHARED UI COMPONENTS (ZENLABS DNA) ---

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn("bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm", className)}
  >
    {children}
  </motion.div>
);

const Badge = ({ children, variant = 'blue' }: { children: React.ReactNode, variant?: 'blue' | 'red' | 'emerald' | 'amber' }) => {
  const variants = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-100 dark:border-blue-500/20',
    red: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-100 dark:border-red-500/20',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-100 dark:border-amber-500/20',
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", variants[variant])}>
      {children}
    </span>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="px-5 pt-4 mb-6">
    <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">{title}</h2>
    {subtitle && <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">{subtitle}</p>}
  </div>
);

const TableRow = ({ label, value, status }: { label: string, value: string, status?: 'yes' | 'no' }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800 last:border-0">
    <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold text-slate-900 dark:text-white text-right">{value}</span>
      {status === 'yes' && <CheckCircle2 size={16} className="text-emerald-500" />}
      {status === 'no' && <XCircle size={16} className="text-red-400" />}
    </div>
  </div>
);

// --- SECTIONS ---

function IntroSection() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Введение и контекст" subtitle="Агентство недвижимости с фокусом на инвест-продажи" />
      
      <div className="px-5 grid grid-cols-1 gap-4">
        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0 shadow-xl shadow-blue-600/20">
          <Target className="mb-4 opacity-50" size={28} />
          <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Цель стратегии</h3>
          <p className="text-2xl font-bold leading-tight">≥ 3 сделки в месяц / ≥ $10 000 чистой прибыли</p>
          <div className="mt-4 pt-4 border-t border-white/10 flex gap-4">
            <div>
              <p className="text-[10px] uppercase opacity-60">Рынок</p>
              <p className="text-xs font-bold font-mono uppercase">Бали / Тайланд</p>
            </div>
            <div>
              <p className="text-[10px] uppercase opacity-60">Горизонт</p>
              <p className="text-xs font-bold font-mono">6–12 месяцев</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <AlertCircle size={18} className="text-amber-500" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Текущие ограничения</h3>
          </div>
          <div className="space-y-1">
            <TableRow label="Стадия бизнеса" value="Агентство" status="yes" />
            <TableRow label="Ресурсы команды" value="Ограничены" status="yes" />
            <TableRow label="Фокус на прибыль" value="Максимальный" status="yes" />
            <TableRow label="Массовый B2C" value="Исключен" status="no" />
          </div>
        </Card>

        <Card className="bg-slate-900 dark:bg-slate-950 text-white">
          <h3 className="text-lg font-bold mb-3 italic">"Smart Solutions — это не классическое агентство."</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Мы продаем инвестиционную логику и стратегию, а объекты недвижимости используем как инструмент реализации целей инвестора.
          </p>
        </Card>
      </div>
    </div>
  );
}

function PositioningSection() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Позиционирование" subtitle="Кратный рост через смену парадигмы" />
      
      <div className="px-5 space-y-4">
        <Card>
          <Badge variant="red">Проблема</Badge>
          <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white leading-tight">Красный океан классики</h3>
          <p className="text-sm text-slate-500 mt-2">Конкуренция ценой лида, характеристиками объектов и скоростью «дожима».</p>
          
          <div className="mt-6 flex flex-col gap-3">
             {['Продажа объектов', 'Массовый трафик', 'Холодные лиды', 'Отдел продаж = фильтр'].map((text, i) => (
               <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                 <XCircle size={14} className="text-red-400" />
                 <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{text}</span>
               </div>
             ))}
          </div>
        </Card>

        <div className="flex justify-center -my-2 relative z-10">
          <div className="bg-blue-600 text-white rounded-full p-2 shadow-lg">
            <TrendingUp size={20} />
          </div>
        </div>

        <Card className="border-blue-200 dark:border-blue-500/30">
          <Badge variant="emerald">Решение</Badge>
          <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white leading-tight">Smart Solutions DNA</h3>
          <p className="text-sm text-slate-500 mt-2">Конкуренция ясностью, доверием и качеством принятия решений.</p>
          
          <div className="mt-6 flex flex-col gap-3">
             {['Продажа инвест-логики', 'Фильтрованное привлечение', 'Доверие и рекомендации', 'Маркетинг = фильтр'].map((text, i) => (
               <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-500/10 border border-blue-100/50 dark:border-blue-500/20">
                 <CheckCircle2 size={14} className="text-emerald-500" />
                 <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tighter">{text}</span>
               </div>
             ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function AudienceSection() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Целевая аудитория" subtitle="Кого мы обслуживаем осознанно" />
      
      <div className="px-5 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="text-center">
            <Users className="mx-auto text-blue-600 mb-2" size={24} />
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">B2C</h4>
            <p className="text-lg font-bold text-slate-900 dark:text-white mt-1 leading-tight">Инвестор</p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase">Дает сделки</p>
          </Card>
          <Card className="text-center">
            <Network className="mx-auto text-emerald-500 mb-2" size={24} />
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">B2B</h4>
            <p className="text-lg font-bold text-slate-900 dark:text-white mt-1 leading-tight">Партнер</p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase">Дает масштаб</p>
          </Card>
        </div>

        <Card>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-widest mb-4">Инвестиционные цели</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Пассивный доход</span>
                <Badge>Cash-flow</Badge>
              </div>
              <p className="text-xs text-slate-500">Страх потери стабильности / Желание регулярных выплат в $</p>
            </div>
            <div className="h-px bg-slate-50 dark:bg-slate-800" />
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Рост капитала</span>
                <Badge variant="amber">Grow</Badge>
              </div>
              <p className="text-xs text-slate-500">FOMO / Желание заработать быстро на перепродаже</p>
            </div>
            <div className="h-px bg-slate-50 dark:bg-slate-800" />
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Защита активов</span>
                <Badge variant="emerald">Safe</Badge>
              </div>
              <p className="text-xs text-slate-500">Страх волатильности / Потребность в «тихой гавани»</p>
            </div>
          </div>
        </Card>

        <div className="bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 rounded-3xl p-6">
          <div className="flex items-center gap-2 text-red-500 mb-2">
            <XCircle size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">Anti-CLient</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-red-400 leading-relaxed font-medium">
            Покупатели «для жизни», без бюджета, эмоциональные покупки («хочу виллу, потому что красиво»), искатели быстрых денег без рисков.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProductSection() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Продуктовая переупаковка" subtitle="Объект → Инвестиционный кейс" />
      
      <div className="px-5 space-y-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Layers size={80} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Сценарий заработка</h3>
          <div className="space-y-8 relative">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
              <div>
                <h4 className="text-sm font-bold">Инвест-цель</h4>
                <p className="text-xs text-slate-500 underline decoration-blue-500/30 underline-offset-4">Зачем входить в сделку?</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
              <div>
                <h4 className="text-sm font-bold">Инвест-стратегия</h4>
                <p className="text-xs text-slate-500 underline decoration-blue-500/30 underline-offset-4">Как это реализуется?</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
              <div>
                <h4 className="text-sm font-bold">Объект = Инструмент</h4>
                <p className="text-xs text-slate-500 underline decoration-blue-500/30 underline-offset-4">За счет чего это произойдет?</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-widest mb-4">Матрица стратегий</h3>
          <div className="space-y-4">
             <div className="flex p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 items-center justify-between">
                <div>
                  <p className="text-xs font-bold">Capital Growth</p>
                  <p className="text-[10px] text-slate-500 leading-none">Первичка / Флиппинг</p>
                </div>
                <ArrowUpRight size={16} className="text-blue-600" />
             </div>
             <div className="flex p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 items-center justify-between">
                <div>
                  <p className="text-xs font-bold">Cash-Flow</p>
                  <p className="text-[10px] text-slate-500 leading-none">Вторичка / Готовое</p>
                </div>
                <Activity size={16} className="text-emerald-500" />
             </div>
             <div className="flex p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 items-center justify-between">
                <div>
                  <p className="text-xs font-bold">Hybrid / SPV</p>
                  <p className="text-[10px] text-slate-500 leading-none">Коллективные инвестиции</p>
                </div>
                <Network size={16} className="text-amber-500" />
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function FunnelSection() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Воронка продаж" subtitle="От хаоса к управляемой диагностике" />
      
      <div className="px-5 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform">
              <Search size={20} />
            </div>
            <div className="flex-1 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800">
               <h4 className="text-sm font-bold">Диагностика</h4>
               <p className="text-xs text-slate-500">Определение целей, риск-профиля и бюджета. Точка невозврата.</p>
            </div>
          </div>
          <div className="flex items-center justify-center py-1">
             <div className="w-0.5 h-6 bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform">
              <Lightbulb size={20} />
            </div>
            <div className="flex-1 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800">
               <h4 className="text-sm font-bold">Решение</h4>
               <p className="text-xs text-slate-500">Формирование инвест-кейсов под конкретную стратегию.</p>
            </div>
          </div>
          <div className="flex items-center justify-center py-1">
             <div className="w-0.5 h-6 bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-lg shrink-0 group-hover:scale-110 transition-transform">
              <Zap size={20} />
            </div>
            <div className="flex-1 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800">
               <h4 className="text-sm font-bold">Сделка</h4>
               <p className="text-xs text-slate-500">Сопровождение в роли Investment Manager.</p>
            </div>
          </div>
        </div>

        <Card>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-widest mb-4">Роль менеджера</h3>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 rounded-2xl bg-red-500/5 space-y-2 opacity-60">
                <p className="text-[10px] font-bold uppercase text-red-500">Было: Агент</p>
                <p className="text-xs">Продает объект «как есть». Давит на эмоции. Реактивный.</p>
             </div>
             <div className="p-4 rounded-2xl bg-emerald-500/10 space-y-2">
                <p className="text-[10px] font-bold uppercase text-emerald-500">Стало: Int. Manager</p>
                <p className="text-xs">Проектирует кейс. Работает по алгоритму. Управляет процессом.</p>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function AcquisitionSection() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Каналы привлечения" subtitle="Уход от красного океана" />
      
      <div className="px-5 space-y-4">
        <Card className="border-emerald-200 dark:border-emerald-500/30">
          <Badge variant="emerald">Primary</Badge>
          <h3 className="text-lg font-bold mt-3 mb-2">Партнерский маркетинг</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            Безусловный фокус. Весь рост масштабируется через доверие и рекомендации партнерских сетей.
          </p>
          <div className="space-y-2">
            <TableRow label="Доверие" value="Высокое" status="yes" />
            <TableRow label="Квалификация" value="Высокая" status="yes" />
            <TableRow label="CAC" value="Результат" status="yes" />
          </div>
        </Card>

        <Card className="opacity-80">
          <Badge variant="blue">Secondary</Badge>
          <h3 className="text-lg font-bold mt-3 mb-2">Экспертность и SMM</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Слой доверия. Публичные эфиры, видео-кейсы и личный бренд как подтверждение методологии.
          </p>
        </Card>

        <Card className="opacity-50 border-dashed">
          <Badge variant="red">Auxiliary</Badge>
          <h3 className="text-lg font-bold mt-3 mb-2">Платный трафик</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Только поддержка. Прогрев, дожим ретаргетингом и тест гипотез. Не является драйвером сделок.
          </p>
        </Card>
      </div>
    </div>
  );
}

function PartnersSection() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Партнерская модель" subtitle="Механика масштабирования доверия" />
      
      <div className="px-5 space-y-6">
        <Card>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-widest mb-4">Типы партнеров</h3>
          <div className="space-y-3">
             {[
               { name: 'Инвест-клубы', desc: 'Массовый поток частных инвесторов', check: '$350k+' },
               { name: 'Предприниматели', desc: 'Сделки под капитализацию', check: '$350k+' },
               { name: 'Private Banking', desc: 'Клиенты с очень высоким чеком', check: '$500k+' },
               { name: 'Фин. советники', desc: 'Клиенты под диверсификацию', check: '$250k+' },
             ].map((p, i) => (
               <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                  <div className="flex-1">
                    <p className="text-sm font-bold">{p.name}</p>
                    <p className="text-[10px] text-slate-500">{p.desc}</p>
                  </div>
                  <Badge variant="blue">{p.check}</Badge>
               </div>
             ))}
          </div>
        </Card>

        <Card className="bg-slate-900 text-white border-0">
          <h3 className="font-bold mb-4">Что мы даем партнеру:</h3>
          <ul className="space-y-3">
            {['Готовая методология инвест-продаж', 'Шаблоны кейсов и стратегий', 'Комиссия выше рынка', 'Поддержка эксперта на сделке'].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-xs leading-tight opacity-90">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" /> {text}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function OpsSection() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Операционка" subtitle="Управление по метрикам" />
      
      <div className="px-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Главная метрика</p>
            <p className="text-xl font-black text-blue-600">CPLQ</p>
            <p className="text-xs text-slate-500 mt-2 font-medium">Cost per Qualified Lead — инвестор с целью, бюджетом и риск-профилем.</p>
          </Card>
          <Card>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Финальная цель</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">ROI 100%+</p>
            <p className="text-xs text-slate-500 mt-2 font-medium">Экономика каждой сделки должна окупать привлечение минимум в 5 раз.</p>
          </Card>
        </div>

        <Card>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-widest mb-4">AI в системе</h3>
          <div className="space-y-4">
             <div className="flex items-start gap-4 p-4 rounded-3xl bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
                <MessageSquare className="text-indigo-600 shrink-0 mt-1" size={18} />
                <div>
                   <p className="text-xs font-bold">Контроль качества</p>
                   <p className="text-[10px] text-slate-500 mt-1">AI анализирует звонки менеджеров на соответствие роли Investment Manager.</p>
                </div>
             </div>
             <div className="flex items-start gap-4 p-4 rounded-3xl bg-blue-50/50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
                <TrendingUp className="text-blue-600 shrink-0 mt-1" size={18} />
                <div>
                   <p className="text-xs font-bold">Масштаб контента</p>
                   <p className="text-[10px] text-slate-500 mt-1">Генерация инвестиционных офферов и кейсов без участия эксперта 24/7.</p>
                </div>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function RoadmapSection() {
  const steps = [
    { time: '30 дней', title: 'Фундамент', desc: 'Финализация позиционирования, переупаковка 5 топовых кейсов и первые 3 партнера.' },
    { time: '60 дней', title: 'Ускорение', desc: 'SMM-воронка, эфиры с партнерами, внедрение CRM-скоринга.' },
    { time: '90 дней', title: 'Системность', desc: 'AI-архитектура, повторяемая модель сделок, выход на 3 сделки/мес.' },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="План внедрения" subtitle="Приоритеты волнового роста" />
      
      <div className="px-5 space-y-12 py-6 relative">
        <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-slate-100 dark:bg-slate-800" />
        {steps.map((step, i) => (
          <div key={i} className="flex gap-6 relative">
            <div className="w-12 h-12 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-600 flex items-center justify-center text-blue-600 font-bold text-xs shadow-xl shrink-0 z-10">
              {i + 1}
            </div>
            <div className="pt-2">
               <Badge>{step.time}</Badge>
               <h4 className="text-lg font-bold mt-2 text-slate-900 dark:text-white">{step.title}</h4>
               <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GrowthSection() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Итоговая логика" subtitle="Агентство как фундамент экосистемы" />
      
      <div className="px-5 space-y-4">
        <div className="bg-slate-900 dark:bg-white p-8 rounded-[40px] text-white dark:text-slate-900">
           <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2 text-center">Vision 2026</p>
           <h3 className="text-2xl font-black text-center leading-tight tracking-tight">От Агентства к Инвест-Платформе</h3>
           <p className="text-sm text-center mt-4 opacity-80 leading-relaxed font-medium">
             Агентство делает 3+ сделки/мес, формирует кешфлоу и базу инвесторов → Переход к ко-девелопменту и фондовым инструментам.
           </p>
        </div>

        <Card>
           <h3 className="text-sm font-bold uppercase mb-4 text-center">Роль агентства сейчас</h3>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 text-center border-r border-slate-50 dark:border-slate-800">
                 <p className="text-xs font-bold text-blue-600">Деньги</p>
                 <p className="text-[10px] text-slate-400 leading-tight">Cash-Flow на эксперименты</p>
              </div>
              <div className="space-y-1 text-center">
                 <p className="text-xs font-bold text-emerald-500">Доверие</p>
                 <p className="text-[10px] text-slate-400 leading-tight">База инвесторов</p>
              </div>
              <div className="space-y-1 text-center border-r border-slate-50 dark:border-slate-800 pt-3 mt-3 border-t">
                 <p className="text-xs font-bold text-amber-500">Продукт</p>
                 <p className="text-[10px] text-slate-400 leading-tight">Проверка стратегий</p>
              </div>
              <div className="space-y-1 text-center pt-3 mt-3 border-t border-slate-50 dark:border-slate-800">
                 <p className="text-xs font-bold text-slate-900 dark:text-white">Данные</p>
                 <p className="text-[10px] text-slate-400 leading-tight">Реальный спрос</p>
              </div>
           </div>
        </Card>

        <Card className="bg-blue-600 text-white border-0 shadow-xl shadow-blue-600/30 py-8">
           <h3 className="text-center font-bold text-lg mb-2">Готовы к внедрению!</h3>
           <p className="text-center text-xs opacity-80 px-4 leading-relaxed">
             Эта стратегия выводит агентство из конкуренции за объекты и закладывает фундамент для глобальной платформы Smart Solutions.
           </p>
        </Card>
      </div>
    </div>
  );
}
