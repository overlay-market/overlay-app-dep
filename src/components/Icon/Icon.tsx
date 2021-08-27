import styled from 'styled-components';

const IconWrapper = styled.div<{ size: number, margin?: string}>`
  display: flex;
  height: ${({ size }) => ( size )}px;
  width: ${({ size }) => ( size )}px;
  margin: ${({margin}) => ( margin ? margin : 0)};
`;

export const Icon = ({
  size,
  margin,
  children
}:{
  size: number
  margin?: string
  children: React.ReactNode
}) => {
  return (
    <IconWrapper size={size} margin={margin}>
      { children }
    </IconWrapper>
  )
};