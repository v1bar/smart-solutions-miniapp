import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, DollarSign, BrainCircuit, Activity } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ROIData {
    currentMonthlyCost: number;
    aiMonthlyCost: number;
    hoursSaved: number;
    revenueIncrease: number;
}

interface ROICalculatorProps {
    data?: ROIData;
}

export function ROICalculator({
    data = {
        currentMonthlyCost: 15600,
        aiMonthlyCost: 2400,
        hoursSaved: 320,
        revenueIncrease: 28,
    }
}: ROICalculatorProps) {
    const [isAIEnabled, setIsAIEnabled] = useState(false);

    const formatCurrency = (val: number) => `$${val.toLocaleString()}`;

    return (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full shadow-sm p-6 md:p-8 transition-all hover:shadow-lg group">
            {/* Background Glow */}
            <div
                className={cn(
                    "absolute -inset-px rounded-3xl opacity-0 blur-2xl transition-opacity duration-700 pointer-events-none",
                    isAIEnabled ? "opacity-20 bg-gradient-to-br from-blue-600 to-emerald-500" : ""
                )}
            />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-blue-600 dark:text-blue-500 uppercase mb-2">
                            <BrainCircuit className="w-4 h-4" />
                            Финансовый Impact
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                            AI-Рычаг рентабельности
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm leading-relaxed">
                            Сравнение текущих операционных расходов с роботизированным пайплайном ZenLabs.
                        </p>
                    </div>

                    {/* AI Switch (The "Magic" button) */}
                    <button
                        onClick={() => setIsAIEnabled(!isAIEnabled)}
                        className="group/switch flex-shrink-0 relative flex items-center h-14 w-44 rounded-full bg-slate-100 dark:bg-slate-800 p-1 cursor-pointer transition-colors shadow-inner"
                    >
                        <motion.div
                            layout
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            className={cn(
                                "w-[calc(50%-4px)] h-full rounded-full shadow-md flex items-center justify-center font-bold text-sm z-10 transition-colors",
                                isAIEnabled
                                    ? "bg-blue-600 text-white translate-x-full"
                                    : "bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            )}
                        >
                            {isAIEnabled ? "SaaS + AI" : "As-Is"}
                        </motion.div>
                        <div className="absolute inset-0 flex items-center justify-between px-6 text-sm font-semibold z-0 text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            <span className={isAIEnabled ? "opacity-100" : "opacity-0"}>As-Is</span>
                            <span className={!isAIEnabled ? "opacity-100" : "opacity-0"}>Ai</span>
                        </div>
                    </button>
                </div>

                {/* Dynamic Metric Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                    <MetricCard
                        title="Опер. расходы (МЕС)"
                        icon={<DollarSign />}
                        value={isAIEnabled ? data.aiMonthlyCost : data.currentMonthlyCost}
                        isPositive={isAIEnabled} // saving is positive
                        formatter={formatCurrency}
                        prevValue={data.currentMonthlyCost}
                    />
                    <MetricCard
                        title="Сэкон. человекочасы"
                        icon={<Users />}
                        value={isAIEnabled ? data.hoursSaved : 0}
                        isPositive={true}
                        formatter={(val: number) => `+${val} ч.`}
                    />
                    <MetricCard
                        title="Ожидаемый рост Rev"
                        icon={<TrendingUp />}
                        value={isAIEnabled ? data.revenueIncrease : 0}
                        isPositive={true}
                        formatter={(val: number) => `+${val}%`}
                    />
                </div>

                {/* Footer info */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                        <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                        <span>Модель обучена на рыночных бенчмарках</span>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 font-semibold hover:underline hidden sm:block">
                        Подробности расчета &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, icon, isPositive, formatter, prevValue }: any) {
    return (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-shrink-0 items-center justify-center text-slate-700 dark:text-slate-300">
                    {React.cloneElement(icon, { className: "w-5 h-5" })}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider leading-tight">{title}</span>
            </div>
            <div className="relative h-12 overflow-hidden flex items-end">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={value}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                        className={cn(
                            "text-3xl md:text-4xl font-extrabold absolute inset-0 tracking-tight",
                            title.includes("расходы") && value !== prevValue && value < prevValue
                                ? "text-emerald-500 dark:text-emerald-400"
                                : "text-slate-900 dark:text-white",
                            title.includes("часы") || title.includes("Rev") ? (value > 0 ? "text-emerald-500 dark:text-emerald-400" : "text-slate-900 dark:text-white") : ""
                        )}
                    >
                        {formatter(value)}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
