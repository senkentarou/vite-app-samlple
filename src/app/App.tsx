import { StrictMode } from "react";

import { VibesProvider } from "@freee_jp/vibes";
import { createRoot } from "react-dom/client";

import "@freee_jp/vibes/css";

import { AppRoutes } from "./routes";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <VibesProvider fixedLayout={false} lang="ja" portalParent={document.body}>
      <AppRoutes />
    </VibesProvider>
  </StrictMode>
);
