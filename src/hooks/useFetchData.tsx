"use client";
import { useState, useEffect } from "react";

interface FetchDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useFetchData = <T,>(
  url: string,
  userId: string | null
): FetchDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: T = await response.json();
        setData(data);
        setError(null);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [url, userId]);

  return { data, loading, error };
};
