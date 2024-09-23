import config from '@/react-bricks/config';
import Link from 'next/link';
import { fetchPages, types } from 'react-bricks/rsc';

interface HeaderMenuItemProps {
    title:string
    path:string
}

const HeaderMenuItem: types.Brick<HeaderMenuItemProps> = ({ title, path }) => {
    return (
        <li key={title}>
            <Link
                href={path}
                prefetch={true}
                className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
            >
                {title}
            </Link>
        </li>
    );
};

HeaderMenuItem.schema = {
    name: 'header-menu-item',
    label: 'Header Menu Item',
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

export default HeaderMenuItem;
