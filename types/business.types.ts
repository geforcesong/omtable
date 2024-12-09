export type Business = {
  id: string;
  created_at: Date;
  url: string | null;
  retailer_name: string | null;
  desc_short: string | null;
  sector: string | null;
  location: string | null;
  count?: number | null;
};
