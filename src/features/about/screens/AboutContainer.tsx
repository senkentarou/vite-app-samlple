import {
  ContentsBase,
  GridBlock,
  GridWrapper,
  ListCard,
  MaterialIcon,
  Paragraph,
} from "@freee_jp/vibes";
import { MdPerson } from "react-icons/md";

export const AboutContainer = () => {
  return (
    <ContentsBase>
      <GridWrapper>
        <GridBlock size="half">
          <ListCard
            thumbnail={<MaterialIcon IconComponent={MdPerson} />}
            title="Me"
            url="/about/me"
          >
            <Paragraph>aaaaaaaaaaaaaaaaaaaaa</Paragraph>
          </ListCard>
        </GridBlock>
      </GridWrapper>
    </ContentsBase>
  );
};
