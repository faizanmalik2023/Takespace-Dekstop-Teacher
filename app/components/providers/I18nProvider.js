'use client';

import { useEffect } from 'react';
import '../../lib/i18n';

const I18nProvider = ({ children }) => {
  useEffect(() => {
    // i18n is initialized in the import above
  }, []);

  return <>{children}</>;
};

export default I18nProvider;
