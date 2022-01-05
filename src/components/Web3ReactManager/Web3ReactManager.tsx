import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect } from "../../hooks/web3";
import { NetworkContextName } from "../../constants/misc";

export default function Web3ReactManager({ children }: { children: JSX.Element}) {
  const { active } = useWeb3React();
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName);

  useEagerConnect();

  return (
    <>
      { children }
    </>
  )
};