import { ThreeItemGridItem } from '@/components/grid/three-items';
import { getCollectionProducts, getProducts } from '@/lib/shopify';
import { Product } from '@/lib/shopify/types';
import { types } from 'react-bricks/rsc';

interface HomeThreeItemsProps {
  shopify: boolean;
  products: Product[] | null;
  firstProduct?: Product;
  secondProduct?: Product;
  thirdProduct?: Product;
}

const HomeThreeItems: types.Brick<HomeThreeItemsProps> = ({
  shopify,
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

  if (shopify && products && products.length === 3) {
    return renderGrid(products);
  } else return renderGrid([firstProduct, secondProduct, thirdProduct]);
};

HomeThreeItems.schema = {
  name: 'home-three-items',
  label: 'Home Three Items',
  getDefaultProps: () => ({
    shopify: false
  }),
  getExternalData: async (page, props) => {
    if (props?.shopify) {
      const products = await getCollectionProducts({
        collection: 'hidden-homepage-featured-items'
      });
      return { products };
    } else return { products: null };
  },
  sideEditProps: [
    {
      name: 'shopify',
      label: 'From Shopify collection',
      type: types.SideEditPropType.Boolean
    },
    {
      name: 'firstProduct',
      label: '1st Product',
      show: (props) => {
        return !props.shopify;
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
        placeholder: 'Search from Shopify...'
      }
    },
    {
      name: 'secondProduct',
      label: '2nd Product',
      show: (props) => {
        return !props.shopify;
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
        placeholder: 'Search from Shopify...'
      }
    },
    {
      name: 'thirdProduct',
      label: '3rd Product',
      show: (props) => {
        return !props.shopify;
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
        placeholder: 'Search from Shopify...'
      }
    }
  ]
};

export default HomeThreeItems;
