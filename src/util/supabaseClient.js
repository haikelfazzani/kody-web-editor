import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const options = {
  schema: 'public',
  headers: { 'x-my-custom-header': 'Kody' },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);