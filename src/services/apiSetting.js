import { supabase } from "./supabase";

export async function getSetting() {
  const { data: setting, error } = await supabase.from("settings").select("*");
  console.log(setting);
  if (error) throw new Error("Error occured while getting the setting");

  return setting;
}

export async function updateSetting(obj) {
  console.log(obj);
  const { data: setting, error } = await supabase
    .from("settings")
    .update(obj)
    .eq("id", 1)
    .select();

  if (error) throw new Error("Error occured while getting the setting");
  console.log(setting);
  return setting;
}
