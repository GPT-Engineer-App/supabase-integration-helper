import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Types for Supabase tables
 * 
 * ### profiles
 * 
 * | name       | type        | format | required |
 * |------------|-------------|--------|----------|
 * | id         | uuid        | string | true     |
 * | email      | text        | string | true     |
 * | created_at | timestamptz | string | true     |
 * 
 */

// Function to fetch all profiles
export const fetchProfiles = async () => {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) throw error;
  return data;
};

// Function to fetch a single profile by ID
export const fetchProfileById = async (id) => {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

// Function to create a new profile
export const createProfile = async (profile) => {
  const { data, error } = await supabase.from('profiles').insert(profile);
  if (error) throw error;
  return data;
};

// Function to update a profile by ID
export const updateProfile = async (id, profile) => {
  const { data, error } = await supabase.from('profiles').update(profile).eq('id', id);
  if (error) throw error;
  return data;
};

// Function to delete a profile by ID
export const deleteProfile = async (id) => {
  const { data, error } = await supabase.from('profiles').delete().eq('id', id);
  if (error) throw error;
  return data;
};

// Remove deprecated unload event listeners
window.removeEventListener('unload', () => {});