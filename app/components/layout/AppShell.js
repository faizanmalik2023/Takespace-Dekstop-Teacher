'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

const AppShell = ({ children }) => {
  const pathname = usePathname();
  const hideOnRoutes = ['/login', '/auth'];
  const shouldHideNavbar = hideOnRoutes.some((route) => pathname?.startsWith(route));

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main style={{ paddingTop: shouldHideNavbar ? 0 : '100px' }}>
        {children}
      </main>
    </>
  );
};

export default AppShell;


