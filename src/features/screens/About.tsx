import { CardNavigation, ContentsBase } from "@freee_jp/vibes";
import { MdPerson } from "react-icons/md";

export const About = () => {
  const navigationContents = [
    { title: "Me", url: "/about/me", IconComponent: MdPerson },
  ];

  return (
    <ContentsBase>
      <CardNavigation navigationContents={navigationContents} />
    </ContentsBase>
  );
};
