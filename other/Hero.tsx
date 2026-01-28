"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
	return (
		<section id="about" className="py-20 px-4">
			<div className="max-w-6xl mx-auto">
				{/* Title */}
				<div className="text-center mb-12 animate-fadeIn">
					<h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
						RetroPunks
					</h1>
					<p className="text-lg md:text-xl text-gray-300 mb-8">
						An{" "}
						<span className="text-retro-orange font-bold">
							exclusive
						</span>{" "}
						collection of 10,000 retro PFP NFTs on the Ethereum
						chain.
					</p>
				</div>

				{/* Main Content Grid */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					{/* Left: Text Content */}
					<div className="space-y-6 text-gray-300 leading-relaxed">
						<p className="text-sm md:text-base">
							You could swear you&apos;ve seen them before - on
							the street, in a bar, behind the counter at the
							store. Maybe on the last train home.
						</p>
						<p className="text-sm md:text-base">
							Some look like you. Some look like the version of
							you that you haven&apos;t dared to become yet.
							Crooked grin. Piercings. Faded ink.
						</p>
						<p className="text-sm md:text-base">
							And there are whispers they&apos;re not all human.
							That under the cotton. Skeletons. Zombies. Apes.
							Underneath the golden sun, he grows.
						</p>
						<p className="text-sm md:text-base font-semibold text-white">
							They&apos;re not here to save the world.
							They&apos;re here to live in it. Just like you.
							On-Chain Artwork. Welcome to the{" "}
							<span className="text-retro-orange">
								Crypto Culture Club
							</span>
							.
						</p>
					</div>

					{/* Right: Featured Image */}
					<div className="flex justify-center">
						<div className="relative w-64 h-64 md:w-80 md:h-80 border-4 border-retro-orange rounded-lg overflow-hidden shadow-2xl shadow-retro-orange/30 hover:scale-105 transition-transform duration-300">
							<Image
								src="/punk.png"
								alt="Featured RetroPunk"
								fill
								className="pixelated object-cover"
							/>
						</div>
					</div>
				</div>

				{/* Mint Button */}
				<div className="text-center mt-16">
					<Link
						href="https://opensea.io/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button className="btn-primary text-xl px-12 py-4 cursor-pointer">
							MINT
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}
