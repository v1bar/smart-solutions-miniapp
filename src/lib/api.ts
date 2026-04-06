import { supabase } from './supabase';
import { Audit, AuditQuestion, AuditAnswer, Solution, SolutionPage, AppUser } from '../types';

export async function loginOrRegister(telegramId: number, userProfile: Partial<AppUser>): Promise<string> {
  // Upsert user based on telegramId
  const { data: user, error: selectError } = await supabase
    .from('users')
    .select('id')
    .eq('telegram_id', telegramId)
    .single();

  let userId = user?.id;

  if (selectError && selectError.code === 'PGRST116') {
    // Not found, insert
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        telegram_id: telegramId,
        first_name: userProfile.name,
        avatar_url: userProfile.avatar,
      })
      .select('id')
      .single();

    if (insertError) throw insertError;
    userId = newUser.id;
  } else if (selectError) {
    throw selectError;
  }

  return userId;
}

export async function fetchAudits(userId: string): Promise<Audit[]> {
  // Fetch audits and questions
  const { data: auditsData, error: auditsError } = await supabase
    .from('audits')
    .select(`
      *,
      questions(*)
    `)
    .order('sort_order', { ascending: true });

  if (auditsError) throw auditsError;

  // Fetch user's audit sessions
  const { data: sessions, error: sessionsError } = await supabase
    .from('audit_sessions')
    .select('*')
    .eq('user_id', userId);

  if (sessionsError) throw sessionsError;

  // Map to Audit interface
  const mappedAudits: Audit[] = auditsData.map((a: any) => {
    const session = sessions.find((s: any) => s.audit_id === a.id);
    // Sort questions
    const questions = a.questions ? a.questions.sort((q1: any, q2: any) => q1.sort_order - q2.sort_order).map((q: any) => ({
      ...q,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
    })) : [];

    return {
      id: a.id,
      title: a.title,
      subtitle: a.subtitle,
      coverGradient: a.cover_gradient,
      description: a.description,
      goalTag: a.goal_tag,
      goalDescription: a.goal_description,
      estimatedMinutes: a.estimated_minutes,
      deadlineDays: a.deadline_days,
      status: session ? (session.status as any) : a.status, // Override status if user started it
      questions,
      completedAt: session?.completed_at,
    };
  });

  return mappedAudits;
}

export async function submitAudit(userId: string, auditId: string, answers: AuditAnswer[]): Promise<void> {
  // 1. Create or update session
  const { data: session, error: sessionError } = await supabase
    .from('audit_sessions')
    .upsert({
      user_id: userId,
      audit_id: auditId,
      status: 'processing',
      completed_at: new Date().toISOString()
    }, { onConflict: 'user_id,audit_id' })
    .select('id')
    .single();

  if (sessionError) throw sessionError;

  // 2. Insert answers
  const answerInserts = answers.map(ans => ({
    session_id: session.id,
    user_id: userId,
    audit_id: auditId,
    question_id: ans.questionId,
    selected_options: ans.selectedOptions || null,
    slider_value: ans.sliderValue || null,
    text_value: ans.textValue || null,
    voice_url: ans.voiceUrl || null
  }));

  // We should delete old answers for this session first in a real scenario, or rely on UPSERT via UNIQUE(session_id, question_id)
  const { error: answersError } = await supabase
    .from('answers')
    .upsert(answerInserts, { onConflict: 'session_id,question_id' });

  if (answersError) throw answersError;
}

export async function fetchSolutions(userId: string): Promise<Solution[]> {
  const { data: solutionsData, error: solutionsError } = await supabase
    .from('solutions')
    .select(`
      *,
      solution_pages(*)
    `)
    .eq('user_id', userId);

  if (solutionsError) throw solutionsError;

  return solutionsData.map((s: any) => {
    const pages = s.solution_pages ? s.solution_pages.sort((p1: any, p2: any) => p1.sort_order - p2.sort_order).map((p: any) => ({
      id: p.id,
      title: p.title,
      icon: p.icon,
      sortOrder: p.sort_order,
      componentSlug: p.component_slug
    })) : [];

    return {
      id: s.id,
      title: s.title,
      subtitle: s.subtitle,
      coverGradient: s.cover_gradient,
      goalTag: s.goal_tag,
      pages,
      createdAt: s.created_at
    };
  });
}

export async function fetchAnswersForAudit(userId: string, auditId: string): Promise<AuditAnswer[]> {
  const { data, error } = await supabase
    .from('answers')
    .select('*')
    .eq('user_id', userId)
    .eq('audit_id', auditId);
    
  if (error) return [];
  
  return data.map((row: any) => ({
    questionId: row.question_id,
    selectedOptions: row.selected_options,
    sliderValue: row.slider_value,
    textValue: row.text_value,
    voiceUrl: row.voice_url
  }));
}
