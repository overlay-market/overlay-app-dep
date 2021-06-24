import { useActiveWeb3React } from "../../hooks/web3";
import { injected } from "../../connectors/connectors";

export const Wallet = () => {
  const { activate, active } = useActiveWeb3React();

  const onClick = () => {
    activate(injected);
  };

  return (
    <div className="App">
      {active ? (
        <div>Connected</div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
    </div>
  );
}