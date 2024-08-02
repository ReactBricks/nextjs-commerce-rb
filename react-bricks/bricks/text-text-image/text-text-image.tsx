import { Image, Link, RichText, Text, types } from 'react-bricks/rsc';

interface TextTextImageProps {
  title: types.TextValue;
  subtitle: types.TextValue;
  textCol1: types.TextValue;
  textCol2: types.TextValue;
  image: types.IImageSource;
}
const TextTextImage: types.Brick<TextTextImageProps> = ({
  title,
  subtitle,
  textCol1,
  textCol2,
  image
}) => {
  return (
    <div className="mx-auto max-w-[3200px] px-4 py-10 md:px-[calc(112/3200*100vw)] lg:px-6 2xl:px-[112px]">
      <Text
        propName="title"
        value={title}
        placeholder="Type a title..."
        renderBlock={({ children }) => (
          <h1 className="text-lg font-light uppercase leading-6 tracking-wide text-neutral-700 dark:text-neutral-300">
            {children}
          </h1>
        )}
        renderPlaceholder={({ children }) => <div>{children}</div>}
      />
      <div className="mt-5 grid grid-cols-1 grid-rows-1 gap-x-8 [grid-template-areas:'first''second''third'] sm:grid-cols-2 sm:[grid-template-areas:'first_third''second_third'] lg:grid-cols-3 lg:gap-16 lg:[grid-template-areas:'first_second_third']">
        <div className="[grid-area:first]">
          <Text
            propName="subtitle"
            value={subtitle}
            placeholder="Type a subtitle..."
            renderBlock={({ children }) => (
              <h2 className="text-2xl font-bold text-black dark:text-white">{children}</h2>
            )}
            renderPlaceholder={({ children }) => <div>{children}</div>}
          />
          <RichText
            propName="text-col-1"
            multiline
            value={textCol1}
            placeholder="Type a description..."
            renderBlock={({ children }) => {
              return (
                <p className="mt-2 leading-5 text-neutral-500 dark:text-neutral-400">
                  {children[0].props.children === '' ? <br /> : children}
                </p>
              );
            }}
            allowedFeatures={[
              types.RichTextFeatures.Heading3,
              types.RichTextFeatures.UnorderedList,
              types.RichTextFeatures.Bold,
              types.RichTextFeatures.Link
            ]}
            renderH3={({ children }) => (
              <h3 className="mt-10 block font-semibold text-black dark:text-white">{children}</h3>
            )}
            renderUL={({ children }) => (
              <ul className="list-disc px-2 text-neutral-500 dark:text-neutral-400">{children}</ul>
            )}
            renderLI={({ children }) => <li className="ml-1.5">{children}</li>}
            renderLink={({ children, href, target, rel }) => (
              <Link href={href} target={target} rel={rel} className="hover:underline">
                {children}
              </Link>
            )}
            renderPlaceholder={({ children }) => <div>{children}</div>}
          />
        </div>
        <div className="[grid-area:second]">
          <RichText
            propName="text-col-2"
            multiline
            value={textCol2}
            placeholder="Type a description..."
            renderBlock={({ children }) => {
              return (
                <p className="mt-2 leading-5 text-neutral-500 dark:text-neutral-400">
                  {children[0].props.children === '' ? <br /> : children}
                </p>
              );
            }}
            allowedFeatures={[
              types.RichTextFeatures.Heading3,
              types.RichTextFeatures.UnorderedList,
              types.RichTextFeatures.Bold,
              types.RichTextFeatures.Link
            ]}
            renderH3={({ children }) => (
              <h3 className="mt-10 block font-semibold text-black dark:text-white">{children}</h3>
            )}
            renderUL={({ children }) => (
              <ul className="list-disc px-2 text-neutral-500 dark:text-neutral-400">{children}</ul>
            )}
            renderLI={({ children }) => <li className="ml-1.5">{children}</li>}
            renderLink={({ children, href, target, rel }) => (
              <Link href={href} target={target} rel={rel} className="hover:underline">
                {children}
              </Link>
            )}
            renderPlaceholder={({ children }) => <div>{children}</div>}
          />
        </div>
        <div className="hidden [grid-area:third] sm:block">
          <Image propName="image" source={image} alt="Image" imageClassName="" aspectRatio={0.75} />
        </div>
      </div>
    </div>
  );
};

TextTextImage.schema = {
  name: 'text-text-image',
  label: 'Product Info',
  getDefaultProps: () => ({
    title: 'Product details',
    subtitle: 'Subtitle',
    'text-col-1': [
      {
        type: 'paragraph',
        children: [
          {
            text: 'striped cotton T-shirt'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            text: ''
          }
        ]
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Highlights'
          }
        ]
      },
      {
        type: 'ul',
        children: [
          {
            type: 'li',
            children: [
              {
                text: 'black/white'
              }
            ]
          },
          {
            type: 'li',
            children: [
              {
                text: 'cotton'
              }
            ]
          },
          {
            type: 'li',
            children: [
              {
                text: 'jersey texture'
              }
            ]
          },
          {
            type: 'li',
            children: [
              {
                text: 'horizontal stripe pattern'
              }
            ]
          },
          {
            type: 'li',
            children: [
              {
                text: 'twist detailing'
              }
            ]
          },
          {
            type: 'li',
            children: [
              {
                text: 'crew neck'
              }
            ]
          },
          {
            type: 'li',
            children: [
              {
                text: 'short sleeves'
              }
            ]
          },
          {
            type: 'li',
            children: [
              {
                text: 'lace cuffs'
              }
            ]
          },
          {
            type: 'li',
            children: [
              {
                text: 'asymmetric hem'
              }
            ]
          }
        ]
      }
    ],
    'text-col-2': [
      {
        type: 'h3',
        children: [
          {
            text: 'Composition'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            text: 'Cotton 100%'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            text: ''
          }
        ]
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Washing instructions'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            text: 'Read Manufacturer Guidelines'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            text: ''
          }
        ]
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Product IDs'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            text: 'Product ID: T298EFX8'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            text: 'Brand style ID: S241Z01PJEBA012'
          }
        ]
      }
    ]
  })
};

export default TextTextImage;
