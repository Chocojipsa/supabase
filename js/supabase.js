import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
require('dotenv').config();

const githubApiKey = process.env.supabasekey;
const supabase = createClient(
    "https://qjjomzlttcwezludhrwt.supabase.co",
     githubApiKey
);

export { supabase };
