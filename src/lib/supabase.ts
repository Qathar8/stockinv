import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://bzomeffiaueqbqrepufn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6b21lZmZpYXVlcWJxcmVwdWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA2NjMsImV4cCI6MjA2Nzc5NjY2M30.TOm6LwyqhNkK5rxZhhJ2aA1jLK6UwLlMa5EPmbfhogk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
