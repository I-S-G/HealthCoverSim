import express from "express";
import { prisma } from "../lib/prisma";
import { calculateQuote } from "../lib/quoteCalculator";

const router = express.Router();

//POST
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      coverType,
      hospitalCover,
      extraCover,
      paymentFrequency,
      annualDiscout,
      notes,
      applicants,
    } = req.body;

    const parsedDiscount = Number(annualDiscout ?? 0);

    const finalDiscount = paymentFrequency === "Yearly" ? parsedDiscount : 0;

    const quote = await prisma.quote.create({
      data: {
        customerName,
        coverType,
        hospitalCover,
        extraCover,
        paymentFrequency,
        annualDiscout: finalDiscount,
        notes: notes || "",
        applicants: {
          create: applicants.map(
            (applicant: { age: number; hospitalCoverHistory: string }) => ({
              age: Number(applicant.age),
              hospitalCoverHistory: applicant.hospitalCoverHistory,
            }),
          ),
        },
      },
      include: {
        applicants: true,
      },
    });

    return res.status(201).json({
      message: "Quote created successfully",
    });
  } catch (error) {
    console.error("Error creating quote:", error);

    return res.status(500).json({
      message: "Failed to create quote",

      error: error instanceof Error ? error.message : String(error),
    });
  }
});

//GET ALL QUOTE
router.get("/", async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany({
      include: {
        applicants: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    //calculation
    const quotesWithCalculations = quotes.map((quote) => {
      const calculation = calculateQuote({
        coverType: quote.coverType,
        hospitalCover: quote.hospitalCover,
        extraCover: quote.extraCover,
        paymentFrequency: quote.paymentFrequency as "Monthly" | "Yearly",
        annualDiscout: quote.annualDiscout,
        applicants: quote.applicants,
      });

      return {
        ...quote,
        calculation,
      };
    });

    return res.status(200).json({
      quotes: quotesWithCalculations,
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);

    return res.status(500).json({
      message: "Failed to fetch quotes",

      error: error instanceof Error ? error.message : String(error),
    });
  }
});

// GET SPECIFIC QUOTE
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await prisma.quote.findUnique({
      where: {
        id,
      },
      include: {
        applicants: true,
      },
    });

    if (!quote) {
      return res.status(404).json({
        message: "Quote not found",
      });
    }

    return res.status(200).json({
      quote,
    });
  } catch (error) {
    console.error("Error fetching quote:", error);

    return res.status(500).json({
      message: "Failed to fetch quote",
    });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await prisma.quote.findUnique({
      where: {
        id,
      },
    });

    if (!quote) {
      return res.status(404).json({
        message: "Quote not found",
      });
    }

    await prisma.quote.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Quote deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting quote:", error);

    return res.status(500).json({
      message: "Failed to delete quote",
    });
  }
});

// PUT /quotes/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      coverType,
      hospitalCover,
      extraCover,
      paymentFrequency,
      annualDiscout,
      notes,
      applicants,
    } = req.body;

    const existingQuote = await prisma.quote.findUnique({
      where: { id },
    });

    if (!existingQuote) {
      return res.status(404).json({
        message: "Quote not found",
      });
    }

    const parsedDiscount = Number(annualDiscout ?? 0);

    // Delete old applicants and update quote
    const quote = await prisma.$transaction(async (tx) => {
      await tx.applicant.deleteMany({
        where: {
          quoteId: id,
        },
      });

      return tx.quote.update({
        where: {
          id,
        },

        data: {
          coverType,
          hospitalCover,
          extraCover,
          paymentFrequency,
          annualDiscout: parsedDiscount,
          notes: notes || "",

          applicants: {
            create: applicants.map(
              (applicant: { age: number; hospitalCoverHistory: string }) => ({
                age: Number(applicant.age),
                hospitalCoverHistory: applicant.hospitalCoverHistory,
              }),
            ),
          },
        },

        include: {
          applicants: true,
        },
      });
    });

    return res.status(200).json({
      message: "Quote updated successfully",
      quote,
    });
  } catch (error) {
    console.error("Error updating quote:", error);

    return res.status(500).json({
      message: "Failed to update quote",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;
