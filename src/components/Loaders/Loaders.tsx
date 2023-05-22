import {Image} from 'rebass'
import styled, {keyframes} from 'styled-components/macro'
import PlanckCatWhite from '../../assets/svg/planck-cat-white.svg'

const LoaderContainer = styled.div`
  display: block;
  width: 100%;
  padding: 8px 0;
`

interface PlanckCatWrapProps {
  duration: number
  width: number
}

const PlanckCatWrap = styled.div<PlanckCatWrapProps>`
  width: calc(100% - ${({width}) => width}px);
  animation: Staccato ${({duration}) => duration}s linear infinite;

  @keyframes Staccato {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    7.9% {
      transform: translateX(0);
      opacity: 1;
    }
    8% {
      transform: translateX(0);
      opacity: 0;
    }
    9.9% {
      transform: translateX(10%);
      opacity: 0;
    }
    10% {
      transform: translateX(10%);
      opacity: 1;
    }
    17.9% {
      transform: translateX(10%);
      opacity: 1;
    }
    18% {
      transform: translateX(10%);
      opacity: 0;
    }
    19.9% {
      transform: translateX(20%);
      opacity: 0;
    }
    20% {
      transform: translateX(20%);
      opacity: 1;
    }
    27.9% {
      transform: translateX(20%);
      opacity: 1;
    }
    28% {
      transform: translateX(20%);
      opacity: 0;
    }
    29.9% {
      transform: translateX(30%);
      opacity: 0;
    }
    30% {
      transform: translateX(30%);
      opacity: 1;
    }
    37.9% {
      transform: translateX(30%);
      opacity: 1;
    }
    38% {
      transform: translateX(30%);
      opacity: 0;
    }
    39.9% {
      transform: translateX(40%);
      opacity: 0;
    }
    40% {
      transform: translateX(40%);
      opacity: 1;
    }
    47.9% {
      transform: translateX(40%);
      opacity: 1;
    }
    48% {
      transform: translateX(40%);
      opacity: 0;
    }
    49.9% {
      transform: translateX(50%);
      opacity: 0;
    }
    50% {
      transform: translateX(50%);
      opacity: 1;
    }
    57.9% {
      transform: translateX(50%);
      opacity: 1;
    }
    58% {
      transform: translateX(50%);
      opacity: 0;
    }
    59.9% {
      transform: translateX(60%);
      opacity: 0;
    }
    60% {
      transform: translateX(60%);
      opacity: 1;
    }
    67.9% {
      transform: translateX(60%);
      opacity: 1;
    }
    68% {
      transform: translateX(60%);
      opacity: 0;
    }
    69.9% {
      transform: translateX(70%);
      opacity: 0;
    }
    70% {
      transform: translateX(70%);
      opacity: 1;
    }
    77.9% {
      transform: translateX(70%);
      opacity: 1;
    }
    78% {
      transform: translateX(70%);
      opacity: 0;
    }
    79.9% {
      transform: translateX(80%);
      opacity: 0;
    }
    80% {
      transform: translateX(80%);
      opacity: 1;
    }
    87.9% {
      transform: translateX(80%);
      opacity: 1;
    }
    88% {
      transform: translateX(80%);
      opacity: 0;
    }
    89.9% {
      transform: translateX(90%);
      opacity: 0;
    }
    90% {
      transform: translateX(90%);
      opacity: 1;
    }
    95.9% {
      transform: translateX(90%);
      opacity: 1;
    }
    96% {
      transform: translateX(90%);
      opacity: 0;
    }
    97% {
      transform: translateX(100%);
      opacity: 0;
    }
    97.1% {
      transform: translateX(100%);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 1;
    }
  }
`

export const PlanckCatLoader = ({duration, width}: PlanckCatWrapProps) => {
  return (
    <LoaderContainer>
      <PlanckCatWrap duration={duration} width={width}>
        <Image src={PlanckCatWhite} height={width} width={width} />
      </PlanckCatWrap>
    </LoaderContainer>
  )
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const StyledSVG = styled.svg<{size: string; stroke?: string}>`
  animation: 2s ${rotate} linear infinite;
  height: ${({size}) => size};
  width: ${({size}) => size};
  path {
    stroke: ${({stroke, theme}) => stroke ?? theme.dark.white};
  }
`

/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */
export default function Loader({size = '16px', stroke, ...rest}: {size?: string; stroke?: string; [k: string]: any}) {
  return (
    <StyledSVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size={size} stroke={stroke} {...rest}>
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSVG>
  )
}
