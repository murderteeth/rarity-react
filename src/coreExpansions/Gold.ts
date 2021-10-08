import { BigNumber } from '@ethersproject/bignumber';
import { Call, Contract } from 'ethcall';
import { RarityExpansion } from '../RarityExpansion';

export interface Gold {
  balance: BigNumber;
}

export default {
  id: "gold",
  getSummonerCalls: (contract: Contract, summonerId: string) => {
    return[
      contract.balanceOf(summonerId)
    ] as Call[];
  },
  getSummonerExpansion: (callResults: any[]) => {
    const [ balance ] = callResults;
    return {
      balance
    } as Gold;
  }
} as RarityExpansion;