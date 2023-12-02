import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useUser() {
  const {
    data: user,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  console.log(user);

  return {
    user,
    isAuthenticated: user?.role === "authenticated",
    isLoading,
    error,
  };
}
