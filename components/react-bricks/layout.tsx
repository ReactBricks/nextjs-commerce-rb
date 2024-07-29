import React, { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="font-content flex h-screen flex-col justify-between antialiased">
      <main className="mb-auto">{children}</main>
    </div>
  );
};

export default Layout;
