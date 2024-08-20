import { ReadonlyURLSearchParams } from 'next/navigation';
import { MedusaProductOption } from './medusa/types';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const mapOptionIds = (productOptions: MedusaProductOption[]) => {
  // Maps the option titles to their respective ids
  const map: Record<string, string> = {};
  productOptions.forEach((option) => {
    map[option.id] = option.title;
  });
  return map;
};

export const isObject = (input: any) => input instanceof Object;
export const isArray = (input: any) => Array.isArray(input);

export const isEmpty = (input: any) => {
  return (
    input === null ||
    input === undefined ||
    (isObject(input) && Object.keys(input).length === 0) ||
    (isArray(input) && (input as any[]).length === 0) ||
    (typeof input === 'string' && input.trim().length === 0)
  );
};

//SHOPIFY
export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = ['NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN', 'NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN'];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        '\n'
      )}\n`
    );
  }

  if (
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.includes('[') ||
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.includes(']')
  ) {
    throw new Error(
      'Your `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.'
    );
  }
};
