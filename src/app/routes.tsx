import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { LocationContextProvider } from "@common/location";
import { sitetree } from "@config/sitetree";

export const AppRoutes = () => (
  <BrowserRouter>
    <LocationContextProvider tree={sitetree}>
      <MainLayout />
    </LocationContextProvider>
  </BrowserRouter>
);
