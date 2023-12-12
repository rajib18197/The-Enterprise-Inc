import { useEffect, useState } from "react";
import { getAllJobs } from "../../services/apiJobs";

export function useJobsInfinite(page) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(
    function () {
      async function fetchData() {
        try {
          setIsError(false);
          setError({});
          setHasNextPage(false);
          const data = await getAllJobs({ page });
          console.log(data);
          setData((prev) => [...prev, ...data]);
          if (data.length !== 0) setHasNextPage(true);
        } catch (err) {
          setIsError(true);
          setError({ message: err.message || "error occured" });
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();
    },
    [page]
  );

  return { jobs: data, isLoading, isError, error, hasNextPage };
}
