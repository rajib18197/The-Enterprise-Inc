import { getToday } from "../utils/helpers";
import { SUPABASE_URL, supabase } from "./supabase";

const MAX_SIZE_PER_PAGE = 5;

export async function getApplications({ filters, currentPage }) {
  let query = supabase.from("applications");

  if (filters?.length > 0) {
    filters.forEach((filter) => {
      if (filter.method === "gte-lte") {
        const [first, last] = filter.value.split("-");
        const [gte, lte] = filter.method.split("-");

        query = query.select("*, jobs(*), candidates(*)", { count: "exact" });

        query = query[gte](filter.field, first);

        query = query[lte](filter.field, last);
      } else if (filter?.table === "foreign") {
        query = query
          .select("*, jobs!inner(*), candidates(*)", { count: "exact" })
          [
            // .select("*, jobs(*), candidates(*)", { count: "exact" })
            filter.method
          ](`jobs.${filter.field}`, filter.value);
      } else {
        query = query
          .select("*, jobs(*), candidates(*)", { count: "exact" })
          [filter.method](filter.field, filter.value);
      }
    });
  } else {
    query = query.select("*, jobs(*), candidates(*)", { count: "exact" });
  }

  // query = query.gte('salaryExpectation', '2000').lte('salaryExpectation', '2999');
  // rangeGte('during', '[2000-01-02 08:30, 2000-01-02 09:30)')

  // console.log(query);

  if (currentPage) {
    const from = (currentPage - 1) * MAX_SIZE_PER_PAGE;
    const to = currentPage * MAX_SIZE_PER_PAGE;
    console.log(from, to);
    query = query.range(from, to);
  }

  const { data: applications, error, count } = await query;

  console.log(applications);

  if (error) throw new Error("error");
  return { applications, count };
}

export async function getApplicationsAfterDate(date) {
  console.log(date);
  const { data: applications, error } = await supabase
    .from("applications")
    .select("*, jobs(*), candidates(*)")
    .gte("submittedDate", date)
    .lte("submittedDate", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("applications could not get loaded");
  }
  console.log(applications);
  return applications;
}

export async function getApplicationDetails(id) {
  const { data, error } = await supabase
    .from("applications")
    .select("*, jobs(*), candidates(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`could not load the details ${id}`);
  }

  return data;
}

export async function createApplication(newData, id) {
  console.log(id, newData);
  const hasResumePath = newData.resume?.startsWith?.(SUPABASE_URL);
  console.log(hasResumePath);
  const resumeName = `${Math.random()}-${newData.resume?.name
    ?.split(" ")
    ?.join("-")}`.replaceAll("/", "");

  const resumePath = hasResumePath
    ? newData.resume
    : `${SUPABASE_URL}/storage/v1/object/public/resume/${resumeName}`;

  console.log(resumePath);

  let query = supabase.from("applications");

  if (id) {
    console.log(newData, id);
    query = query.update({ ...newData, resume: resumePath }).eq("id", id);
  } else {
    query = query.insert([{ ...newData, resume: resumePath }]);
  }

  const { data, error } = await query.select();

  if (error) throw new Error("error");
  console.log(data);
  if (hasResumePath) return data;

  const { data: resumeData, error: resumeError } = await supabase.storage
    .from("resume")
    .upload(resumeName, newData.resume);

  // TODO: need to handle error
  console.log(resumeData);

  console.log(resumeData);
  return data;
}

export async function deleteApplication(id) {
  const { error } = await supabase.from("applications").delete().eq("id", id);

  if (error) {
    console.error("could not delete the application");
    throw error;
  }

  return true;
}

export async function updateApplication(id, obj) {
  const { data, error } = await supabase
    .from("applications")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) throw "There was an error while updating";

  return data;
}
