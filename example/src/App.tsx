import React, { useEffect } from 'react'
import { useWeb3, RarityApp, useSummoners } from 'rarity-react'
import useWalletConnected from './useWalletConnected'
import Github from './GitHub'
import config from './config.json'

const Main = () => {
  const { address, active, connect, walletType } = useWeb3()
  const walletConnected = useWalletConnected()
  const { loading, summoners } = useSummoners()

  // const expansions = useExpansions(['core', 'gold'])
  // const { called, loading, data, fetchMore, error } = useSummoners(expansions)

  console.log('loading, summoners', loading, summoners)

  useEffect(() => {
    if(address && !active) {
      connect(walletType.METAMASK);
    }
  }, [address, active, connect, walletType]);
  
  async function clickConnect() {
    await connect(walletType.METAMASK)
  }

  return <div className="h-screen flex flex-col">
    <header className="flex flex-wrap justify-center items-center py-6 px-16">
      <h1 className="w-1/3 font-brand text-4xl font-bold tracking-tighter">rarity-react</h1>
      <div className="w-1/3 flex justify-center"></div>
      <div className="w-1/3 flex justify-end">
        <Github></Github>
      </div>
    </header>

    {loading && <div>
      LOADING !!
    </div>}

    {!loading && !walletConnected && <main className="flex-grow flex justify-center items-center px-12">
      <button onClick={clickConnect} className="bg-yellow-400 hover:bg-yellow-200 text-3xl py-4 px-12 rounded-full">Connect MetaMask</button>
    </main>}

    {!loading && walletConnected && <main className="flex-grow flex justify-center items-start px-12 py-6">
      <div className="flex flex-wrap">
        {summoners.map((summoner) => (
          <div key={summoner.tokenId.toString()} className="w-1/4 h-64 p-2">
            <div className="h-full p-2 flex items-center rounded-xl shadow">
              <img className="h-4/5 mx-8" src="https://rarity.game/_next/image?url=%2Fimg%2Fclasses%2Ffull%2Ffighter.png&w=256&q=75" alt="summoner" />
              <div className="h-full">
                summoner {summoner.tokenId.toString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>}

  </div>
}

const App = () => { 
  return <RarityApp config={config}>
    <Main></Main>
  </RarityApp>
}

export default App
