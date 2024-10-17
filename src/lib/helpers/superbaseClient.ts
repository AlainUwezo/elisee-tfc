import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mgeijtejmydxcfkwwdad.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nZWlqdGVqbXlkeGNma3d3ZGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxNTM0NjQsImV4cCI6MjA0NDcyOTQ2NH0.qjevh41e1PXOmyOjLOr0eOLC3stxJZx4pYbICV4D8Z8";

export const supabase = createClient(supabaseUrl, supabaseKey);
