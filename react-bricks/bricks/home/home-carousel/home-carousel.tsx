import { GridTileImage } from '@/components/grid/tile';
import { getCollectionProducts } from '@/lib/medusa';
import type { Product } from '@/lib/medusa/types';
import Link from 'next/link';
import { types } from 'react-bricks/rsc';

interface HomeCarouselProps {
  products: Product[] | null;
}

const HomeCarousel: types.Brick<HomeCarouselProps> = ({ products }) => {
  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];
  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

HomeCarousel.schema = {
  name: 'home-carousel',
  label: 'Home Carousel',
  getDefaultProps: () => ({}),
  getExternalData: async () => {
    const products = await getCollectionProducts({ handle: 'hidden-homepage-carousel' });
    return { products };
  }
};

export default HomeCarousel;
