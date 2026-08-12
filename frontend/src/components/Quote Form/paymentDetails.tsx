import type {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";

import type { QuoteFormData } from "../../schemas/quoteSchema";

interface PaymentDetailsProps {
  register: UseFormRegister<QuoteFormData>;
  watch: UseFormWatch<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
}

export default function PaymentDetails({
  register,
  watch,
  errors,
}: PaymentDetailsProps) {
  const paymentFrequency = watch("paymentFrequency");

  return (
    <>
      <div>
        <label className="form-label" htmlFor="paymentFrequency">
          Payment Frequency
        </label>

        <select
          id="paymentFrequency"
          className="form-input"
          {...register("paymentFrequency")}
        >
          <option value="Monthly">Monthly</option>

          <option value="Yearly">Yearly</option>
        </select>

        {errors.paymentFrequency && (
          <p className=" text-red-500">{errors.paymentFrequency.message}</p>
        )}
      </div>

      <div>
        <label className="form-label" htmlFor="annualPaymentDiscount">
          Annual Payment Discount (%)
        </label>

        <input
          id="annualPaymentDiscount"
          className="form-input"
          type="number"
          min={0}
          max={10}
          step={0.1}
          disabled={paymentFrequency !== "Yearly"}
          {...register("annualPaymentDiscount", {
            valueAsNumber: true,
          })}
        />

        {errors.annualPaymentDiscount && (
          <p className=" text-red-500">
            {errors.annualPaymentDiscount.message}
          </p>
        )}
      </div>
    </>
  );
}
