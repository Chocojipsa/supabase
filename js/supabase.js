import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabase = createClient(
    "https://qjjomzlttcwezludhrwt.supabase.co",
     ""
);

export { supabase };