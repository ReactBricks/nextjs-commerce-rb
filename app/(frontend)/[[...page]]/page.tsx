import type { Metadata } from 'next';

import config from '@/react-bricks/config';
import ErrorNoKeys from 'components/react-bricks/error-no-keys';
import ErrorNoPage from 'components/react-bricks/error-no-page';
import {
  JsonLd,
  PageViewer,
  cleanPage,
  fetchPage,
  fetchPages,
  getBricks,
  types
} from 'react-bricks/rsc';
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

export async function generateStaticParams() {
  if (!config.apiKey) {
    return [];
  }

  const allPages = await fetchPages(config.apiKey, {
    language: 'en',
    type: 'page'
  });

  const pages = allPages
    .map((page) =>
      page.translations.map((translation) => ({
        page: translation.slug.split('/')
      }))
    )
    .flat();

  return pages;
}

export async function generateMetadata({
  params
}: {
  params: { page: string[] };
}): Promise<Metadata> {
  const { page } = await getData(params.page?.join('/'));
  if (!page?.meta) {
    return {};
  }

  return {
    title: page.meta?.title,
    description: page.meta?.description,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.publishedAt,
      type: 'article'
    }
  };
}

export default async function Page({ params }: { params: { page: string[] } }) {
  const { page, errorNoKeys, errorPage } = await getData(params.page?.join('/'));

  // Clean the received content
  // Removes unknown or not allowed bricks
  const bricks = getBricks();
  const pageOk = page ? cleanPage(page, config.pageTypes || [], bricks) : null;

  return (
    <>
      {page?.meta && <JsonLd page={page}></JsonLd>}
      {pageOk && !errorPage && !errorNoKeys && (
        <div>
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
