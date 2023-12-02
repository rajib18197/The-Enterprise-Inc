import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "../../services/apiJobs";
import { getAllCandidates } from "../../services/apiCandidates";

export function useJobs() {
  const {
    isLoading,
    data: jobs,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: getAllJobs,
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
