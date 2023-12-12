import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "../../services/apiJobs";
import { getAllCandidates } from "../../services/apiCandidates";

export function useJobs({ searchValue = "" } = {}) {
  // console.log(searchValue);
  const {
    isLoading,
    data: jobs,
    error,
  } = useQuery({
    queryKey: ["jobs", searchValue],
    queryFn: () => getAllJobs({ searchValue }),
  });

  return { isLoading, jobs, error };
}

export function useCandidates() {
  const {
    isLoading,
    data: candidates,
    error,
  } = useQuery({
    queryKey: ["candidates"],
    queryFn: getAllCandidates,
  });

  console.log(candidates);
  return { candidates, isLoading, error };
}
