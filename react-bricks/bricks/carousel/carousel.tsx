import { types, Text, Repeater } from 'react-bricks/rsc';

interface CarouselProps {
  title: string;
  products: types.IRepeaterItem[];
  autoplay?: boolean;
}

const Carousel: types.Brick<CarouselProps> = ({ title, products, autoplay }) => {
  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts =
    autoplay && products ? [...products, ...products, ...products] : products;

  return (
    <div className="w-full overflow-x-auto py-10">
      <Text
        propName="title"
        value={title}
        placeholder="Type a title..."
        renderBlock={({ children }) => (
          <h1 className="text-2xl font-bold dark:text-white">{children}</h1>
        )}
        renderPlaceholder={({ children }) => <div>{children}</div>}
      />

      <ul className={`mt-4 flex w-full gap-4 pt-1 ${autoplay && 'animate-carousel'}`}>
        <Repeater propName="products" items={carouselProducts} />
      </ul>
    </div>
  );
};

Carousel.schema = {
  name: 'carousel',
  label: 'Carousel',
  getDefaultProps: () => ({
    title: 'Carousel Products',
    autoPlay: false
  }),
  repeaterItems: [
    {
      name: 'products',
      itemType: 'carousel-item'
    }
  ],
  sideEditProps: [
    {
      name: 'autoplay',
      label: 'Autoplay',
      type: types.SideEditPropType.Boolean
    }
  ]
};

export default Carousel;
