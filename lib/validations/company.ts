import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().trim().min(2).max(100),

  description: z.string().trim().max(1000).optional(),

  website: z.string().trim().url().optional(),

  logo: z.string().trim().url().optional(),

  location: z.string().trim().max(100).optional(),

  foundedYear: z
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear())
    .optional(),

  employeeRange: z.string().trim().max(50).optional(),

  categoryId: z.number().int().positive(),
});

export const updateCompanySchema = createCompanySchema.partial();

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;