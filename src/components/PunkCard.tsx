'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { generateFullSVG } from '@/lib/svgGenerator';
import { BACKGROUNDS } from '@/lib/backgroundData';

interface PunkCardProps {
  tokenId: bigint | number | string;
  imageDataUrl: string;
  initialBackgroundIndex?: number;
  onBackgroundChange?: (index: number) => void;
}

export default function PunkCard({
  tokenId,
  imageDataUrl,
  initialBackgroundIndex = 0,
  onBackgroundChange
}: PunkCardProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(initialBackgroundIndex);
  const [backgroundDisplay, setBackgroundDisplay] = useState('0/0');

  const handlePrevBackground = useCallback(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'background-prev' }, '*');
    }
  }, []);

  const handleNextBackground = useCallback(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'background-next' }, '*');
    }
  }, []);

  const handleViewDetails = useCallback(() => {
    // Open SVG in new window for viewing details
    const srcdocContent = generateFullSVG(imageDataUrl, currentBackgroundIndex, String(tokenId));
    const blob = new Blob([srcdocContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }, [imageDataUrl, currentBackgroundIndex, tokenId]);

  const handleDownload = useCallback(() => {
    // Download SVG
    const srcdocContent = generateFullSVG(imageDataUrl, currentBackgroundIndex, String(tokenId));
    const blob = new Blob([srcdocContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `retropunk-${tokenId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [imageDataUrl, currentBackgroundIndex, tokenId]);

  // Listen for messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'current-background' && event.data.iframeId === `nft-${tokenId}`) {
        const [current, total] = event.data.backgroundIndex.split('/');
        setBackgroundDisplay(event.data.backgroundIndex);
        const currentIndex = parseInt(current, 10);
        if (!isNaN(currentIndex)) {
          setCurrentBackgroundIndex(currentIndex);
          onBackgroundChange?.(currentIndex);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [tokenId, onBackgroundChange]);

  const srcdocContent = generateFullSVG(imageDataUrl, currentBackgroundIndex, String(tokenId));

  return (
    <div 
      className="inline-flex flex-col items-center gap-2 p-4 rounded-none" 
      style={{ 
        border: '3px solid #ff8c42', // retro-orange
        backgroundColor: '#2a2a2a'
      }}
    >
      {/* NFT Display */}
      <div className="relative" style={{ width: '200px', height: '200px' }}>
        <iframe
          ref={iframeRef}
          id={`nft-${tokenId}`}
          srcDoc={srcdocContent}
          width="200"
          height="200"
          sandbox="allow-scripts allow-same-origin"
          className="border-none"
          style={{ 
            imageRendering: 'pixelated'
          }}
        />
      </div>

      {/* Token ID */}
      <div className="text-base text-gray-300 font-mono">
        ID: {String(tokenId).padStart(5, '0')}
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-row gap-2 items-center justify-center w-full">
        {/* Previous Button */}
        <button
          onClick={handlePrevBackground}
          className="flex items-center justify-center p-2 cursor-pointer transition-all hover:scale-110 active:scale-95"
          style={{ 
            backgroundColor: '#ff8c42',
            border: 'none',
            borderRadius: '4px'
          }}
          aria-label="Previous background"
        >
          <svg 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 448 512" 
            height="1.5em" 
            width="1.5em" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: '#1a1a1a' }}
          >
            <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c-9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
          </svg>
        </button>

        {/* Background Index Display */}
        <div className="text-base text-gray-300 font-mono px-2">
          <span 
            className="text-sm px-1 py-0.5" 
            style={{ 
              backgroundColor: '#ff8c42', 
              color: '#1a1a1a' 
            }}
          >
            {backgroundDisplay}
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextBackground}
          className="flex items-center justify-center p-2 cursor-pointer transition-all hover:scale-110 active:scale-95"
          style={{ 
            backgroundColor: '#ff8c42',
            border: 'none',
            borderRadius: '4px'
          }}
          aria-label="Next background"
        >
          <svg 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 448 512" 
            height="1.5em" 
            width="1.5em" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: '#1a1a1a' }}
          >
            <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
          </svg>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row gap-2 items-center justify-center w-full pt-2">
        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="flex items-center justify-center p-2 cursor-pointer transition-all hover:scale-110 active:scale-95"
          style={{ 
            backgroundColor: '#ff8c42',
            border: 'none',
            borderRadius: '4px'
          }}
          aria-label="View details"
          title="View Details"
        >
          <svg 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 512 512" 
            height="1.5em" 
            width="1.5em" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: '#1a1a1a' }}
          >
            <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
          </svg>
        </button>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="flex items-center justify-center p-2 cursor-pointer transition-all hover:scale-110 active:scale-95"
          style={{ 
            backgroundColor: '#ff8c42',
            border: 'none',
            borderRadius: '4px'
          }}
          aria-label="Download"
          title="Download"
        >
          <svg 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 24 24" 
            height="1.5em" 
            width="1.5em" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: '#1a1a1a' }}
          >
            <path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path>
          </svg>
        </button>

        {/* View Full Screen Button */}
        <button
          onClick={() => {
            const srcdocContent = generateFullSVG(imageDataUrl, currentBackgroundIndex, String(tokenId));
            const blob = new Blob([srcdocContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const win = window.open(url, '_blank', 'width=600,height=600');
            if (win) {
              win.addEventListener('load', () => {
                URL.revokeObjectURL(url);
              });
            }
          }}
          className="flex items-center justify-center p-2 cursor-pointer transition-all hover:scale-110 active:scale-95"
          style={{ 
            backgroundColor: '#ff8c42',
            border: 'none',
            borderRadius: '4px'
          }}
          aria-label="View fullscreen"
          title="View Fullscreen"
        >
          <svg 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 448 512" 
            height="1.5em" 
            width="1.5em" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: '#1a1a1a' }}
          >
            <path d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}