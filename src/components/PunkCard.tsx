// src/components/PunkCard.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { generateFullSVG, escapeHTML, getBackgroundDisplay } from "@/lib/svgGenerator";

export interface PunkCardProps {
	tokenId: bigint;
	imageDataUrl: string;
	initialBackgroundIndex?: number;
	onBackgroundChange?: (tokenId: bigint, newIndex: number) => void;
}

export default function PunkCard({ tokenId, imageDataUrl, initialBackgroundIndex = 0, onBackgroundChange }: PunkCardProps) {
	const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(initialBackgroundIndex);
	const [backgroundDisplay, setBackgroundDisplay] = useState(getBackgroundDisplay(initialBackgroundIndex));
	const iframeRef = useRef<HTMLIFrameElement>(null);

	// Generate the srcdoc content
	const srcdocContent = generateFullSVG(imageDataUrl, initialBackgroundIndex, tokenId.toString());
	const escapedSrcdoc = escapeHTML(srcdocContent);

	// Handle messages from iframe
	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.data.type === "current-background") {
				const iframeId = event.data.iframeId;
				if (iframeId === `nft-${tokenId}`) {
					setBackgroundDisplay(event.data.backgroundIndex);
					// Extract index number from "X/Y" format
					const newIndex = parseInt(event.data.backgroundIndex.split("/")[0]);
					setCurrentBackgroundIndex(newIndex);
					onBackgroundChange?.(tokenId, newIndex);
				}
			}
		};

		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	}, [tokenId, onBackgroundChange]);

	// Handle previous background
	const handlePrevBackground = () => {
		if (iframeRef.current?.contentWindow) {
			iframeRef.current.contentWindow.postMessage({ type: "background-prev" }, "*");
		}
	};

	// Handle next background
	const handleNextBackground = () => {
		if (iframeRef.current?.contentWindow) {
			iframeRef.current.contentWindow.postMessage({ type: "background-next" }, "*");
		}
	};

	// Handle view details
	const handleViewDetails = () => {
		const blob = new Blob([srcdocContent], { type: "text/html" });
		const url = URL.createObjectURL(blob);
		window.open(url, "_blank");
	};

	// Handle download
	const handleDownload = () => {
		const blob = new Blob([srcdocContent], { type: "text/html" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `retropunk-${tokenId}.html`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	// Handle fullscreen
	const handleFullscreen = () => {
		if (iframeRef.current) {
			if (iframeRef.current.requestFullscreen) {
				iframeRef.current.requestFullscreen();
			}
		}
	};

	// Format token ID with leading zeros (e.g., "01023")
	const formattedTokenId = tokenId.toString().padStart(5, "0");

	return (
		<div className="flex flex-col items-center max-w-[200px]">
			<div className="flex flex-col items-center border-[3px] border-[#ff8c42] p-2 overflow-hidden bg-[#2a2a2a]">
				{/* iframe with NFT SVG */}
				<iframe ref={iframeRef} id={`nft-${tokenId}`} srcDoc={escapedSrcdoc} width="200" height="200" sandbox="allow-scripts allow-same-origin" className="border-0" title={`RetroPunk #${tokenId}`} />

				{/* Token ID Display */}
				<div className="text-base text-white mt-2">ID: {formattedTokenId}</div>

				{/* Background Navigation Controls */}
				<div className="flex flex-row gap-2 mt-2 items-center">
					{/* Previous Button */}
					<button onClick={handlePrevBackground} className="flex items-center justify-center bg-[#ff8c42] hover:bg-[#ff9d5c] active:scale-95 transition-all p-1 cursor-pointer" title="Previous Background">
						<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg" className="text-[#2a2a2a]">
							<path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
						</svg>
					</button>

					{/* Background Display */}
					<div className="text-sm text-white min-w-[50px] text-center">{backgroundDisplay}</div>

					{/* Next Button */}
					<button onClick={handleNextBackground} className="flex items-center justify-center bg-[#ff8c42] hover:bg-[#ff9d5c] active:scale-95 transition-all p-1 cursor-pointer" title="Next Background">
						<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg" className="text-[#2a2a2a]">
							<path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
						</svg>
					</button>
				</div>

				{/* Action Buttons Row */}
				<div className="mt-3 flex flex-row gap-2 w-full justify-center">
					{/* View Details Button */}
					<button onClick={handleViewDetails} className="flex items-center justify-center bg-[#ff8c42] hover:bg-[#ff9d5c] active:scale-95 transition-all p-2 cursor-pointer" title="View Details">
						<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg" className="text-[#2a2a2a]">
							<path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
						</svg>
					</button>

					{/* Download Button */}
					<button onClick={handleDownload} className="flex items-center justify-center bg-[#ff8c42] hover:bg-[#ff9d5c] active:scale-95 transition-all p-2 cursor-pointer" title="Download">
						<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg" className="text-[#2a2a2a]">
							<path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
						</svg>
					</button>

					{/* Fullscreen Button */}
					<button onClick={handleFullscreen} className="flex items-center justify-center bg-[#ff8c42] hover:bg-[#ff9d5c] active:scale-95 transition-all p-2 cursor-pointer" title="Fullscreen">
						<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg" className="text-[#2a2a2a]">
							<path d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
