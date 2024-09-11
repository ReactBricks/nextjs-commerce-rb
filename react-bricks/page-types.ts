import { getProduct } from '@/lib/medusa';
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
