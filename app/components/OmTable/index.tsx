"use client";

import { useInfiniteBusinesses } from "@/client/hooks/useInfiniteBusinesses";
import OmButton from "@/components/ui/OmButton";
import { useCallback, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const OmTable: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteBusinesses();
  const tableData = data?.pages.flatMap((page) => page.businesses) || [];
  const observer = useRef<IntersectionObserver | null>(null);

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

  return (
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
                <TableRow key={business.id}>
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
      {isFetchingNextPage && <div className="text-center">Loading more...</div>}
    </div>
  );
};
