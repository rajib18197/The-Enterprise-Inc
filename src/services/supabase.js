import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYXhjdnZjaGR0ZW5qenl0bnNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0ODA4OTYsImV4cCI6MjAwNzA1Njg5Nn0.PxL_4kNH9KGA9fw62jKC-R80wr6PQ3AKuE6wmmT16nc";

export const SUPABASE_URL = "https://bgaxcvvchdtenjzytnsl.supabase.co";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase };
