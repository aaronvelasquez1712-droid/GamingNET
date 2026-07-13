// supabase.js – Cliente Supabase y helpers de auth/proyectos
import { createClient } from '@supabase/supabase-js';

// ---- Configuración ----
const supabaseUrl = 'https://ctudlettgfgrlcfcwony.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dWRsZXR0Z2ZncmxjZmN3b255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4OTA5MDAsImV4cCI6MjA5OTQ2NjkwMH0.Hy0NKDwdMi_m4QUFRdolQaiZNAa4KM4W6EilnUATaU4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---- Proyectos ----
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error al obtener proyectos:', error);
    return [];
  }
  return data || [];
}

export async function getProjectById(id) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

// ---- Comentarios ----
export async function getComments(projectId) {
  const { data, error } = await supabase
    .from('comments')
    .select('id, user_name, content, created_at')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function addComment(projectId, content) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autenticado');
  const userName = user.user_metadata?.full_name || user.email.split('@')[0];
  const { error } = await supabase.from('comments').insert({
    project_id: projectId,
    user_id: user.id,
    user_name: userName,
    content,
  });
  if (error) throw error;
}

// ---- Autenticación ----
// NOTA: Para que el registro funcione sin verificación de email,
// ve a Supabase → Authentication → Email → desactiva "Confirm email"
export async function signUp(name, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: undefined,
    },
  });
  if (error) throw error;
  return data.user;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
