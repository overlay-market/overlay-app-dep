import styled from 'styled-components';
import { useActivePopups } from "../../state/application/hooks";
import { PopupType } from "../SnackbarAlert/SnackbarAlert";
import Popup from "./Popup";

const PopupsContainer = styled.div`
  position: fixed;
  max-width: 321px;
  z-index: 69420;
  width: 100%;
  bottom: 0;
  right: 0;
`;

const Popups = () => {
  const activePopups = useActivePopups();

  if (activePopups.length === 0) return <span />;
  
  return (
    <PopupsContainer>
      {activePopups.map((popup) => (
        <Popup 
          key={popup.key} 
          content={popup.content} 
          popKey={popup.key} 
          removeAfterMs={popup.removeAfterMs}
        />
      ))}
    </PopupsContainer>
  )
}

export default Popups;