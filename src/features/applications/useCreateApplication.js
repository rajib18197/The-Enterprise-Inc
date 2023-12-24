import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApplication as createApplicationApi } from "../../services/apiApplications";
import toast from "react-hot-toast";

export function useCreateApplication() {
  const queryClient = useQueryClient();

  const {
    mutate: createApplication,
    isPending: isCreating,
    isError,
  } = useMutation({
    mutationFn: createApplicationApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application has been created successfully");
    },

    onError(err) {
      console.log(err);
      toast.error("Application could not be created. Try again!");
    },
  });

  return { createApplication, isCreating, isError };
}
