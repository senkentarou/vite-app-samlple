import { sitetree } from "@config/sitetree";
import { LocationContextProvider } from "@contexts/location";
// TODO: screensをDOMAIN配下に分ける
import { About } from "@features/screens/About";
import { Home } from "@features/screens/Home";
import { Me } from "@features/screens/Me";
import { NotFound } from "@features/screens/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Main } from "./Main";

const FeatureRoutes = () => {
  // TODO: featureのroutesから追加する
  return (
    <Routes>
      <Route element={<About />} path="/about" />
      <Route element={<Me />} path="/about/me" />
      <Route element={<Home />} path="/" />
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
};

export const AppRoutes = () => (
  <BrowserRouter>
    <LocationContextProvider tree={sitetree}>
      <Main>
        <FeatureRoutes />
      </Main>
    </LocationContextProvider>
  </BrowserRouter>
);
