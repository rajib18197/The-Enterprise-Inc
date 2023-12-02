import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApplication } from "../../services/apiApplications";
import { useNavigate, useParams } from "react-router-dom";

export default function useSelected() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    mutate: selected,
    isPending: isSelecting,
    isError,
  } = useMutation({
    mutationFn: ({ id, addExtraRound, rating, observations }) =>
      updateApplication(id, {
        status: "selected",
        rating,
        observations,
        ...addExtraRound,
      }),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      navigate("../");
    },

    onError(err) {
      console.error("error");
    },
  });

  return { selected, isSelecting, isError };
}
