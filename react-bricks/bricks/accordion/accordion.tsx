import StarRating from '@/components/product/star-rating';
import { types, RichText, Link, Repeater } from 'react-bricks/rsc';

interface AccordionProps {
  title: string;
  description: types.TextValue;
  reviews: types.RepeaterItems;
}

const Accordion: types.Brick<AccordionProps> = ({ title, description, reviews }) => {
  let totalRating = 0;
  let averageRating = 0;

  if (reviews && reviews.length) {
    totalRating = reviews.reduce((acc: number, review) => {
      return acc + parseInt(review.props.rating, 10);
    }, 0);

    averageRating = totalRating / reviews.length;
  }

  return (
    <details
      className="group open:pb-8"
      style={{ boxShadow: 'inset 0 -1px 0 0 rgb(115, 115, 115)' }}
    >
      <summary className="font-title relative flex cursor-pointer list-none flex-row items-center px-2 py-7 text-xl font-semibold text-black after:absolute after:right-2 after:top-[calc(50%-6px)] after:inline-block after:rotate-45 after:border-b-[3px] after:border-l-0 after:border-r-[3px] after:border-t-0 after:border-black after:p-[3px] after:content-[''] group-open:after:top-[calc(50%-4px)] group-open:after:-rotate-[135deg] dark:text-white after:dark:border-white">
        <div>{title}</div>
        {reviews && (
          <div className="ml-2 flex flex-row items-center">
            <StarRating rating={averageRating} />
          </div>
        )}
      </summary>
      <div>
        <RichText
          propName="text"
          multiline
          value={description}
          placeholder="Type a description..."
          renderBlock={({ children }) => {
            return (
              <p className="mb-5 inline-block px-2 text-neutral-500 dark:text-neutral-400">
                {children}
              </p>
            );
          }}
          allowedFeatures={[
            types.RichTextFeatures.UnorderedList,
            types.RichTextFeatures.Bold,
            types.RichTextFeatures.Link
          ]}
          renderLink={({ children, href, target, rel }) => (
            <Link
              href={href}
              target={target}
              rel={rel}
              className="font-semibold text-neutral-700 underline transition-colors hover:text-black dark:text-neutral-200 dark:hover:text-white"
            >
              {children}
            </Link>
          )}
          renderUL={({ children }) => (
            <ul className="list-disc px-2 text-neutral-500 dark:text-neutral-400">{children}</ul>
          )}
          renderLI={({ children }) => <li className="mt-4 ml-4">{children}</li>}
          renderPlaceholder={({ children }) => <div>{children}</div>}
        />

        <Repeater propName="reviews" items={reviews} />
      </div>
    </details>
  );
};

Accordion.schema = {
  name: 'accordion',
  label: 'Accordion',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    title: 'Details'
  }),
  sideEditProps: [
    {
      name: 'title',
      label: 'Title',
      type: types.SideEditPropType.Text
    }
  ],
  repeaterItems: [
    {
      name: 'reviews',
      itemType: 'review'
    }
  ]
};

export default Accordion;
