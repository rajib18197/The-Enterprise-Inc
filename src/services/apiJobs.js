import { getToday } from "../utils/helpers";
import { supabase } from "./supabase";

export async function getAllJobs({ page, searchValue } = {}) {
  console.log(searchValue, "api call");

  let query = supabase.from("jobs").select("*");

  if (page) {
    const from = (page - 1) * 5;
    const to = from - 1 + 5;
    query = query.range(from, to);
  }

  if (searchValue !== "") {
    // Match a invidual string/word (use textSearch)
    // query = query.textSearch("title", searchValue, {
    //   // type: "websearch",
    //   type: "phrase",
    //   config: "english",
    // });

    // Match a individual letter (use ilike or like)
    query = query.ilike("title", `%${searchValue}%`);
  }

  const { data: jobs, error } = await query;

  console.log(jobs);
  if (error) {
    console.log(error);
    throw new Error("Jobs could be loaded");
  }

  return jobs;
}

export async function getJobsAfterDate(date) {
  console.log(date);
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .gte("startDate", date);
  // .lte("endDate", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("applications could not get loaded");
  }
  console.log(jobs);
  return jobs;
}
export async function createJob(newJob) {
  const { data: newJobData, error } = await supabase
    .from("jobs")
    .insert([newJob])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Could not create job");
  }
  return newJobData;
}

export async function updateJob({ id, data }) {
  const { data: updatedData, error } = await supabase
    .from("jobs")
    .update(data)
    .eq("id", id)
    .select();

  if (error) throw new Error("Could not update the job");

  console.log(updatedData);
  return updatedData;
}

export async function deleteJob(id) {
  const { error } = await supabase.from("jobs").delete().eq("id", id);

  if (error) throw new Error(error);
}
