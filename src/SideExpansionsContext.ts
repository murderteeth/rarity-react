import { createContext, useContext } from 'react';
import { RarityExpansion } from './RarityExpansion';

export const SideExpansionsContext = createContext<{
  expansions: RarityExpansion[] | null | undefined;
}>({ expansions: [] });

export const useSideExpansions = () => useContext(SideExpansionsContext);
export default useSideExpansions;