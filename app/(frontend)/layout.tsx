import ErrorNoHeader from '@/components/react-bricks/error-no-header';
import config from '@/react-bricks/config';
import { CartProvider } from 'components/cart/cart-context';
import ErrorNoFooter from 'components/react-bricks/error-no-footer';
import ErrorNoKeys from 'components/react-bricks/error-no-keys';
import ReactBricksApp from 'components/react-bricks/react-bricks-app';
import { ThemeProvider } from 'components/react-bricks/theme-provider';
import { WelcomeToast } from 'components/welcome-toast';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { ensureStartsWith } from 'lib/utils';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { PageViewer, cleanPage, fetchPage, getBricks, register, types } from 'react-bricks/rsc';
import { Toaster } from 'sonner';
import '../globals.css';
import './styles.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

register(config);

const getData = async (
  locale: string
): Promise<{
  header: types.Page | null
  footer: types.Page | null;
  errorNoKeys: boolean;
  errorHeader: boolean;
  errorFooter: boolean;
}> => {
  let errorNoKeys: boolean = false;
  let errorHeader: boolean = false
  let errorFooter: boolean = false;

  if (!config.apiKey) {
    errorNoKeys = true;

    return {
      header: null,
      footer: null,
      errorNoKeys,
      errorHeader,
      errorFooter
    };
  }

  const footer = await Promise.resolve(
    fetchPage({
      slug: 'footer',
      language: locale,
      config,
      fetchOptions: {
        next: { revalidate: parseInt(process.env.REACT_BRICKS_REVALIDATE || '3', 10) }
      }
    }).catch(() => {
      errorFooter = true;
      return null;
    })
  );

  const header = await Promise.resolve(
    fetchPage({
      slug: 'header',
      language: locale,
      config,
      fetchOptions: {
        next: { revalidate: parseInt(process.env.REACT_BRICKS_REVALIDATE || '3', 10) }
      }
    }).catch(() => {
      errorHeader = true;
      return null;
    })
  );

  return {
    header,
    footer,
    errorNoKeys,
    errorHeader,
    errorFooter
  };
};

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
    twitter: {
      card: 'summary_large_image',
      creator: twitterCreator,
      site: twitterSite
    }
  })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cartId = cookies().get('cartId')?.value;
  const { header, footer, errorNoKeys, errorHeader, errorFooter } = await getData('en');

  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart(cartId);
  // Clean the received content
  // Removes unknown or not allowed bricks
  const bricks = getBricks();

  if (errorNoKeys) return <ErrorNoKeys />;
  const headerOk = header ? cleanPage(header, config.pageTypes || [], bricks) : null;
  const footerOk = footer ? cleanPage(footer, config.pageTypes || [], bricks) : null;

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <CartProvider cartPromise={cart}>
            <ReactBricksApp>
              <main>
                {headerOk && !errorHeader ? (
                  <PageViewer page={headerOk} main={false} />
                ) : (
                  <ErrorNoHeader />
                )}
                {children}
                {footerOk && !errorFooter ? (
                  <PageViewer page={footerOk} main={false} />
                ) : (
                  <ErrorNoFooter />
                )}
                <Toaster closeButton />
                <WelcomeToast />
              </main>
            </ReactBricksApp>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
