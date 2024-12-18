import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./features/screens/Home";
import { About } from "./features/screens/About";
import { NotFound } from "./features/screens/NotFound";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
