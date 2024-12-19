import { useState, useEffect } from "react";

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseFetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: string;
  signal?: AbortSignal;
}

export type FetchReturnType<T> = FetchState<T>;

function useFetch<T = unknown>(
  url: string,
  options: UseFetchOptions = {}
): FetchReturnType<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { ...options, signal });
        const responseData = await response?.json();
        setState({ data: responseData as T, loading: false, error: null });
      } catch (err: any) {
        if (signal.aborted) {
          return;
        }

        setState({
          data: null,
          loading: false,
          error: err.message || "An error occurred",
        });
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, options]);

  return state;
}

export default useFetch;
