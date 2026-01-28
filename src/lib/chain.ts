import { mainnet, sepolia, base, baseSepolia } from "wagmi/chains";

const CHAINS = {
	mainnet,
	sepolia,
	base,
	baseSepolia,
};

type ChainKey = keyof typeof CHAINS;

const selectedChain = process.env.NEXT_PUBLIC_SELECTED_CHAIN as ChainKey;

export const ACTIVE_CHAIN = selectedChain in CHAINS ? CHAINS[selectedChain] : CHAINS.sepolia;
