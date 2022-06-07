import styled from "styled-components";
import { RouteComponentProps } from "react-router";
import { Container } from "../Markets/Market";

export function Stake({match: {params: { vaultId }}}: RouteComponentProps<{ vaultId: string }>) {

  return (
    <Container>
      Stake
    </Container>
  )
};