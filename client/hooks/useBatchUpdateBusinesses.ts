import {
  MutateOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateBusinesses, UpdateBusinessesParam } from "../services/business";

export const useBatchUpdateBusinesses = (
  options?: MutateOptions<void, unknown, UpdateBusinessesParam>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateBusinesses(params),
    ...options,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
