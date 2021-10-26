# rarity-react

An easy way to build [Rarity](https://github.com/andrecronje/rarity) games with React.

[![NPM](https://img.shields.io/npm/v/rarity-react.svg)](https://www.npmjs.com/package/rarity-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> It started with a simple app... I wanted to see my summoners and the prizes they'd won while on a new adventure. 
> There's lots of great example code out there, eg [RarityExtended](https://github.com/Rarity-Extended/RarityExtended).
> But I didn't see much in the way of libraries or tools. And so it was...
>
> I started with these goals
> - Make it easy to start building a new Rarity app with React
> - Apps can configure which expansions they use
> - Apps can write their own expansions or integrate 3rd party expansions
> - Typescript-first
>
> Please give this 1st draft a try - 👹🙏

Features
- Wrap your app with `<RarityApp></RarityApp>`
- Get summoners with `useSummoners()`
- Builtin wallet support with `useWeb3()`
- Builtin support for "core" expansions (eg, attributes, skills, gold, etc)
- Support for custom\3rd party expansions via "sideExpansions"

What's Next
- [TypeChain](https://github.com/dethcrypto/TypeChain) integration
- Support for writes (only does contract reads currently)
- Builtin support for crafting and feats
- Support for names, land, and monsters as 3rd party expansions
- npx create-rarity-react-app
- Api documentation


## Install
```bash
yarn add rarity-react
```


## Usage
- Get an api key from [ftmscan](https://ftmscan.com)

- Add a configuration file for rarity-react to your `src` path. You can call it almost anything, but here assume the name of the file is `config.json`. 
Open `config.json` and spec out your ftmscan settings and expansions. Here's an example [config.example.json](https://github.com/murderteeth/rarity-react/blob/main/config.example.json)

- Add some wallet code like this
```tsx
import { useWeb3 } from 'rarity-react'
import config from './config.json'
export default function() {
  const { initialized, active, connect } = useWeb3()
  return <>
    {!(initialized && active) && <button onClick={connect}>connect wallet</button>}
  </>
}
```

- Get summoners like this
```tsx
import { RarityApp, useSummoners } from 'rarity-react'
import config from './config.json'
export default function() {
  const { summoners } = useSummoners()
  return <RarityApp config={config}>
    {summoners.map(s => {
      return <div>{s.expansions["core"].tokenId}</div>
    })}
  </RarityApp>
}
```

- Make a custom expansion like this
```tsx
import { Call, Contract } from 'ethcall';
import { RarityApp, RarityExpansionConfig, RarityExpansion, useSummoners } from 'rarity-react'
import config from './config.json'

export default function() {
  const customConfig = {
    id: 'custom-expansion-id',
    contract: '0x123... contract address ...456',
    abi: [... contract abi ...]
  } as RarityExpansionConfig

  const customExpansion = {
    id: 'custom-expansion-id',
    getSummonerCalls: (contract: Contract, summonerId: string) => {
      return[
        contract.customContractCall(summonerId)
      ] as Call[];
    },
    getSummonerExpansion: (callResults: any[]) => {
      const [ customProperty ] = callResults
      return { customProperty }
    }
  }

  const sideExpansions = [] as RarityExpansion[]
  sideExpansions.push(...configureExpansions([customConfig], [customExpansion]))

  const { summoners } = useSummoners()

  return <RarityApp config={config} sideExpansions={sideExpansions}>
    {summoners.map(s => {
      return <div>{s.expansions["custom-expansion-id"].customProperty}</div>
    })}
  </RarityApp>
}

```

## License

GPL-3.0-or-later © [murderteeth](https://github.com/murderteeth)
