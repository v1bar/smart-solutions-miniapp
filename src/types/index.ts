// ============================================
// Smart Solutions — Core Types
// ============================================

// --- Audit (CheckUP) Types ---

export type AuditStatus = 
  | 'available' 
  | 'in_progress' 
  | 'processing' 
  | 'completed' 
  | 'archived';

export type QuestionType = 
  | 'single_choice' 
  | 'multiple_choice' 
  | 'slider' 
  | 'text_input' 
  | 'voice_input';

export interface AuditQuestion {
  id: string;
  auditId: string;
  sortOrder: number;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: { id: string; label: string; icon?: string }[];
  sliderMin?: number;
  sliderMax?: number;
  sliderStep?: number;
  sliderUnit?: string;
}

export interface Audit {
  id: string;
  title: string;
  subtitle: string;
  coverGradient: string; // tailwind gradient classes
  coverIcon?: string;
  description: string;
  goalTag: string;
  goalDescription: string;
  estimatedMinutes: number;
  deadlineDays: number;
  status: AuditStatus;
  questions: AuditQuestion[];
  completedAt?: string;
}

export interface AuditAnswer {
  questionId: string;
  selectedOptions?: string[];
  sliderValue?: number;
  textValue?: string;
  voiceUrl?: string;
}

export interface AuditSession {
  id: string;
  auditId: string;
  status: AuditStatus;
  answers: AuditAnswer[];
  startedAt: string;
  completedAt?: string;
}

// --- Solution Types ---

export interface SolutionPage {
  id: string;
  title: string;
  icon: string;
  sortOrder: number;
  componentSlug: string;
}

export interface Solution {
  id: string;
  title: string;
  subtitle: string;
  coverGradient: string;
  coverIcon?: string;
  goalTag: string;
  pages: SolutionPage[];
  createdAt: string;
}

// --- Navigation ---

export type AppTab = 'checkup' | 'solutions';

// --- User ---

export interface AppUser {
  id: string;
  telegramId: number;
  name: string;
  role: 'admin' | 'client';
  avatar?: string;
  goalText?: string;
  goalMetric?: string;
}
