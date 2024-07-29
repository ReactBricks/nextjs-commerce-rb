import { types, Text, RichText, Image } from 'react-bricks/rsc';

interface BigImageCaptionProps {
  title: types.TextValue;
  description: types.TextValue;
  image: types.IImageSource;
}
const BigImageCaption: types.Brick<BigImageCaptionProps> = ({ title, description, image }) => {
  return (
    <div className="mx-auto max-w-[3200px] px-4 py-10 md:px-[calc(112/3200*100vw)] lg:px-6 2xl:px-[112px]">
      <div className="mx-auto">
        <Image
          propName="image"
          source={image}
          alt="Image"
          imageClassName="w-full"
          aspectRatio={1.9}
        />
      </div>

      <div className="mx-auto mt-16 w-1/2 text-center">
        <Text
          propName="title"
          value={title}
          placeholder="Type a title..."
          renderBlock={({ children }) => (
            <h1 className="font-title text-center text-4xl font-medium leading-snug text-black dark:text-white">
              {children}
            </h1>
          )}
          renderPlaceholder={({ children }) => <div>{children}</div>}
        />

        <RichText
          propName="description"
          value={description}
          placeholder="Type a description..."
          renderBlock={({ children }) => (
            <div className="mt-4 text-center text-xl leading-relaxed text-neutral-500 dark:text-neutral-400">
              {children}
            </div>
          )}
          allowedFeatures={[types.RichTextFeatures.Bold, types.RichTextFeatures.Highlight]}
          renderPlaceholder={({ children }) => <div>{children}</div>}
        />
      </div>
    </div>
  );
};

BigImageCaption.schema = {
  name: 'big-image-caption',
  label: 'Big image with caption',
  getDefaultProps: () => ({
    title: 'Title',
    description: 'A nice little description'
  })
};

export default BigImageCaption;
