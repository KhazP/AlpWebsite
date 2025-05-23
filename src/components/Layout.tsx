import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* Navbar will go here */}
      <main>{children}</main>
      {/* Footer will go here */}
    </>
  );
};

export default Layout;
