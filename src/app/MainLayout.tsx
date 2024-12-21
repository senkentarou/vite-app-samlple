import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { MdHome, MdRouter } from "react-icons/md";
import { Footer, GlobalNavi, Header, StatusIcon } from "@freee_jp/vibes";
import styled from "styled-components";

import { Home } from "@screens/Home";
import { About } from "@screens/About";
import { NotFound } from "@screens/NotFound";
import { useLocationContext } from "@common/useLocationContext";

// With respect to https://vibes.freee.co.jp/?path=/docs/lv1-bases-container--docs
const StyledMain = styled.main`
  width: calc(100vw - 3rem);
  min-width: 20rem;
  max-width: 100rem;
  margin: 0 auto;
  height: calc(100vh - 3rem);
`;

const ScreenRoutes = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export const MainLayout = () => {
  const { state } = useLocationContext();

  const links = useMemo(() => {
    return [
      {
        title: "Home",
        url: "/",
        IconComponent: MdHome,
        current: state.current?.path === "/",
      },
      {
        title: "About",
        url: "/about",
        IconComponent: MdRouter,
        current: state.current?.path === "/about",
      },
    ];
  }, [state]);

  return (
    <>
      <Header
        logo={<StatusIcon type="success">senkentarou's page</StatusIcon>}
        logoUrl="/"
        sectionDataList={[]}
      />
      <GlobalNavi hideHelpForm links={links} />
      <StyledMain>
        <ScreenRoutes />
      </StyledMain>
      <Footer
        width="wide"
        disableAppStoreBadge
        disableGooglePlayBadge
        links={[]}
        copyright="© Copyright 2024-2025 senkentarou"
      />
    </>
  );
};
