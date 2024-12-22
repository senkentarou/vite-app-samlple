import { sitetree } from "@config/sitetree";
import { LocationContextProvider } from "@contexts/location";
import { AboutContainer } from "@features/about";
import { HomeContainer } from "@features/home";
import { MeContainer } from "@features/me";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NotFound } from "./components/NotFound";
import { Main } from "./Main";

const FeatureRoutes = () => {
  return (
    <Routes>
      <Route element={<AboutContainer />} path="/about" />
      <Route element={<MeContainer />} path="/about/me" />
      <Route element={<HomeContainer />} path="/" />
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
