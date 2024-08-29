import '@/styles/globals.scss';

import { UserProvider } from '@/context/UserContext';
import { AnimatePresence } from 'framer-motion';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <UserProvider>
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </UserProvider>
  );
}
