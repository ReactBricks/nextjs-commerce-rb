import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ErrorNoKeys from '@/components/react-bricks/error-no-keys';
import ErrorNoPage from '@/components/react-bricks/error-no-page';
import { Product } from '@/lib/medusa/types';
import config from '@/react-bricks/config';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct } from 'lib/medusa';
import { cleanPage, fetchPage, getBricks, JsonLd, PageViewer, types } from 'react-bricks/rsc';
import { ClickToEdit } from 'react-bricks/rsc/client';

const getData = async (
  slug: any
): Promise<{
  page: types.Page | null;
  errorNoKeys: boolean;
  errorPage: boolean;
}> => {
  let errorNoKeys: boolean = false;
  let errorPage: boolean = false;

  if (!config.apiKey) {
    errorNoKeys = true;

    return {
      page: null,
      errorNoKeys,
      errorPage
    };
  }

  let cleanSlug = '';

  if (!slug) {
    cleanSlug = '/';
  } else if (typeof slug === 'string') {
    cleanSlug = slug;
  } else {
    cleanSlug = slug.join('/');
  }

  const page = await fetchPage({
    slug: cleanSlug,
    language: 'en',
    config,
    fetchOptions: { next: { revalidate: parseInt(process.env.REACT_BRICKS_REVALIDATE || '3', 10) } }
  }).catch(() => {
    errorPage = true;
    return null;
  });

  return {
    page,
    errorNoKeys,
    errorPage
  };
};

// export const dynamic = 'force-dynamic';

// export async function generateStaticParams() {
//   if (!config.apiKey) {
//     return [];
//   }

//   const allPages = await fetchPages(config.apiKey, {
//     language: 'en',
//     type: 'product',
//     pageSize: 100,
//     sort: '-publishedAt'
//   });

//   const pages = allPages
//     .map((page) =>
//       page.translations.map((translation) => ({
//         slug: translation.slug.split('/')
//       }))
//     )
//     .flat();

//   return pages;
// }

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle); // TODO

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product?.seo?.title || product.title,
    description: product?.seo?.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const { page, errorNoKeys, errorPage } = await getData(params.handle);
  const bricks = getBricks();
  const pageOk = page ? cleanPage(page, config.pageTypes || [], bricks) : null;

  const product: Product | null = page?.externalData?.product;

  if (!product) return notFound();

  // const productJsonLd = {
  //   '@context': 'https://schema.org',
  //   '@type': 'Product',
  //   name: product.title,
  //   description: product.description,
  //   image: product.featuredImage.url,
  //   offers: {
  //     '@type': 'AggregateOffer',
  //     availability: product.availableForSale
  //       ? 'https://schema.org/InStock'
  //       : 'https://schema.org/OutOfStock',
  //     priceCurrency: product.priceRange.minVariantPrice.currencyCode,
  //     highPrice: product.priceRange.maxVariantPrice.amount,
  //     lowPrice: product.priceRange.minVariantPrice.amount
  //   }
  // };

  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      /> */}
      {page?.meta && <JsonLd page={page}></JsonLd>}
      {pageOk && !errorPage && !errorNoKeys && (
        <div className="mx-auto max-w-screen-2xl px-4">
          <PageViewer page={pageOk} main />
        </div>
      )}
      {errorNoKeys && <ErrorNoKeys />}
      {errorPage && <ErrorNoPage />}
      {pageOk && config && (
        <ClickToEdit
          pageId={pageOk?.id}
          language={'en'}
          editorPath={config.editorPath || '/admin/editor'}
          clickToEditSide={config.clickToEditSide}
        />
      )}
    </>
  );
}
