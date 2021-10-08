import { BigNumber } from 'ethers';
import { SummonerClass, getClass } from './SummonerClass';

test('gets class from class id', () => {
  expect(getClass(BigNumber.from(1))).toBe(SummonerClass.Barbarian);
  expect(getClass(BigNumber.from(11))).toBe(SummonerClass.Wizard);
  expect(getClass(1)).toBe(SummonerClass.Barbarian);
  expect(getClass(11)).toBe(SummonerClass.Wizard);
  expect(getClass('1')).toBe(SummonerClass.Barbarian);
  expect(getClass('11')).toBe(SummonerClass.Wizard);
});