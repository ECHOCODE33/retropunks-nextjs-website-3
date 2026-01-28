'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import SocialsDropdown from './SocialsDropdown';

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-retro-dark border-b-2 border-retro-orange sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/punk.png"
              alt="RetroPunks Logo"
              width={40}
              height={40}
              className="pixelated"
            />
            <span className="text-xl font-bold">
              RETRO<span className="text-retro-orange">PUNKS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="nav-link">
              RETROPUNKS
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className="nav-link"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('creator')}
              className="nav-link"
            >
              CREATOR
            </button>
            <SocialsDropdown />
            <button onClick={() => scrollToSection('faq')} className="nav-link">
              FAQs
            </button>
            <Link href="/my-punks" className="nav-link">
              MY PUNKS
            </Link>
            <div className="ml-4">
              <ConnectButton
                showBalance={false}
                chainStatus="icon"
                accountStatus="address"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <ConnectButton
              showBalance={false}
              chainStatus="icon"
              accountStatus="avatar"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-retro-gray">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block nav-link">
            RETROPUNKS
          </Link>
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left nav-link"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection('creator')}
            className="block w-full text-left nav-link"
          >
            CREATOR
          </button>
          <SocialsDropdown />
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left nav-link"
          >
            FAQs
          </button>
          <Link href="/my-punks" className="block nav-link">
            MY PUNKS
          </Link>
        </div>
      </div>
    </nav>
  );
}