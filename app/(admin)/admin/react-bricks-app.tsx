'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ReactBricks } from 'react-bricks';
import { GeistSans } from 'geist/font/sans';

import NextLink from '@/react-bricks/next-link';
import config from '@/react-bricks/config';

export default function ReactBricksApp({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Color Mode Management
  const savedColorMode = typeof window === 'undefined' ? '' : localStorage.getItem('color-mode');

  const { setTheme, systemTheme } = useTheme();

  const [colorMode, setColorMode] = useState(savedColorMode || systemTheme);

  const toggleColorMode = () => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(newColorMode);
    localStorage.setItem('color-mode', newColorMode);

    setTheme(newColorMode);
  };

  const reactBricksConfig = {
    ...config,
    navigate: (path: string) => {
      router.push(path);
    },
    renderLocalLink: NextLink,
    isDarkColorMode: colorMode === 'dark',
    toggleColorMode,
    contentClassName: `antialiased font-content ${GeistSans.className} ${colorMode} ${
      colorMode === 'dark' ? 'dark bg-gray-900' : 'light bg-white'
    }`
  };

  return <ReactBricks {...reactBricksConfig}>{children as any}</ReactBricks>;
}
