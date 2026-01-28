'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const socials = [
  { name: 'X (Twitter)', icon: '/x.svg', url: 'https://twitter.com' },
  { name: 'Discord', icon: '/discord.svg', url: 'https://discord.com' },
  { name: 'OpenSea', icon: '/opensea.svg', url: 'https://opensea.io' },
  { name: 'Etherscan', icon: '/etherscan.svg', url: 'https://etherscan.io' },
];

export default function SocialsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav-link"
      >
        SOCIALS
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-retro-gray border-2 border-retro-orange rounded-md shadow-xl z-50">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-4 py-3 hover:bg-retro-dark transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src={social.icon}
                alt={social.name}
                width={20}
                height={20}
                className="shrink-0"
              />
              <span className="text-sm">{social.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}