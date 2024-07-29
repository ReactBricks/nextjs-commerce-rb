import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

export function ThreeItemGridItem({
  item,
  size,
  priority,
  placeholder
}: {
  item?: Product | null;
  size: 'full' | 'half';
  priority?: boolean;
  placeholder: string;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item?.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item?.featuredImage.url || placeholder}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item?.title || ''}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item?.title as string,
            amount: item?.priceRange.maxVariantPrice.amount || '0.00',
            currencyCode: item?.priceRange.maxVariantPrice.currencyCode || 'USD'
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });

  const savedColorMode = typeof window === 'undefined' ? '' : localStorage.getItem('color-mode');
  const placeholderProduct =
    savedColorMode === 'dark'
      ? 'https://dummyimage.com/800x800/374151/9ca3af'
      : 'https://dummyimage.com/800x800/f3f4f6/9ca3af';

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem
        size="full"
        item={firstProduct}
        placeholder={placeholderProduct}
        priority={true}
      />
      <ThreeItemGridItem
        size="half"
        item={secondProduct}
        placeholder={placeholderProduct}
        priority={true}
      />
      <ThreeItemGridItem size="half" item={thirdProduct} placeholder={placeholderProduct} />
    </section>
  );
}
