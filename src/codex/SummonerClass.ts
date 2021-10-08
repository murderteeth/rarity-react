import { BigNumber } from 'ethers';

export enum SummonerClass {
  Barbarian = 1,
  Bard = 2,
  Cleric = 3,
  Druid = 4,
  Fighter = 5,
  Monk = 6,
  Paladin = 7,
  Ranger = 8,
  Rogue = 9,
  Sorcerer = 10,
  Wizard = 11
}

export function getClass(id: BigNumber | number | string ): SummonerClass {
  if(id instanceof BigNumber) {
    return (id.toNumber()) as SummonerClass;
  } else if(typeof id === "number"){
    return id as SummonerClass;
  } else {
    return parseInt(id as string) as SummonerClass;
  }
}