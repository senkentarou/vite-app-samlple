import { Route, Routes } from "react-router-dom";
import { MdHome, MdRouter } from "react-icons/md";
import { Footer, GlobalNavi, Header, LinkContent } from "@freee_jp/vibes";
import { Home } from "@screens/Home";
import { About } from "@screens/About";
import { NotFound } from "@screens/NotFound";

const links: LinkContent[] = [
  {
    title: "Home",
    url: "/",
    IconComponent: MdHome,
  },
  { title: "About", url: "/about", IconComponent: MdRouter },
];

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
  return (
    <>
      <Header logo={<p>senkentarou</p>} sectionNode={null} />
      <GlobalNavi hideHelpForm links={links} />
      <ScreenRoutes />
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
