import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createJob as createJobApi } from "../../services/apiJobs";
import toast from "react-hot-toast";

export function useCreateJob() {
  const queryClient = useQueryClient();

  const {
    mutate: createJob,
    isPending: isCreating,
    isError,
  } = useMutation({
    mutationFn: createJobApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job has been created successfully");
    },

    onError: (err) => {
      toast.error("Job could not be created. Try again!");
    },
  });

  return { createJob, isCreating, isError };
}
