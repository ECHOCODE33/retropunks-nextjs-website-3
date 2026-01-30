// src/app/my-punks/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { sepolia } from "wagmi/chains";
import PunkCard from "@/components/PunkCard";
import { RETROPUNKS_CONTRACT_ADDRESS, RETROPUNKS_ABI } from "@/lib/retroPunksABI";

interface NFTMetadata {
	name?: string;
	description?: string;
	image?: string;
	attributes?: Array<{ trait_type: string; value: string | number }>;
}

interface NFTData {
	imageDataUrl: string;
	metadata: NFTMetadata;
	backgroundIndex: number;
}

export default function MyPunksPage() {
	const { address, isConnected } = useAccount();
	const [tokenIds, setTokenIds] = useState<bigint[]>([]);
	const [nftData, setNftData] = useState<Map<string, NFTData>>(new Map());
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch token IDs owned by the connected address
	const { data: tokensData, isError: tokensError } = useReadContracts({
		contracts: [
			{
				address: RETROPUNKS_CONTRACT_ADDRESS,
				abi: RETROPUNKS_ABI,
				functionName: "tokensOfOwner",
				args: address ? [address] : undefined,
				chainId: sepolia.id,
			},
		],
		query: {
			enabled: !!address && isConnected,
		},
	});

	// Extract token IDs from contract response
	useEffect(() => {
		if (tokensData && tokensData[0]?.result) {
			const tokens = tokensData[0].result as bigint[];
			setTokenIds(tokens);
			setLoading(false);
		} else if (tokensError) {
			setError("Failed to fetch your NFTs. Please try again.");
			setLoading(false);
		}
	}, [tokensData, tokensError]);

	// Fetch metadata for all tokens
	useEffect(() => {
		if (tokenIds.length === 0) return;

		const fetchMetadata = async () => {
			setLoading(true);
			setError(null);

			try {
				if (!process.env.NEXT_PUBLIC_RPC_ETHEREUM_SEPOLIA) {
					throw new Error("RPC URL not configured");
				}

				// Create parallel fetch promises for all tokens
				const metadataPromises = tokenIds.map(async (tokenId) => {
					try {
						// Fetch tokenURI from contract
						const response = await fetch(process.env.NEXT_PUBLIC_RPC_ETHEREUM_SEPOLIA!, {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								jsonrpc: "2.0",
								method: "eth_call",
								params: [
									{
										to: RETROPUNKS_CONTRACT_ADDRESS,
										data: `0xc87b56dd${tokenId.toString(16).padStart(64, "0")}`, // tokenURI function selector
									},
									"latest",
								],
								id: 1,
							}),
						});

						const result = await response.json();
						let uri = "";

						if (result.result) {
							// Decode hex response
							const hex = result.result.slice(2);
							const bytes = [];
							for (let i = 0; i < hex.length; i += 2) {
								bytes.push(parseInt(hex.substr(i, 2), 16));
							}
							uri = new TextDecoder().decode(new Uint8Array(bytes));
							// Remove leading length prefix
							uri = uri.replace(/^.{64}/, "").replace(/\0/g, "");
						}

						let metadata: NFTMetadata = {};
						let imageDataUrl = "";

						// Parse metadata based on URI type
						if (uri.startsWith("data:application/json;base64,")) {
							// Base64-encoded JSON
							const base64Data = uri.split(",")[1];
							const jsonString = atob(base64Data);
							metadata = JSON.parse(jsonString);
							imageDataUrl = metadata.image || "";
						} else if (uri.startsWith("http")) {
							// HTTP URL
							const metadataResponse = await fetch(uri);
							metadata = await metadataResponse.json();
							imageDataUrl = metadata.image || "";
						} else if (uri.startsWith("data:")) {
							// Direct data URI
							imageDataUrl = uri;
						}

						return {
							tokenId: tokenId.toString(),
							data: {
								imageDataUrl,
								metadata,
								backgroundIndex: 0, // Default to first background
							},
						};
					} catch (err) {
						console.error(`Failed to fetch metadata for token ${tokenId}:`, err);
						return {
							tokenId: tokenId.toString(),
							data: {
								imageDataUrl: "",
								metadata: {},
								backgroundIndex: 0,
							},
						};
					}
				});

				// Wait for all metadata to be fetched
				const results = await Promise.all(metadataPromises);

				// Update state with fetched data
				const newNftData = new Map<string, NFTData>();
				results.forEach(({ tokenId, data }) => {
					newNftData.set(tokenId, data);
				});
				setNftData(newNftData);
			} catch (err) {
				console.error("Error fetching metadata:", err);
				setError("Failed to load NFT metadata. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchMetadata();
	}, [tokenIds]);

	// Handle background change callback
	const handleBackgroundChange = (tokenId: bigint, newIndex: number) => {
		const key = tokenId.toString();
		const existing = nftData.get(key);
		if (existing) {
			const updated = new Map(nftData);
			updated.set(key, { ...existing, backgroundIndex: newIndex });
			setNftData(updated);
		}
	};

	// Wallet not connected
	if (!isConnected) {
		return (
			<div className="w-full max-w-screen-xl mx-auto px-4 py-8">
				<div className="flex flex-col items-center justify-center min-h-[400px]">
					<h1 className="text-3xl font-bold mb-4">My RetroPunks</h1>
					<p className="text-lg text-gray-400 mb-8">Please connect your wallet to view your NFTs</p>
					<div className="text-sm text-gray-500">Use the connect button in the header to get started</div>
				</div>
			</div>
		);
	}

	// Loading state
	if (loading && tokenIds.length === 0) {
		return (
			<div className="w-full max-w-screen-xl mx-auto px-4 py-8">
				<div className="flex flex-col items-center justify-center min-h-[400px]">
					<h1 className="text-3xl font-bold mb-4">My RetroPunks</h1>
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 border-4 border-[#ff8c42] border-t-transparent rounded-full animate-spin"></div>
						<p className="text-lg text-gray-400">Loading your NFTs...</p>
					</div>
				</div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="w-full max-w-screen-xl mx-auto px-4 py-8">
				<div className="flex flex-col items-center justify-center min-h-[400px]">
					<h1 className="text-3xl font-bold mb-4">My RetroPunks</h1>
					<div className="bg-red-900/20 border border-red-500 rounded p-4 mb-4">
						<p className="text-red-400">{error}</p>
					</div>
					<button onClick={() => window.location.reload()} className="px-4 py-2 bg-[#ff8c42] hover:bg-[#ff9d5c] text-white font-bold transition-colors">
						Try Again
					</button>
				</div>
			</div>
		);
	}

	// No NFTs found
	if (tokenIds.length === 0) {
		return (
			<div className="w-full max-w-screen-xl mx-auto px-4 py-8">
				<div className="flex flex-col items-center justify-center min-h-[400px]">
					<h1 className="text-3xl font-bold mb-4">My RetroPunks</h1>
					<p className="text-lg text-gray-400 mb-4">You don&apos;t own any RetroPunks NFTs yet</p>
					<p className="text-sm text-gray-500">Visit the mint page to get your first RetroPunk!</p>
				</div>
			</div>
		);
	}

	// Display NFTs
	return (
		<div className="w-full max-w-screen-xl mx-auto px-4 py-8">
			<div className="flex flex-col mx-8">
				{/* Page Title */}
				<div className="font-bold mb-8">
					<h1 className="text-3xl">My RetroPunks</h1>
					<p className="text-sm text-gray-400 mt-2">
						You own {tokenIds.length} RetroPunk{tokenIds.length !== 1 ? "s" : ""}
					</p>
				</div>

				{/* NFT Grid */}
				<div className="flex flex-wrap justify-center gap-[20px] max-w-[2300px] mx-auto">
					{tokenIds.map((tokenId) => {
						const data = nftData.get(tokenId.toString());

						// Show loading skeleton if data not yet fetched
						if (!data || !data.imageDataUrl) {
							return (
								<div key={tokenId.toString()} className="flex flex-col items-center max-w-[200px]">
									<div className="flex flex-col items-center border-[3px] border-[#ff8c42] p-2 bg-[#2a2a2a] w-[200px] h-[280px]">
										<div className="w-[200px] h-[200px] bg-gray-700 animate-pulse"></div>
										<div className="text-base text-white mt-2">ID: {tokenId.toString().padStart(5, "0")}</div>
										<div className="mt-2 text-sm text-gray-500">Loading...</div>
									</div>
								</div>
							);
						}

						return <PunkCard key={tokenId.toString()} tokenId={tokenId} imageDataUrl={data.imageDataUrl} initialBackgroundIndex={data.backgroundIndex} onBackgroundChange={handleBackgroundChange} />;
					})}
				</div>

				{/* Loading indicator for metadata */}
				{loading && tokenIds.length > 0 && (
					<div className="flex justify-center mt-8">
						<div className="flex items-center space-x-2 text-gray-400">
							<div className="w-4 h-4 border-2 border-[#ff8c42] border-t-transparent rounded-full animate-spin"></div>
							<span>Loading metadata...</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
