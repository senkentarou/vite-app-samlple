import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { VibesProvider } from "@freee_jp/vibes";
import "@freee_jp/vibes/css";

import { Router } from "./Router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VibesProvider fixedLayout={false} portalParent={document.body} lang="ja">
      <Router />
    </VibesProvider>
  </StrictMode>
);
