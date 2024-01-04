import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getApplicationsAfterDate } from "../../services/apiApplications";

export function useRecentApplications() {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 90;
  const date = new Date();
  date.setDate(date.getDate() - numDays);

  console.log(date.toISOString(), numDays);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications", `last-${numDays}`],
    queryFn: () => getApplicationsAfterDate(date.toISOString()),
  });

  console.log(data);
  return { data, isLoading, isError };
}
