'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-retro-dark border-t-2 border-retro-orange py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Left: Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start space-y-2">
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