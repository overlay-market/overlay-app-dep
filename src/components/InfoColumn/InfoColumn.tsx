import styled from 'styled-components'

const Container = styled.div<{align?: string; margin?: string}>`
  display: flex;
  flex-direction: column;
  text-align: ${({align}) => (align ? align : 'left')};
  margin: ${({margin}) => (margin ? margin : 0)};
`

const Title = styled.div<{
  titleColor?: string
  titleFontSize?: string
  titleFontWeight?: number
}>`
  color: ${({theme, titleColor}) => (titleColor ? titleColor : theme.text1)};
  font-size: ${({titleFontSize}) => (titleFontSize ? titleFontSize : '14px')};
  font-weight: ${({titleFontWeight}) => (titleFontWeight ? titleFontWeight : 400)};
`

const Description = styled.div<{
  descriptionColor?: string
  descriptionFontSize?: string
  descriptionFontWeight?: number
}>`
  color: ${({theme, descriptionColor}) => (descriptionColor ? descriptionColor : theme.text1)};
  font-size: ${({descriptionFontSize}) => (descriptionFontSize ? descriptionFontSize : '20px')};
  font-weight: ${({descriptionFontWeight}) => (descriptionFontWeight ? descriptionFontWeight : 700)};
`

type InfoColumnProps = {
  title: string
  description: string
  margin?: string
  align?: string
  titleColor?: string
  titleFontSize?: string
  titleFontWeight?: number
  descriptionColor?: string
  descriptionFontSize?: string
  descriptionFontWeight?: number
}

export const InfoColumn = ({
  title,
  description,
  margin,
  align,
  titleColor,
  titleFontSize,
  titleFontWeight,
  descriptionColor,
  descriptionFontSize,
  descriptionFontWeight,
}: InfoColumnProps) => {
  return (
    <Container align={align} margin={margin}>
      <Title titleColor={titleColor} titleFontSize={titleFontSize} titleFontWeight={titleFontWeight}>
        {title}
      </Title>
      <Description
        descriptionColor={descriptionColor}
        descriptionFontSize={descriptionFontSize}
        descriptionFontWeight={descriptionFontWeight}
      >
        {description}
      </Description>
    </Container>
  )
}
