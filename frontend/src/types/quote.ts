export type Applicant = {
  id: string;
  age: number;
  hospitalCoverHistory: string;
};

export type ApplicantCalculation = {
  applicant: number;
  age: number;
  hospitalCoverHistory: string;
  lhcLoading: number;
  hospitalPremium: number;
};

export type QuoteCalculation = {
  applicants: ApplicantCalculation[];
  hospitalTotal: number;
  extrasTotal: number;
  familyFee: number;
  monthlyPremium: number;
  yearlyBeforeDiscount: number;
  yearlyDiscount: number;
  yearlyPremium: number;
  effectiveMonthlyPremium: number;
  lhcWarning: boolean;
  lhcExplanation: string;
};

export type Quote = {
  id: string;
  customerName: string;
  coverType: "Single" | "Couple" | "Family";
  hospitalCover: string;
  extraCover: string;
  paymentFrequency: "Monthly" | "Yearly";
  annualDiscout: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  applicants: Applicant[];
  calculation: QuoteCalculation;
};
