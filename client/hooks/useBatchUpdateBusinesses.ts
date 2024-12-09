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
      queryClient.refetchQueries({ queryKey: ["businesses"] });
      // // queryClient.invalidateQueries({ queryKey: ["businesses"] });
      // queryClient.refetchQueries({ queryKey: ["businesses"], type: "active" });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
