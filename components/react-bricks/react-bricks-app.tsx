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
    localStorage.setItem(
      'rb_t',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJFRElUT1IiXSwidXNlciI6eyJ1c2VySWQiOiIwYTEzMzgwZC1jYjJiLTQ1MjktYjM0NS0yMjU4NTk5YmZjYzQiLCJhcHBJZCI6IjZhYmRlNzA3LWQyZmYtNGVmOS05NDhlLTdiZTBlODc4YTc0OSIsImFwcEVudiI6Im1haW4iLCJhY2NvdW50SWQiOiI5YjJiYmNkOC0yYjExLTQ4MGMtYTlmOC0xNzkwZDE4ODE5MjUiLCJlbWFpbCI6ImRlbW8tY29tbWVyY2VAcmVhY3Ricmlja3MuY29tIiwicmVhZE9ubHkiOmZhbHNlLCJjYW5DcmVhdGVQYWdlIjp0cnVlLCJjYW5EZWxldGVQYWdlIjp0cnVlLCJjYW5EZXBsb3kiOmZhbHNlLCJjYW5EZXBsb3lTdGFnaW5nIjpmYWxzZSwiY2FuRGVwbG95RGV2IjpmYWxzZSwiY2FuQXBwcm92ZSI6ZmFsc2UsImNhbkVkaXRQYWdlQXR0cmlidXRlcyI6dHJ1ZSwiY2FuRWRpdFNlbyI6dHJ1ZSwiaXNWZXJpZmllZCI6dHJ1ZX0sImlhdCI6MTcyMjY3NDE3ODM3Mywia2VlcExvZ2dlZEluIjp0cnVlLCJleHAiOjE3MjI2NzU0NzQzNzN9.9Xr_P24VH-3xBpeRe7Teylo8Bcrb4wPClzOreLWUBSs'
    );
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
