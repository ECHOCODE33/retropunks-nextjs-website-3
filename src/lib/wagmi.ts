import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { sepolia } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID_HERE';

// CRITICAL: Ensure RPC URL always has a value
const sepoliaRpcUrl = process.env.NEXT_PUBLIC_RPC_ETHEREUM_SEPOLIA || 'https://ethereum-sepolia-rpc.publicnode.com';

export const config = getDefaultConfig({
  appName: 'RetroPunks',
  projectId,
  chains: [sepolia],
  ssr: true,
  transports: {
    // ✅ FIXED: Always provides a valid RPC URL
    [sepolia.id]: http(sepoliaRpcUrl),
  },
  batch: { 
    multicall: true 
  },
});