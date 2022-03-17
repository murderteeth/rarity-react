import React from 'react';
import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react-fork/core';
import { Web3ContextApp } from './RarityExtended/contexts/useWeb3';
import RarityConfig from './RarityConfig';
import { RarityConfigContext } from './RarityConfigContext';
import { SummonersContext } from './SummonersContext';
import useFetchSummoners from './FetchSummoners';
import { RarityExpansion } from './RarityExpansion';
import { SideExpansionsContext } from './SideExpansionsContext';

function Main({ children } : { children: any }) {
  const { summoners, loading } = useFetchSummoners();
  return <SummonersContext.Provider value={{ summoners, loading }}>
      {children}
    </SummonersContext.Provider>;
}

const getLibrary = (provider: any) => {
	return new ethers.providers.Web3Provider(provider, 'any');
};

export default function({ config, sideExpansions, children } : { config: RarityConfig, sideExpansions?: RarityExpansion[] | null, children: any }) {
  return <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ContextApp>
        <RarityConfigContext.Provider value={{ config }}>
          <SideExpansionsContext.Provider value={{ expansions: sideExpansions }}>
            <Main>
              {children}
            </Main>
          </SideExpansionsContext.Provider>
        </RarityConfigContext.Provider>
      </Web3ContextApp>
    </Web3ReactProvider>;
}