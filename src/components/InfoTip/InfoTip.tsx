import ReactTooltip from "react-tooltip";
import styled from 'styled-components/macro';
import { isMobile } from "react-device-detect";
import { Info } from "react-feather";

const IconWrapper = styled.a<{ margin?: string }>`
  display: inline-flex !important;
  margin: ${({margin}) => ( margin ? margin : 'auto 4px')};
  vertical-align: middle;
`;;

export const InfoTip = ({
  children,
  margin,
  color,
  tipFor,
}:{
  children: React.ReactNode
  tipFor: string
  margin?: string
  color?: string
}) => {
  const mobileDataTip = tipFor + 'mobile';
  const desktopDataTip = tipFor + 'desktop';

  return (
    <>
      { isMobile ? (
        <>
          <IconWrapper 
              data-for={mobileDataTip}
              data-tip={mobileDataTip}
              data-event="click focus"
              >
              <Info height={12} width={12}/>
          </IconWrapper>

          <ReactTooltip 
              place="top" 
              type="dark" 
              effect="solid"
              textColor={color}
              id={mobileDataTip}
              globalEventOff="click"
              >
              { children }
          </ReactTooltip>
        </>
      ):(
        <>
          <IconWrapper 
              data-for={desktopDataTip}
              data-tip={desktopDataTip}
              >
              <Info height={12} width={12}/>
          </IconWrapper>

          <ReactTooltip 
              place="bottom" 
              type="dark" 
              effect="solid"
              textColor={color}
              id={desktopDataTip}
              >
                { children }
          </ReactTooltip>
        </>
      )}
    </>
  )
};