import styled from 'styled-components';

const IconWrapper = styled.div<{ 
  size: number, 
  margin?: string, 
  color?: string,
  transform?: string
}>`
  display: flex;
  height: ${({ size }) => ( size )}px;
  width: ${({ size }) => ( size )}px;
  margin: ${({ margin }) => ( margin ? margin : 0 )};
  color: ${({ color }) => ( color ? color : '#fff' )};
  transform: ${({ transform }) => ( transform ? transform : 'rotate(0deg)' )};
  transition: transform 0.2s ease-out;
`;

export const Icon = ({
  size,
  margin,
  children,
  color,
  transform
}:{
  size: number
  margin?: string
  children: React.ReactNode
  color?: string
  transform?: string
}) => {
  return (
    <IconWrapper 
      size={size} 
      margin={margin} 
      color={color}
      transform={transform}
      >
        { children }
    </IconWrapper>
  )
};