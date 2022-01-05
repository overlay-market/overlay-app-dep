import { useActivePopups } from "../../state/application/hooks";
import { PopupType } from "../SnackbarAlert/SnackbarAlert";
import Popup from "./Popup";

const Popups = () => {
  const activePopups = useActivePopups();

  return (
    <>
      {activePopups.map((popup) => (
        <Popup 
          key={popup.key} 
          content={popup.content} 
          popKey={popup.key} 
          removeAfterMs={popup.removeAfterMs}
          severity={PopupType.SUCCESS}
        />
      ))}
    </>
  )
}

export default Popups;