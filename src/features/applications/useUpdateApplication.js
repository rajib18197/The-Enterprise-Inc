import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApplication } from "../../services/apiApplications";

export function useUpdateApplication() {
  const queryClient = useQueryClient();

  const {
    mutate: updateApplication,
    isLoading: isUpdating,
    isError,
  } = useMutation({
    mutationFn: ({ id, newData }) => {
      console.log(id, newData);
      return createApplication(newData, id);
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  return { updateApplication, isUpdating, isError };
}
