import config from '@/react-bricks/config';
import ErrorNoFooter from 'components/react-bricks/error-no-footer';
import ErrorNoHeader from 'components/react-bricks/error-no-header';
import ErrorNoKeys from 'components/react-bricks/error-no-keys';
import PageLayout from 'components/react-bricks/layout';
import ReactBricksApp from 'components/react-bricks/react-bricks-app';
import { ThemeProvider } from 'components/react-bricks/theme-provider';
import { PageViewer, cleanPage, fetchPage, getBricks, register, types } from 'react-bricks/rsc';
import '../../globals.css';

export const metadata = {
  title: 'React Bricks Starter',
  description: 'Next.js with Server Components'
};

register(config);

const getData = async (
  locale: string
): Promise<{
  header: types.Page | null;
  footer: types.Page | null;
  errorNoKeys: boolean;
  errorHeader: boolean;
  errorFooter: boolean;
}> => {
  let errorNoKeys: boolean = false;
  let errorHeader: boolean = false;
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

  const [header, footer] = await Promise.all([
    fetchPage({ slug: 'header', language: locale, config }).catch(() => {
      errorHeader = true;
      return null;
    }),
    fetchPage({ slug: 'footer', language: locale, config }).catch(() => {
      errorFooter = true;
      return null;
    })
  ]);

  return {
    header,
    footer,
    errorNoKeys,
    errorHeader,
    errorFooter
  };
};

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { header, footer, errorNoKeys, errorHeader, errorFooter } = await getData(params.lang);

  // Clean the received content
  // Removes unknown or not allowed bricks
  const bricks = getBricks();
  const headerOk = header ? cleanPage(header, config.pageTypes || [], bricks) : null;
  const footerOk = footer ? cleanPage(footer, config.pageTypes || [], bricks) : null;

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={`bg-white dark:bg-[#0d1117]`}>
        <ThemeProvider
          attribute="class"
          storageKey="color-mode"
          defaultTheme="system"
          enableSystem={true}
        >
          <main>
            <ReactBricksApp>
              <PageLayout>
                {!errorNoKeys && (
                  <>
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
                  </>
                )}
                {errorNoKeys && <ErrorNoKeys />}
              </PageLayout>
            </ReactBricksApp>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
