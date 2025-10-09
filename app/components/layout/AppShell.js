'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import I18nProvider from '../providers/I18nProvider';

const AppShell = ({ children }) => {
  const pathname = usePathname();
  const hideOnRoutes = ['/login', '/auth'];
  const shouldHideNavbar = hideOnRoutes.some((route) => pathname?.startsWith(route));

  return (
    <I18nProvider>
      {!shouldHideNavbar && <Navbar />}
      <main style={{ paddingTop: shouldHideNavbar ? 0 : '100px' }}>
        {children}
      </main>
    </I18nProvider>
  );
};

export default AppShell;


