import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../services/apiAuth";
import { supabase } from "../../services/supabase";
import toast from "react-hot-toast";

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

      toast.success("Account has been updated successfully");
    },

    onError(err) {
      console.error(err);
      toast.error("Account could not be updated successfully");
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
