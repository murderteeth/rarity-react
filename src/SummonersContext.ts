import { createContext, useContext } from 'react';
import Summoner from './Summoner';

export const SummonersContext = createContext<{
  summoners: Summoner[];
  loading: boolean;
}>({ summoners: [], loading: false });

export const useSummoners = () => useContext(SummonersContext);
export default useSummoners;