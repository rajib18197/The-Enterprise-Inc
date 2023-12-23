import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApplication } from "../../services/apiApplications";
import toast from "react-hot-toast";

export function useUpdateApplication() {
  const queryClient = useQueryClient();

  const {
    mutate: updateApplication,
    isPending: isUpdating,
    isError,
  } = useMutation({
    mutationFn: ({ id, newData }) => {
      console.log(id, newData);
      return createApplication(newData, id);
    },

    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: "applications" });
      toast.success("Application has been updated successfully");
    },

    onError(err) {
      console.log(err);
      toast.error("Application could not be updated. Try again!");
    },
  });

  return { updateApplication, isUpdating, isError };
}
