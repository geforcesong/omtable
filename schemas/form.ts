import { z } from "zod";

export const BusinessUpdateFormSchema = z.object({
  url: z.string().min(1, "Name is required"),
  retailer_name: z.string().min(1, "Retailer Name is required"),
  location: z.string(),
  count: z.coerce.number(),
});
