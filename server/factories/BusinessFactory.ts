import { Business } from "@/types/business.types";
import { pool } from "@/server/dbPool";

class BusinessFactory {
  private static instance: BusinessFactory;

  constructor() {}

  public static getInstance(): BusinessFactory {
    if (!BusinessFactory.instance) {
      BusinessFactory.instance = new BusinessFactory();
    }
    return BusinessFactory.instance;
  }

  public async fetchBusinesses(
    page: number,
    limit: number
  ): Promise<Business[]> {
    try {
      if (page <= 0 || limit <= 0) {
        throw new Error("Page and limit must be positive numbers");
      }

      const offset = (page - 1) * limit;
      const res = await pool.query(
        `SELECT * FROM public."Business" 
             ORDER BY id ASC 
             LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
      return res.rows.map((row) => ({
        ...row,
        count: Number(row.count),
      })) as Business[];
    } catch (err: any) {
      console.log(err);
      throw new Error("Failed to fetch products");
    }
  }

  public async fetchTotalCount(): Promise<number> {
    try {
      const countResult = await pool.query(
        'SELECT COUNT(*) FROM public."Business"'
      );
      return parseInt(countResult.rows[0].count);
    } catch (err: any) {
      console.log(err);
      throw new Error("Failed to fetch total count");
    }
  }

  public async updateBusinesses(
    ids: string[],
    businessData: Pick<Business, "url" | "location" | "retailer_name" | "count">
  ) {
    try {
      const updateFields = Object.keys(businessData).map(
        (key, index) => `${key} = $${index + 1}`
      );
      const updateValues = Object.values(businessData);
      const idsPlaceholders = ids
        .map((_, index) => `$${index + 1 + updateValues.length}`)
        .join(",");

      const queryText = `UPDATE public."Business" SET ${updateFields.join(
        ", "
      )} WHERE id IN (${idsPlaceholders})`;
      await pool.query(queryText, [...updateValues, ...ids]);
    } catch (err: any) {
      console.log(err);
      throw new Error("Failed to update businesses");
    }
  }
}

export const businessFactory = BusinessFactory.getInstance();
