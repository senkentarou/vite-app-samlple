import { ReactNode } from "react";

import { useLocationContext } from "@contexts/location";
import { Breadcrumbs } from "@freee_jp/vibes";
import styled from "styled-components";

import { Footer, Header, Navi } from "./layouts";

// With respect to https://vibes.freee.co.jp/?path=/docs/lv1-bases-container--docs
const StyledMain = styled.main`
  width: calc(100vw - 3rem);
  min-width: 20rem;
  max-width: 100rem;
  margin: 0 auto;
  height: calc(100vh - 3rem);
`;

export const Main = ({ children }: { children?: ReactNode }) => {
  const { computed } = useLocationContext();
  return (
    <>
      <Header />
      <Navi />
      <StyledMain>
        {computed.showBreadcrumbs && (
          <Breadcrumbs links={computed.breadcrumbsLinks} mt={1} />
        )}
        {children}
      </StyledMain>
      <Footer />
    </>
  );
};
