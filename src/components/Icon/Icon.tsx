import styled from 'styled-components';

const IconWrapper = styled.div<{ 
  size: number, 
  margin?: string, 
  color?: string,
  transform?: string
  clickable?: boolean
}>`
  display: flex;
  height: ${({ size }) => ( size )}px;
  width: ${({ size }) => ( size )}px;
  margin: ${({ margin }) => ( margin ? margin : 0 )};
  color: ${({ color }) => ( color ? color : '#fff' )};
  transform: ${({ transform }) => ( transform ? transform : 'rotate(0deg)' )};
  transition: transform 0.2s ease-out;
  cursor: ${({ clickable }) => ( clickable ? 'pointer' : 'default')};
  z-index: 10;
`;

export const Icon = ({
  size,
  margin,
  children,
  color,
  transform,
  clickable,
  onClick
}:{
  size: number
  margin?: string
  children: React.ReactNode
  color?: string
  transform?: string
  clickable?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <IconWrapper 
      size={size} 
      margin={margin} 
      color={color}
      transform={transform}
      clickable={clickable}
      onClick={onClick}
      >
        { children }
    </IconWrapper>
  )
};