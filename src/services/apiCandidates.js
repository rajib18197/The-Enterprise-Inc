import { supabase } from "./supabase";

export async function getAllCandidates() {
  const { data: candidates, error } = await supabase
    .from("candidates")
    .select("*");

  if (error) {
    throw new Error("could not load candidates");
  }
  return candidates;
}
