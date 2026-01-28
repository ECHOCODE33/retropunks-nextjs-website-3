import React, { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { BACKGROUND_OPTIONS } from "@/lib/backgrounds";
import { parseTokenURI, generatePreviewSVG, downloadPunkAsPng } from "@/lib/utilities";
import { RETROPUNKS_CONTRACT } from "@/lib/contracts";

const RETROPUNKS_ABI = [
	{
		inputs: [
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
			{ internalType: "uint256", name: "backgroundId", type: "uint256" },
		],
		name: "setTokenBackground",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
];

interface PunkCardProps {
	tokenId: string;
	tokenUri: string;
}

const PunkCard: React.FC<PunkCardProps> = ({ tokenId, tokenUri }) => {
	const [parsedMetadata, setParsedMetadata] = useState<any>(null);
	const [baseSvg, setBaseSvg] = useState<string>("");
	const [previewSvg, setPreviewSvg] = useState<string>("");
	const [bgIndex, setBgIndex] = useState<number>(0);
	const [isHovered, setIsHovered] = useState(false);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	// Wagmi Write
	const { data: hash, mutate, isPending } = useWriteContract();
	const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

	useEffect(() => {
		if (tokenUri) {
			const { metadata, svgString } = parseTokenURI(tokenUri);
			setParsedMetadata(metadata);
			setBaseSvg(svgString);
			setPreviewSvg(svgString);

			// Attempt to find current background index from attributes if possible, 0therwise default to 0
		}
	}, [tokenUri]);

	useEffect(() => {
		if (baseSvg && BACKGROUND_OPTIONS[bgIndex]) {
			const newSvg = generatePreviewSVG(baseSvg, BACKGROUND_OPTIONS[bgIndex]);
			setPreviewSvg(newSvg);
		}
	}, [bgIndex, baseSvg]);

	const handleCycleBg = (direction: "next" | "prev") => {
		setBgIndex((prev) => {
			if (direction === "next") {
				return (prev + 1) % BACKGROUND_OPTIONS.length;
			} else {
				return prev === 0 ? BACKGROUND_OPTIONS.length - 1 : prev - 1;
			}
		});
	};

	const handleSaveBackground = () => {
		if (!parsedMetadata) return;

		// Check if the current preview is different from original (Optional logic)

		mutate({
			address: RETROPUNKS_CONTRACT,
			abi: RETROPUNKS_ABI,
			functionName: "setTokenBackground",
			args: [BigInt(tokenId), BigInt(BACKGROUND_OPTIONS[bgIndex].id)],
			// value: parseEther("0.01") // Uncomment if your contract requires a fee
		});
	};

	const handleDownload = (resolution: number, transparent: boolean) => {
		const filename = `RetroPunk #${tokenId} - ${transparent ? "Transparent" : "BG"}`;
		downloadPunkAsPng(previewSvg, resolution, filename, transparent);
	};

	return (
		<div className="relative group rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-all hover:border-zinc-500 shadow-lg" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			{/* Visual Header / Punk Image */}
			<div className="relative aspect-square w-full bg-black/50">
				{previewSvg ? <img src={`data:image/svg+xml;base64,${btoa(previewSvg)}`} alt={`Punk ${tokenId}`} className="w-full h-full object-cover rendering-pixelated" style={{ imageRendering: "pixelated" }} /> : <div className="w-full h-full animate-pulse bg-zinc-800" />}

				{/* Hover Controls Overlay */}
				<div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
					{/* Background Cyclers */}
					<div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleCycleBg("prev");
							}}
							className="p-2 bg-white/10 hover:bg-white/30 rounded-full backdrop-blur-md text-white transition-all">
							←
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleCycleBg("next");
							}}
							className="p-2 bg-white/10 hover:bg-white/30 rounded-full backdrop-blur-md text-white transition-all">
							→
						</button>
					</div>

					<div className="flex flex-col gap-2 z-10">
						<button onClick={handleSaveBackground} disabled={isPending || isConfirming} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
							{isPending ? "Confirming..." : isConfirming ? "Saving..." : "Save Background"}
						</button>

						<div className="flex gap-2 justify-center">
							<button onClick={() => setIsDetailsOpen(true)} className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium rounded-full transition-colors">
								Details
							</button>

							{/* Simple Download Dropdown Trigger */}
							<div className="relative group/dl">
								<button className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium rounded-full transition-colors">Download</button>
								<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-zinc-800 border border-zinc-600 rounded-lg shadow-xl overflow-hidden hidden group-hover/dl:block">
									<div className="p-1">
										<button onClick={() => handleDownload(1000, false)} className="block w-full text-left px-3 py-1 hover:bg-zinc-700 text-xs text-white">
											1000px (JPG/PNG)
										</button>
										<button onClick={() => handleDownload(4096, false)} className="block w-full text-left px-3 py-1 hover:bg-zinc-700 text-xs text-white">
											4K Ultra HD
										</button>
										<button onClick={() => handleDownload(2000, true)} className="block w-full text-left px-3 py-1 hover:bg-zinc-700 text-xs text-yellow-400">
											Transparent BG
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Footer info */}
			<div className="p-4 bg-zinc-900 border-t border-zinc-800">
				<div className="flex justify-between items-center">
					<h3 className="text-white font-bold text-lg">Punk #{tokenId}</h3>
					<span className="text-xs text-zinc-400">{BACKGROUND_OPTIONS[bgIndex]?.name || "Unknown BG"}</span>
				</div>
			</div>

			{/* Details Modal (Simplified) */}
			{isDetailsOpen && parsedMetadata && (
				<div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setIsDetailsOpen(false)}>
					<div className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl max-w-md w-full m-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl font-bold text-white">#{tokenId} Traits</h2>
							<button onClick={() => setIsDetailsOpen(false)} className="text-zinc-500 hover:text-white">
								✕
							</button>
						</div>
						<div className="grid grid-cols-2 gap-3">
							{parsedMetadata.attributes.map((attr: any, i: number) => (
								<div key={i} className="bg-zinc-800 p-3 rounded-lg">
									<p className="text-xs text-zinc-500 uppercase tracking-wider">{attr.trait_type}</p>
									<p className="text-white font-medium">{attr.value}</p>
								</div>
							))}
						</div>
						<div className="mt-6 pt-4 border-t border-zinc-800">
							<p className="text-sm text-zinc-400">{parsedMetadata.description}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PunkCard;
