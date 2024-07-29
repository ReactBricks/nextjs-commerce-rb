import { GridTileImage } from '@/components/grid/tile';
import { getProducts } from '@/lib/shopify';
import { Product } from '@/lib/shopify/types';

import { types, Link } from 'react-bricks/rsc';
interface CarouselItemProps {
  product: Product;
}

const CarouselItem: types.Brick<CarouselItemProps> = ({ product }) => {
  const savedColorMode = typeof window === 'undefined' ? '' : localStorage.getItem('color-mode');

  const placeholderProduct =
    savedColorMode === 'dark'
      ? 'https://dummyimage.com/800x800/374151/9ca3af'
      : 'https://dummyimage.com/800x800/f3f4f6/9ca3af';

  return (
    <li className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
      <Link href={`/product/${product?.handle}`} className="relative h-full w-full">
        <GridTileImage
          alt={product?.title}
          label={{
            title: product?.title,
            amount: product?.priceRange.maxVariantPrice.amount,
            currencyCode: product?.priceRange.maxVariantPrice.currencyCode
          }}
          src={
            product?.featuredImage?.url !== undefined
              ? product?.featuredImage?.url
              : placeholderProduct
          }
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
        />
      </Link>
    </li>
  );
};

CarouselItem.schema = {
  name: 'carousel-item',
  label: 'Carousel item',
  hideFromAddMenu: true,
  sideEditProps: [
    {
      name: 'product',
      label: 'Product',
      type: types.SideEditPropType.Autocomplete,
      autocompleteOptions: {
        getOptions: async (input) => {
          const products = await getProducts({
            sortKey: 'RELEVANCE',
            reverse: false,
            query: input
          });
          return products;
        },
        getKey: (option) => {
          return option.handle;
        },
        getLabel: (option) => {
          return option.title;
        },
        getNoOptionsMessage: (input) => {
          return 'No page found with ' + input;
        },
        placeholder: 'Search from Shopify...'
      }
    }
  ]
};

export default CarouselItem;
