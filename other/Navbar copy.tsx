"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import SocialsDropdown from "../components/Dropdown";
import { press, google, roboto, space } from "@/lib/fonts";

export default function Navbar() {
	const scroll = (id: string): void => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};

	const navLinkClass = `${google.className} text-[13px] font-bold text-white hover:text-retro-orange transition-colors uppercase tracking-widest`;

	return (
		<header className="bg-retro-dark w-full">
			<div className="max-w-360 mx-auto px-10">
				<div className="flex items-center justify-between h-24">
					<Link aria-label="Logo" href="/" className="flex items-center shrink-0">
						<span className={`${press.className} text-xl leading-none`}>
							RETRO<span className="text-retro-orange">PUNKS</span>
						</span>
					</Link>

					<nav aria-label="Navbar" className="hidden md:flex items-center justify-center flex-1 gap-12">
						<button onClick={() => scroll("about")} className={navLinkClass}>
							ABOUT
						</button>

						<button onClick={() => scroll("creator")} className={navLinkClass}>
							CREATOR
						</button>

						<button onClick={() => {}} className={navLinkClass}>
							SOCIALS
						</button>

						<button onClick={() => scroll("faq")} className={navLinkClass}>
							FAQs
						</button>

						<button className={navLinkClass}>
							<Link href="/my-punks">MY PUNKS</Link>
						</button>
					</nav>

					<div className="hidden md:block shrink-0">
						<ConnectButton.Custom>
							{({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
								const ready = mounted;
								const connected = ready && account && chain;

								return (
									<div>
										{(() => {
											if (!connected) {
												return (
													<button className="btn-primary px-8 py-3" onClick={openConnectModal} type="button">
														Connect Wallet
													</button>
												);
											}
											if (chain.unsupported) {
												return (
													<button className="btn-primary px-8 py-3" onClick={openChainModal} type="button">
														Wrong network
													</button>
												);
											}

											return (
												<button className="btn-primary px-8 py-3" onClick={openAccountModal} type="button">
													{account.displayName}
													{` ${account.displayBalance}`}
												</button>
											);
										})()}
									</div>
								);
							}}
						</ConnectButton.Custom>
					</div>

					{/* Mobile Menu Trigger */}
					<div className="md:hidden">
						<ConnectButton showBalance={false} chainStatus="icon" accountStatus="avatar" />
					</div>
				</div>
			</div>

			{/* 3. Mobile Navigation Menu - Also using <nav> */}
			<nav aria-label="Mobile navigation" className="md:hidden border-t border-retro-orange bg-retro-dark">
				<div className="px-6 py-8 space-y-6 flex flex-col items-start">
					<button onClick={() => scroll("about")} className={navLinkClass}>
						ABOUT
					</button>
					<button onClick={() => scroll("creator")} className={navLinkClass}>
						CREATOR
					</button>
					<SocialsDropdown className={navLinkClass} />
					<button onClick={() => scroll("faq")} className={navLinkClass}>
						FAQs
					</button>
					<Link href={`/my-punks`} className={navLinkClass}>
						MY PUNKS
					</Link>
				</div>
			</nav>
		</header>
	);
}
