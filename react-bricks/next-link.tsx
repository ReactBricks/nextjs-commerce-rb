import Link from 'next/link';
import { types } from 'react-bricks/rsc';

import NextLinkClient from './next-link-client';

const NextLink: types.RenderLocalLink = ({
  href,
  target,
  rel,
  className,
  activeClassName,
  isAdmin,
  children
}) => {
  if (isAdmin) {
    return (
      <Link href={href} target={target} rel={rel} className={className || ''}>
        {children}
      </Link>
    );
  }

  return (
    <NextLinkClient
      href={href}
      target={target}
      rel={rel}
      className={className}
      activeClassName={activeClassName}
    >
      {children}
    </NextLinkClient>
  );
};

export default NextLink;
