import { useEffect, useState } from "react";
import GetData from "../services";
import type { ResponseData } from "../types";

const useData = (): [boolean, string | null, ResponseData | null] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await GetData();
        if (response.status === 200) {
          setData(response?.data);
        } else {
          setError("Error to fetch data.");
        }
      } catch (err) {
          setError(err instanceof Error ? err.message : "Error to fetch data.");
      } finally {
          setLoading(false);
      }
    };

    fetchData();
  }, []);

  return [loading, error, data];
};

export default useData;
