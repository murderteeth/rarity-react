import { createContext, useContext } from 'react';
import RarityConfig from './RarityConfig';

export const RarityConfigContext = createContext<{
  config: RarityConfig;
}>({ config: {
  ftmscanApi: "",
  ftmscanKey: "",
  coreExpansions: []
} });

export const useRarityConfig = () => useContext(RarityConfigContext);
export default useRarityConfig;