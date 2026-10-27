// supabaseClient.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wrlrdurppfclyvbizwnh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndybHJkdXJwcGZjbHl2Yml6d25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NzU2MzYsImV4cCI6MjAzODQ1MTYzNn0.aE8cXpzevh7edUee3YNcvsbCc1J62HABr2JaOkLGaJI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  localStorage: AsyncStorage,
  detectSessionInUrl: false,
});
