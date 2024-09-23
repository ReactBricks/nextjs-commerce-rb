import { getProduct } from '@/lib/shopify';
import { types } from 'react-bricks/rsc';

const pageTypes: types.IPageType[] = [
  {
    name: 'page',
    pluralName: 'pages',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    allowedBlockTypes: [
      'title',
      'paragraph',
      'image',
      'home-three-items',
      'home-carousel',
      'faq',
      'faq-item',
      'last-updated'
    ]
  },
  {
    name: 'layout',
    pluralName: 'layout',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    isEntity: true,
    allowedBlockTypes: ['footer']
  },
  {
    name: 'product',
    pluralName: 'products',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    template: [
      {
        slotName: 'product-main-data',
        label: 'Image, Variants, Add to Cart',
        allowedBlockTypes: ['product-detail'],
        min: 1,
        max: 1,
        editable: true
      },
      {
        slotName: 'product-info',
        label: 'Product info',
        allowedBlockTypes: ['text-text-image', 'carousel'],
        min: 0,
        max: 3,
        editable: true
      },
      {
        slotName: 'related-products',
        label: 'Related Products',
        allowedBlockTypes: ['related-products'],
        min: 1,
        max: 1,
        editable: false
      }
    ],
    getDefaultContent: () => [
      {
        id: 'product-detail',
        type: 'product-detail',
        props: {},
        locked: true,
        canEditContent: true,
        canAddBefore: false,
        canAddAfter: true
      },
      {
        id: 'related-products',
        type: 'related-products',
        props: {},
        locked: true,
        canEditContent: false,
        canAddBefore: true,
        canAddAfter: true
      }
    ],
    allowedBlockTypes: [
      'product-detail',
      'accordion',
      'related-products',
      'carousel',
      'text-text-image',
      'review'
    ],
    getExternalData: async (page) => {
      const product = await getProduct(page.slug);
      return { product };
    }
  }
];

export default pageTypes;
