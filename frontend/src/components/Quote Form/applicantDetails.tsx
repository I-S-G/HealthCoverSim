import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { QuoteFormData } from "../../schemas/quoteSchema";

interface ApplicantDetailsProps {
  applicant: 1 | 2;
  register: UseFormRegister<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
}

export default function ApplicantDetails({
  applicant,
  register,
  errors,
}: ApplicantDetailsProps) {
  const ageField = applicant === 1 ? "applicant1Age" : "applicant2Age";

  const historyField =
    applicant === 1 ? "applicant1HospitalHistory" : "applicant2HospitalHistory";

  return (
    <fieldset>
      <legend className="form-label text-lg pt-4">Applicant {applicant}</legend>

      <div>
        <label className="form-label" htmlFor={ageField}>
          Age
        </label>

        <input
          className="form-input"
          id={ageField}
          type="number"
          min={18}
          max={100}
          {...register(ageField, {
            valueAsNumber: true,
          })}
        />

        {errors[ageField] && (
          <p className=" text-red-500">{errors[ageField]?.message}</p>
        )}
      </div>

      <div>
        <label className="form-label pt-4" htmlFor={historyField}>
          Hospital Cover History
        </label>

        <select
          id={historyField}
          className="form-input"
          {...register(historyField)}
        >
          <option value="">Select an option</option>

          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Not sure">Not sure</option>
        </select>

        {errors[historyField] && (
          <p className=" text-red-500">{errors[historyField]?.message}</p>
        )}
      </div>
    </fieldset>
  );
}
