import styled from 'styled-components';

const Container = styled.div<{ width: string; margin?: string }>`
  margin: ${({ margin }) => ( margin ? margin : 'auto' )};
  width: ${({ width }) => ( width )};
  text-align: center;
`;

const ProgressBackground = styled.div`
  border-radius: 30px;
  border: 1px solid #F2F2F2;
  background: rgba(0, 0, 0, 0.25);  
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
`;

const Bar = styled.div<{ width?: number; color: string }>`
  height: 8px;
  border-radius: 30px;
  background-image: 
    linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  transition: 0.4s linear;  
  transition-property: width, background-color;  
  width: ${({ width }) => ( `${width}%` )};
  background-color: ${({ color }) => ( color )};  
  animation: progressAnimation 2s;
`;

export const ProgressBar = ({
  value,
  max,
  color,
  width,
  margin
}:{
  value: number | undefined
  max: number
  color: string
  width: string
  margin?: string | undefined
}) => {
  let currentPercentage = value ? ( (value / max) * 100 ) : 0;

  return (
    <Container width={width} margin={margin}>
      <ProgressBackground>
        <Bar width={currentPercentage} color={color}/>
      </ProgressBackground>
    </Container>
  )
};