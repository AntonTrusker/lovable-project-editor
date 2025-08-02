
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_URL || 'https://kbcvmaucqhgmtocrgjbn.supabase.co'
const supabaseKey = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiY3ZtYXVjcWhnbXRvY3JnamJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwOTg3NDYsImV4cCI6MjA2OTY3NDc0Nn0.EXdIFgT4bw7ihXg_6wjU4wwPH53EE0bAtmtA54KiLQE'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // Disable auth since we don't need it
    autoRefreshToken: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 0, // Disable realtime
    },
  },
})
