import { Link } from "react-router-dom";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { connector } from "../../config/web3";
import { useCallback, useEffect, useState } from "react";
import useTruncatedAddress from "../../hooks/useTruncatedAddress";

const WalletData = () => {
  const [balance, setBalance] = useState(0);
  const { active, activate, deactivate, account, error, library } =
    useWeb3React();

  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  const getBalance = useCallback(async () => {
    const toSet = await library.eth.getBalance(account);
    setBalance((toSet / 1e18).toFixed(2));
  }, [library?.eth, account]);

  useEffect(() => {
    if (active) getBalance();
  }, [active, getBalance]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  const truncatedAddress = useTruncatedAddress(account);

  return (
    <div>
      {active ? (
        <div className="flex rounded-full bg-blue-200 px-2 py-1">
          <div>
            <Link to={`/punks?address=${account}`}>{truncatedAddress}</Link>
          </div>
          <div className='bg-gray-500 text-white px-2 ml-2'>
            ~{balance} Ξ
          </div>
          <button className='text-gray-700 pl-3 pr-1' onClick={disconnect}>
            X
          </button>
        </div>
      ) : (
        <div
          className="bg-blue-800 text-white rounded p-2 px-4 flex items-center justify-center"
          onClick={connect}
          disabled={isUnsupportedChain}
        >
          {isUnsupportedChain ? "Unsupported chain" : "+ Connect your wallet"}
        </div>
      )}
    </div>
  );
};

export default WalletData;
