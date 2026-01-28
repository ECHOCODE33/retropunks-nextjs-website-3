'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How many RetroPunks are there?',
    answer: 'There are 10,000 unique RetroPunks NFTs in the collection, each with distinct traits and characteristics stored fully on-chain.',
  },
  {
    question: 'How are the NFTs created?',
    answer: 'RetroPunks are algorithmically generated on-chain with a combination of traits including background, skin type, eyes, hair, headwear, and eyewear. The artwork is rendered as SVG directly from the smart contract.',
  },
  {
    question: 'What can I do with my NFTs?',
    answer: 'You can customize your RetroPunk by changing its background, name, and bio. You can also trade them on secondary marketplaces like OpenSea, use them as profile pictures, or hold them as collectibles.',
  },
  {
    question: 'Do I own the art when I mint an NFT?',
    answer: 'Yes! When you own a RetroPunk NFT, you have full commercial rights to that specific artwork. You can use it however you like, including for commercial purposes.',
  },
  {
    question: 'What inspired the creation of the RetroPunks?',
    answer: 'RetroPunks was inspired by the early days of crypto culture and punk aesthetics. The goal was to create a collection that celebrates individuality and the rebellious spirit of Web3.',
  },
  {
    question: 'Can I customize my NFTs?',
    answer: 'Yes! RetroPunks allows you to customize your NFT by changing the background, setting a custom name (up to 32 characters), and writing a bio (up to 160 characters). Note: The first 7 special 1-of-1 NFTs cannot be customized.',
  },
  {
    question: 'How does the OpenSea drop work?',
    answer: 'The collection can be minted directly from the smart contract or through OpenSea. After the initial mint, NFTs can be bought and sold on the secondary market.',
  },
  {
    question: 'Can I sell my RetroPunks?',
    answer: 'Absolutely! You can list your RetroPunks for sale on any NFT marketplace that supports ERC-721 tokens, such as OpenSea, LooksRare, or X2Y2.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 bg-retro-gray/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-shadow">
          FAQs
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                onClick={() => toggleFAQ(index)}
                className="faq-button"
              >
                <span className="text-left font-semibold">{item.question}</span>
                <span className="text-retro-orange text-2xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-300 animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}