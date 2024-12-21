import {
  ContentsBase,
  GridBlock,
  GridWrapper,
  ListCard,
  MaterialIcon,
  Paragraph,
} from "@freee_jp/vibes";
import { MdPerson } from "react-icons/md";

export const About = () => {
  return (
    <ContentsBase>
      <GridWrapper>
        <GridBlock size="half">
          <ListCard
            title="Me"
            url="/about/me"
            thumbnail={<MaterialIcon IconComponent={MdPerson} />}
          >
            <Paragraph>aaaaaaaaaaaaaaaaaaaaa</Paragraph>
          </ListCard>
        </GridBlock>
      </GridWrapper>
    </ContentsBase>
  );
};
