import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { LocationContextProvider } from "@common/useLocationContext";

export const AppRoutes = () => (
  <BrowserRouter>
    <LocationContextProvider>
      <MainLayout />
    </LocationContextProvider>
  </BrowserRouter>
);
