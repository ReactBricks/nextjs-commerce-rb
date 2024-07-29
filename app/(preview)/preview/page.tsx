import type { Metadata } from 'next';
import {
  JsonLd,
  PageViewer,
  cleanPage,
  fetchPagePreview,
  getBricks,
  getMetadata,
  types
} from 'react-bricks/rsc';
import { ClickToEdit } from 'react-bricks/rsc/client';

import ErrorNoKeys from 'components/react-bricks/error-no-keys';
import ErrorNoPage from 'components/react-bricks/error-no-page';
import config from '@/react-bricks/config';

const getData = async (
  token?: string
): Promise<{
  page: types.Page | null;
  errorNoKeys: boolean;
  errorPage: boolean;
}> => {
  let errorPage: boolean = false;

  if (!config.apiKey) {
    return {
      page: null,
      errorNoKeys: true,
      errorPage
    };
  }

  if (!token) {
    return {
      page: null,
      errorNoKeys: false,
      errorPage: true
    };
  }

  const page = await fetchPagePreview({
    token,
    config,
    fetchOptions: { cache: 'no-store' }
  }).catch(() => {
    errorPage = true;
    return null;
  });

  return {
    page,
    errorNoKeys: false,
    errorPage
  };
};

export async function generateMetadata({
  searchParams
}: {
  searchParams: { p?: string };
}): Promise<Metadata> {
  const { page } = await getData(searchParams.p);
  if (!page?.meta) {
    return {};
  }

  return getMetadata(page);
}

export default async function Page({ searchParams }: { searchParams: { p?: string } }) {
  const { page, errorNoKeys, errorPage } = await getData(searchParams.p);

  // Clean the received content
  // Removes unknown or not allowed bricks
  const bricks = getBricks();
  const pageOk = page ? cleanPage(page, config.pageTypes || [], bricks) : null;

  return (
    <>
      {page?.meta && <JsonLd page={page}></JsonLd>}
      {pageOk && !errorPage && !errorNoKeys && <PageViewer page={pageOk} main />}
      {errorNoKeys && <ErrorNoKeys />}
      {errorPage && <ErrorNoPage />}
      {pageOk && config && (
        <ClickToEdit
          pageId={pageOk?.id}
          language={pageOk.language}
          editorPath={config.editorPath || '/admin/editor'}
          clickToEditSide={config.clickToEditSide}
        />
      )}
    </>
  );
}
