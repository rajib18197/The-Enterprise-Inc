import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSetting";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const {
    mutate: updateSetting,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["setting"] });
    },
    onError(err) {
      console.error(err);
    },
  });

  return { updateSetting, isLoading, error };
}
