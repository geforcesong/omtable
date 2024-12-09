import { MutateOptions, useMutation } from "@tanstack/react-query";
import { updateBusinesses, UpdateBusinessesParam } from "../services/business";

export const useBatchUpdateBusinesses = (
  options?: MutateOptions<void, unknown, UpdateBusinessesParam>
) => {
  return useMutation({
    mutationFn: (params) => updateBusinesses(params),
    ...options,
    onSuccess(data, variables, context) {
      options?.onSuccess?.(data, variables, context);
    },
  });
};
