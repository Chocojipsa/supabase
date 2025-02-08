import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const githubApiKey = process.env.SUPABASE_KEY;
const supabase = createClient(
    "https://qjjomzlttcwezludhrwt.supabase.co",
     githubApiKey
);

export { supabase };
