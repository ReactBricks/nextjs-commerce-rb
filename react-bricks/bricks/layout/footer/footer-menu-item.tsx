import config from '@/react-bricks/config';
import { Link, Text, fetchPages, types } from 'react-bricks/rsc';

interface FooterMenuItemProps {
  linkPage: {
    name: string;
    slug: string;
    language: string;
  };
  linkText: types.TextValue;
}

const FooterMenuItem: types.Brick<FooterMenuItemProps> = ({ linkPage, linkText }) => {
  return (
    <li>
      <Link
        href={`/${linkPage?.slug}`}
        className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm"
        activeClassName="text-black dark:text-neutral-300"
      >
        <Text
          propName="linkText"
          value={linkText}
          placeholder="Type a text..."
          renderBlock={({ children }) => <span>{children}</span>}
          renderPlaceholder={(props) => {
            return <span>{props.children}</span>;
          }}
        />
      </Link>
    </li>
  );
};

FooterMenuItem.schema = {
  name: 'footer-menu-item',
  label: 'Footer Menu Item',
  getDefaultProps: () => ({}),
  sideEditProps: [
    {
      name: 'linkPage',
      label: 'Link to...',
      type: types.SideEditPropType.Autocomplete,
      autocompleteOptions: {
        getOptions: async (input) => {
          const pages = await fetchPages({
            type: 'page',
            config,
            fetchOptions: {
              next: { revalidate: parseInt(process.env.REACT_BRICKS_REVALIDATE || '3', 10) }
            }
          });

          const pagesWithHome = [
            ...pages,
            {
              name: 'Home',
              slug: '',
              language: 'en'
            }
          ];

          return pagesWithHome
            .filter(
              (page) =>
                page.slug.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
                page.name.toLowerCase().indexOf(input.toLowerCase()) > -1
            )
            .map((page) => ({
              name: page.name,
              slug: page.slug,
              language: page.language
            }));
        },
        getKey: (option) => {
          return `${option.slug}-${option.language}`;
        },
        getLabel: (option) => {
          return option.name;
        },
        getNoOptionsMessage: (input) => {
          return 'No page found with ' + input;
        }
      }
    }
  ]
};

export default FooterMenuItem;
