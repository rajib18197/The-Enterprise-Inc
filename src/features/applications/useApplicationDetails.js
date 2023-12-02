import { useQuery } from "@tanstack/react-query";
import { getApplicationDetails } from "../../services/apiApplications";
import { useParams } from "react-router-dom";

export function useApplicationDetails() {
  const { id } = useParams();
  const {
    data: applicationDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applications", id],
    queryFn: () => getApplicationDetails(id),
  });

  return { applicationDetails, isLoading, isError };
}
