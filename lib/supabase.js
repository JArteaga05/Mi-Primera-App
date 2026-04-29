import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oinvhjxcyqlcedzdurgt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pbnZoanhjeXFsY2VkemR1cmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MDYzNjEsImV4cCI6MjA5MTE4MjM2MX0.wdIMAmcksLZUXN6kl85DQAjFvVIJvaQfxeORKeqDIHk'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
)
