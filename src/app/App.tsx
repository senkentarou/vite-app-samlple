import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { VibesProvider } from "@freee_jp/vibes";
import "@freee_jp/vibes/css";

import { AppRoutes } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VibesProvider fixedLayout={false} lang="ja" portalParent={document.body}>
      <AppRoutes />
    </VibesProvider>
  </StrictMode>
);
