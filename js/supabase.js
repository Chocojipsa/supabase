import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const githubApiKey = process.env.SUPABASE_KEY;
const supabase = createClient(
    "https://qjjomzlttcwezludhrwt.supabase.co",
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqam9temx0dGN3ZXpsdWRocnd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NjAzODYsImV4cCI6MjA1NDMzNjM4Nn0.9I-s1ibOpxCuC8-EWLjsJmTsU9B3qSMW_zd8wEp_vJQ"
);

export { supabase };
