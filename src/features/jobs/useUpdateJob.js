import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJob as updateJobApi } from "../../services/apiJobs";
import toast from "react-hot-toast";

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
      toast.success("Job has been updated successfully");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Job could not be updated. Try again!");
    },
  });

  return { updateJob, isUpdating, isError };
}
