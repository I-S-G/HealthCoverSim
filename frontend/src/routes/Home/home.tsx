import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { quoteSchema, type QuoteFormData } from "../../schemas/quoteSchema";

import CustomerDetails from "../../components/Quote Form/customerDetails";
import ApplicantDetails from "../../components/Quote Form/applicantDetails";
import CoverDetails from "../../components/Quote Form/coverDetails";
import PaymentDetails from "../../components/Quote Form/paymentDetails";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isLoading },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),

    defaultValues: {
      customerName: "",
      coverType: "Single",

      applicant1Age: undefined,
      applicant1HospitalHistory: undefined,

      applicant2Age: undefined,
      applicant2HospitalHistory: undefined,

      hospitalCoverLevel: "None",
      extrasCoverLevel: "None",

      paymentFrequency: "Monthly",
      annualPaymentDiscount: 0,

      notes: "",
    },
  });

  const coverType = watch("coverType");

  const needsApplicant2 = coverType === "Couple" || coverType === "Family";

  const onSubmit = async (data: QuoteFormData) => {
    try {
      const applicants = [
        {
          age: data.applicant1Age,
          hospitalCoverHistory: data.applicant1HospitalHistory,
        },
      ];

      /*
       * Add applicant 2 for Couple / Family.
       */
      if (
        data.applicant2Age !== undefined &&
        data.applicant2HospitalHistory !== undefined
      ) {
        applicants.push({
          age: data.applicant2Age,
          hospitalCoverHistory: data.applicant2HospitalHistory,
        });
      }

      const response = await fetch("http://localhost:5001/quotes", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          customerName: data.customerName,
          coverType: data.coverType,
          hospitalCover: data.hospitalCoverLevel,
          extraCover: data.extrasCoverLevel,
          paymentFrequency: data.paymentFrequency,
          annualDiscout: data.annualPaymentDiscount,
          notes: data.notes,
          applicants,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || result.message || "Failed to create quote",
        );
      }

      console.log("Quote created:", result);

      reset();
    } catch (error) {
      console.error("Error creating quote:", error);
    }
  };

  return (
    <div className=" container mx-auto flex items-center flex-col py-16">
      <h1 className="text-4xl pb-12 "> Create A New Quote </h1>
      <form
        className="border border-gray-500 rounded-2xl px-46 py-14 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomerDetails register={register} errors={errors} />

        <ApplicantDetails applicant={1} register={register} errors={errors} />

        {needsApplicant2 && (
          <ApplicantDetails applicant={2} register={register} errors={errors} />
        )}

        <CoverDetails register={register} errors={errors} />

        <PaymentDetails register={register} watch={watch} errors={errors} />

        <div>
          <label className="form-label" htmlFor="notes">
            Notes
          </label>

          <textarea className="form-input" id="notes" {...register("notes")} />
        </div>

        <button
          disabled={isLoading}
          className="bg-blue-200 py-2 mt-8 rounded-md cursor-pointer"
          type="submit"
        >
          Create Quote
        </button>
      </form>
    </div>
  );
}
