import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { QuoteFormData } from "../../schemas/quoteSchema";

interface CoverDetailsProps {
  register: UseFormRegister<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
}

export default function CoverDetails({ register, errors }: CoverDetailsProps) {
  return (
    <>
      <div className="pt-5 space-y-4">
        <label className="form-label" htmlFor="hospitalCoverLevel">
          Hospital Cover
        </label>

        <select
          className="form-input"
          id="hospitalCoverLevel"
          {...register("hospitalCoverLevel")}
        >
          <option value="None">None</option>
          <option value="Basic">Basic</option>
          <option value="Bronze">Bronze</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
        </select>

        {errors.hospitalCoverLevel && (
          <p className=" text-red-500">{errors.hospitalCoverLevel.message}</p>
        )}
      </div>

      <div>
        <label className="form-label" htmlFor="extrasCoverLevel">
          Extras Cover
        </label>

        <select
          className="form-input "
          id="extrasCoverLevel"
          {...register("extrasCoverLevel")}
        >
          <option value="None">None</option>
          <option value="Basic">Basic</option>
          <option value="Standard">Standard</option>
          <option value="Premium">Premium</option>
        </select>

        {errors.extrasCoverLevel && (
          <p className=" text-red-500">{errors.extrasCoverLevel.message}</p>
        )}
      </div>
    </>
  );
}
