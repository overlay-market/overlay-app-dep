import styled from 'styled-components'
import {TEXT} from '../../theme/theme'

const BannerContainer = styled.div`
  display: block;
  overflow-x: hidden !important;
  width: 100%;
`

const Carousel = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  height: auto;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-top: 8px;
`

const AnimatedCarouselText = styled.div<{duration: number}>`
  animation: moveText ${({duration}) => duration}s linear infinite;

  @keyframes moveText {
    0% {
      transform: translateX(500%);
    }
    100% {
      transform: translateX(-250%);
    }
  }
`

const StaticCarouselText = styled.div`
  margin: auto;
`

type BannerProps = {
  content: string
  animated: boolean
  duration?: number | undefined
}

export const Banner = ({content, animated, duration = 0}: BannerProps) => {
  return (
    <BannerContainer>
      <Carousel>
        {animated ? (
          <AnimatedCarouselText duration={duration}>
            <TEXT.BoldSmallBody>
              please make sure you are on https://app.overlay.market
            </TEXT.BoldSmallBody>
          </AnimatedCarouselText>
        ) : (
          <StaticCarouselText>
            <TEXT.BoldSmallBody>
              please make sure you are on https://app.overlay.market
            </TEXT.BoldSmallBody>
          </StaticCarouselText>
        )}
      </Carousel>
    </BannerContainer>
  )
}
