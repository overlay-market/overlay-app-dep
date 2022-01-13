import styled from 'styled-components';

const IconWrapper = styled.div<{ 
  size?: number, 
  margin?: string, 
  color?: string,
  transform?: string
  clickable?: boolean
  position?: string
  top?: string
  right?: string
  left?: string
  bottom?: string
}>`
  display: flex;
  height: ${({ size }) => ( size )}px;
  width: ${({ size }) => ( size )}px;
  margin: ${({ margin }) => ( margin ?? margin )};
  color: ${({ color }) => ( color ? color : '#fff' )};
  transform: ${({ transform }) => ( transform ? transform : 'rotate(0deg)' )};
  transition: transform 0.2s ease-out;
  cursor: ${({ clickable }) => ( clickable ? 'pointer' : 'default')};
  z-index: 10;
  top: ${({ top }) => top ?? top};
  right: ${({ right }) => right ?? right};
  left: ${({ left }) => left ?? left};
  bottom: ${({ bottom }) => bottom ?? bottom};
  position: ${({ position }) => ( position ? position : 'auto' )};
`;

export const Icon = ({
  size,
  margin,
  children,
  color,
  transform,
  clickable,
  onClick,
  top,
  right,
  left,
  bottom,
  position
}:{
  size?: number
  margin?: string
  children: React.ReactNode
  color?: string
  transform?: string
  clickable?: boolean
  onClick?: (event: any) => any
  top?: string
  right?: string
  left?: string
  bottom?: string
  position?: string
}) => {
  return (
    <IconWrapper 
      size={size} 
      margin={margin} 
      color={color}
      transform={transform}
      clickable={clickable}
      onClick={onClick}
      top={top}
      right={right}
      left={left}
      bottom={bottom}
      position={position}
      >
        { children }
    </IconWrapper>
  )
};