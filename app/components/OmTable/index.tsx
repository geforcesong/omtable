"use client";

import { useInfiniteBusinesses } from "@/client/hooks/useInfiniteBusinesses";
import OmButton from "@/components/ui/OmButton";

export const OmTable: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteBusinesses();

  return (
    <div>
      <div>
        {status === "pending" && <p>加载中...</p>}
        {status === "error" && <p>加载失败，请稍后重试。</p>}
        {status === "success" && (
          <>
            {data?.pages.map((page, index) => (
              <div key={index}>
                {page.businesses.map((business) => (
                  <div key={business.id}>
                    <h3>{business.desc_short}</h3>
                    <p>{business.count}</p>
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "加载中..."
                : hasNextPage
                ? "加载更多"
                : "没有更多数据"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
