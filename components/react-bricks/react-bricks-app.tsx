'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { register } from 'react-bricks/rsc';
import { ReactBricks } from 'react-bricks/rsc/client';

import config from '@/react-bricks/config';
import NextLink from '@/react-bricks/next-link';
import { useTheme } from 'next-themes';

export default function ReactBricksApp({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const reactBricksConfig = {
    ...config,
    navigate: (path: string) => {
      router.push(path);
    },
    renderLocalLink: NextLink
  };

  const { setTheme, systemTheme } = useTheme();

  // DEMO ONLY: SET TOKEN
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEMO_TOKEN) {
      localStorage.setItem('rb_t', process.env.NEXT_PUBLIC_DEMO_TOKEN);
    }
  }, []);

  useEffect(() => {
    if (systemTheme) {
      localStorage.setItem('color-mode', systemTheme);
      setTheme(systemTheme);
    }
  }, [systemTheme, setTheme]);

  register(reactBricksConfig);

  return <ReactBricks {...reactBricksConfig}>{children as any}</ReactBricks>;
}
