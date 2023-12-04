import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../services/apiAuth";
import { supabase } from "../../services/supabase";

export function useUpdateUserData() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError(err) {
      console.error(err);
    },
  });

  return { updateUser, isLoading, error };
}

// async function getUserData() {
//   const { data, error } = await supabase.auth.admin.getUserById(
//     "e54a88fc-e5e2-4d58-a274-44d1c2de4ca4"
//   );
//   console.log(data);
// }

// getUserData()
