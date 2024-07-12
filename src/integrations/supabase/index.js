import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/1.0.0',
    },
  },
});

/**
 * Types for Supabase tables
 * 
 * ### profiles
 * 
 * | name       | type        | format | required |
 * |------------|-------------|--------|----------|
 * | id         | int4        | number | true     |
 * | username   | varchar     | string | true     |
 * | email      | varchar     | string | true     |
 * | created_at | timestamp   | string | true     |
 * 
 * ### detections
 * 
 * | name       | type        | format | required |
 * |------------|-------------|--------|----------|
 * | id         | int4        | number | true     |
 * | object_type| varchar     | string | true     |
 * | count      | int4        | number | true     |
 * | timestamp  | timestamp   | string | true     |
 * 
 */

import { createContext, useContext } from 'react';

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  return React.createElement(SupabaseContext.Provider, { value: supabase }, children);
};

export const useSupabase = () => {
  return useContext(SupabaseContext);
};

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
  const { data, error } = await supabase.from('detections').select('*').gte('timestamp', startDate).lte('timestamp', endDate);
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

// Function to subscribe to real-time updates for detections
export const subscribeToDetections = (callback) => {
  return supabase
    .from('detections')
    .on('INSERT', payload => {
      callback(payload.new);
    })
    .subscribe();
};

// Remove deprecated unload event listeners
window.removeEventListener('unload', () => {});