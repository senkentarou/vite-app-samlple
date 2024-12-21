import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { MdHome, MdRouter } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import {
  Footer,
  GlobalNavi,
  Header,
  IconOnlyButton,
  StatusIcon,
} from "@freee_jp/vibes";
import styled from "styled-components";

import { Home } from "@screens/Home";
import { About } from "@screens/About";
import { Me } from "@screens/Me";
import { NotFound } from "@screens/NotFound";
import { useLocationContext } from "@common/location";

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
      <Route path="/about/me" element={<Me />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
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
        current: state.current?.path === "/", // HOMEからドリルダウンするページはない。
      },
      {
        title: "About",
        url: "/about",
        IconComponent: MdRouter,
        current: computed.currentPaths.some((p) => p.path === "/about"),
      },
    ];
  }, [computed]);

  return (
    <>
      <Header
        logo={<StatusIcon type="success">senkentarou's page</StatusIcon>}
        logoUrl="/"
        sectionNode={
          <IconOnlyButton
            IconComponent={FaGithub}
            label="github"
            appearance="tertiary"
            href="https://github.com/senkentarou"
            target="_blank"
          />
        }
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
        copyright="© 2024 senkentarou"
      />
    </>
  );
};
