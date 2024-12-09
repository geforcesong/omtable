"use client";

import { useInfiniteBusinesses } from "@/client/hooks/useInfiniteBusinesses";
import OmButton from "@/components/ui/OmButton";
import { useCallback, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const OmTable: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteBusinesses();
  const tableData = data?.pages.flatMap((page) => page.businesses) || [];
  const observer = useRef<IntersectionObserver | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const lastItemRef = useCallback(
    (element: HTMLElement | null) => {
      if (element) {
        if (observer.current) {
          observer.current.disconnect();
        }
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            if (!isFetchingNextPage && hasNextPage) {
              fetchNextPage();
            }
          }
        });
        observer.current.observe(element);
      }
    },
    [hasNextPage]
  );

  if (!tableData?.length && status === "pending") return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between sticky top-0 bg-white p-4 z-10">
        <div>
          Selected: {selectedIds.length} / {data?.pages[0]?.totalCount}
        </div>
        <OmButton disabled={!selectedIds?.length}>Batch Update</OmButton>
      </div>

      <div className="relative">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Url</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Retailer Name</TableHead>
              <TableHead>Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((business) => {
                return (
                  <TableRow
                    className={`cursor-pointer ${
                      selectedIds.includes(business.id) ? "bg-gray-100" : ""
                    }`}
                    key={business.id}
                    onClick={() => {
                      if (selectedIds.includes(business.id)) {
                        setSelectedIds(
                          selectedIds.filter((id) => id !== business.id)
                        );
                      } else {
                        setSelectedIds([...selectedIds, business.id]);
                      }
                    }}
                  >
                    <TableCell className="font-medium">{business.id}</TableCell>
                    <TableCell>{business.url}</TableCell>
                    <TableCell>{business.location}</TableCell>
                    <TableCell>{business.retailer_name}</TableCell>
                    <TableCell>{business.count}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
            <TableRow ref={lastItemRef} style={{ height: "0px" }}>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {isFetchingNextPage && (
          <div className="text-center">Loading more...</div>
        )}
      </div>
    </div>
  );
};
