import type { UseFormRegister, FieldErrors } from "react-hook-form";

import type { QuoteFormData } from "../../schemas/quoteSchema";

interface CustomerDetailsProps {
  register: UseFormRegister<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
}

export default function CustomerDetails({
  register,
  errors,
}: CustomerDetailsProps) {
  return (
    <>
      <div>
        <label className="form-label" htmlFor="customerName">
          Customer Name
        </label>

        <input
          className="form-input"
          id="customerName"
          type="text"
          {...register("customerName")}
        />

        {errors.customerName && (
          <p className=" text-red-500">{errors.customerName.message}</p>
        )}
      </div>

      <div>
        <label className="form-label" htmlFor="coverType">
          Cover Type
        </label>

        <select
          id="coverType"
          className="form-input"
          {...register("coverType")}
        >
          <option value="Single">Single</option>

          <option value="Couple">Couple</option>

          <option value="Family">Family</option>
        </select>

        {errors.coverType && (
          <p className=" text-red-500">{errors.coverType.message}</p>
        )}
      </div>
    </>
  );
}
