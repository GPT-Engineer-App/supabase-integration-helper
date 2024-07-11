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
 * ### detections
 * 
 * | name       | type        | format | required |
 * |------------|-------------|--------|----------|
 * | id         | int8        | number | true     |
 * | object     | text        | string | true     |
 * | detected_at| timestamptz | string | true     |
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

// Function to fetch all detections
export const fetchDetections = async () => {
  const { data, error } = await supabase.from('detections').select('*');
  if (error) throw error;
  return data;
};

// Function to fetch detections by date range
export const fetchDetectionsByDateRange = async (startDate, endDate) => {
  const { data, error } = await supabase.from('detections').select('*').gte('detected_at', startDate).lte('detected_at', endDate);
  if (error) throw error;
  return data;
};

// Function to create a new detection
export const createDetection = async (detection) => {
  const { data, error } = await supabase.from('detections').insert(detection);
  if (error) throw error;
  return data;
};

// Function to update a detection by ID
export const updateDetection = async (id, detection) => {
  const { data, error } = await supabase.from('detections').update(detection).eq('id', id);
  if (error) throw error;
  return data;
};

// Function to delete a detection by ID
export const deleteDetection = async (id) => {
  const { data, error } = await supabase.from('detections').delete().eq('id', id);
  if (error) throw error;
  return data;
};

// Remove deprecated unload event listeners
window.removeEventListener('unload', () => {});