import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./routes/Home/home";
import QuoteList from "./routes/Quote List/quoteList";
import EditQuote from "./routes/Edit/edit";

export default function App() {
  return (
    <Routes>
      <Route element={<Navbar />} path="/">
        <Route element={<Home />} index />
        <Route element= {<QuoteList />} path="/list" />
        <Route element={<EditQuote />} path="/edit/:id" />
      </Route>
    </Routes>
  );
}
