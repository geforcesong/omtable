import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBusinesses } from "../services/business";

export const useInfiniteBusinesses = () => {
  return useInfiniteQuery({
    queryKey: ["businesses"],
    queryFn: ({ pageParam = 1 }) => fetchBusinesses(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
  });
};
