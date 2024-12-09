import { Business, BusinessData } from "@/types/business.types";
import { API } from "@/util/ApiHelper";
import { pageSize } from "@/util/constants";

export type FetchBusinessesResponse = {
  businesses: Business[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export async function fetchBusinesses(
  pageParam: number
): Promise<FetchBusinessesResponse> {
  const { data } = await API.get(
    `/api/businesses?page=${pageParam}&limit=${pageSize}`
  );
  return data;
}

export type UpdateBusinessesParam = {
  ids: string[];
  businessData: BusinessData;
};
export async function updateBusinesses(
  param: UpdateBusinessesParam
): Promise<void> {
  await API.put(`/api/businesses`, param);
}
