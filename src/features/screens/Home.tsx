import { GlobalNavi, type LinkContent } from "@freee_jp/vibes";
import { MdHome, MdRouter } from "react-icons/md";

const links: LinkContent[] = [
  {
    title: "Home",
    url: "/",
    IconComponent: MdHome,
  },
  { title: "About", url: "/about", IconComponent: MdRouter },
];

export const Home = () => {
  return <GlobalNavi hideHelpForm links={links} />;
};
