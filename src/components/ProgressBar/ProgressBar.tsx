import styled from 'styled-components';

const Container = styled.div<{ width: string, color: string }>`

  progress[value] {
    width: ${({ width }) => ( width )};
    appearance: none;
  }

  ::-webkit-progress-bar {
    height: 10px;
    border-radius: 20px;
    background-color: transparent;
  }

  ::-webkit-progress-value {
    height: 10px;
    border-radius: 20px;
    background-color: ${({ color }) => ( color )};
  }
`;


export const ProgressBar = ({
  value,
  max,
  color,
  width
}:{
  value: number | undefined
  max: number | undefined
  color: string
  width: string
}) => {
  return (
    <Container color={color} width={width}>
      <progress value={value} max={max} />
    </Container>
  )
};