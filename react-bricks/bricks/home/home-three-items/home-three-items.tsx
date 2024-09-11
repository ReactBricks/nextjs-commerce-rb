import { ThreeItemGridItem } from '@/components/grid/three-items';
import { getCategoryProducts, getProducts } from '@/lib/medusa';
import type { Product } from '@/lib/medusa/types';
import { types } from 'react-bricks/rsc';

interface HomeThreeItemsProps {
  medusa: boolean;
  products: Product[] | null;
  firstProduct?: Product;
  secondProduct?: Product;
  thirdProduct?: Product;
}

const HomeThreeItems: types.Brick<HomeThreeItemsProps> = ({
  medusa,
  products,
  firstProduct,
  secondProduct,
  thirdProduct
}) => {
  const savedColorMode = typeof window === 'undefined' ? '' : localStorage.getItem('color-mode');

  const placeholderProduct =
    savedColorMode === 'dark'
      ? 'https://dummyimage.com/800x800/374151/9ca3af'
      : 'https://dummyimage.com/800x800/f3f4f6/9ca3af';

  const renderGrid = (input: (Product | undefined)[]) => (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem
        size="full"
        item={input[0]}
        priority={true}
        placeholder={placeholderProduct}
      />
      <ThreeItemGridItem
        size="half"
        item={input[1]}
        priority={true}
        placeholder={placeholderProduct}
      />
      <ThreeItemGridItem size="half" item={input[2]} placeholder={placeholderProduct} />
    </section>
  );

  if (medusa) {
    if (products && products.length === 3) {
      return renderGrid(products);
    }
    return null;
  }
  return renderGrid([firstProduct, secondProduct, thirdProduct]);
};

HomeThreeItems.schema = {
  name: 'home-three-items',
  label: 'Home Three Items',
  getDefaultProps: () => ({
    medusa: false
  }),
  getExternalData: async (page, props) => {
    if (props?.medusa) {
      const products = await getCategoryProducts({
        handle: 'hidden-homepage-featured-items'
      });
      return { products };
    } else return { products: null };
  },
  sideEditProps: [
    {
      name: 'medusa',
      label: 'From Medusa collection',
      type: types.SideEditPropType.Boolean
    },
    {
      name: 'firstProduct',
      label: '1st Product',
      show: (props) => {
        return !props.medusa;
      },
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
          return 'No product found for ' + input;
        },
        placeholder: 'Search from Medusa...'
      }
    },
    {
      name: 'secondProduct',
      label: '2nd Product',
      show: (props) => {
        return !props.medusa;
      },
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
          return 'No product found for ' + input;
        },
        placeholder: 'Search from Medusa...'
      }
    },
    {
      name: 'thirdProduct',
      label: '3rd Product',
      show: (props) => {
        return !props.medusa;
      },
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
          return 'No product found for ' + input;
        },
        placeholder: 'Search from Medusa...'
      }
    }
  ]
};

export default HomeThreeItems;
