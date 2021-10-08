import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from 'ethcall';
import { SummonerClass, getClass } from '../codex/SummonerClass';
import { RarityExpansion } from "../RarityExpansion";

export interface Core {
  owner: BigNumber;
  class: SummonerClass;
  xp: BigNumber;
  level: BigNumber;
}

export default {
  id: 'core',
  getSummonerCalls: (contract: Contract, summonerId: string) => {
    return[
      contract.ownerOf(summonerId),
      contract.summoner(summonerId)
    ];
  },
  getSummonerExpansion: (callResults: any[]) => {
    const [owner, adventurer] = callResults;
    return {
      owner: BigNumber.from(owner),
      class: getClass(adventurer['_class']),
      xp: BigNumber.from(adventurer['_xp']),
      level: BigNumber.from(adventurer['_level']),
    } as Core;
  }
} as RarityExpansion;