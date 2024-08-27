import { isMedusaError } from 'lib/type-guards';

import { mapOptionIds } from 'lib/utils';
import { calculateVariantAmount, computeAmount, convertToDecimal } from './helpers';
import {
  Cart,
  CartItem,
  Image,
  MedusaCart,
  MedusaImage,
  MedusaLineItem,
  MedusaProduct,
  MedusaProductCollection,
  MedusaProductOption,
  MedusaProductVariant,
  Product,
  ProductCategory,
  ProductCollection,
  ProductOption,
  ProductVariant,
  SelectedOption
} from './types';

const ENDPOINT = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_API ?? 'http://localhost:9000';
const MEDUSA_API_KEY = process.env.MEDUSA_API_KEY ?? '';

export default async function medusaRequest({
  cache = 'force-cache',
  method,
  path,
  payload,
  tags
}: {
  cache?: RequestCache;
  method: string;
  path: string;
  payload?: Record<string, unknown> | undefined;
  tags?: string[];
}) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-publishable-key': MEDUSA_API_KEY
    },
    cache,
    ...(tags && { next: { tags } })
  };

  if (path.includes('/carts')) {
    options.cache = 'no-cache';
  }

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    console.log('API CALL: ', `${ENDPOINT}/store${path}`, options);
    const result = await fetch(`${ENDPOINT}/store${path}`, options);

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isMedusaError(e)) {
      throw {
        status: e.status || 500,
        message: e.message
      };
    }

    throw {
      error: e
    };
  }
}

const reshapeCart = (cart: MedusaCart): Cart => {
  const lines = cart?.items?.map((item) => reshapeLineItem(item)) || [];
  const totalQuantity = lines.reduce((a, b) => a + b.quantity, 0);
  const checkoutUrl = '/checkout'; // todo: implement medusa checkout flow
  const currencyCode = cart.region?.currency_code.toUpperCase() || 'USD';

  let subtotalAmount = '0';
  if (cart.subtotal && cart.region) {
    subtotalAmount = computeAmount({ amount: cart.subtotal, region: cart.region }).toString();
  }

  let totalAmount = '0';
  if (cart.total && cart.region) {
    totalAmount = computeAmount({ amount: cart.total, region: cart.region }).toString();
  }

  let totalTaxAmount = '0';
  if (cart.tax_total && cart.region) {
    totalTaxAmount = computeAmount({ amount: cart.tax_total, region: cart.region }).toString();
  }

  const cost = {
    subtotalAmount: {
      amount: subtotalAmount,
      currencyCode: currencyCode
    },
    totalAmount: {
      amount: totalAmount,
      currencyCode: currencyCode
    },
    totalTaxAmount: {
      amount: totalTaxAmount,
      currencyCode: currencyCode
    }
  };

  return {
    ...cart,
    totalQuantity,
    checkoutUrl,
    lines,
    cost
  };
};

const reshapeLineItem = (lineItem: MedusaLineItem): CartItem => {
  const product = {
    title: lineItem.title,
    priceRange: {
      maxVariantPrice: calculateVariantAmount(lineItem.variant)
    },
    updatedAt: lineItem.updated_at,
    createdAt: lineItem.created_at,
    tags: [],
    descriptionHtml: lineItem.description ?? '',
    featuredImage: {
      url: lineItem.thumbnail ?? '',
      altText: lineItem.title ?? ''
    },
    availableForSale: true,
    variants: [lineItem.variant && reshapeProductVariant(lineItem.variant)],
    handle: lineItem.variant?.product?.handle ?? '',
    options: [] as ProductOption[]
  };

  const selectedOptions =
    lineItem.variant?.options?.map((option) => ({
      name: option.option?.title ?? '',
      value: option.value
    })) || [];

  const merchandise = {
    id: lineItem.variant_id || lineItem.id,
    selectedOptions,
    product,
    title: lineItem.description ?? ''
  };

  const cost = {
    totalAmount: {
      amount: convertToDecimal(
        lineItem.total,
        lineItem.variant?.prices?.[0]?.currency_code
      ).toString(),
      currencyCode: lineItem.variant?.prices?.[0]?.currency_code.toUpperCase() || 'EUR'
    }
  };
  const quantity = lineItem.quantity;

  return {
    ...lineItem,
    merchandise,
    cost,
    quantity
  };
};

const reshapeImages = (images?: MedusaImage[], productTitle?: string): Image[] => {
  if (!images) return [];
  return images.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)![1];
    return {
      ...image,
      altText: `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (product: MedusaProduct): Product => {
  const variant = product.variants?.[0];

  let amount = '0';
  let currencyCode = 'USD';
  if (variant && variant.prices?.[0]?.amount) {
    currencyCode = variant.prices?.[0]?.currency_code.toUpperCase() ?? 'USD';
    amount = convertToDecimal(variant.prices[0].amount, currencyCode).toString();
  }

  const priceRange = {
    maxVariantPrice: {
      amount,
      currencyCode: product.variants?.[0]?.prices?.[0]?.currency_code.toUpperCase() ?? ''
    }
  };

  const updatedAt = product.updated_at;
  const createdAt = product.created_at;
  const tags = product.tags?.map((tag) => tag.value) || [];
  const descriptionHtml = product.description ?? '';
  const featuredImageFilename = product.thumbnail?.match(/.*\/(.*)\..*/)![1];
  const featuredImage = {
    url: product.thumbnail ?? '',
    altText: product.thumbnail ? `${product.title} - ${featuredImageFilename}` : ''
  };
  const availableForSale = product.variants?.[0]?.purchasable || true;
  const images = reshapeImages(product.images, product.title);

  const variants = product.variants.map((variant) =>
    reshapeProductVariant(variant, product.options)
  );

  let options = [] as ProductOption[];
  product.options && (options = product.options.map((option) => reshapeProductOption(option)));

  return {
    ...product,
    images,
    featuredImage,
    priceRange,
    updatedAt,
    createdAt,
    tags,
    descriptionHtml,
    availableForSale,
    options,
    variants
  };
};

const reshapeProductOption = (productOption: MedusaProductOption): ProductOption => {
  const availableForSale = productOption.product?.variants?.[0]?.purchasable || true;
  const name = productOption.title;
  let values = productOption.values?.map((option) => option.value) || [];
  values = [...new Set(values)];

  return {
    ...productOption,
    availableForSale,
    name,
    values
  };
};

const reshapeProductVariant = (
  productVariant: MedusaProductVariant,
  productOptions?: MedusaProductOption[]
): ProductVariant => {
  let selectedOptions: SelectedOption[] = [];
  if (productOptions && productVariant.options) {
    const optionIdMap = mapOptionIds(productOptions);
    selectedOptions = productVariant.options.map((option) => ({
      name: optionIdMap[option.option_id] ?? '',
      value: option.value
    }));
  }
  const availableForSale = productVariant.purchasable || true;
  const price = calculateVariantAmount(productVariant);

  return {
    ...productVariant,
    availableForSale,
    selectedOptions,
    price
  };
};

const reshapeCollection = (collection: ProductCategory): ProductCollection => {
  const description = collection.description || collection.metadata?.description?.toString() || '';
  const seo = {
    title: collection?.metadata?.seo_title?.toString() || collection.name || '',
    description: collection?.metadata?.seo_description?.toString() || collection.description || ''
  };
  const path = `/search/${collection.handle}`;
  const updatedAt = collection.updated_at;
  const title = collection.title;

  return {
    ...collection,
    description,
    seo,
    title,
    path,
    updatedAt
  };
};

export async function createCart(): Promise<Cart> {
  const res = await medusaRequest({ method: 'POST', path: '/carts' });
  return reshapeCart(res.body.cart);
}

export async function addToCart(
  cartId: string,
  lineItem: { variantId: string; quantity: number }
): Promise<Cart> {
  const res = await medusaRequest({
    method: 'POST',
    path: `/carts/${cartId}/line-items`,
    payload: {
      variant_id: lineItem?.variantId,
      quantity: lineItem?.quantity
    },
    tags: ['cart']
  });
  return reshapeCart(res.body.cart);
}

export async function removeFromCart(cartId: string, lineItemId: string): Promise<Cart> {
  const res = await medusaRequest({
    method: 'DELETE',
    path: `/carts/${cartId}/line-items/${lineItemId}`,
    tags: ['cart']
  });
  return reshapeCart(res.body.cart);
}

export async function updateCart(
  cartId: string,
  { lineItemId, quantity }: { lineItemId: string; quantity: number }
): Promise<Cart> {
  const res = await medusaRequest({
    method: 'POST',
    path: `/carts/${cartId}/line-items/${lineItemId}`,
    payload: {
      quantity
    },
    tags: ['cart']
  });
  return reshapeCart(res.body.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const res = await medusaRequest({ method: 'GET', path: `/carts/${cartId}`, tags: ['cart'] });
  const cart = res.body.cart;

  if (!cart) {
    return null;
  }

  return reshapeCart(cart);
}

export async function getCollections(): Promise<ProductCollection[]> {
  const res = await medusaRequest({
    method: 'GET',
    path: '/collections',
    tags: ['categories']
  });

  // Reshape categories and hide categories starting with 'hidden'
  const categories = res.body.collections
    .map((collection: ProductCategory) => reshapeCollection(collection))
    .filter((collection: MedusaProductCollection) => !collection.handle.startsWith('hidden'));

  return categories;
}

export async function getCollection(handle: string): Promise<ProductCollection | undefined> {
  const res = await medusaRequest({
    method: 'GET',
    path: `/collections?handle[]=${handle}`,
    tags: ['categories', 'products']
  });
  return res.body.collections[0];
}

export async function getCollectionProducts({
  handle,
  reverse,
  sortKey
}: {
  handle: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await medusaRequest({
    method: 'GET',
    path: `/collections?handle[]=${handle}`,
    tags: ['categories', 'products']
  });

  if (!res) {
    return [];
  }

  const collection = res.body.collections[0];

  const collection_products = await getProducts({ reverse, sortKey, collectionId: collection ? collection.id : null});

  return collection_products;
}

export async function getProduct(handle: string): Promise<Product> {
  const res = await medusaRequest({
    method: 'GET',
    path: `/products?handle=${handle}&limit=1`,
    tags: ['products']
  });
  const product = res.body.products[0];
  return reshapeProduct(product);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
  collectionId
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  collectionId?: string;
}): Promise<Product[]> {
  let res;

  if (query) {
    res = await medusaRequest({
      method: 'GET',
      path: `/products?q=${query}&limit=100`,
      tags: ['products']
    });
  } else if (collectionId) {
    res = await medusaRequest({
      method: 'GET',
      path: `/products?collection_id[]=${collectionId}&limit=100`,
      tags: ['products']
    });
  } else {
    res = await medusaRequest({ method: 'GET', path: `/products?limit=100`, tags: ['products'] });
  }

  if (!res) {
    console.error("Couldn't fetch products");
    return [];
  }

  let products: Product[] = res?.body.products.map((product: MedusaProduct) =>
    reshapeProduct(product)
  );

  sortKey === 'PRICE' &&
    products.sort(
      (a, b) =>
        parseFloat(a.priceRange.maxVariantPrice.amount) -
        parseFloat(b.priceRange.maxVariantPrice.amount)
    );

  sortKey === 'CREATED_AT' &&
    products.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  reverse && products.reverse();

  return products;
}

export async function getMenu(menu: string): Promise<any[]> {
  if (menu === 'next-js-frontend-header-menu') {
    const categories = await getCollections();
    return categories.map((cat) => ({
      title: cat.title,
      path: cat.path
    }));
  }

  if (menu === 'next-js-frontend-footer-menu') {
    return [
      { title: 'About Medusa', path: 'https://medusajs.com/' },
      { title: 'Medusa Docs', path: 'https://docs.medusajs.com/' },
      { title: 'Medusa Blog', path: 'https://medusajs.com/blog' }
    ];
  }

  return [];
}
