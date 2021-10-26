import { useEffect, useState } from "react";
import { useWeb3 } from 'rarity-react';

export default function useWalletConnected(){
  const	{ initialized, active } = useWeb3();
  const [ connected, setConnected ] = useState(initialized && active);
  useEffect(() => {
    setConnected(initialized && active);
  }, [initialized, active])
  return connected;
}