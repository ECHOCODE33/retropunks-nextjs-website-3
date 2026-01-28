types/nft.ts
```typescript
export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: NFTAttribute[];
}

export interface TokenData {
  tokenId: bigint;
  metadata: NFTMetadata | null;
  tokenIdSeed?: number;
  backgroundIndex?: number;
  customName?: string;
  bio?: string;
}

export interface ContractMetadata {
  tokenIdSeed: number;
  backgroundIndex: number;
  name: string;
  bio: string;
}

export const BACKGROUND_NAMES = [
  'Standard',
  'Solid',
  'Gradient Blue',
  'Gradient Orange',
  'Gradient Purple',
  'Gradient Pink',
  'Gradient Green',
  'Gradient Yellow',
  'Dark',
  'Light',
  'Sky',
  'Sunset',
  'Ocean',
  'Forest',
  'Fire',
  'Ice',
  'Neon',
  'Pastel',
  'Vintage',
];
```

app/layout.tsx
```tsx
import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "@/lib/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { pressFont, googleFont, robotoFont, spaceFont, lexendFont } from "@/lib/fonts";

export const metadata: Metadata = {
	title: "Project Red Moon",
	description: "An exclusive collection of 10,000 retro PFP NFTs on the Ethereum chain. Fully on-chain artwork.",
	keywords: "NFT, RetroPunks, Ethereum, PFP, On-Chain, Crypto, Web3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${pressFont.variable} ${googleFont.variable} ${robotoFont.variable} ${spaceFont.variable} ${lexendFont.variable} antialiased`}>
			<body>
				<Providers>
					<div className="min-h-screen flex flex-col">
						<Header />
						<main className="grow">{children}</main>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}

```

app/page.tsx
```tsx
import About from "@/components/About";
import PunkWorld from "@/components/PunkWorld";
import Creator from "@/components/Creator";
import FAQ from "@/components/FAQ";

export default function Home() {
	return (
		<>
			<About />
			<PunkWorld />
			<Creator />
			<FAQ />
		</>
	);
}

```

app/globals.css
```css
@import "tailwindcss";

@theme {
	--font-press: var(--font-press);
	--font-roboto: var(--font-roboto);
	--font-google: var(--font-google);
	--font-space: var(--font-space);
	--font-lexend: var(--font-lexend);

	--color-retro-dark: #1b1b1b;
	--color-retro-orange: #ff8359;
	--color-error: #d91616;

	--animate-fade-in: fade-in 0.5s ease-out;

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
}

body {
	@apply font-mono text-white bg-retro-dark;
}

.section {
	@apply mb-48 px-10 mx-auto max-w-360;
}

.nav-highlight {
	@apply hover:bg-retro-orange hover:text-white hover:px-4 hover:py-1 hover:rounded hover:shadow-[0_0_15px_rgba(255,107,53,0.5)];
}

.nav-link {
	@apply font-google active:scale-[0.95] px-4 py-2 transition-all duration-100 rounded-md text-sm font-bold tracking-widest text-white uppercase hover:text-retro-orange;
}

.mobile-nav-link {
	@apply font-google text-sm font-bold tracking-widest text-white uppercase transition-colors hover:text-retro-orange;
}

.connect-btn {
	@apply min-w-50 font-roboto active:scale-[0.95] px-6 py-3 text-base font-bold tracking-widest text-white uppercase transition-all duration-100 bg-retro-orange hover:brightness-90;
}

.mint-btn {
	@apply font-lexend active:scale-[0.95] px-20 py-4.5 text-3xl font-bold tracking-tight text-white  uppercase transition-all duration-100 bg-retro-orange hover:brightness-90;
}

@utility pixelated {
	image-rendering: pixelated;
}

```

app/license/page.tsx
```tsx
export default function LicensePage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">License & Terms</h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">NFT License Agreement</h2>
            <p className="leading-relaxed">
              This NFT License Agreement (&quot;Agreement&quot;) governs the rights and obligations associated with the ownership and use of RetroPunks NFTs. By purchasing, owning, or otherwise acquiring a RetroPunks NFT, you agree to be bound by these terms.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">1. Ownership</h3>
            <p className="leading-relaxed mb-3">
              When you purchase a RetroPunks NFT, you own the underlying NFT completely. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The right to sell, trade, transfer, or otherwise dispose of the NFT</li>
              <li>The right to use the NFT as collateral for loans or other financial instruments</li>
              <li>Personal, non-commercial use of the associated artwork</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">2. Commercial Rights</h3>
            <p className="leading-relaxed mb-3">
              Subject to your continued ownership of the NFT, you are granted a worldwide, non-exclusive, royalty-free license to use, copy, and display the artwork for commercial purposes, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Creating and selling merchandise (t-shirts, mugs, posters, etc.)</li>
              <li>Using the artwork in commercial projects, products, or services</li>
              <li>Licensing the artwork to third parties</li>
              <li>Creating derivative works based on the artwork</li>
            </ul>
            <p className="leading-relaxed mt-3">
              <strong>Revenue Cap:</strong> For any single commercial use that generates over $100,000 USD in revenue, you must notify the creator at echomatrix.eth and negotiate a separate licensing agreement.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">3. Restrictions</h3>
            <p className="leading-relaxed mb-3">You may NOT:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the artwork in connection with images, videos, or other forms of media that depict hatred, intolerance, violence, cruelty, or anything that could reasonably be found to constitute hate speech</li>
              <li>Claim trademark, copyright, or other intellectual property rights in the artwork</li>
              <li>Attempt to trademark or copyright the artwork</li>
              <li>Use the artwork to advertise, market, or sell third-party products without disclosure of NFT ownership</li>
              <li>Falsely represent that you created the original artwork</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">4. Customization Features</h3>
            <p className="leading-relaxed">
              RetroPunks NFTs include on-chain customization features allowing owners to modify the background, name, and bio of their NFTs. These customizations:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Are stored permanently on the blockchain</li>
              <li>Are subject to character limits (32 characters for names, 160 for bios)</li>
              <li>Must not contain offensive, hateful, or illegal content</li>
              <li>May not be available for special 1-of-1 NFTs</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">5. Transfer of Rights</h3>
            <p className="leading-relaxed">
              When you sell, trade, donate, give away, transfer, or otherwise dispose of your NFT, all rights granted to you under this Agreement transfer to the new owner. You retain no rights to the artwork after the transfer.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">6. Creator Rights</h3>
            <p className="leading-relaxed">
              The creator (&quot;ECHO&quot;) retains all rights to the RetroPunks brand name, logo, and the underlying generative algorithm. The creator reserves the right to use the RetroPunks artwork for promotional purposes, including but not limited to marketing materials, social media, and exhibitions.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">7. Smart Contract and Blockchain</h3>
            <p className="leading-relaxed">
              RetroPunks NFTs are generated and stored on the Ethereum blockchain. The smart contract code is immutable and cannot be modified after deployment. All artwork is rendered on-chain as SVG, ensuring permanence and decentralization.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">8. Disclaimer of Warranties</h3>
            <p className="leading-relaxed">
              THE NFTS ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. THE CREATOR MAKES NO REPRESENTATIONS OR WARRANTIES REGARDING THE NFTS, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">9. Limitation of Liability</h3>
            <p className="leading-relaxed">
              IN NO EVENT SHALL THE CREATOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT OR THE NFTS, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">10. Governing Law</h3>
            <p className="leading-relaxed">
              This Agreement shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">11. Changes to Terms</h3>
            <p className="leading-relaxed">
              The creator reserves the right to modify these terms at any time. Material changes will be communicated via official channels. Your continued ownership of a RetroPunks NFT after such modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="border-t-2 border-retro-orange pt-8 mt-12">
            <p className="text-sm text-gray-400">
              <strong>Last Updated:</strong> January 2026
            </p>
            <p className="text-sm text-gray-400 mt-2">
              <strong>Contact:</strong> For questions regarding this license, please contact echomatrix.eth
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
```

app/my-punks/page.tsx
```tsx
"use client";

import {
	useAccount,
	useReadContract,
	useWriteContract,
	useWaitForTransactionReceipt,
} from "wagmi";
import { useState, useEffect } from "react";
import Image from "next/image";
import { RETROPUNKS_ABI, getContractAddress } from "@/lib/contracts";
import { TokenData, NFTMetadata, BACKGROUND_NAMES } from "@/types/nft";

export default function MyPunksPage() {
	const { address, isConnected, chain } = useAccount();
	const [tokens, setTokens] = useState<TokenData[]>([]);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// Customization form states
	const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);
	const [customizing, setCustomizing] = useState(false);
	const [newBackground, setNewBackground] = useState<number>(0);
	const [newName, setNewName] = useState("");
	const [newBio, setNewBio] = useState("");

	const contractAddress = chain
		? getContractAddress(chain.id)
		: getContractAddress(11155111);

	// Read balanceOf
	const { data: balance } = useReadContract({
		address: contractAddress,
		abi: RETROPUNKS_ABI,
		functionName: "balanceOf",
		args: address ? [address] : undefined,
		query: {
			enabled: !!address && isConnected,
		},
	});

	// Write functions
	const { writeContract: setBackground, data: bgHash } = useWriteContract();
	const { writeContract: setName, data: nameHash } = useWriteContract();
	const { writeContract: setBio, data: bioHash } = useWriteContract();

	// Transaction receipts
	const { isSuccess: bgSuccess } = useWaitForTransactionReceipt({
		hash: bgHash,
	});
	const { isSuccess: nameSuccess } = useWaitForTransactionReceipt({
		hash: nameHash,
	});
	const { isSuccess: bioSuccess } = useWaitForTransactionReceipt({
		hash: bioHash,
	});

	useEffect(() => {
		async function fetchTokens() {
			if (!address || balance === undefined || !isConnected) {
				setLoading(false);
				return;
			}

			setLoading(true);
			setErrorMessage(null);
			const tokenList: TokenData[] = [];

			try {
				// ──────────────────────────────────────────────────────────────
				// Fetch owned token IDs using Alchemy NFT API
				// ──────────────────────────────────────────────────────────────
				if (!process.env.NEXT_PUBLIC_API_KEY) {
					throw new Error("Alchemy API key is not configured");
				}

				const alchemyNetworkMap: Record<number, string> = {
					1: "eth-mainnet",
					11155111: "eth-sepolia",
					8453: "base-mainnet",
					84532: "base-sepolia",
				};

				const network =
					alchemyNetworkMap[chain?.id ?? 11155111] || "eth-sepolia";
				const alchemyUrl = `https://${network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_API_KEY}`;

				const alchemyRes = await fetch(
					`${alchemyUrl}/getNFTs?owner=${address}&contractAddresses[]=${contractAddress.toLowerCase()}`,
				);

				if (!alchemyRes.ok) {
					throw new Error(
						`Alchemy API responded with status ${alchemyRes.status}`,
					);
				}

				const alchemyData = await alchemyRes.json();

				if (
					!alchemyData.ownedNfts ||
					!Array.isArray(alchemyData.ownedNfts)
				) {
					throw new Error("Invalid response format from Alchemy");
				}

				// Extract token IDs (Alchemy returns hex strings)
				// Extract token IDs (Alchemy returns hex strings)
				const tokenIds = alchemyData.ownedNfts
  .filter(
    (nft: any) =>
      nft.contract.address.toLowerCase() === contractAddress.toLowerCase()
  )
  .map((nft: any) => {
    const hexId = nft.id.tokenId;           // e.g. "0x42" or "0x000…0069"
    console.log(`Found token ID (hex): ${hexId}`);

    // Convert hex string → decimal BigInt → number/string without 0x
    const decimalId = BigInt(hexId).toString();   // "66", "105", etc.

    return decimalId;   // now it's a clean decimal string
  });

				console.log("All fetched token IDs (as strings):", tokenIds);
				if (tokenIds.length === 0) {
					console.warn(
						"No tokens found for address:",
						address,
						"on contract:",
						contractAddress,
					);
				}

				// ──────────────────────────────────────────────────────────────
				// Fetch metadata and tokenURI for each owned token
				// ──────────────────────────────────────────────────────────────
				for (const tokenId of tokenIds) {
					// globalTokenMetadata
					const metaRes = await fetch("/api/read-contract", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							contractAddress,
							functionName: "globalTokenMetadata",
							args: [tokenId],
							chainId: chain?.id ?? 11155111,
						}),
					});

					if (!metaRes.ok) continue;

					const metaData = await metaRes.json();
					if (
						metaData.error ||
						!metaData.result ||
						!Array.isArray(metaData.result)
					) {
						continue;
					}

					const metadataResult = {
						tokenIdSeed: Number(BigInt(metaData.result[0])),
						backgroundIndex: Number(BigInt(metaData.result[1])),
						name: metaData.result[2] as string,
						bio: metaData.result[3] as string,
					};

					// tokenURI
					const uriRes = await fetch("/api/read-contract", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							contractAddress,
							functionName: "tokenURI",
							args: [tokenId],
							chainId: chain?.id ?? 11155111,
						}),
					});

					if (!uriRes.ok) continue;

					const uriData = await uriRes.json();
					const tokenURI = uriData.result as string | undefined;

					let metadata: NFTMetadata | null = null;
					if (
						tokenURI &&
						tokenURI.startsWith("data:application/json;base64,")
					) {
						try {
							const base64Data = tokenURI.replace(
								"data:application/json;base64,",
								"",
							);
							const jsonString = atob(base64Data);
							metadata = JSON.parse(jsonString);
						} catch (parseErr) {
							console.warn(
								`Failed to decode tokenURI for token ${tokenId.toString()}:`,
								parseErr,
							);
						}
					}

					tokenList.push({
						tokenId,
						metadata,
						tokenIdSeed: metadataResult.tokenIdSeed,
						backgroundIndex: metadataResult.backgroundIndex,
						customName: metadataResult.name,
						bio: metadataResult.bio,
					});
				}

				setTokens(tokenList);
			} catch (err: any) {
				console.error("Error loading RetroPunks:", err);
				setErrorMessage(
					err.message?.includes("Alchemy")
						? "Failed to fetch owned tokens via Alchemy API. Please check your API key configuration."
						: "An error occurred while retrieving your RetroPunks. Please try again later.",
				);
			} finally {
				setLoading(false);
			}
		}

		fetchTokens();
	}, [
		address,
		balance,
		contractAddress,
		isConnected,
		chain?.id,
		bgSuccess,
		nameSuccess,
		bioSuccess,
	]);

	// ──────────────────────────────────────────────────────────────
	// Customization handlers
	// ──────────────────────────────────────────────────────────────

	const handleCustomize = (token: TokenData) => {
		setSelectedToken(token);
		setNewBackground(token.backgroundIndex || 0);
		setNewName(token.customName || "");
		setNewBio(token.bio || "");
		setCustomizing(true);
	};

	const submitBackground = () => {
		if (!selectedToken) return;
		setBackground({
			address: contractAddress,
			abi: RETROPUNKS_ABI,
			functionName: "setTokenBackground",
			args: [selectedToken.tokenId, BigInt(newBackground)],
		});
	};

	const submitName = () => {
		if (!selectedToken) return;
		setName({
			address: contractAddress,
			abi: RETROPUNKS_ABI,
			functionName: "setTokenName",
			args: [selectedToken.tokenId, newName],
		});
	};

	const submitBio = () => {
		if (!selectedToken) return;
		setBio({
			address: contractAddress,
			abi: RETROPUNKS_ABI,
			functionName: "setTokenBio",
			args: [selectedToken.tokenId, newBio],
		});
	};

	// ──────────────────────────────────────────────────────────────
	// Render logic
	// ──────────────────────────────────────────────────────────────

	if (!isConnected) {
		return (
			<div className="min-h-screen flex items-center justify-center py-20 px-4">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">My RetroPunks</h1>
					<p className="text-gray-400">
						Please connect your wallet to view your RetroPunks.
					</p>
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center py-20 px-4">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-retro-orange mx-auto mb-4"></div>
					<p className="text-gray-400">Loading your RetroPunks...</p>
				</div>
			</div>
		);
	}

	if (errorMessage) {
		return (
			<div className="min-h-screen flex items-center justify-center py-20 px-4">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">My RetroPunks</h1>
					<p className="text-red-400 mb-6">{errorMessage}</p>
					<button
						className="btn-primary"
						onClick={() => {
							setErrorMessage(null);
							setLoading(true);
						}}
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	if (tokens.length === 0) {
		return (
			<div className="min-h-screen flex items-center justify-center py-20 px-4">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">My RetroPunks</h1>
					<p className="text-gray-400 mb-6">
						You don't own any RetroPunks.
					</p>
					<button
						className="btn-primary"
						onClick={() => (window.location.href = "/")}
					>
						Go to Home
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen py-20 px-4">
			<h1 className="text-4xl font-bold mb-8 text-center">
				My RetroPunks
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
				{tokens.map((token) => (
					<div
						key={token.tokenId.toString()}
						className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900"
					>
						{token.metadata?.image ? (
							<Image
								src={token.metadata.image}
								alt={`RetroPunk #${token.tokenId}`}
								width={400}
								height={400}
								className="w-full h-auto"
							/>
						) : (
							<div className="w-full h-64 bg-gray-800 flex items-center justify-center">
								<span className="text-gray-500">No image</span>
							</div>
						)}

						<div className="p-4">
							<h3 className="font-bold text-lg">
								{token.customName ||
									token.metadata?.name ||
									`#${token.tokenId.toString()}`}
							</h3>

							<p className="text-sm text-gray-400 mt-1">
								{token.bio ||
									token.metadata?.description ||
									"No bio set"}
							</p>

							<button
								onClick={() => handleCustomize(token)}
								className="mt-4 w-full bg-retro-orange hover:bg-orange-700 text-white font-medium py-2 px-4 rounded transition-colors"
							>
								Customize
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Customization modal (placeholder – expand as needed) */}
			{customizing && selectedToken && (
				<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
					<div className="bg-gray-900 p-8 rounded-lg max-w-lg w-full mx-4">
						<h2 className="text-2xl font-bold mb-6">
							Customize #{selectedToken.tokenId.toString()}
						</h2>

						{/* Background selector */}
						<div className="mb-4">
							<label className="block text-sm font-medium mb-2">
								Background
							</label>
							<select
								value={newBackground}
								onChange={(e) =>
									setNewBackground(Number(e.target.value))
								}
								className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
							>
								{BACKGROUND_NAMES.map((name, index) => (
									<option key={index} value={index}>
										{name}
									</option>
								))}
							</select>
						</div>

						{/* Name input */}
						<div className="mb-4">
							<label className="block text-sm font-medium mb-2">
								Name
							</label>
							<input
								type="text"
								value={newName}
								onChange={(e) => setNewName(e.target.value)}
								maxLength={32}
								className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
								placeholder="Enter custom name"
							/>
						</div>

						{/* Bio textarea */}
						<div className="mb-6">
							<label className="block text-sm font-medium mb-2">
								Bio
							</label>
							<textarea
								value={newBio}
								onChange={(e) => setNewBio(e.target.value)}
								maxLength={160}
								rows={4}
								className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
								placeholder="Tell us about this RetroPunk"
							/>
						</div>

						<div className="flex justify-end gap-4">
							<button
								onClick={() => setCustomizing(false)}
								className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
							>
								Cancel
							</button>
							<button
								onClick={async () => {
									try {
										if (
											newBackground !==
											selectedToken.backgroundIndex
										)
											await submitBackground();
										if (
											newName !== selectedToken.customName
										)
											await submitName();
										if (newBio !== selectedToken.bio)
											await submitBio();
										// Wait for all if needed, or show success toast
									} catch (err) {
										console.error(
											"Customization failed:",
											err,
										);
										// Optionally show error in modal
									} finally {
										setCustomizing(false);
									}
								}}
								className="px-4 py-2 bg-retro-orange hover:bg-orange-700 rounded"
							>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

```

app/api/read-contract/route.ts
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { mainnet, sepolia, base, baseSepolia } from 'viem/chains';
import { RETROPUNKS_ABI } from '@/lib/contracts';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { contractAddress, functionName, args, chainId } = body;

  if (!chainId) {
    return NextResponse.json({ error: 'chainId is required' }, { status: 400 });
  }

  const chainMap = {
    1: mainnet,
    11155111: sepolia,
    8453: base,
    84532: baseSepolia,
  } as const;

  const rpcUrlMap = {
    1: process.env.RPC_ETHEREUM_MAINNET || 'https://ethereum.publicnode.com',
    11155111: process.env.RPC_ETHEREUM_SEPOLIA || 'https://ethereum-sepolia.publicnode.com',
    8453: process.env.RPC_BASE_MAINNET || 'https://mainnet.base.org',
    84532: process.env.RPC_BASE_SEPOLIA || 'https://sepolia.base.org',
  } as const;

  const selectedChain = chainMap[chainId as keyof typeof chainMap];
  const rpcUrl = rpcUrlMap[chainId as keyof typeof rpcUrlMap];

  if (!selectedChain || !rpcUrl) {
    return NextResponse.json({ error: 'Unsupported chain' }, { status: 400 });
  }

  const publicClient = createPublicClient({
    chain: selectedChain,
    transport: http(rpcUrl),
  });

  try {
    let result = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: RETROPUNKS_ABI,
      functionName,
      args,
    });

    // Convert BigInts to strings for JSON serialization
    const serializeResult = (val: any): any => {
      if (typeof val === 'bigint') {
        return val.toString();
      } else if (Array.isArray(val)) {
        return val.map(serializeResult);
      } else if (typeof val === 'object' && val !== null) {
        return Object.fromEntries(Object.entries(val).map(([k, v]) => [k, serializeResult(v)]));
      }
      return val;
    };

    const serializedResult = serializeResult(result);

    return NextResponse.json({ result: serializedResult });
  } catch (error) {
    console.error('Contract read error:', error);
    return NextResponse.json({ error: 'Failed to read contract' }, { status: 500 });
  }
}
```

components/PunkWorld.tsx
```tsx
'use client';

import Image from 'next/image';

export default function PunkWorld() {
  return (
    <section className="py-20 px-4 bg-retro-dark">
      <div className="max-w-6xl mx-auto">
        {/* Section Title - Press Start 2P font */}
        <h2 
          className="text-5xl font-bold text-center mb-20 tracking-wider" 
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          PUNKWRLD
        </h2>

        {/* Cards Grid */}
        <div className="grid md-l:grid-cols-2 gap-16 max-w-4xl mx-auto">
          {/* Part I - RetroPunks */}
          <div className="bg-[#2a1410] border-2 border-retro-orange rounded-lg p-12 shadow-[0_0_25px_rgba(255,107,53,0.5)]">
            <h3 
              className="text-retro-orange font-bold mb-2 text-center tracking-widest uppercase" 
              style={{ fontSize: '14px' }}
            >
              PART I
            </h3>
            <h4 
              className="text-retro-orange font-bold mb-8 text-center tracking-wide" 
              style={{ fontSize: '12px' }}
            >
              RetroPunks
            </h4>
            
            <div className="flex justify-center mb-8">
              <div className="w-36 h-36 bg-[#c0c0c0] border-4 border-retro-orange">
                <Image
                  src="/punk.png"
                  alt="RetroPunk Example"
                  width={144}
                  height={144}
                  className="pixelated w-full h-full object-cover"
                />
              </div>
            </div>

            <ul className="space-y-2 pl-4">
              <li className="flex items-start" style={{ fontSize: '10px', color: '#d4a574' }}>
                <span className="mr-3">•</span>
                <span>10,000 NFTs</span>
              </li>
              <li className="flex items-start" style={{ fontSize: '10px', color: '#d4a574' }}>
                <span className="mr-3">•</span>
                <span>Retro-themed</span>
              </li>
              <li className="flex items-start" style={{ fontSize: '10px', color: '#d4a574' }}>
                <span className="mr-3">•</span>
                <span>Fully on-chain</span>
              </li>
              <li className="flex items-start" style={{ fontSize: '10px', color: '#d4a574' }}>
                <span className="mr-3">•</span>
                <span>Ethereum-based</span>
              </li>
              <li className="flex items-start" style={{ fontSize: '10px', color: '#d4a574' }}>
                <span className="mr-3">•</span>
                <span>Customizable</span>
              </li>
            </ul>
          </div>

          {/* Part II - CYBRPNKS */}
          <div className="bg-[#2a1410] border-2 border-retro-orange rounded-lg p-12 shadow-[0_0_25px_rgba(255,107,53,0.5)]">
            <h3 
              className="text-retro-orange font-bold mb-2 text-center tracking-widest uppercase" 
              style={{ fontSize: '14px' }}
            >
              PART II
            </h3>
            <h4 
              className="text-retro-orange font-bold mb-8 text-center tracking-wide" 
              style={{ fontSize: '12px' }}
            >
              CYBRPNKS
            </h4>
            
            <div className="flex justify-center mb-8">
              <div className="w-36 h-36 bg-[#00d4ff] border-4 border-[#0088aa]">
                <Image
                  src="/punk.png"
                  alt="CYBRPNK Example"
                  width={144}
                  height={144}
                  className="pixelated w-full h-full object-cover"
                />
              </div>
            </div>

            <ul className="space-y-2 pl-4">
              <li className="flex items-start" style={{ fontSize: '10px', color: '#d4a574' }}>
                <span className="mr-3">•</span>
                <span>20,000 NFTs</span>
              </li>
              <li className="flex items-start" style={{ fontSize: '10px', color: '#d4a574' }}>
                <span className="mr-3">•</span>
                <span>Dystopian-themed</span>
              </li>
              <li className="flex items-start" style={{ fontSize: '10px', color: '#d4a574' }}>
                <span className="mr-3">•</span>
                <span>Fully On-Chain</span>
              </li>
              <li className="flex items-start" style={{ fontSize: '10px', color: '#d4a574' }}>
                <span className="mr-3">•</span>
                <span>Ethereum-based</span>
              </li>
              <li className="flex items-start" style={{ fontSize: '10px', color: '#d4a574' }}>
                <span className="mr-3">•</span>
                <span>Customizable</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
```

components/Footer.tsx
```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-retro-dark border-t-2 border-retro-orange py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md-l:flex-row justify-between items-center space-y-6 md-l:space-y-0">
          {/* Left: Logo and Copyright */}
          <div className="flex flex-col items-center md-l:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <Image
                src="/punk.png"
                alt="RetroPunks Logo"
                width={30}
                height={30}
                className="pixelated"
              />
              <span className="text-lg font-bold">RETROPUNKS</span>
            </div>
            <p className="text-gray-400 text-sm">© 2025 RetroPunks</p>
          </div>

          {/* Center: Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/license"
              className="text-gray-300 hover:text-retro-orange transition-colors duration-200"
            >
              License & Terms
            </Link>
            <a
              href="https://opensea.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-retro-orange transition-colors duration-200"
            >
              OpenSea
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-retro-orange transition-colors duration-200"
            >
              X (Twitter)
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-retro-orange transition-colors duration-200"
            >
              Discord
            </a>
            <a
              href="https://etherscan.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-retro-orange transition-colors duration-200"
            >
              Etherscan
            </a>
          </div>

          {/* Right: Social Icons */}
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity duration-200"
            >
              <Image src="/x.svg" alt="Twitter" width={24} height={24} />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity duration-200"
            >
              <Image src="/discord.svg" alt="Discord" width={24} height={24} />
            </a>
            <a
              href="https://opensea.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity duration-200"
            >
              <Image src="/opensea.svg" alt="OpenSea" width={24} height={24} />
            </a>
            <a
              href="https://etherscan.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity duration-200"
            >
              <Image src="/etherscan.svg" alt="Etherscan" width={24} height={24} />
            </a>
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="mt-6 pt-6 border-t border-retro-gray text-center text-xs text-gray-500">
          <p>
            Built with Next.js, TypeScript, Wagmi, and RainbowKit. Fully on-chain artwork.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

components/Dropdown.tsx
```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const socials = [
	{ name: "X (Twitter)", icon: "/x.svg", url: "https://twitter.com" },
	{ name: "Discord", icon: "/discord.svg", url: "https://discord.com" },
	{ name: "OpenSea", icon: "/opensea.svg", url: "https://opensea.io" },
	{ name: "Etherscan", icon: "/etherscan.svg", url: "https://etherscan.io" },
];

interface SocialsDropdownProps {
	className?: string;
}

export default function SocialsDropdown({ className }: SocialsDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={className} // This now uses the style passed from Header
				aria-expanded={isOpen}
				aria-haspopup="true">
				SOCIALS
			</button>

			{isOpen && (
				/* The dropdown menu stays styled with its own background */
				<div className="absolute top-full left-0 mt-2 w-48 bg-retro-dark border border-retro-orange shadow-xl z-50">
					{socials.map((social) => (
						<a
							key={social.name}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center space-x-3 px-4 py-3 hover:bg-retro-orange/20 transition-colors duration-200"
							onClick={() => setIsOpen(false)}>
							<Image src={social.icon} alt="" width={20} height={20} className="shrink-0" />
							<span className="text-white text-[13px] uppercase font-bold tracking-wider">{social.name}</span>
						</a>
					))}
				</div>
			)}
		</div>
	);
}

```

components/Header.tsx
```tsx
"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import MobileNavbar from "./Mobile-Navbar";

export default function Header() {
	const scroll = (id: string): void => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<header className="w-full bg-retro-dark">
			<div className="flex items-center justify-between px-10 py-12 mx-auto max-w-360">
				<Link href="/" className="flex items-center shrink-0">
					<span className="font-press active:scale-[0.95] text-[22px] leading-none tracking-tight">
						RETRO<span className="text-retro-orange">PUNKS</span>
					</span>
				</Link>

				<nav className="items-center justify-center flex-1 hidden lg:flex ">
					<button onClick={() => scroll("about")} className="nav-link">
						ABOUT
					</button>

					<button onClick={() => scroll("creator")} className="nav-link">
						CREATOR
					</button>

					<button onClick={() => {}} className="nav-link">
						SOCIALS
					</button>

					<button onClick={() => scroll("faq")} className="nav-link">
						FAQs
					</button>

					<button className="nav-link">
						<Link href="/my-punks">MY PUNKS</Link>
					</button>
				</nav>

				<div className="hidden lg:block shrink-0">
					<ConnectButton.Custom>
						{({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
							const ready = mounted;
							const connected = ready && account && chain;

							return (
								<div>
									{(() => {
										if (!connected) {
											return (
												<button className="connect-btn" onClick={openConnectModal} type="button">
													Connect Wallet
												</button>
											);
										}
										if (chain.unsupported) {
											return (
												<button className="connect-btn bg-error!" onClick={openChainModal} type="button">
													Wrong network
												</button>
											);
										}

										return (
											<button className="connect-btn" onClick={openAccountModal} type="button">
												{account.displayName}
											</button>
										);
									})()}
								</div>
							);
						}}
					</ConnectButton.Custom>
				</div>

				<MobileNavbar />
			</div>
		</header>
	);
}

```

components/FAQ.tsx
```tsx
'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How many RetroPunks are there?',
    answer: 'There are 10,000 unique RetroPunks NFTs in the collection, each with distinct traits and characteristics stored fully on-chain.',
  },
  {
    question: 'How are the NFTs created?',
    answer: 'RetroPunks are algorithmically generated on-chain with a combination of traits including background, skin type, eyes, hair, headwear, and eyewear. The artwork is rendered as SVG directly from the smart contract.',
  },
  {
    question: 'What can I do with my NFTs?',
    answer: 'You can customize your RetroPunk by changing its background, name, and bio. You can also trade them on secondary marketplaces like OpenSea, use them as profile pictures, or hold them as collectibles.',
  },
  {
    question: 'Do I own the art when I mint an NFT?',
    answer: 'Yes! When you own a RetroPunk NFT, you have full commercial rights to that specific artwork. You can use it however you like, including for commercial purposes.',
  },
  {
    question: 'What inspired the creation of the RetroPunks?',
    answer: 'RetroPunks was inspired by the early days of crypto culture and punk aesthetics. The goal was to create a collection that celebrates individuality and the rebellious spirit of Web3.',
  },
  {
    question: 'Can I customize my NFTs?',
    answer: 'Yes! RetroPunks allows you to customize your NFT by changing the background, setting a custom name (up to 32 characters), and writing a bio (up to 160 characters). Note: The first 7 special 1-of-1 NFTs cannot be customized.',
  },
  {
    question: 'How does the OpenSea drop work?',
    answer: 'The collection can be minted directly from the smart contract or through OpenSea. After the initial mint, NFTs can be bought and sold on the secondary market.',
  },
  {
    question: 'Can I sell my RetroPunks?',
    answer: 'Absolutely! You can list your RetroPunks for sale on any NFT marketplace that supports ERC-721 tokens, such as OpenSea, LooksRare, or X2Y2.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 bg-retro-dark/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md-l:text-5xl font-bold text-center mb-12 text-shadow">
          FAQs
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                onClick={() => toggleFAQ(index)}
                className="faq-button"
              >
                <span className="text-left font-semibold">{item.question}</span>
                <span className="text-retro-orange text-2xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-300 animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

components/Creator.tsx
```tsx
'use client';

import Image from 'next/image';

export default function Creator() {
  return (
    <section id="creator" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md-l:text-5xl font-bold text-center mb-12 text-shadow">
          The Creator
        </h2>

        {/* Content Card */}
        <div className="border-4 border-retro-green rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-retro-green text-retro-dark py-4 px-6 text-center">
            <h3 className="text-xl font-bold">ECHO (echomatrix.eth)</h3>
          </div>

          {/* Content Grid */}
          <div className="grid md-l:grid-cols-3 gap-8 p-8 bg-retro-gray/50">
            {/* Left: Creator Image */}
            <div className="flex justify-center items-start">
              <div className="w-48 h-48 border-2 border-retro-green rounded overflow-hidden bg-cyan-400">
                <Image
                  src="/punk.png"
                  alt="ECHO Avatar"
                  width={192}
                  height={192}
                  className="pixelated w-full h-full object-cover mix-blend-multiply"
                />
              </div>
            </div>

            {/* Right: Bio Text */}
            <div className="md-l:col-span-2 text-gray-300 space-y-4 text-sm md-l:text-base leading-relaxed">
              <p>
                Hi, I&apos;m <span className="text-retro-green font-semibold">ECHO</span> (well, that is what I prefer to be known as), the creator of the{' '}
                <span className="text-retro-green font-semibold">PUNKWRLD</span> series featuring the RetroPunks and CYBRPNKS NFT collections.
              </p>
              <p>
                I am a programmer (not a great one though), a tech-enthusiast, an artist (or I consider myself to be one, hehe), and a teenager living in the United States with the hopes to explore the world of new-generation technology such as AI, Web3, blockchain, crypto, and the metaverse.
              </p>
              <p>
                I&apos;ve been fascinated by technology, especially the blockchain, and I hope to contribute to the new phase of the World Wide Web (Web3). I have carefully worked on and built this project for a long time and hope it can make a lasting impact in the immortal world of Web3.
              </p>
              <p className="text-white font-semibold">
                I prefer to keep my identity hidden and to stay anonymous. Besides, the art is more important than the artist.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          EST. 2026
        </div>
      </div>
    </section>
  );
}
```

components/Mobile-Navbar.tsx
```tsx
"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";

export default function MobileNavbar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setIsOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);

		// Cleanup listener on unmount
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const mobileScroll = (id?: string) => {
		setIsOpen(false);
		if (id) {
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	return (
		<div className="lg:hidden">
			<button onClick={toggleMenu} className="relative z-100 p-2 focus:outline-none">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="var(--color-retro-orange)"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}>
					{isOpen ? (
						<>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</>
					) : (
						<>
							<path d="M4 6h16" />
							<path d="M4 12h16" />
							<path d="M4 18h16" />
						</>
					)}
				</svg>
			</button>

			<div>
				<div className={`fixed inset-0 z-90 flex flex-col items-center justify-center bg-retro-dark/95 backdrop-blur-md transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
					<nav className="flex flex-col items-center gap-10">
						<button onClick={() => mobileScroll("about")} className="mobile-nav-link">
							ABOUT
						</button>

						<button onClick={() => mobileScroll("creator")} className="mobile-nav-link">
							CREATOR
						</button>

						<button onClick={() => {}} className="mobile-nav-link">
							SOCIALS
						</button>

						<button onClick={() => mobileScroll("faq")} className="mobile-nav-link">
							FAQs
						</button>

						<Link href="/my-punks" onClick={() => setIsOpen(false)} className="mobile-nav-link">
							MY PUNKS
						</Link>

						<div className="mt-4">
							<ConnectButton.Custom>
								{({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
									const ready = mounted;
									const connected = ready && account && chain;

									return (
										<div
											{...(!ready && {
												"aria-hidden": true,
												style: {
													opacity: 0,
													pointerEvents: "none",
													userSelect: "none",
												},
											})}>
											{(() => {
												if (!connected) {
													return (
														<button onClick={openConnectModal} type="button" className="connect-btn">
															Connect Wallet
														</button>
													);
												}
												if (chain.unsupported) {
													return (
														<button onClick={openChainModal} type="button" className="connect-btn bg-error!">
															Wrong Network
														</button>
													);
												}
												return (
													<button onClick={openAccountModal} type="button" className="connect-btn">
														{account.displayName}
													</button>
												);
											})()}
										</div>
									);
								}}
							</ConnectButton.Custom>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
}

```

components/About.tsx
```tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
	return (
		<section id="about" className="section mt-24">
			<div className="flex flex-col gap-10 text-center">
				<h1 className="font-press text-3xl lg:text-[3.5rem] uppercase font-bold tracking-wider">RetroPunks</h1>
				<p className="font-space text-base text-gray-300 lg:text-2xl">
					An <span className="font-normal text-retro-orange">exclusive</span> collection of 10,000 retro PFP NFTs on the Ethereum chain.
				</p>
			</div>

			<div className="grid grid-cols-[0.85fr_min-content] place-items-center place-content-center mt-20">
				<div className="font-space px-6 space-y-4 text-lg leading-relaxed text-gray-300">
					<p>
						You could <span className="text-retro-orange">swear</span> you've seen them before - on the street, in a bar, behind the counter at the store. Maybe on the last <span className="italic">train</span> home.
					</p>
					<p>
						Some look like you. Some look like the version of you that you haven't dared to become yet. <span className="text-retro-orange">Crooked</span> grin. Piercings. Faded ink.
					</p>
					<p>
						And there are whispers they're not all human. That under the cotton. <span className="text-retro-orange">Skeletons</span>. Zombies. Apes. Underneath the golden sun, he grows.
					</p>
					<p>
						They're not here to save the world. They're here to live in it. Just like you. On-Chain Artwork. Welcome to the <span className="text-retro-orange">Crypto Culture Club</span>.
					</p>
				</div>

				<div className="flex justify-center border-3 border-retro-orange">
					<div className="relative overflow-hidden border-8 border-black w-80 h-80">
						<Image src="/punk.png" alt="Featured RetroPunk" fill className="object-cover pixelated" />
					</div>
				</div>
			</div>

			<div className="mt-24 text-center">
				<Link href="https://opensea.io/" target="_blank" rel="noopener noreferrer">
					<button className="mint-btn">MINT</button>
				</Link>
			</div>
		</section>
	);
}

```

lib/fonts.ts
```typescript
import { Press_Start_2P, Roboto_Mono, Google_Sans_Code, Space_Mono, Lexend } from "next/font/google";

export const pressFont = Press_Start_2P({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-press",
});

export const googleFont = Google_Sans_Code({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
	variable: "--font-google",
});

export const robotoFont = Roboto_Mono({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	variable: "--font-roboto",
});

export const spaceFont = Space_Mono({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-space",
});

export const lexendFont = Lexend({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-lexend",
});

export const press = pressFont.className;
export const google = googleFont.className;
export const roboto = robotoFont.className;
export const space = spaceFont.className;
export const lexend = lexendFont.className;

/*
import { Press_Start_2P, Roboto_Mono, Google_Sans_Code, Space_Mono } from "next/font/google";

export const press = Press_Start_2P({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-press",
});

export const google = Google_Sans_Code({
	subsets: ["latin"],
	weight: "700",
	variable: "--font-google",
});

export const roboto = Roboto_Mono({
	subsets: ["latin"],
	weight: "700",
	variable: "--font-roboto",
});

export const space = Space_Mono({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-space",
});
 */

```

lib/wagmi.ts
```typescript
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { mainnet, sepolia, base, baseSepolia } from "wagmi/chains";

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
	throw new Error("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not defined");
}

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const config = getDefaultConfig({
	appName: "RetroPunks",
	projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
	chains: [mainnet, sepolia, base, baseSepolia],
	ssr: true,
	transports: {
		[mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${apiKey}`),
		[sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${apiKey}`),
		[base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${apiKey}`),
		[baseSepolia.id]: http(`https://base-sepolia.g.alchemy.com/v2/${apiKey}`),
	},

	// Optional: improve performance for frequent reads
	batch: { multicall: true },
});

```

lib/contracts.tsx
```tsx
import { Address } from "viem";

export const CONTRACT_ADDRESSES: Record<number, Address> = {
	1: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET as Address) || "0x0000000000000000000000000000000000000000",
	11155111: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA as Address) || "0xcbB15f83A48e98767dD0C1C9459EEA26469079c4",
	8453: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_BASE as Address) || "0x0000000000000000000000000000000000000000",
	84532: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_BASE_SEPOLIA as Address) || "0x0000000000000000000000000000000000000000",
};

export const RETROPUNKS_ABI = [
	{
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		name: "tokenURI",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "owner", type: "address" }],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
			{
				internalType: "uint256",
				name: "backgroundIndex",
				type: "uint256",
			},
		],
		name: "setTokenBackground",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
			{ internalType: "string", name: "name", type: "string" },
		],
		name: "setTokenName",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
			{ internalType: "string", name: "bio", type: "string" },
		],
		name: "setTokenBio",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		name: "globalTokenMetadata",
		outputs: [
			{ internalType: "uint16", name: "tokenIdSeed", type: "uint16" },
			{ internalType: "uint8", name: "backgroundIndex", type: "uint8" },
			{ internalType: "string", name: "name", type: "string" },
			{ internalType: "string", name: "bio", type: "string" },
		],
		stateMutability: "view",
		type: "function",
	},
] as const;

export function getContractAddress(chainId: number): Address {
	return CONTRACT_ADDRESSES[chainId] || CONTRACT_ADDRESSES[11155111];
}

```

lib/providers.tsx
```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { config } from "./wagmi";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const customTheme = darkTheme({
	accentColor: "#ff8359",
	accentColorForeground: "white",
	borderRadius: "none",
});

export function Providers({ children }: { children: ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider theme={customTheme}>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

```

