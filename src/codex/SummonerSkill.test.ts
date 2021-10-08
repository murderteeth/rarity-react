import { BigNumber } from 'ethers';
import { SummonerSkill, getSkill } from './SummonerSkill';

test('gets class from class id', () => {
  expect(getSkill(BigNumber.from(1))).toBe(SummonerSkill.appraise);
  expect(getSkill(BigNumber.from(36))).toBe(SummonerSkill.use_rope);
  expect(getSkill(1)).toBe(SummonerSkill.appraise);
  expect(getSkill(36)).toBe(SummonerSkill.use_rope);
  expect(getSkill('1')).toBe(SummonerSkill.appraise);
  expect(getSkill('36')).toBe(SummonerSkill.use_rope);
});