import { ethers } from "ethers";

export interface Web3 {
	address: string;
	connect: (_providerType: any, desactivate?: boolean) => void;
	deactivate: () => void;
	onDesactivate: () => void;
	walletType: any;
	chainID: number;
	isActivated: boolean;
	active: boolean;
	initialized: boolean;
	switchChain: () => void;
	chainTime: Date;
	provider: ethers.providers.BaseProvider;
	getProvider: () => ethers.providers.BaseProvider;
	currentRPCProvider: ethers.providers.JsonRpcProvider;
}