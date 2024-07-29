import { RichText, types } from 'react-bricks/rsc';

interface ParagraphProps {
  text: types.TextValue;
}

const Paragraph: types.Brick<ParagraphProps> = ({ text }) => {
  return (
    <div className="mx-8 max-w-2xl py-10 sm:mx-auto" lang="en">
      <div className={'prose mx-auto mb-0 mt-8 max-w-6xl dark:prose-invert first:mt-0'}>
        <RichText
          propName="text"
          value={text}
          placeholder="Type a text..."
          renderBlock={({ children }) => <p className="mb-0 mt-8 first:mt-0">{children}</p>}
          allowedFeatures={[
            types.RichTextFeatures.Heading2,
            types.RichTextFeatures.Heading3,
            types.RichTextFeatures.UnorderedList,
            types.RichTextFeatures.Bold,
            types.RichTextFeatures.Italic,
            types.RichTextFeatures.Link
          ]}
        />
      </div>
    </div>
  );
};

Paragraph.schema = {
  name: 'paragraph',
  label: 'Paragraph',
  getDefaultProps: () => ({})
};

export default Paragraph;
