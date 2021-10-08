import { Contract } from 'ethcall';
import { RarityExpansion } from "../RarityExpansion";

export interface Abilities {
  initialized: boolean;
  remainingPoints: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export default {
  id: 'abilities',
  getSummonerCalls: (contract: Contract, summonerId: string) => {
    return[
      contract.character_created(summonerId),
      contract.ability_scores(summonerId)
    ];
  },
  getSummonerExpansion: (callResults: any[]) => {
    const [initialized, scores] = callResults;
    return {
      initialized,
      remainingPoints: initialized ? -1 : 32,
      strength: initialized ? scores['strength'] : 8,
      dexterity: initialized ? scores['dexterity'] : 8,
      constitution: initialized ? scores['constitution'] : 8,
      intelligence: initialized ? scores['intelligence'] : 8,
      wisdom: initialized ? scores['wisdom'] : 8,
      charisma: initialized ? scores['charisma'] : 8,
    } as Abilities;
  }
} as RarityExpansion;