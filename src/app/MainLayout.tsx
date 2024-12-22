import { useMemo } from "react";

import { useLocationContext } from "@common/location";
import {
  Footer,
  GlobalNavi,
  Header,
  IconOnlyButton,
  StatusIcon,
} from "@freee_jp/vibes";
import { About } from "@screens/About";
import { Home } from "@screens/Home";
import { Me } from "@screens/Me";
import { NotFound } from "@screens/NotFound";
import { FaGithub } from "react-icons/fa";
import { MdHome, MdRouter } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

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
      <Route element={<About />} path="/about" />
      <Route element={<Me />} path="/about/me" />
      <Route element={<Home />} path="/" />
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
};

export const MainLayout = () => {
  const { state, computed } = useLocationContext();

  const links = useMemo(() => {
    return [
      {
        title: "Home",
        url: "/",
        IconComponent: MdHome,
        current: state.current?.path === "/", // HOMEからドリルダウンするページを作らない。
      },
      {
        title: "About",
        url: "/about",
        IconComponent: MdRouter,
        current: computed.currentPaths.some((p) => p.path === "/about"),
      },
    ];
  }, [state, computed]);

  return (
    <>
      <Header
        logo={<StatusIcon type="success">senkentarou page</StatusIcon>}
        logoUrl="/"
        sectionNode={
          <IconOnlyButton
            IconComponent={FaGithub}
            appearance="tertiary"
            href="https://github.com/senkentarou"
            label="github"
            target="_blank"
          />
        }
      />
      <GlobalNavi hideHelpForm links={links} />
      <StyledMain>
        <ScreenRoutes />
      </StyledMain>
      <Footer
        copyright="© 2024 senkentarou"
        disableAppStoreBadge
        disableGooglePlayBadge
        links={[]}
        width="wide"
      />
    </>
  );
};
