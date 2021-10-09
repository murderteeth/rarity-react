/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@MajorTom_eth
**	@Date:					Sunday September 5th 2021
**	@Filename:				useWeb3.js
******************************************************************************/

import	React, {useState, useEffect, useContext, useCallback}	from	'react';
import	{ethers}																from	'ethers';
import	QRCodeModal																from	'@walletconnect/qrcode-modal';
import	{useWeb3React}															from	'@web3-react-fork/core';
import	{InjectedConnector}														from	'@web3-react-fork/injected-connector';
import	{ConnectorEvent}														from	'@web3-react-fork/types';
import	{WalletConnectConnector}												from	'@web3-react-fork/walletconnect-connector';
import	useLocalStorage															from	'../hook/useLocalStorage';
import	useClientEffect															from	'../hook/useClientEffect';
import	{ toAddress }																from	'../utils';
import	useSWR				 													from	'swr';
import	Web3Context															from	'./Web3Context';
import { Web3 } from './Web3';

let fakeFetcherNonce = 0;
const fakeFetcher = () => fakeFetcherNonce++;

const walletType = {NONE: -1, METAMASK: 0, WALLET_CONNECT: 1};

function getProvider() {
	return new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools');
}

export const Web3ContextApp = ({ children } : { children: any }) => {
	const	isClient = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	const	web3 = useWeb3React();
	const	[initialized, set_initialized] = useState(false);
	const	[provider, set_provider] = useState<ethers.providers.JsonRpcProvider | undefined>(undefined);
	const	[address, set_address] = useLocalStorage('address', '');
	const	[chainID, set_chainID] = useLocalStorage('chainID', -1);
	const	[, set_lastWallet] = useLocalStorage('lastWallet', walletType.NONE);
	const	[, set_nonce] = useState(0);
	const	[chainTime, set_chainTime] = useState(new Date());
	const	[isActivated, set_isActivated] = useState(false);

	const	{activate, active, library, connector, account, chainId, deactivate} = web3;
	const	{data: chainTimeNonce} = useSWR('chainTime', fakeFetcher, {refreshInterval: 10 * 1000});

	const onUpdate = useCallback(async (update) => {
		if (update.provider) {
			set_provider(library);
		}
		if (update.chainId) {
			if (update.chainId.startsWith('0x')) {
				set_chainID(parseInt(update.chainId, 16));
			} else {
				set_chainID(Number(update.chainId));
			}
		}
		if (update.account) {
			set_address(toAddress(update.account));
		}
		set_nonce(n => n + 1);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [library]);

	const onDesactivate = useCallback(() => {
		set_chainID(-1);
		set_provider(undefined);
		set_lastWallet(walletType.NONE);
		set_address('');
		if (connector !== undefined) {
			connector
				.off(ConnectorEvent.Update, onUpdate)
				.off(ConnectorEvent.Deactivate, onDesactivate);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [connector]);

	const onActivate = useCallback(async () => {
		set_provider(library);
		set_address(toAddress(account));
		library.getNetwork().then((e: any) => set_chainID(e.chainId));
		library.getNetwork().then((e: any) => set_chainTime(e.timestamp));

		connector
			?.on(ConnectorEvent.Update, onUpdate)
			.on(ConnectorEvent.Deactivate, onDesactivate);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account, chainId, connector, library, onDesactivate, onUpdate]);

	const switchChain = useCallback(() => {
		if (Number(chainID) === 250) {
			return;
		}
		if (!provider || !active) {
			console.error('Not initialized');
			return;
		}
		provider.send('wallet_addEthereumChain', [{
			'chainId': '0xFA',
			'blockExplorerUrls': ['https://ftmscan.com'],
			'chainName': 'Fantom Opera',
			'rpcUrls': ['https://rpc.ftm.tools'],
			'nativeCurrency': {
				'name': 'Fantom',
				'symbol': 'FTM',
				'decimals': 18
			}
		}, address]).catch((error: any) => console.error(error));
	}, [active, address, chainID, provider]);

	/**************************************************************************
	**	connect
	**	What should we do when the user choose to connect it's wallet ?
	**	Based on the providerType (AKA Metamask or WalletConnect), differents
	**	actions should be done.
	**	Then, depending on the providerType, a similar action, but different
	**	code is executed to set :
	**	- The provider for the web3 actions
	**	- The current address/account
	**	- The current chain
	**	Moreover, we are starting to listen to events (disconnect, changeAccount
	**	or changeChain).
	**************************************************************************/
	async function connect(_providerType: any, desactivate = true) {
		if (_providerType === walletType.METAMASK) {
			if (active && !desactivate) {
				deactivate();
			}
			await (window["ethereum"].send)('eth_accounts');

			const	injected = new InjectedConnector({});
			await activate(injected, undefined, true);
			set_lastWallet(walletType.METAMASK);
			set_isActivated(true);
		} else if (_providerType === walletType.WALLET_CONNECT) {
			if (active) {
				deactivate();
			}
			const walletconnect = new WalletConnectConnector({
				rpc: {1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', 250: 'https://rpc.ftm.tools'},
				chainId: 250,
				bridge: 'https://bridge.walletconnect.org',
				pollingInterval: 12000,
				qrcodeModal: QRCodeModal,
				qrcode: true,
			});
			try {
				await activate(walletconnect, undefined, true);
				set_lastWallet(walletType.WALLET_CONNECT);
				set_isActivated(true);
			} catch (error) {
				console.error(error);
				set_lastWallet(walletType.NONE);
			}
		}
	}

	useClientEffect(() => {
		if (active) {
			set_initialized(true);
			onActivate();
		}
	}, [isClient, active, onActivate]);

	useEffect(() => {
		setTimeout(() => set_initialized(true), 1000);
	}, []);

	useEffect(() => {
		if (provider) {
			provider.getBlock(provider.getBlockNumber()).then(e => set_chainTime(new Date(e.timestamp)));
		}
	}, [chainTimeNonce, provider]);

	const nextWeb3 = {
		address,
		connect,
		deactivate,
		onDesactivate,
		walletType,
		chainID,
		isActivated,
		active: active && (Number(chainID) === 250 || Number(chainID) === 1337),
		initialized,
		switchChain,
		chainTime,
		provider,
		getProvider,
		currentRPCProvider: provider
	} as Web3;

	return <Web3Context.Provider value={nextWeb3}>{children}</Web3Context.Provider>;

};

export const useWeb3 = () => useContext(Web3Context);
export default useWeb3;
