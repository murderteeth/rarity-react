import { Call, Contract } from 'ethcall';
import { SummonerSkill } from '../codex/SummonerSkill';
import { RarityExpansion } from "../RarityExpansion";

export interface Skills {
  get: (skill: SummonerSkill) => number
}

export default {
  id: 'skills',
  getSummonerCalls: (contract: Contract, summonerId: string) => {
    return[
      contract.get_skills(summonerId)
    ] as Call[];
  },
  getSummonerExpansion: (callResults: any[]) => {
    const [ skills ] = callResults;
    return {
      get: (skill: SummonerSkill) => skills[skill - 1]
    } as Skills;
  }
} as RarityExpansion;