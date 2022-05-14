import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import Context from 'components/Context';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <SessionProvider session={session} refetchInterval={10 * 60} >
      <SWRConfig value={{ refreshInterval: 10000000, provider: () => new Map(), revalidateOnReconnect: false }}>
        <Context>
          <Component {...pageProps} />
        </Context>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;