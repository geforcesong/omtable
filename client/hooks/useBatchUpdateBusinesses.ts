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
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["businesses"] });
        // queryClient.invalidateQueries({ queryKey: ["businesses"], type: "active" });
        // queryClient.refetchQueries({ queryKey: ["businesses"] });
      }, 50);
      options?.onSuccess?.(data, variables, context);
    },
  });
};
