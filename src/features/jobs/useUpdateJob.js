import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJob as updateJobApi } from "../../services/apiJobs";

export function useUpdateJob() {
  const queryClient = useQueryClient();

  const {
    mutate: updateJob,
    isPending: isUpdating,
    isError,
  } = useMutation({
    mutationFn: ({ id, data }) => updateJobApi({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { updateJob, isUpdating, isError };
}
