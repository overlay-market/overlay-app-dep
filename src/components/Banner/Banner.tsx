import styled from 'styled-components'
import {TEXT} from '../../theme/theme'

const BannerContainer = styled.div`
  display: block;
  overflow-x: hidden !important;
  width: 100%;
`

const Carousel = styled.div`
  position: absolute;
  top: 0;
  height: auto;
  justify-content: center;
  text-align: center;
`

const CarouselText = styled.div`
  animation: moveText 25s linear infinite;

  @keyframes moveText {
    0% {
      transform: translateX(500%);
    }
    100% {
      transform: translateX(-250%);
    }
  }
`
export const Banner = () => {
  return (
    <BannerContainer>
      <Carousel>
        <CarouselText>
          <TEXT.BoldSmallBody>
            please make sure you are on https://app.overlay.market
          </TEXT.BoldSmallBody>
        </CarouselText>
      </Carousel>
    </BannerContainer>
  )
}
