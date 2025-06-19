'use client';

import * as React from 'react';
//import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
//import createEmotionCache from '../createEmotionCache';
import theme from '.';

//const clientSideEmotionCache = createEmotionCache();

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        {children}
    </ThemeProvider>
  );
}
