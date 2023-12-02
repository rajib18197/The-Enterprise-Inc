import { useQuery } from "@tanstack/react-query";
import { getSetting } from "../../services/apiSetting";

export default function useSetting() {
  const {
    data: setting,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ["setting"],
    queryFn: getSetting,
  });

  console.log(setting);

  return { setting, isLoading, isError };
}

