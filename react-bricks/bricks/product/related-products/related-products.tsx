import { GridTileImage } from '@/components/grid/tile';
import { getProductRecommendations } from '@/lib/shopify';
import { Product } from '@/lib/shopify/types';
import Link from 'next/link';
import { types } from 'react-bricks/rsc';

interface RelatedProductsProps {
  relatedProducts: Product[] | null;
}
const RelatedProducts: types.Brick<RelatedProductsProps> = ({ relatedProducts }) => {
  if (!relatedProducts) return null;
  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold dark:text-white">Related Products</h2>
      <ul className="mt-4 flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

RelatedProducts.schema = {
  name: 'related-products',
  label: 'Related Products',
  getDefaultProps: () => ({}),
  getExternalData: async (page) => {
    if (!page?.externalData?.product) return { relatedProducts: null };
    const relatedProducts = await getProductRecommendations(page.externalData.product.id);

    return { relatedProducts };
  }
};

export default RelatedProducts;