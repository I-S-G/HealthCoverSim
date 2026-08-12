import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import { quoteSchema, type QuoteFormData } from "../../schemas/quoteSchema";

import CustomerDetails from "../../components/Quote Form/customerDetails";
import ApplicantDetails from "../../components/Quote Form/applicantDetails";
import CoverDetails from "../../components/Quote Form/coverDetails";
import PaymentDetails from "../../components/Quote Form/paymentDetails";

export default function EditQuote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const coverType = watch("coverType");

  const needsApplicant2 = coverType === "Couple" || coverType === "Family";

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(`http://localhost:5001/quotes/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch quote");
        }

        const quote = data.quote;

        reset({
          customerName: quote.customerName,
          coverType: quote.coverType,
          applicant1Age: quote.applicants[0]?.age,
          applicant1HospitalHistory: quote.applicants[0]?.hospitalCoverHistory,
          applicant2Age: quote.applicants[1]?.age,
          applicant2HospitalHistory: quote.applicants[1]?.hospitalCoverHistory,
          hospitalCoverLevel: quote.hospitalCover,
          extrasCoverLevel: quote.extraCover,
          paymentFrequency: quote.paymentFrequency,
          annualPaymentDiscount: quote.annualDiscout,
          notes: quote.notes || "",
        });
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch quote",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [id, reset]);

  const onSubmit = async (data: QuoteFormData) => {
    try {
      setError("");

      const applicants = [
        {
          age: data.applicant1Age,
          hospitalCoverHistory: data.applicant1HospitalHistory,
        },
      ];

      if (needsApplicant2) {
        applicants.push({
          age: data.applicant2Age!,
          hospitalCoverHistory: data.applicant2HospitalHistory!,
        });
      }

      const response = await fetch(`http://localhost:5001/quotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        throw new Error(result.message || "Failed to update quote");
      }

      navigate("/list");
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Failed to update quote",
      );
    }
  };

  if (loading) {
    return <div className="container mx-auto py-16">Loading quote...</div>;
  }

  return (
    <div className="container mx-auto flex flex-col items-center py-16">
      <h1 className="pb-12 text-4xl">Edit Quote</h1>

      {error && <p className="mb-5 text-red-500">{error}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 rounded-2xl border border-gray-500 px-46 py-14"
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

        <button className="mt-8 rounded-md bg-blue-200 py-2" type="submit">
          Update Quote
        </button>
      </form>
    </div>
  );
}
