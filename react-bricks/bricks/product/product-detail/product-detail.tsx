import { getProduct } from '@/lib/shopify';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import { Image, Product } from 'lib/shopify/types';
import { Suspense } from 'react';
import { Repeater, types } from 'react-bricks/rsc';

interface ProductDetailProps {
  product: Product | null;
  accordion: types.RepeaterItems;
}
const ProductDetail: types.Brick<ProductDetailProps> = ({ product, accordion }) => {
  if (!product) return null;
  return (
    <div className="flex flex-col rounded-lg border border-neutral-200 bg-white px-8 py-10 md:px-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
      <div className="h-full w-full basis-full lg:basis-4/6">
        <Suspense
          fallback={
            <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
          }
        >
          <Gallery
            images={product.images.slice(0, 5).map((image: Image) => ({
              src: image.url,
              altText: image.altText
            }))}
          />
        </Suspense>
      </div>

      <div className="basis-full lg:basis-2/6">
        <Suspense fallback={null}>
          <ProductDescription product={product} />
        </Suspense>
        <Repeater
          propName="accordion"
          items={accordion}
          renderWrapper={(children) => <div className="mt-12">{children}</div>}
        />
      </div>
    </div>
  );
};

ProductDetail.schema = {
  name: 'product-detail',
  label: 'Product Detail',
  getDefaultProps: () => ({}),
  getExternalData: async (page) => {
    const product = await getProduct(page.slug);
    return { product };
  },
  repeaterItems: [
    {
      name: 'accordion',
      itemType: 'accordion',
      itemLabel: 'Accordion',
      min: 0,
      max: 5
    }
  ]
};

export default ProductDetail;