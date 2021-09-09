import styled from 'styled-components';

const IconWrapper = styled.div<{ size: number, margin?: string}>`
  display: flex;
  height: ${({ size }) => ( size )}px;
  width: ${({ size }) => ( size )}px;
  margin: ${({ margin }) => ( margin ? margin : 0 )};
  color: ${({ color }) => ( color ? color : '#fff' )};
`;

export const Icon = ({
  size,
  margin,
  children,
  color
}:{
  size: number
  margin?: string
  children: React.ReactNode
  color?: string
}) => {
  return (
    <IconWrapper 
      size={size} 
      margin={margin} 
      color={color}
      >
        { children }
    </IconWrapper>
  )
};