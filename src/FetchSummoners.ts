import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Provider, Contract, Call } from 'ethcall';
import { BigNumber } from '@ethersproject/bignumber';
import useWeb3 from './RarityExtended/contexts/useWeb3';
import Summoner from './Summoner';
import useRarityConfig from './RarityConfigContext';
import useRarityExpansions from './RarityExpansion';
import { fetcher, chunk } from './utils';

const useFetchSummoners = () => {
  const { config } = useRarityConfig();
  const expansions = useRarityExpansions();
	const [ summoners, setSummoners ] = useState<Summoner[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const	{ address, active, provider } = useWeb3();

  const getSummonersUri = 
  `${config.ftmscanApi}?module=account`
  + `&action=tokennfttx`
  + `&contractaddress=${config.coreExpansions.find(e => e.id === 'core')?.contract}`
  + `&address=${address}`
  + `&apikey=${config.ftmscanKey}`;

  const	{ data } = useSWR(active && address ? getSummonersUri : null, fetcher);

	useEffect(() => {
		if (data?.result && data?.status !== '0') {
      const summonerIds = data?.result.map((r: any) => r.tokenID) as string[];

      const contractCalls = [] as Call[];
      const contractCallStrides = [] as number[];
      summonerIds.forEach(summonerId => {
        const loadCallStrides = contractCallStrides.length ? false : true;
        expansions.forEach(expansion => {
          const contract = new Contract(expansion.config.contract, expansion.config.abi);
          const expansionCalls = expansion.getSummonerCalls(contract, summonerId);
          contractCalls.push(...expansionCalls);
          if(loadCallStrides) {
            contractCallStrides.push(expansionCalls.length);
          }
        });
      });

      (async() => {
        const	ethcallProvider = new Provider();
        await	ethcallProvider.init(provider);
        const	callResult = await ethcallProvider.all(contractCalls);
        const totalCallStride = contractCallStrides.reduce((acc, current) => acc + current);
        const	chunkedCallResult = chunk(callResult, totalCallStride);

        const freshies = [] as Summoner[];
        summonerIds.forEach((summonerId, summonerIndex) => {
          const chunk = chunkedCallResult[summonerIndex];
          const summonerExpansions = {} as any;
          let chunkStrideStart = 0;
          expansions.forEach((expansion, expansionIndex) => {
            const callResults = chunk.slice(chunkStrideStart, chunkStrideStart + contractCallStrides[expansionIndex]);
            summonerExpansions[expansion.id] = expansion.getSummonerExpansion(callResults);
            chunkStrideStart += contractCallStrides[expansionIndex];
          });
          freshies.push({
            tokenId: BigNumber.from(summonerId),
            expansions: summonerExpansions
          })
        });

        setSummoners(freshies);
        setLoading(false);
      })();

    }
	}, [data]);

  return { summoners, loading };
};

export default useFetchSummoners;