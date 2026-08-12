import type { Quote } from "../../types/quote";

type Props = {
  quote: Quote;
  onDelete: (id: string) => void;
};

export default function QuoteCard({ quote, onDelete }: Props) {
  const { calculation } = quote;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-xl font-semibold">{quote.customerName}</h2>

          <p className="text-sm text-gray-500">{quote.coverType} Cover</p>
        </div>

        <div className="flex gap-2">
          <a
            href={`/edit/${quote.id}`}
            className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Edit
          </a>

          <button
            type="button"
            onClick={() => onDelete(quote.id)}
            className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Cover details */}
      <div className="grid grid-cols-2 gap-4 border-b py-5 md:grid-cols-4">
        <div>
          <p className="text-xs text-gray-500">Hospital</p>
          <p className="font-medium">{quote.hospitalCover}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Extras</p>
          <p className="font-medium">{quote.extraCover}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Payment</p>
          <p className="font-medium">{quote.paymentFrequency}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Discount</p>
          <p className="font-medium">{quote.annualDiscout}%</p>
        </div>
      </div>

      {/* Premium */}
      <div className="grid gap-6 py-5 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Monthly premium</p>

          <p className="text-3xl font-semibold">
            ${calculation.monthlyPremium.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Yearly premium</p>

          <p className="text-3xl font-semibold">
            ${calculation.yearlyPremium.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Applicants */}
      <div className="border-t pt-5">
        <h3 className="mb-3 font-semibold">Applicants</h3>

        <div className="grid gap-3 md:grid-cols-2">
          {calculation.applicants.map((applicant) => (
            <div
              key={applicant.applicant}
              className="rounded-lg bg-gray-50 p-4"
            >
              <div className="flex justify-between">
                <p className="font-medium">Applicant {applicant.applicant}</p>

                <p className="text-sm text-gray-500">Age {applicant.age}</p>
              </div>

              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Cover history</span>

                  <span>{applicant.hospitalCoverHistory}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">LHC loading <br /><span className="text-red-500">“Lifetime Health Cover loading applies only to hospital cover. It does not apply to extras cover.”</span></span>

                  <span>{applicant.lhcLoading}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown */}
      <div className="mt-5 border-t pt-5">
        <h3 className="mb-3 font-semibold">Premium Breakdown</h3>

        <div className="max-w-md space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Hospital</span>
            <span>${calculation.hospitalTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Extras</span>
            <span>${calculation.extrasTotal.toFixed(2)}</span>
          </div>

          {calculation.familyFee > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Family upgrade</span>
              <span>${calculation.familyFee.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between border-t pt-2 font-semibold">
            <span>Monthly</span>
            <span>${calculation.monthlyPremium.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Yearly before discount</span>
            <span>${calculation.yearlyBeforeDiscount.toFixed(2)}</span>
          </div>

          {calculation.yearlyDiscount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Annual discount</span>
              <span>-${calculation.yearlyDiscount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between border-t pt-2 font-semibold">
            <span>Yearly</span>
            <span>${calculation.yearlyPremium.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* LHC warning */}
      <div className="mt-5 rounded-lg bg-gray-50 p-4 text-sm">
        <p>{calculation.lhcExplanation}</p>

        {calculation.lhcWarning && (
          <p className="mt-2 text-orange-600">
            Applicant cover history is unknown — LHC loading has not been
            applied. This quote may be inaccurate.
          </p>
        )}
      </div>

      {/* Notes */}
      {quote.notes && (
        <div className="mt-5 border-t pt-5">
          <p className="text-sm font-medium">Notes</p>

          <p className="mt-1 text-sm text-gray-500">{quote.notes}</p>
        </div>
      )}
    </div>
  );
}
