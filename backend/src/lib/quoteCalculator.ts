type Applicant = {
  age: number;
  hospitalCoverHistory: string;
};

type QuoteInput = {
  coverType: "Single" | "Couple" | "Family";
  hospitalCover: string;
  extraCover: string;
  paymentFrequency: "Monthly" | "Yearly";
  annualDiscout: number;
  applicants: Applicant[];
};

const HOSPITAL_PRICES: Record<string, number> = {
  None: 0,
  Basic: 90,
  Bronze: 120,
  Silver: 160,
  Gold: 220,
};

const EXTRAS_PRICES: Record<string, number> = {
  None: 0,
  Basic: 25,
  Standard: 45,
  Premium: 70,
};

export function calculateQuote(quote: QuoteInput) {
  const hospitalBasePrice = HOSPITAL_PRICES[quote.hospitalCover] ?? 0;

  const extrasBasePrice = EXTRAS_PRICES[quote.extraCover] ?? 0;

  const adultCount = quote.coverType === "Single" ? 1 : 2;

  // Calculate hospital price for each applicant
  const applicantCalculations = quote.applicants.map((applicant, index) => {
    let lhcLoading = 0;

    // LHC only applies for hospital cover
    if (
      hospitalBasePrice > 0 &&
      applicant.hospitalCoverHistory === "No" &&
      applicant.age > 30
    ) {
      lhcLoading = (applicant.age - 30) * 0.02;
    }

    const hospitalPremium = hospitalBasePrice * (1 + lhcLoading);

    return {
      applicant: index + 1,
      age: applicant.age,
      hospitalCoverHistory: applicant.hospitalCoverHistory,
      lhcLoading: lhcLoading * 100,
      hospitalPremium,
    };
  });

  // Hospital total
  const hospitalTotal = applicantCalculations.reduce(
    (total, applicant) => total + applicant.hospitalPremium,
    0,
  );

  // Extras are NOT affected by LHC
  const extrasTotal = extrasBasePrice * adultCount;

  // Family upgrade
  const familyFee = quote.coverType === "Family" ? 30 : 0;

  // Monthly premium before annual discount
  const monthlyPremium = hospitalTotal + extrasTotal + familyFee;

  // Yearly price before discount
  const yearlyBeforeDiscount = monthlyPremium * 12;

  // Discount is only applied to yearly payment
  const yearlyDiscount =
    quote.paymentFrequency === "Yearly"
      ? yearlyBeforeDiscount * (quote.annualDiscout / 100)
      : 0;

  const yearlyPremium = yearlyBeforeDiscount - yearlyDiscount;

  return {
    applicants: applicantCalculations,

    hospitalTotal,
    extrasTotal,
    familyFee,

    monthlyPremium,
    yearlyBeforeDiscount,
    annualDiscountPercent: quote.annualDiscout,
    yearlyDiscount,
    yearlyPremium,

    // Useful for displaying the effective monthly cost
    effectiveMonthlyPremium:
      quote.paymentFrequency === "Yearly" ? yearlyPremium / 12 : monthlyPremium,

    lhcWarning: applicantCalculations.some(
      (applicant) => applicant.hospitalCoverHistory === "Not sure",
    ),
  };
}
