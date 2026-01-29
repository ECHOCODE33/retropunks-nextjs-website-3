// src/components/ClientProviders.tsx
'use client';  // ← This makes it a Client Component → ssr: false is now allowed!

import dynamic from 'next/dynamic';

// Lazy-load your original Providers only on client
const ProvidersNoSSR = dynamic(
  () => import('@/lib/providers').then(mod => mod.Providers),
  { ssr: false }  // ← Safe here!
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ProvidersNoSSR>{children}</ProvidersNoSSR>;
}