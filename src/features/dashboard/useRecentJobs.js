import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getJobsAfterDate } from "../../services/apiJobs";

export function useRecentJobs() {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 90;
  const date = new Date();
  date.setDate(date.getDate() - numDays);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", `last-${numDays}`],
    queryFn: () => getJobsAfterDate(date.toISOString()),
  });

  console.log(data);
  return { data, isLoading, isError };
}
