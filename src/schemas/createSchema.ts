import { z } from "zod";

// TOASK: should i validate if data exist in zod?
export const createStockBasicInfoSchema = z.object({
  industry_category: z.string(),
  stock_id: z.string(),
  stock_name: z.string(),
  type: z.string(),
  date: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Invalid date format. Required format: YYYY-MM-DD"
    ),
});

// https://dev.to/osalumense/validating-request-data-in-expressjs-using-zod-a-comprehensive-guide-3a0j
