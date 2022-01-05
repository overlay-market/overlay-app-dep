import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import { TEXT } from "../../theme/theme";
import { Icon } from "../Icon/Icon";

const Container = styled.div<{ margin?: string}>`
  display: flex;
  flex-direction: row;
  width: auto;
  cursor: pointer;
  margin: ${({ margin }) => margin ?? margin};
`;


export const Back = ({
  arrowSize,
  textSize,
  margin,
}:{
  arrowSize: number
  textSize: number
  margin?: string
}) => {
    let history = useHistory();
    
    return (
      <>
        <Container onClick={() => history.goBack()} margin={margin}> 
          <Icon 
              size={arrowSize}
              clickable={true}
              margin={'auto 3px auto auto'}
              >
                <ArrowLeft size={arrowSize} />
          </Icon>
          <TEXT.Main fontSize={textSize}>
            Back
          </TEXT.Main>
        </Container>
      </>
    );
};