import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { ACTIVE_CHAIN } from '@/lib/chain';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) throw new Error('Missing WalletConnect Project ID');

export const config = getDefaultConfig({
  appName: 'RetroPunks',
  projectId,
  chains: [ACTIVE_CHAIN],
  ssr: true,
});
