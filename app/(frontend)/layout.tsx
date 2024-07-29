import config from '@/react-bricks/config';
import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
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
  footer: types.Page | null;
  errorNoKeys: boolean;
  errorFooter: boolean;
}> => {
  let errorNoKeys: boolean = false;
  let errorFooter: boolean = false;

  if (!config.apiKey) {
    errorNoKeys = true;

    return {
      footer: null,
      errorNoKeys,
      errorFooter
    };
  }

  const footer = await Promise.resolve(
    fetchPage({ slug: 'footer', language: locale, config }).catch(() => {
      errorFooter = true;
      return null;
    })
  );

  return {
    footer,
    errorNoKeys,
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
  const { footer, errorNoKeys, errorFooter } = await getData('en');

  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart(cartId);
  // Clean the received content
  // Removes unknown or not allowed bricks
  const bricks = getBricks();

  if (errorNoKeys) return <ErrorNoKeys />;
  const footerOk = footer ? cleanPage(footer, config.pageTypes || [], bricks) : null;

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <CartProvider cartPromise={cart}>
            <ReactBricksApp>
              <Navbar />
              <main>
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
