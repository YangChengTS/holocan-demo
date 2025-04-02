import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthProvider } from '@/context/auth/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <AuthProvider>
      <LanguageProvider>
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark">
              <div className="relative h-16 w-16">
                <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
              </div>
            </div>
          ) : (
            <Component {...pageProps} key={router.route} />
          )}
        </AnimatePresence>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default MyApp; 