import { Link, types } from 'react-bricks/rsc';

interface HeaderMenuItemProps {
    title: string
    path: string
    isMobile: boolean
}

const HeaderMenuItem: types.Brick<HeaderMenuItemProps> = ({ title, path, isMobile }) => {
    return (
        <li key={title}>
            <Link
                href={path}
                className={isMobile ? "py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white" : "text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"}
            >
                {title}
            </Link>
        </li>
    );
};

HeaderMenuItem.schema = {
    name: 'header-menu-item',
    label: 'Header Menu Item',
    getDefaultProps: () => ({
        path: "",
        title: "Menu link"
    }),
    sideEditProps: [
        {
            name: 'path',
            label: 'Link to...',
            type: types.SideEditPropType.Text,

        },
        {
            name: 'title',
            label: 'Title',
            type: types.SideEditPropType.Text,

        }
    ]
};

export default HeaderMenuItem;
