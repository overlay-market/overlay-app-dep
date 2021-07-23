import { WhiteOutlineCard } from "../../components/Card/Card";
import { Column as Container } from "../../components/Column/Column";
import { TEXT } from "../../theme/theme";
import styled from 'styled-components/macro';


interface MarketCardProps {
  title: String
  children: React.ReactNode
}

export const MarketCard = ({title, children} : MarketCardProps) => {
  return (
    <Container padding={'24px 0 0 0'}>
      <TEXT.Body margin={'0 auto 4px 0'}>
        {title}
      </TEXT.Body>
      <WhiteOutlineCard borderRadius={'4px'}>
        {children}
      </WhiteOutlineCard>
    </Container>
  )
};