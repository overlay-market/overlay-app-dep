import { WhiteOutlineCard } from "../../components/Card/Card";
import { Column } from "../../components/Column/Column";
import { TEXT } from "../../theme/theme";
import styled from 'styled-components/macro';

const Container = styled(Column)`
  padding: 24px 0 0;
  max-width: 500px;
  margin: auto;
`;

const Title = styled(TEXT.Body)<{align?: string}>`
  margin: 0 auto 4px 0 !important;
  font-weight: 700;
  text-align: ${({align}) => (align ? align : 'left')};
  width: 100%;
`;

export const MarketCard = ({
  title, 
  children,
  align
}:{
  title: string
  children: React.ReactNode
  align?: string
}) => {
  return (
    <Container>
      <Title align={align}> {title} </Title>
      <WhiteOutlineCard borderRadius={'4px'}>
        {children}
      </WhiteOutlineCard>
    </Container>
  )
};
