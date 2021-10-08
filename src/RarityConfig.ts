export interface RarityExpansionConfig {
  id: string,
  contract: string,
  abi: any
}

export default interface RarityConfig {
  ftmscanApi: string,
  ftmscanKey: string,
  coreExpansions: RarityExpansionConfig[]
}