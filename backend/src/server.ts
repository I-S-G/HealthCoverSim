import express from "express";
import cors from "cors";

//import routes
import quoteRoutes from "./routes/quoteRoutes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);

app.use(express.json());

//API Routes
app.use("/quotes", quoteRoutes);

const PORT = 5001;
const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
