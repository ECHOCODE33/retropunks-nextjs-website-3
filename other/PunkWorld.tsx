'use client';

import Image from 'next/image';

export default function PunkWorld() {
  return (
    <section className="py-20 px-4 bg-retro-gray/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-shadow">
          PUNKWRLD
        </h2>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Part I - RetroPunks */}
          <div className="punk-world-card">
            <h3 className="text-retro-orange text-xl font-bold mb-4 text-center">
              PART I
            </h3>
            <h4 className="text-2xl font-bold mb-6 text-center">RetroPunks</h4>
            
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 border-2 border-retro-orange rounded overflow-hidden">
                <Image
                  src="/punk.png"
                  alt="RetroPunk Example"
                  width={192}
                  height={192}
                  className="pixelated w-full h-full object-cover"
                />
              </div>
            </div>

            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-retro-orange mr-2">•</span>
                <span>10,000 NFTs</span>
              </li>
              <li className="flex items-start">
                <span className="text-retro-orange mr-2">•</span>
                <span>Retro-themed</span>
              </li>
              <li className="flex items-start">
                <span className="text-retro-orange mr-2">•</span>
                <span>Fully on-chain</span>
              </li>
              <li className="flex items-start">
                <span className="text-retro-orange mr-2">•</span>
                <span>Ethereum-based</span>
              </li>
              <li className="flex items-start">
                <span className="text-retro-orange mr-2">•</span>
                <span>Customizable</span>
              </li>
            </ul>
          </div>

          {/* Part II - CYBRPNKS */}
          <div className="punk-world-card">
            <h3 className="text-retro-orange text-xl font-bold mb-4 text-center">
              PART II
            </h3>
            <h4 className="text-2xl font-bold mb-6 text-center">CYBRPNKS</h4>
            
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 bg-cyan-400 border-2 border-retro-orange rounded overflow-hidden">
                <Image
                  src="/punk.png"
                  alt="CYBRPNK Example"
                  width={192}
                  height={192}
                  className="pixelated w-full h-full object-cover mix-blend-multiply"
                />
              </div>
            </div>

            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-retro-orange mr-2">•</span>
                <span>20,000 NFTs</span>
              </li>
              <li className="flex items-start">
                <span className="text-retro-orange mr-2">•</span>
                <span>Dystopian-themed</span>
              </li>
              <li className="flex items-start">
                <span className="text-retro-orange mr-2">•</span>
                <span>Fully On-Chain</span>
              </li>
              <li className="flex items-start">
                <span className="text-retro-orange mr-2">•</span>
                <span>Ethereum-based</span>
              </li>
              <li className="flex items-start">
                <span className="text-retro-orange mr-2">•</span>
                <span>Customizable</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}