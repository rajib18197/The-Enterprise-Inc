import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob as createJobApi } from "../../services/apiJobs";

export function useCreateJob() {
    const queryClient = useQueryClient();

  const {
    mutate: createJob,
    isPending: isCreating,
    isError,
  } = useMutation({
    mutationFn: createJobApi,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['jobs']});
    }
  });


  return { createJob, isCreating, isError };
}
