import { BigNumber } from 'ethers';

export enum SummonerSkill {
  appraise = 1,
  balance = 2,
  bluff = 3,
  climb = 4,
  concentration = 5,
  craft = 6,
  decipher_script = 7,
  diplomacy = 8,
  disable_device = 9,
  disguise = 10,
  escape_artist = 11,
  forgery = 12,
  gather_information = 13,
  handle_animal = 14,
  heal = 15,
  hide = 16,
  intimidate = 17,
  jump = 18,
  knowledge = 19,
  listen = 20,
  move_silently = 21,
  open_lock = 22,
  perform = 23,
  profession = 24,
  ride = 25,
  search = 26,
  sense_motive = 27,
  sleight_of_hand = 28,
  speak_language = 29,
  spellcraft = 30,
  spot = 31,
  survival = 32,
  swim = 33,
  tumble = 34,
  use_magic_device = 35,
  use_rope = 36
}

export function getSkill(id: BigNumber | number | string ): SummonerSkill {
  if(id instanceof BigNumber) {
    return (id.toNumber()) as SummonerSkill;
  } else if(typeof id === "number"){
    return id as SummonerSkill;
  } else {
    return parseInt(id as string) as SummonerSkill;
  }
}