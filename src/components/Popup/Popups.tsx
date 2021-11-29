import { useActivePopups } from "../../state/application/hooks";
import Popup from "./Popup";
import { PopupType } from "../SnackbarAlert/SnackbarAlert";

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