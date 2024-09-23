import CartModal from '@/components/cart/modal';
import MobileMenu from '@/components/layout/navbar/mobile-menu';
import Search, { SearchSkeleton } from '@/components/layout/navbar/search';
import { Menu } from '@/lib/shopify/types';
import LogoSquare from 'components/logo-square';
import Link from 'next/link';
import { Suspense } from 'react';
import { types } from 'react-bricks/rsc';

interface HeaderProps {
    menu: Menu[]
    links: types.RepeaterItems;
}

const { COMPANY_NAME, SITE_NAME } = process.env;

const Header: types.Brick<HeaderProps> = ({ menu, links }) => {
    const currentYear = new Date().getFullYear();
    const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
    const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
    const copyrightName = COMPANY_NAME || SITE_NAME || '';

    return (
        <nav className="relative flex items-center justify-between p-4 lg:px-6">
            <div className="block flex-none md:hidden">
                <Suspense fallback={null}>
                    <MobileMenu menu={menu} />
                </Suspense>
            </div>
            <div className="flex w-full items-center">
                <div className="flex w-full md:w-1/3">
                    <Link
                        href="/"
                        prefetch={true}
                        className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
                    >
                        <LogoSquare />
                        <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                            {SITE_NAME}
                        </div>
                    </Link>
                    {/* {menu.length ? (
                        <ul className="hidden gap-6 text-sm md:flex md:items-center">
                            {menu.map((item: Menu) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.path}
                                        prefetch={true}
                                        className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : null} */}
                </div>
                <div className="hidden justify-center md:flex md:w-1/3">
                    <Suspense fallback={<SearchSkeleton />}>
                        <Search />
                    </Suspense>
                </div>
                <div className="flex justify-end md:w-1/3">
                    <CartModal />
                </div>
            </div>
        </nav>
    );
};

Header.schema = {
    name: 'header',
    label: 'Header',
    getDefaultProps: () => ({}),
    repeaterItems: [
        {
            name: 'links',
            itemType: 'header-menu-item',
            min: 1,
            max: 6
        }
    ]
};

export default Header;
