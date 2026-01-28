'use client';

import Image from 'next/image';

export default function Creator() {
  return (
    <section id="creator" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-shadow">
          The Creator
        </h2>

        {/* Content Card */}
        <div className="border-4 border-retro-green rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-retro-green text-retro-dark py-4 px-6 text-center">
            <h3 className="text-xl font-bold">ECHO (echomatrix.eth)</h3>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-8 p-8 bg-retro-gray/50">
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
            <div className="md:col-span-2 text-gray-300 space-y-4 text-sm md:text-base leading-relaxed">
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