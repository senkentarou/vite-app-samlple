import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { VibesProvider } from "@freee_jp/vibes";
import "@freee_jp/vibes/css";

import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VibesProvider fixedLayout={false} portalParent={document.body} lang="ja">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VibesProvider>
  </StrictMode>,
);
