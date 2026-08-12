import { z } from "zod";

export const quoteSchema = z
  .object({
    customerName: z.string().min(3, "Customer name is required"),

    coverType: z.enum(["Single", "Couple", "Family"]),

    applicant1Age: z
      .number({
        message: "Applicant 1 age is required",
      })
      .min(18, "Minimum age is 18")
      .max(100, "Maximum age is 100"),

    applicant1HospitalHistory: z.enum(["Yes", "No", "Not sure"]),

    applicant2Age: z
      .number()
      .min(18, "Minimum age is 18")
      .max(100, "Maximum age is 100")
      .optional(),

    applicant2HospitalHistory: z.enum(["Yes", "No", "Not sure"]).optional(),

    hospitalCoverLevel: z.enum(["None", "Basic", "Bronze", "Silver", "Gold"]),

    extrasCoverLevel: z.enum(["None", "Basic", "Standard", "Premium"]),

    paymentFrequency: z.enum(["Monthly", "Yearly"]),

    annualPaymentDiscount: z.number().min(0).max(10),

    notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.coverType === "Couple" || data.coverType === "Family") {
      if (data.applicant2Age === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["applicant2Age"],
          message: "Applicant 2 age is required",
        });
      }

      if (!data.applicant2HospitalHistory) {
        ctx.addIssue({
          code: "custom",
          path: ["applicant2HospitalHistory"],
          message: "Applicant 2 hospital history is required",
        });
      }
    }
  });

export type QuoteFormData = z.infer<typeof quoteSchema>;
