import { BigNumber } from '@ethersproject/bignumber';
import { Call, Contract } from 'ethcall';
import { RarityExpansion } from "../RarityExpansion";

export interface ForestTreasure {
  treasureId: BigNumber;
  itemName: string;
  magic: BigNumber;
  level: BigNumber;
}

export interface ForestResearch {
  treasure: ForestTreasure[]
}

export default {
  id: 'forest-research',
  getSummonerCalls: (contract: Contract, summonerId: string) => {
    return[
      contract.getTreasuresBySummoner(summonerId)
    ] as Call[];  },
  getSummonerExpansion: (callResults: any[]) => {
    const [ treasure ] = callResults;
    return {
      treasure: treasure as ForestTreasure[]
    } as ForestResearch;
  }
} as RarityExpansion;