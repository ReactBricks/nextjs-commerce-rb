import { Repeater, types } from 'react-bricks/rsc';

export interface FaqProps {
  faqs: types.RepeaterItems;
}

const Faq: types.Brick<FaqProps> = ({ faqs }) => {
  return (
    <div className="mx-8 max-w-2xl py-10 sm:mx-auto">
      <Repeater
        propName="faqs"
        items={faqs}
        renderWrapper={(children) => (
          <div className="prose dark:prose-invert">{children}</div>
        )}
      />
    </div>
  );
};

Faq.schema = {
  name: 'faq',
  label: 'Faq',
  getDefaultProps: () => ({}),
  repeaterItems: [
    {
      name: 'faqs',
      itemType: 'faq-item',
      itemLabel: 'Question'
    }
  ]
};

export default Faq;
