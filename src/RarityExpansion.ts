import { Contract, Call } from 'ethcall';
import { RarityExpansionConfig } from './RarityConfig';
import useRarityConfig from './RarityConfigContext';
import coreExpansions from './coreExpansions';
import useSideExpansions from './SideExpansionsContext';

export interface RarityExpansion {
  id: string,
  config: RarityExpansionConfig,
  getSummonerCalls: (contract: Contract, summonerId: string) => Call[]
  getSummonerExpansion: (callResults: any[]) => any
}

export function configureExpansions(configs: RarityExpansionConfig[], expansions: RarityExpansion[]) 
  : RarityExpansion[] {
  const result = [] as RarityExpansion[];
  configs.forEach(expansionConfig => {
    const expansion = expansions.find(e => expansionConfig.id === e.id);
    if(!expansion) {
      throw `No expansion found for configured expansion id: ${expansionConfig.id}`;
    } else {
      expansion.config = expansionConfig;
      result.push(expansion);
    }
  });
  return result;
}

export default function useRarityExpansions() {
  const { config } = useRarityConfig();
  const { expansions: sideExpansions } = useSideExpansions();
  const result = [] as RarityExpansion[];
  result.push(...configureExpansions(config.coreExpansions, coreExpansions));
  if(sideExpansions) result.push(...sideExpansions);
  return result;
}