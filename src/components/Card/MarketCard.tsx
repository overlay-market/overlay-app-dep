import { BlueOutlineCard } from "../../components/Card/Card";
import { Column } from "../../components/Column/Column";
import { TEXT } from "../../theme/theme";
import styled from 'styled-components/macro';


export const Container = styled(Column)`
`


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
      <BlueOutlineCard borderRadius={'4px'}>
        {children}
      </BlueOutlineCard>
    </Container>
  )
};