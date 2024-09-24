import CartModal from '@/components/cart/modal';
import MobileMenu from '@/components/layout/navbar/mobile-menu';
import Search, { SearchSkeleton } from '@/components/layout/navbar/search';
import { Menu } from '@/lib/shopify/types';
import LogoSquare from 'components/logo-square';
import Link from 'next/link';
import { Suspense } from 'react';
import { Repeater, types } from 'react-bricks/rsc';

interface HeaderProps {
    menu: Menu[]
    links: types.RepeaterItems;
}

const { SITE_NAME } = process.env;

const Header: types.Brick<HeaderProps> = ({ links }) => {


    return (
        <nav className="relative flex items-center justify-between p-4 lg:px-6">
            <div className="block flex-none md:hidden">
                <Suspense fallback={null}>
                    <MobileMenu links={links} />
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
                    <Repeater
                        propName="links"
                        items={links}
                        renderWrapper={(items) => (
                            <ul className="hidden gap-6 text-sm md:flex md:items-center">{items}</ul>
                        )}
                    />
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
