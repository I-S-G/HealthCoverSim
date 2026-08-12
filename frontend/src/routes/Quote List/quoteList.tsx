import { useEffect, useState } from "react";
import QuoteCard from "./quoteCard";

import type { Quote } from "../../types/quote";

export default function QuoteList() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuotes = async () => {
    try {
      const response = await fetch("http://localhost:5001/quotes");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch quotes");
      }

      setQuotes(data.quotes);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch quotes",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const deleteQuote = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quote?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5001/quotes/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete quote");
      }

      setQuotes((currentQuotes) =>
        currentQuotes.filter((quote) => quote.id !== id),
      );
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Failed to delete quote");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">Loading quotes...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-red-500">{error}</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Quotes</h1>

        <p className="text-gray-500">All created health insurance quotes</p>
      </div>

      {quotes.length === 0 ? (
        <p className="text-gray-500">No quotes found.</p>
      ) : (
        <div className="space-y-6">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} onDelete={deleteQuote} />
          ))}
        </div>
      )}
    </div>
  );
}
